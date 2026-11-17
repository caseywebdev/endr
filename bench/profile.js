/**
 * CPU-profiles the workspace copy of endr in Chromium and prints the hottest
 * functions.
 *
 * Usage: node bench/profile.js
 */

import { execSync } from 'node:child_process';
import { readFile, writeFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

import { launch } from 'puppeteer';

const { console, URL, window } = globalThis;

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..');

const baseSource = execSync('git show HEAD:src/index.js', { cwd: root });
const basePath = join(root, 'bench/endr-head.js');
await writeFile(basePath, baseSource);

const types = { '.js': 'text/javascript', '.html': 'text/html' };
const server = createServer(async (req, res) => {
  try {
    const file = normalize(join(root, (req.url ?? '/').split('?')[0]));
    if (!file.startsWith(root)) {
      res.writeHead(403).end('forbidden');
      return;
    }
    const body = await readFile(file);
    res.writeHead(200, {
      'content-type': types[extname(file)] ?? 'text/plain'
    });
    res.end(body);
  } catch {
    res.writeHead(404).end('not found');
  }
});
const port = await new Promise(resolve =>
  server.listen(0, '127.0.0.1', () =>
    resolve(/** @type {number} */ (/** @type {any} */ (server).address().port))
  )
);

const browser = await launch();
try {
  const page = await browser.newPage();
  const cdp = await page.createCDPSession();
  await cdp.send('Profiler.enable');
  await page.goto(`http://127.0.0.1:${port}/bench/index.html`);

  // Warmup outside the profile.
  await page.evaluate(() => window.__endrBench.run({ rounds: 2, warmup: 5 }));

  await cdp.send('Profiler.start', { samplingInterval: 100 });
  await page.evaluate(() => window.__endrBench.run({ rounds: 5, warmup: 0 }));
  const { profile } = await cdp.send('Profiler.stop');

  const byName = new Map();
  for (const node of profile.nodes) {
    const { functionName, url } = node.callFrame;
    if (!functionName) continue;
    const key = url.includes('src/index.js')
      ? `${functionName} [endr]`
      : functionName;
    byName.set(key, (byName.get(key) ?? 0) + node.hitCount);
  }
  const total = [...byName.values()].reduce((a, b) => a + b, 0);
  console.log(`\nCpu profile hotspots (${total} samples):\n`);
  for (const [name, count] of [...byName]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 25)) {
    console.log(`${((count / total) * 100).toFixed(1).padStart(5)}%  ${name}`);
  }
} finally {
  await browser.close();
  server.close();
}

import { execSync } from 'node:child_process';
import { readFile, writeFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';

import { launch } from 'puppeteer';

const { console, process, window } = globalThis;

const root = process.cwd();
await writeFile(
  join(root, 'bench/endr-head.js'),
  execSync('git show HEAD:src/index.js', { cwd: root })
);
const types = { '.js': 'text/javascript', '.html': 'text/html' };
const server = createServer(async (req, res) => {
  try {
    const file = normalize(join(root, (req.url ?? '/').split('?')[0]));
    if (!file.startsWith(root)) {
      res.writeHead(403);
      res.end();
      return;
    }
    const body = await readFile(file);
    res.writeHead(200, {
      'content-type': types[extname(file)] ?? 'text/plain'
    });
    res.end(body);
  } catch {
    res.writeHead(404);
    res.end();
  }
});
const port = await new Promise(r =>
  server.listen(0, '127.0.0.1', () => r(server.address().port))
);
const browser = await launch();
const page = await browser.newPage();
const cdp = await page.createCDPSession();
await cdp.send('Profiler.enable');
await page.goto(`http://127.0.0.1:${port}/bench/index.html`);
await page.evaluate(() => window.__endrBench.run({ rounds: 2, warmup: 5 }));
await cdp.send('Profiler.start', { samplingInterval: 100 });
await page.evaluate(() => window.__endrBench.run({ rounds: 5, warmup: 0 }));
const { profile } = await cdp.send('Profiler.stop');
const byLine = new Map();
for (const node of profile.nodes) {
  const { url, functionName, lineNumber } = node.callFrame;
  if (!url.includes('src/index.js') || !functionName) continue;
  const key = `${functionName}:${lineNumber + 1}`;
  byLine.set(key, (byLine.get(key) ?? 0) + node.hitCount);
}
const total = [...byLine.values()].reduce((a, b) => a + b, 0);
console.log(`\nLine-level hotspots in src/index.js (${total} samples):\n`);
for (const [k, v] of [...byLine].sort((a, b) => b[1] - a[1]).slice(0, 25)) {
  console.log(`${((v / total) * 100).toFixed(1).padStart(5)}%  ${k}`);
}
await browser.close();
server.close();

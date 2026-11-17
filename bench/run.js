/**
 * Benchmarks the current workspace copy of endr against HEAD, running the
 * scenarios inside a real Chromium browser via Puppeteer.
 *
 * Usage: node bench/run.js [--rounds N] [--warmup N]
 */

import { execSync } from 'node:child_process';
import { readFile, writeFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

import { launch } from 'puppeteer';

const { console, process, URL, window } = globalThis;

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..');

/** @param {Record<string, number[]>} samples */
const stats = samples => {
  const sorted = [...samples].sort((a, b) => a - b);
  const median = sorted[Math.floor(sorted.length / 2)];
  const mean = sorted.reduce((a, b) => a + b, 0) / sorted.length;
  const best = sorted[0];
  return { median, mean, best };
};

const fmt = ms => `${(ms * 1000).toFixed(1)}us`;

const args = process.argv.slice(2);
const flag = (name, numeric = false) => {
  const i = args.indexOf(name);
  if (i === -1) return undefined;
  return numeric ? Number(args[i + 1]) : args[i + 1];
};
const ROUNDS = flag('--rounds', true) ?? 21;
const WARMUP = flag('--warmup', true) ?? 3;
const BASE = flag('--base');

// Snapshot the baseline: HEAD's copy of src/index.js by default, or an
// arbitrary file passed via --base for iterative candidate testing.
const baseSource = BASE
  ? await readFile(BASE)
  : execSync('git show HEAD:src/index.js', { cwd: root });
const baseLabel = BASE ? 'baseline' : 'HEAD';
const headPath = join(root, 'bench/endr-head.js');
await writeFile(headPath, baseSource);

// Serve the repo over HTTP (ESM imports don't work over file://).
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
  page.on('pageerror', exception => {
    console.error('Page error:', exception);
    process.exit(1);
  });
  await page.goto(`http://127.0.0.1:${port}/bench/index.html`);
  const { iters, timings, outputs } = await page.evaluate(
    ({ rounds, warmup, baseLabel }) =>
      window.__endrBench.run({ rounds, warmup, baseLabel }),
    { rounds: ROUNDS, warmup: WARMUP, baseLabel }
  );
  print(iters, timings, outputs);
} finally {
  await browser.close();
  server.close();
}

/**
 * @param {Record<string, number>} iters
 * @param {Record<string, Record<string, number[]>>} timings
 * @param {Record<string, Record<string, string>>} outputs
 */
function print(iters, timings, outputs) {
  const names = Object.keys(timings);
  let failed = false;
  console.log(
    `endr benchmark in Chromium: ${baseLabel} vs workspace ` +
      `(${ROUNDS} rounds, median per-iteration time, blocks of ~20ms)\n`
  );
  for (const name of names) {
    if (outputs[name][baseLabel] !== outputs[name].workspace) {
      failed = true;
      console.log(
        `✗ ${name}: output MISMATCH between ${baseLabel} and workspace`
      );
      continue;
    }
    const headStats = stats(timings[name][baseLabel]);
    const wsStats = stats(timings[name].workspace);
    const ratio = wsStats.median / headStats.median;
    const delta = (ratio - 1) * 100;
    const verdict = Math.abs(delta) < 2 ? '~' : ratio < 1 ? 'faster' : 'slower';
    console.log(
      `✓ ${name} (x${iters[name]})`.padEnd(40) +
        `  ${baseLabel}: ${fmt(headStats.median).padStart(10)}  ` +
        `workspace: ${fmt(wsStats.median).padStart(10)}  ` +
        `${delta >= 0 ? '+' : ''}${delta.toFixed(1)}%  ${verdict}`
    );
    console.log(
      `    head [mean ${fmt(headStats.mean)}, best ${fmt(headStats.best)}]`
    );
    console.log(
      `    ws   [mean ${fmt(wsStats.mean)}, best ${fmt(wsStats.best)}]`
    );
  }

  // Aggregate: geometric mean of per-scenario median ratios.
  const ratios = names
    .filter(name => outputs[name][baseLabel] === outputs[name].workspace)
    .map(
      name =>
        stats(timings[name].workspace).median /
        stats(timings[name][baseLabel]).median
    );
  if (ratios.length) {
    const geo = Math.exp(
      ratios.reduce((a, b) => a + Math.log(b), 0) / ratios.length
    );
    const delta = (geo - 1) * 100;
    console.log(
      `\nOverall (geomean of medians): workspace is ` +
        `${delta >= 0 ? '+' : ''}${delta.toFixed(1)}% vs ${baseLabel} ` +
        `(geomean ratio ${geo.toFixed(3)}; <1 = faster)`
    );
  }
  process.exit(failed ? 1 : 0);
}

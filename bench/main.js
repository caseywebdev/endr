/**
 * Runs in the browser. Imports the HEAD snapshot and the workspace copy of endr
 * as two independent modules, then benchmarks them interleaved.
 *
 * Note: this Chrome clamps performance.now() to 100us resolution, so each
 * sample is a _block_ of auto-calibrated iterations (target ~20ms) rather than
 * a single scenario run. Reported times are per-iteration averages.
 */

import * as base from './endr-head.js';
import { scenarios } from './scenarios.js';

import * as workspace from '../src/index.js';

const { performance, requestAnimationFrame, setTimeout, window } = globalThis;

const names = Object.keys(scenarios);

const TARGET_BLOCK_MS = 20;

/**
 * Calibrate the iteration count for each scenario so one measured block takes
 * roughly TARGET_BLOCK_MS.
 *
 * @param {{ [name: string]: (endr: any) => string }} scenarios
 * @returns {Record<string, number>}
 */
const calibrate = scenarios => {
  /** @type {Record<string, number>} */
  const iters = {};
  for (const [name, fn] of Object.entries(scenarios)) {
    const start = performance.now();
    fn(base);
    const rough = Math.max(performance.now() - start, 0.1);
    iters[name] = Math.min(
      500,
      Math.max(1, Math.round(TARGET_BLOCK_MS / rough))
    );
  }
  return iters;
};

/**
 * @param {{ rounds?: number; warmup?: number; baseLabel?: string }} options
 * @returns {Promise<{
 *   iters: Record<string, number>;
 *   timings: Record<string, Record<string, number[]>>;
 *   outputs: Record<string, Record<string, string>>;
 * }>}
 */
export const run = ({ rounds = 21, warmup = 3, baseLabel = 'HEAD' } = {}) =>
  new Promise(resolve => {
    // Let the page settle (layout/paint of warmup DOM) before measuring.
    requestAnimationFrame(() => {
      const iters = calibrate(scenarios);

      const versions = [
        [baseLabel, base],
        ['workspace', workspace]
      ];

      // Warmup so both copies are JIT-compiled equally.
      for (const [, endr] of versions) {
        for (const name of names) {
          for (let i = 0; i < warmup; i++) scenarios[name](endr);
        }
      }

      /** @type {Record<string, Record<string, number[]>>} */
      const timings = {};
      /** @type {Record<string, Record<string, string>>} */
      const outputs = {};

      // Interleaved rounds: alternate versions each round to cancel out
      // drift. Yield to the event loop between rounds so GC runs between
      // samples rather than inside them.
      let round = 0;
      const nextRound = () => {
        if (round >= rounds) {
          resolve({ iters, timings, outputs });
          return;
        }
        round++;
        for (const [label, endr] of versions) {
          for (const name of names) {
            const n = iters[name];
            const start = performance.now();
            let html = '';
            for (let i = 0; i < n; i++) html = scenarios[name](endr);
            const elapsed = performance.now() - start;
            (timings[name] ??= {})[label] ??= [];
            timings[name][label].push(elapsed / n); // per-iteration ms
            outputs[name] ??= {};
            if (outputs[name][label] === undefined) {
              outputs[name][label] = html;
            }
          }
        }
        setTimeout(nextRound, 0);
      };
      nextRound();
    });
  });

window.__endrBench = { run };

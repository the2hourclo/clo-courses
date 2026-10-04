import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';

const courseRoot = new URL('../clo-course/', import.meta.url);

// Exact relative-path + line-text exceptions only, each with a reason.
// Empty intentionally: internal surface/track values and asset names use lowercase
// `cowork`, so they never need an exception for the retired capitalised app name.
const allowedLines = new Map();

function* courseSources(directory = courseRoot, prefix = '') {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = prefix + entry.name;
    const url = new URL(entry.name + (entry.isDirectory() ? '/' : ''), directory);
    if (entry.isDirectory()) yield* courseSources(url, path + '/');
    else if (entry.isFile() && /\.(html|js)$/.test(entry.name)) yield { path, url };
  }
}

test('course HTML and JS contain no capitalised retired app name', () => {
  const violations = [];
  const usedExceptions = new Set();
  let scanned = 0;
  for (const { path, url } of courseSources()) {
    scanned++;
    readFileSync(url, 'utf8').split(/\r?\n/).forEach((line, index) => {
      if (!/\bCowork\b/.test(line)) return;
      const key = `${path}:${line}`;
      if (allowedLines.has(key)) {
        assert.ok(allowedLines.get(key), `Exception needs a reason: ${key}`);
        usedExceptions.add(key);
      } else violations.push(`${path}:${index + 1}: ${line.trim()}`);
    });
  }
  assert.ok(scanned > 0, `No course sources found in ${fileURLToPath(courseRoot)}`);
  assert.deepEqual(violations, [], 'Retired app name found:\n' + violations.join('\n'));
  assert.deepEqual([...usedExceptions].sort(), [...allowedLines.keys()].sort(), 'Remove stale exceptions');
});

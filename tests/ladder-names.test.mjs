import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

// The checkpoint names live in four kinds of places: progress.js META (the source),
// the board's BOARD columns, each checkpoint page's CONFIG, and the gate line that
// names the NEXT checkpoint ("<strong>X</strong> unlocks on your board"). They drifted
// once already: the system gate named "Make it run itself", a checkpoint that never
// existed (course review F12, 2026-10-04). This keeps all four in step.

const read = (path) => readFileSync(new URL('../clo-course/' + path, import.meta.url), 'utf8');
const decode = (text) => text.replace(/&rsquo;/g, '’').replace(/&amp;/g, '&');

const ORDER = ['cp1', 'cp2', 'cp3', 'cp4', 'goal'];
const PAGES = {
  cp1: 'checkpoint-map.html',
  cp2: 'checkpoint-first-skill.html',
  cp3: 'checkpoint-system.html',
  cp4: 'checkpoint-autonomy.html',
  goal: 'checkpoint-ai-employee.html'
};

function metaNames() {
  const source = read('progress.js');
  const names = {};
  for (const id of ORDER) {
    const match = source.match(new RegExp(`\\b${id}:\\s*\\{\\s*name:\\s*'([^']+)'`));
    assert.ok(match, `progress.js META has no name for ${id}`);
    names[id] = match[1];
  }
  return names;
}

test('Rashid’s 2026-10-04 ladder names are the source of truth', () => {
  const names = metaNames();
  assert.equal(names.cp2, 'Your AI Employee’s First Job');
  assert.equal(names.goal, 'Your AI Employee runs on its own');
});

test('the board columns use the same names as progress.js', () => {
  const names = metaNames();
  const board = read('ai-employee-board.html');
  for (const id of ORDER) {
    const match = board.match(new RegExp(`\\{ id:'${id}', name:'([^']+)'`));
    assert.ok(match, `board has no column for ${id}`);
    assert.equal(decode(match[1]), names[id], `board column ${id}`);
  }
});

test('each checkpoint page names itself the same way', () => {
  const names = metaNames();
  for (const id of ORDER) {
    const page = read(PAGES[id]);
    const match = page.match(/var CONFIG = \{\s*id: '([^']+)',\s*name: '([^']+)'/);
    assert.ok(match, `${PAGES[id]} has no CONFIG id/name`);
    assert.equal(match[1], id, `${PAGES[id]} CONFIG id`);
    assert.equal(decode(match[2]), names[id], `${PAGES[id]} CONFIG name`);
  }
});

test('each gate unlocks the checkpoint that really comes next', () => {
  const names = metaNames();
  for (let index = 0; index < ORDER.length - 1; index += 1) {
    const id = ORDER[index];
    const page = read(PAGES[id]);
    const unlocks = [...page.matchAll(/<strong>([^<]+)<\/strong> unlocks on your board|unlocks on your board: <strong>([^<]+)<\/strong>/g)]
      .map((match) => decode(match[1] || match[2]));
    assert.ok(unlocks.length > 0, `${PAGES[id]} gate names no next checkpoint`);
    for (const name of unlocks) {
      assert.equal(name, names[ORDER[index + 1]], `${PAGES[id]} gate unlocks the wrong checkpoint`);
    }
  }
});

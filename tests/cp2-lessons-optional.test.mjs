import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { test } from 'node:test';
import vm from 'node:vm';

// 2026-10-05 (Rashid): the First Job checkpoint leads with the build, and its three lessons are
// optional but clearly visible. The step list shrank from six to three, so every position saved
// against the old list (this browser's old key, another device's server snapshot) must be mapped,
// never copied: copied, an old step 4 or 5 lands past the end of the new list and the wizard opens
// on its completion screen, marking the checkpoint done. Each surface tab (Claude, Claude Code,
// Codex) also gets wording and a command that work there.

const dir = new URL('../clo-course/', import.meta.url);
const read = (name) => readFileSync(new URL(name, dir), 'utf8');
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&rsquo;/g, '’');
const SURFACES = ['cowork', 'claude-code', 'codex'];

// Evaluate the page's own CONFIG (it is built with perSurface(), so regexes can't read it).
function wizardConfig() {
  const page = read('checkpoint-first-skill.html');
  const script = [...page.matchAll(/<script(?![^>]*src)[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]).find((s) => s.includes('var CONFIG'));
  const ctx = {};
  vm.createContext(ctx);
  vm.runInContext(script.slice(0, script.indexOf('document.documentElement.style')) + '\n;this.CONFIG = CONFIG;', ctx);
  return { page, config: ctx.CONFIG };
}
// Arrays built inside the vm have another realm's prototype; copy them before deepEqual.
const stepsOn = (config, surface) => Array.from(config.steps).filter((s) => !s.surface || s.surface === surface);
const lessonTitles = (config) => Array.from(config.lessons, (l) => decode(l.title));

test('cp2 leads with the build on every surface; the lessons sit outside the step list', () => {
  const { page, config } = wizardConfig();
  for (const surface of SURFACES) {
    assert.deepEqual(stepsOn(config, surface).map((s) => decode(s.title)), ['Turn one real task into a skill', 'It gets better every time you use it', 'It did the job, then again in a fresh chat'], surface);
  }
  assert.deepEqual(lessonTitles(config), ['What is a skill', 'The 3 levels of skills', 'How to create a skill']);
  assert.match(page, /var STORE = 'aieb_ckpt_'\+CONFIG\.id\+'_v6'/);
  assert.ok(stepsOn(config, 'cowork')[0].lessonsCard);
  assert.match(page, /function openLesson\(i\)/);
});

test('each surface tab gets a command that works there', () => {
  const { config } = wizardConfig();
  for (const surface of ['cowork', 'claude-code']) {
    assert.equal(stepsOn(config, surface)[0].command, '/ai-employee-builder:meta-create-skill', surface);
    assert.equal(stepsOn(config, surface)[1].command, '/ai-employee-builder:retrospective', surface);
  }
  for (const step of stepsOn(config, 'codex')) {
    assert.doesNotMatch(String(step.command || ''), /^\//, 'Codex runs plugin skills from plain words, not slash commands');
    assert.doesNotMatch(String(step.body || '') + ' ' + (step.checks || []).join(' ') + ' ' + String(step.doesFoot || ''), /\bClaude\b|\bProject\b/, 'no Claude-app words on the Codex tab');
  }
  assert.match(stepsOn(config, 'claude-code')[2].body, /fresh Claude Code session/);
  assert.match(stepsOn(config, 'codex')[2].body, /fresh Codex thread/);
});

test('the board column matches the wizard on every surface; lessons on their own line', () => {
  const { config } = wizardConfig();
  const board = read('ai-employee-board.html');
  const col = board.match(/\{ id:'cp2',[\s\S]*?\n  \]\},/);
  assert.ok(col, 'board has a cp2 column');
  const cards = [...col[0].matchAll(/\{ t:'([^']+)', type:'\w+'(?:, surface:'([\w-]+)')?/g)].map((m) => ({ t: decode(m[1]), surface: m[2] }));
  for (const surface of SURFACES) {
    const shown = cards.filter((c) => !c.surface || c.surface === surface).map((c) => c.t);
    assert.deepEqual(shown, stepsOn(config, surface).map((s) => decode(s.title)), `card<->step contract on ${surface}`);
  }
  const boardLessons = [...(col[0].match(/lessons:\[([^\]]*)\]/) || ['', ''])[1].matchAll(/t:'([^']+)'/g)].map((m) => decode(m[1]));
  assert.deepEqual(boardLessons, lessonTitles(config));
});

test('every page loads the same progress.js, which owns cp2 on _v6', () => {
  const versions = new Set();
  for (const name of readdirSync(dir).filter((n) => n.endsWith('.html'))) {
    for (const m of read(name).matchAll(/progress\.js\?v=(\d+)/g)) versions.add(m[1]);
  }
  assert.deepEqual([...versions], ['7'], 'one progress.js version across pages, so two copies never fight over keys');
  assert.match(read('progress.js'), /cp2: '_v6'/);
});

function loadProgress(seed = {}) {
  const store = new Map(Object.entries(seed));
  const localStorage = {
    getItem: (k) => (store.has(k) ? store.get(k) : null),
    setItem: (k, v) => { store.set(k, String(v)); },
    removeItem: (k) => { store.delete(k); },
    key: (i) => [...store.keys()][i] ?? null,
    get length() { return store.size; }
  };
  const noop = () => {};
  const window = {
    location: { href: 'https://course.example/clo-course/ai-employee-board.html', pathname: '/clo-course/ai-employee-board.html', search: '', hash: '', origin: 'https://course.example', hostname: 'course.example' },
    addEventListener: noop, removeEventListener: noop, dispatchEvent: noop, setTimeout, clearTimeout,
    history: { replaceState: noop }, matchMedia: () => ({ matches: false, addEventListener: noop })
  };
  const document = { readyState: 'complete', cookie: '', addEventListener: noop, querySelector: () => null, querySelectorAll: () => [], getElementById: () => null, createElement: () => ({ style: {}, setAttribute: noop, appendChild: noop }), head: { appendChild: noop }, body: { appendChild: noop, classList: { add: noop, remove: noop, toggle: noop } } };
  const context = { window, document, localStorage, sessionStorage: localStorage, navigator: { userAgent: 'node' }, console, setTimeout, clearTimeout, CustomEvent: function () {}, URLSearchParams, JSON, Date, Math };
  window.localStorage = localStorage;
  vm.createContext(context);
  vm.runInContext(read('progress.js'), context);
  return { AIEB: window.AIEB, store };
}

test('old-order positions on this device are mapped, never copied', () => {
  const expected = [0, 0, 0, 0, 1, 2, 3];
  for (let old = 0; old <= 6; old++) {
    const { AIEB, store } = loadProgress({ aieb_ckpt_cp2_v5: String(old), aieb_ckpt_cp2_v5_n: '6' });
    assert.deepEqual({ ...AIEB.stepInfo('cp2') }, { pos: expected[old], total: 3 }, `old v5 step ${old}`);
    assert.equal(store.get('aieb_ckpt_cp2_v6'), String(expected[old]));
    assert.equal(store.has('aieb_ckpt_cp2_v5'), false, 'the old key is consumed');
  }
  const v4 = [0, 0, 0, 0, 2, 3];
  for (let old = 0; old <= 5; old++) {
    const { AIEB } = loadProgress({ aieb_ckpt_cp2_v4: String(old), aieb_ckpt_cp2_v4_n: '5' });
    assert.equal(AIEB.stepInfo('cp2').pos, v4[old], `old v4 step ${old}`);
  }
  const unknown = loadProgress({ aieb_ckpt_cp2_v5: '6' });
  assert.equal(unknown.AIEB.stepInfo('cp2').pos, 2, 'an old position with no count stops at the last step, never complete');
  const current = loadProgress({ aieb_ckpt_cp2_v6: '2', aieb_ckpt_cp2_v6_n: '3' });
  assert.deepEqual({ ...current.AIEB.stepInfo('cp2') }, { pos: 2, total: 3 }, 'today\'s key is read as is');
});

test('a server snapshot from an old device is mapped before "furthest wins"', () => {
  const cases = [
    [{ pos: 5, total: 6 }, 2], [{ pos: 6, total: 6 }, 3], [{ pos: 2, total: 6 }, 0],
    [{ pos: 3, total: 3 }, 3], [{ pos: 6 }, 2]
  ];
  for (const [remote, want] of cases) {
    const { AIEB, store } = loadProgress();
    AIEB._applySnapshot({ progress: {}, steps: { cp2: remote } });
    assert.equal(store.get('aieb_ckpt_cp2_v6') ?? '0', String(want), JSON.stringify(remote));
    if (want > 0) assert.equal(store.get('aieb_ckpt_cp2_v6_n'), '3');
  }
  const other = loadProgress();
  other.AIEB._applySnapshot({ progress: {}, steps: { cp3: { pos: 2, total: 3 } } });
  assert.equal(other.store.get('aieb_ckpt_cp3_v4'), '2', 'other checkpoints merge exactly as before');
});

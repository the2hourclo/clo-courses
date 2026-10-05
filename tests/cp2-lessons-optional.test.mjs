import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { test } from 'node:test';
import vm from 'node:vm';

// 2026-10-05 (Rashid): the First Job checkpoint leads with the build, and its three lessons are
// optional but clearly visible. The step list shrank from six to three, so every position saved
// against the old list (this browser's old key, another device's server snapshot, an old board
// link, a page still running the previous progress.js) must be mapped, never copied: copied, an
// old step 4 or 5 lands past the end of the new list and the wizard opens on its completion
// screen, marking the checkpoint done. Each surface tab (Claude, Claude Code, Codex) also gets
// wording and a command that work there.

const dir = new URL('../clo-course/', import.meta.url);
const read = (name) => readFileSync(new URL(name, dir), 'utf8');
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&rsquo;/g, '’');
const SURFACES = ['cowork', 'claude-code', 'codex'];
const OLD_PROGRESS = readFileSync(new URL('./fixtures/progress-live-c26a000.js', import.meta.url), 'utf8');

function pageScript() {
  const page = read('checkpoint-first-skill.html');
  return [...page.matchAll(/<script(?![^>]*src)[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]).find((s) => s.includes('var CONFIG'));
}

// Evaluate the page's own CONFIG (it is built with perSurface(), so regexes can't read it).
function wizardConfig() {
  const script = pageScript();
  const ctx = {};
  vm.createContext(ctx);
  vm.runInContext(script.slice(0, script.indexOf('document.documentElement.style')) + '\n;this.CONFIG = CONFIG;', ctx);
  return { page: read('checkpoint-first-skill.html'), config: ctx.CONFIG };
}
// Arrays built inside the vm have another realm's prototype; copy them before deepEqual.
const stepsOn = (config, surface) => Array.from(config.steps).filter((s) => !s.surface || s.surface === surface);
const lessonTitles = (config) => Array.from(config.lessons, (l) => decode(l.title));

function storage(seed = {}) {
  const store = new Map(Object.entries(seed));
  return {
    store,
    api: {
      getItem: (k) => (store.has(k) ? store.get(k) : null),
      setItem: (k, v) => { store.set(k, String(v)); },
      removeItem: (k) => { store.delete(k); },
      key: (i) => [...store.keys()][i] ?? null,
      get length() { return store.size; }
    }
  };
}

// A permissive DOM: every property is another stub, every call returns a stub.
function stub() {
  const target = function () {};
  return new Proxy(target, {
    get(_t, key) {
      if (key === Symbol.toPrimitive) return () => '';
      if (key === 'classList') return { add() {}, remove() {}, toggle() {}, contains() { return false; } };
      if (key === 'length') return 0;
      if (['innerHTML', 'textContent', 'innerText', 'value'].includes(key)) return '';
      return stub();
    },
    set() { return true; },
    apply() { return stub(); }
  });
}

function loadProgress(source, ls) {
  const noop = () => {};
  const window = {
    location: { href: 'https://course.example/clo-course/ai-employee-board.html', pathname: '/clo-course/ai-employee-board.html', search: '', hash: '', origin: 'https://course.example', hostname: 'course.example' },
    addEventListener: noop, removeEventListener: noop, dispatchEvent: noop, setTimeout, clearTimeout,
    history: { replaceState: noop }, matchMedia: () => ({ matches: false, addEventListener: noop }), localStorage: ls
  };
  const document = { readyState: 'complete', cookie: '', addEventListener: noop, querySelector: () => null, querySelectorAll: () => [], getElementById: () => null, createElement: () => ({ style: {}, setAttribute: noop, appendChild: noop }), head: { appendChild: noop }, body: { appendChild: noop, classList: { add: noop, remove: noop, toggle: noop } } };
  const context = { window, document, localStorage: ls, sessionStorage: ls, navigator: { userAgent: 'node' }, console, setTimeout, clearTimeout, CustomEvent: function () {}, URLSearchParams, JSON, Date, Math };
  vm.createContext(context);
  vm.runInContext(source, context);
  return window.AIEB;
}
const newProgress = (seed) => { const s = storage(seed); return { AIEB: loadProgress(read('progress.js'), s.api), store: s.store, ls: s.api }; };

// Run the wizard page's script the way a browser would, on a given URL and storage.
function runWizard(search, seed = {}) {
  const s = storage(seed);
  const done = [];
  const replaced = [];
  const AIEBSlides = { mount() {} };
  const window = { location: { search, pathname: '/clo-course/checkpoint-first-skill.html', hash: '', href: 'x' }, scrollTo() {}, AIEBSlides };
  window.AIEB = { markDone: (id) => done.push(id), next: () => null, stepInfo: () => ({ pos: 0, total: 0 }) };
  const context = {
    window, AIEB: window.AIEB, AIEBSlides, document: stub(), localStorage: s.api, navigator: { clipboard: { writeText: async () => {} } },
    history: { replaceState: (a, b, url) => replaced.push(url) }, console, setTimeout, clearTimeout, confirm: () => false, JSON, Math
  };
  vm.createContext(context);
  vm.runInContext(pageScript(), context);
  return { pos: context.pos, lessonOpen: context.lessonOpen, done, store: s.store, replaced };
}

test('cp2 leads with the build on every surface; the lessons sit outside the step list', () => {
  const { page, config } = wizardConfig();
  for (const surface of SURFACES) {
    assert.deepEqual(stepsOn(config, surface).map((s) => decode(s.title)), ['Turn one real task into a skill', 'It gets better every time you use it', 'It did the job, then again in a fresh chat'], surface);
  }
  assert.deepEqual(lessonTitles(config), ['What is a skill', 'The 3 levels of skills', 'How to create a skill']);
  assert.match(page, /var STORE = 'aieb_ckpt_'\+CONFIG\.id\+'_v7'/);
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

test('every page loads the same progress.js, which owns cp2 on _v7', () => {
  const versions = new Set();
  for (const name of readdirSync(dir).filter((n) => n.endsWith('.html'))) {
    for (const m of read(name).matchAll(/progress\.js\?v=(\d+)/g)) versions.add(m[1]);
  }
  assert.deepEqual([...versions], ['7'], 'one progress.js version across pages');
  assert.match(read('progress.js'), /cp2: '_v7'/);
});

test('old-order positions on this device are mapped, never copied', () => {
  const expected = [0, 0, 0, 0, 1, 2, 3];
  for (let old = 0; old <= 6; old++) {
    const { AIEB, store } = newProgress({ aieb_ckpt_cp2_v5: String(old), aieb_ckpt_cp2_v5_n: '6' });
    assert.deepEqual({ ...AIEB.stepInfo('cp2') }, { pos: expected[old], total: 3 }, `old v5 step ${old}`);
    assert.equal(store.get('aieb_ckpt_cp2_v7'), String(expected[old]));
    assert.equal(store.has('aieb_ckpt_cp2_v5'), false, 'the old key is consumed');
  }
  const v4 = [0, 0, 0, 0, 2, 3];
  for (let old = 0; old <= 5; old++) {
    const { AIEB } = newProgress({ aieb_ckpt_cp2_v4: String(old), aieb_ckpt_cp2_v4_n: '5' });
    assert.equal(AIEB.stepInfo('cp2').pos, v4[old], `old v4 step ${old}`);
  }
  assert.equal(newProgress({ aieb_ckpt_cp2_v5: '6' }).AIEB.stepInfo('cp2').pos, 2, 'an old position with no count stops at the last step, never complete');
  assert.equal(newProgress({ aieb_ckpt_cp2_v6: '3', aieb_ckpt_cp2_v6_n: '3' }).AIEB.stepInfo('cp2').pos, 2, 'nothing older than today\'s key passes through, whatever its count');
  assert.deepEqual({ ...newProgress({ aieb_ckpt_cp2_v7: '2', aieb_ckpt_cp2_v7_n: '3' }).AIEB.stepInfo('cp2') }, { pos: 2, total: 3 }, 'today\'s key is read as is');
});

test('server snapshots: today\'s list travels as cp2@3; a plain cp2 entry is an old page and is mapped', () => {
  const mine = newProgress({ aieb_ckpt_cp2_v7: '2', aieb_ckpt_cp2_v7_n: '3' });
  const snap = mine.AIEB._snapshot();
  assert.deepEqual({ ...snap.steps['cp2@3'] }, { pos: 2, total: 3 });
  assert.equal('cp2' in snap.steps, false, 'pages running the previous progress.js never receive today\'s cp2 position');
  const cases = [
    [{ 'cp2@3': { pos: 3, total: 3 } }, 3],
    [{ cp2: { pos: 5, total: 6 } }, 2], [{ cp2: { pos: 6, total: 6 } }, 3], [{ cp2: { pos: 2, total: 6 } }, 0],
    [{ cp2: { pos: 3, total: 3 } }, 2], [{ cp2: { pos: 6 } }, 2],
    [{ cp2: { pos: 6, total: 6 }, 'cp2@3': { pos: 1, total: 3 } }, 3]
  ];
  for (const [steps, want] of cases) {
    const { AIEB, store } = newProgress();
    AIEB._applySnapshot({ progress: {}, steps });
    assert.equal(store.get('aieb_ckpt_cp2_v7') ?? '0', String(want), JSON.stringify(steps));
    if (want > 0) assert.equal(store.get('aieb_ckpt_cp2_v7_n'), '3');
  }
  const other = newProgress();
  other.AIEB._applySnapshot({ progress: {}, steps: { cp3: { pos: 2, total: 3 } } });
  assert.equal(other.store.get('aieb_ckpt_cp3_v4'), '2', 'other checkpoints merge exactly as before');
  const suppressed = newProgress();
  suppressed.AIEB._applySnapshot({ progress: {}, suppressed: { cp2: true }, steps: { cp2: { pos: 5, total: 6 } } });
  assert.equal(suppressed.store.get('aieb_ckpt_cp2_v7'), '2');
  assert.equal(suppressed.store.get('aieb_ckpt_cp2_v7_n'), '3', 'a suppression keeps the position and its count together');
});

test('a page still running the previous progress.js can no longer complete cp2', () => {
  const s = storage({ aieb_ckpt_cp2_v5: '3', aieb_ckpt_cp2_v5_n: '6' });  // member at the old build step
  const fresh = loadProgress(read('progress.js'), s.api);
  const stale = loadProgress(OLD_PROGRESS, s.api);                      // an old board tab, never reloaded
  assert.deepEqual({ ...fresh.stepInfo('cp2') }, { pos: 0, total: 3 });
  assert.deepEqual({ ...stale.stepInfo('cp2') }, { pos: 0, total: 0 }, 'the old copy cannot see _v7');
  assert.equal(s.store.get('aieb_ckpt_cp2_v7'), '0', 'and so cannot pull it into its own key');
  stale.setStep('cp2', 3);                                               // the old board's third card
  assert.equal(stale.isDone('cp2'), false, 'ticking a card on the old board does not finish cp2');
  assert.equal(fresh.isDone('cp2'), false);
  assert.equal(fresh.stepInfo('cp2').pos, 0, 'the new list keeps its own position');
  assert.match(OLD_PROGRESS, /var suffix = STEP_WRITE_SUFFIX\[sid\];\s*\n\s*if \(!suffix\) continue;/, 'the previous copy skips snapshot ids it does not own');
  assert.doesNotMatch(OLD_PROGRESS, /cp2@3/);
});

test('board links: an old ?step can never open the completion screen', () => {
  const cases = [['?step=4', 0], ['?step=5', 1], ['?step=6', 2], ['?step=9', 2], ['?step=1', 0], ['?step=3', 2]];
  for (const [search, want] of cases) {
    const r = runWizard(search);
    assert.equal(r.pos, want, search);
    assert.deepEqual([...r.done], [], `${search} must not mark cp2 done`);
  }
  const both = runWizard('?step=6&lesson=2');
  assert.equal(both.pos, 2);
  assert.equal(both.lessonOpen, 1, 'the lesson opens on top of the step');
  assert.deepEqual([...both.done], []);
  const lessonOnly = runWizard('?lesson=3', { aieb_ckpt_cp2_v7: '1', aieb_ckpt_cp2_v7_n: '3' });
  assert.equal(lessonOnly.pos, 1, 'a lesson link keeps the member on their step');
  assert.equal(lessonOnly.lessonOpen, 2);
});

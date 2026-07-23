/* ============================================================
   progress.js — the AI Employee journey's client-side state store.
   Single source of truth for (a) which surface you build in, (b) which
   checkpoints are done, and (c) where you continue. Loaded by the board,
   the launcher home, every checkpoint wizard, and the get-access wizard.

   Persistence (localStorage, no server):
     aieb_surface             = 'cowork' | 'claude-code'  ← chosen once, swappable anytime
     aieb_progress            = { setup:true, cp1:true, cp2:false, … }  ← completed checkpoints
     aieb_ckpt_<id>_v4        = current step index WITHIN a checkpoint    ← written by each wizard
     aieb_ckpt_<id>_v4_n      = active-step COUNT for that checkpoint     ← written by each wizard

   The spine (fixed order): setup → cp1 → cp2 → cp3 → cp4 → goal.
   Finishing one marks it done, which unlocks the next. Hand-holding rule:
   the "active" node is always the first not-yet-done step — that's the ONE
   thing we surface; everything after it stays out of the way until reached.
   ============================================================ */
(function () {
  'use strict';

  var SPINE = ['setup', 'cp1', 'cp2', 'cp3', 'cp4', 'goal'];
  var CHAIN = ['setup', 'cp1', 'cp2', 'cp3', 'cp4']; // the gating steps (goal is the reward)
  var BUILD = ['cp1', 'cp2', 'cp3', 'cp4'];          // the four build checkpoints (for "Checkpoint N of 4")

  var META = {
    setup: { name: 'Get set up',         short: 'Set up',             wizard: 'get-access-aieb.html',        color: '#4ade80' },
    cp1:   { name: 'Map the business',   short: 'Map the business',   wizard: 'checkpoint-map.html',         color: '#5b9bff' },
    cp2:   { name: 'Your first skill',   short: 'Your first skill',   wizard: 'checkpoint-first-skill.html', color: '#a78bfa' },
    cp3:   { name: 'A skill system',     short: 'A skill system',     wizard: 'checkpoint-system.html',      color: '#f5a623' },
    cp4:   { name: 'Make it run itself', short: 'Make it run itself', wizard: 'checkpoint-autonomy.html',    color: '#f472b6' },
    goal:  { name: 'Your AI Employee',   short: 'Your AI Employee',   wizard: null,                          color: '#fbbf24' }
  };

  /* ── SURFACE (Cowork vs Claude Code) — a global identity, swappable anytime ── */
  var SURFACE_KEY = 'aieb_surface';
  var SURFACES = {
    'cowork':      { label: 'Cowork',      blurb: 'Claude in your browser — nothing to install to start.' },
    'claude-code': { label: 'Claude Code', blurb: 'Claude in your code editor or terminal.' }
  };
  function getSurface() {
    try { var s = localStorage.getItem(SURFACE_KEY); return (s === 'cowork' || s === 'claude-code') ? s : null; }
    catch (e) { return null; }
  }
  function setSurface(s) {
    if (s !== 'cowork' && s !== 'claude-code') return;
    try { localStorage.setItem(SURFACE_KEY, s); } catch (e) {}
  }
  // true when a piece of content belongs on the current surface.
  // `only` is 'cowork' | 'claude-code' | undefined (undefined = both surfaces).
  function surfaceShows(only) {
    if (!only) return true;
    return getSurface() === only;
  }

  var STORE = 'aieb_progress';
  var STEP_PREFIX = 'aieb_ckpt_', STEP_SUFFIX = '_v4';

  function read() {
    var o = {};
    try { o = JSON.parse(localStorage.getItem(STORE) || '{}') || {}; } catch (e) { o = {}; }
    return o;
  }
  function write(o) { try { localStorage.setItem(STORE, JSON.stringify(o)); } catch (e) {} }

  // Every checkpoint is done only when explicitly marked — EXCEPT `setup`, which is
  // also implied done the moment any later checkpoint is done (you can't have built a
  // skill without setting up). This keeps a mid-journey buyer from being bounced back
  // to "Get set up" and migrates anyone whose progress predates the setup gate.
  function isDone(id) {
    var o = read();
    if (id === 'setup') return !!(o.setup || o.cp1 || o.cp2 || o.cp3 || o.cp4);
    return !!o[id];
  }
  function markDone(id) {
    if (!META[id] || id === 'goal') return;
    var o = read();
    if (o[id] === true) return;          // idempotent
    o[id] = true; write(o);
  }
  function reset() { write({}); }        // dev helper: wipe checkpoint progress

  // The active node = the first gating step that isn't done. All done → 'goal'.
  function activeId() {
    for (var i = 0; i < CHAIN.length; i++) {
      if (!isDone(CHAIN[i])) return CHAIN[i];
    }
    return 'goal';
  }

  // done | active | locked  (goal mirrors cp4: "reached" once cp4 is done)
  function stateOf(id) {
    if (id === 'goal') return isDone('cp4') ? 'done' : 'locked';
    if (isDone(id)) return 'done';
    if (id === activeId()) return 'active';
    return 'locked';
  }

  // The node AFTER `id` on the spine (what "Next →" points at). null past the end.
  function next(id) {
    var i = SPINE.indexOf(id);
    if (i < 0 || i >= SPINE.length - 1) return null;
    var nid = SPINE[i + 1];
    return { id: nid, name: META[nid].name, wizard: META[nid].wizard, color: META[nid].color, isGoal: nid === 'goal' };
  }

  // Human "Checkpoint N of 4" for a build checkpoint (0 for setup/goal).
  function buildIndex(id) { return BUILD.indexOf(id) + 1; } // 1..4, or 0

  // Saved wizard position + step count for a checkpoint (drives live card fill).
  function stepInfo(id) {
    var pos = 0, total = 0;
    try { pos = parseInt(localStorage.getItem(STEP_PREFIX + id + STEP_SUFFIX), 10) || 0; } catch (e) {}
    try { total = parseInt(localStorage.getItem(STEP_PREFIX + id + STEP_SUFFIX + '_n'), 10) || 0; } catch (e) {}
    return { pos: pos, total: total };
  }

  // Where "Continue / Start" jumps to: the active node's wizard (resumes at saved step).
  function resume() {
    var id = activeId();
    var m = META[id] || META.goal;
    return { id: id, name: m.name, wizard: m.wizard, color: m.color, step: stepInfo(id).pos, atGoal: id === 'goal' };
  }

  // Overall journey completion — for the top "progress to your AI Employee" bar.
  // Counts the 5 gating steps (setup + cp1..cp4). 100% = the AI Employee is built.
  function overall() {
    var done = 0;
    for (var i = 0; i < CHAIN.length; i++) { if (isDone(CHAIN[i])) done++; }
    var a = activeId();
    return {
      done: done, total: CHAIN.length,
      pct: Math.round(done / CHAIN.length * 100),
      complete: a === 'goal',
      nextId: a, nextName: (META[a] || META.goal).name, nextColor: (META[a] || META.goal).color
    };
  }

  // Has the buyer done anything at all? (chosen a surface, finished a step, or stepped into one)
  function started() {
    if (getSurface()) return true;
    var o = read();
    for (var k in o) { if (o[k]) return true; }
    return stepInfo('cp1').pos > 0;
  }

  window.AIEB = {
    SPINE: SPINE, CHAIN: CHAIN, BUILD: BUILD, META: META, SURFACES: SURFACES,
    read: read, isDone: isDone, markDone: markDone, reset: reset,
    getSurface: getSurface, setSurface: setSurface, surfaceShows: surfaceShows,
    activeId: activeId, stateOf: stateOf, next: next, buildIndex: buildIndex,
    stepInfo: stepInfo, resume: resume, started: started, overall: overall
  };
})();

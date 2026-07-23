/* ============================================================
   progress.js — the AI Employee journey's client-side progress store.
   Single source of truth for "which checkpoints are done" and "where do
   I continue". Loaded by the board, every checkpoint wizard, and home.

   Persistence (localStorage, no server):
     aieb_progress            = { setup:true, cp1:true, cp2:false, ... }  ← completed checkpoints
     aieb_ckpt_<id>_v4        = current step index WITHIN a checkpoint     ← written by each wizard
     aieb_ckpt_<id>_v4_n      = active-step COUNT for that checkpoint      ← written by each wizard (for the board's live card fill)
     aieb_surface             = 'cowork' | 'claude-code'                   ← unrelated; owned by the wizards

   The spine (fixed order): setup → cp1 → cp2 → cp3 → cp4 → goal.
   Finishing a checkpoint marks it done, which unlocks the next one.
   `setup` defaults to done (buying + installing happens before the board).
   ============================================================ */
(function () {
  'use strict';

  var SPINE = ['setup', 'cp1', 'cp2', 'cp3', 'cp4', 'goal'];
  // the checkpoints that actually gate progression (goal is the outcome, setup is pre-board)
  var CHAIN = ['setup', 'cp1', 'cp2', 'cp3', 'cp4'];

  var META = {
    setup: { name: 'Set up',             wizard: 'get-access-aieb.html',        color: '#4ade80' },
    cp1:   { name: 'Map the business',   wizard: 'checkpoint-map.html',         color: '#5b9bff' },
    cp2:   { name: 'Your first skill',   wizard: 'checkpoint-first-skill.html', color: '#a78bfa' },
    cp3:   { name: 'A skill system',     wizard: 'checkpoint-system.html',      color: '#f5a623' },
    cp4:   { name: 'Make it run itself', wizard: 'checkpoint-autonomy.html',    color: '#f472b6' },
    goal:  { name: 'Your AI Employee',   wizard: null,                          color: '#fbbf24' }
  };

  var STORE = 'aieb_progress';
  var STEP_PREFIX = 'aieb_ckpt_', STEP_SUFFIX = '_v4';

  function read() {
    var o = {};
    try { o = JSON.parse(localStorage.getItem(STORE) || '{}') || {}; } catch (e) { o = {}; }
    return o;
  }
  function write(o) { try { localStorage.setItem(STORE, JSON.stringify(o)); } catch (e) {} }

  // `setup` defaults to done (matches the board's original just-onboarded stub) unless
  // something explicitly stored setup:false. Every other checkpoint is done only when stored true.
  function isDone(id) {
    var o = read();
    if (id === 'setup') return o.setup !== false;
    return !!o[id];
  }
  function markDone(id) {
    if (!META[id] || id === 'goal') return;
    var o = read();
    if (o[id] === true) return;          // idempotent
    o[id] = true; write(o);
  }
  function reset() { write({}); }        // dev helper: wipe progress

  // The active checkpoint = the first gating checkpoint that isn't done.
  // If they're all done, the active "step" is the goal (you've built it).
  function activeId() {
    for (var i = 0; i < CHAIN.length; i++) {
      if (!isDone(CHAIN[i])) return CHAIN[i];
    }
    return 'goal';
  }

  // done | active | locked  (goal mirrors cp4: it's "reached" once cp4 is done)
  function stateOf(id) {
    if (id === 'goal') return isDone('cp4') ? 'done' : 'locked';
    if (isDone(id)) return 'done';
    if (id === activeId()) return 'active';
    return 'locked';
  }

  // The checkpoint AFTER `id` on the spine (what "Next →" points at). null past the end.
  function next(id) {
    var i = SPINE.indexOf(id);
    if (i < 0 || i >= SPINE.length - 1) return null;
    var nid = SPINE[i + 1];
    return { id: nid, name: META[nid].name, wizard: META[nid].wizard, color: META[nid].color, isGoal: nid === 'goal' };
  }

  // Saved wizard position + step count for a checkpoint (drives the board's live card fill).
  function stepInfo(id) {
    var pos = 0, total = 0;
    try { pos = parseInt(localStorage.getItem(STEP_PREFIX + id + STEP_SUFFIX), 10) || 0; } catch (e) {}
    try { total = parseInt(localStorage.getItem(STEP_PREFIX + id + STEP_SUFFIX + '_n'), 10) || 0; } catch (e) {}
    return { pos: pos, total: total };
  }

  // Where "Continue where you left off" jumps to: the active checkpoint's wizard.
  // The wizard reads aieb_ckpt_<id>_v4 itself, so it resumes at the saved step automatically.
  function resume() {
    var id = activeId();
    var m = META[id] || META.goal;
    return { id: id, name: m.name, wizard: m.wizard, color: m.color, step: stepInfo(id).pos, atGoal: id === 'goal' };
  }

  // Has the buyer done anything worth showing a "Continue" CTA for?
  // (finished a checkpoint, stepped into cp1, or picked a build surface)
  function started() {
    var o = read();
    for (var k in o) { if (o[k]) return true; }
    if (stepInfo('cp1').pos > 0) return true;
    try { if (localStorage.getItem('aieb_surface')) return true; } catch (e) {}
    return false;
  }

  window.AIEB = {
    SPINE: SPINE, CHAIN: CHAIN, META: META,
    read: read, isDone: isDone, markDone: markDone, reset: reset,
    activeId: activeId, stateOf: stateOf, next: next,
    stepInfo: stepInfo, resume: resume, started: started
  };
})();

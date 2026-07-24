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
  // Each wizard bumps its OWN store suffix whenever its step ORDER changes, so the
  // suffixes drift apart (CP1 is on _v5 after a step was removed; CP2-CP4 are on _v4).
  // Probing newest-first keeps the board reading real progress instead of silently
  // seeing zero — which froze CP1's column on "Start" for a buyer three steps in.
  // Add new suffixes to the FRONT of this list when a wizard bumps.
  var STEP_PREFIX = 'aieb_ckpt_', STEP_SUFFIXES = ['_v6', '_v5', '_v4'];

  // Read a per-checkpoint step key, trying each suffix newest-first.
  function readStepKey(id, tail) {
    for (var i = 0; i < STEP_SUFFIXES.length; i++) {
      try {
        var raw = localStorage.getItem(STEP_PREFIX + id + STEP_SUFFIXES[i] + (tail || ''));
        if (raw !== null) { var n = parseInt(raw, 10); if (!isNaN(n)) return n; }
      } catch (e) {}
    }
    return 0;
  }

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
    pos = readStepKey(id, '');
    total = readStepKey(id, '_n');
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

  /* ── SERVER SYNC — real build progress, not just clicks ─────────────────────
     Everything above is what the buyer did IN THIS BROWSER. The truth about what
     they actually BUILT lives on the server: Claude calls report_checkpoint at
     each verified done-signal, and GET /progress returns the ladder.

     Auth: a read-only view token minted during device activation and banked by
     the wizard. Deliberately NOT the license key — the portal promises the buyer
     it stores none, and this token can only read the ladder.

     Design rules, in order of importance:
       1. NEVER block the render. localStorage paints instantly; this refines it
          a moment later. A buyer offline, on a different browser, or with no
          token still gets the full local journey.
       2. Server completions are ADDITIVE. A checkpoint the server calls done is
          done. We never un-mark something locally marked — a buyer who clicked
          through a wizard shouldn't watch progress disappear on refresh.
       3. Failures are silent. A dark map beats an error message.
     ────────────────────────────────────────────────────────────────────────── */
  var VIEW_TOKEN_KEY = 'aieb_view_token_v1';
  var PROGRESS_URL = 'https://aieb-gated-mcp.vercel.app/progress';
  // Dev/test hook only: lets a local smoke test point the sync at a local server.
  // Buyers never have this key set; the default above is the production truth.
  try { PROGRESS_URL = localStorage.getItem('aieb_progress_url_dev') || PROGRESS_URL; } catch (e) {}
  // Server ladder keys → this page's spine ids. These are the SAME five
  // checkpoints under two naming schemes; keep both ends in step if either moves.
  var LADDER_TO_SPINE = {
    '1-onboard': 'setup',
    '2-map': 'cp1',
    '3-first-skill': 'cp2',
    '4-system': 'cp3',
    '5-autonomy': 'cp4'
  };

  // Existing-buyer backfill lane: Claude hands buyers a map link carrying their
  // read-only pass in the URL FRAGMENT (#vt=…) — a fragment never reaches server
  // or Pages access logs. Bank it, then scrub the URL so the token doesn't sit
  // in the address bar / history / a copied link.
  try {
    var vtMatch = /(?:^#|[#&])vt=([A-Za-z0-9_\-]+)/.exec(window.location.hash || '');
    if (vtMatch && vtMatch[1].indexOf('aiebview_v1_') === 0) {
      localStorage.setItem(VIEW_TOKEN_KEY, vtMatch[1]);
      history.replaceState({}, '', window.location.pathname + window.location.search);
    }
  } catch (e) {}

  function viewToken() {
    try { return localStorage.getItem(VIEW_TOKEN_KEY) || ''; } catch (e) { return ''; }
  }

  // Fetch the server ladder and fold any completed checkpoints into local state.
  // Resolves to true when something actually changed, so callers can re-render.
  function syncFromServer() {
    var token = viewToken();
    if (!token || typeof fetch !== 'function') return Promise.resolve(false);
    return fetch(PROGRESS_URL, {
      method: 'POST',                    // keeps the token out of URLs + infra logs
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ token: token }),
      cache: 'no-store',
      credentials: 'omit',
      referrerPolicy: 'no-referrer'
    })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (payload) {
        if (!payload || !payload.ok || !payload.ladder) return false;
        var changed = false;
        payload.ladder.forEach(function (cp) {
          var id = LADDER_TO_SPINE[cp && cp.id];
          if (!id || cp.status !== 'completed' || isDone(id)) return;
          markDone(id);
          changed = true;
        });
        return changed;
      })
      .catch(function () { return false; });   // silent by design — see rule 3
  }

  // Fire-and-forget on load: refine the already-painted page, then tell it to
  // repaint only if the server knew something the browser didn't.
  function autoSync() {
    syncFromServer().then(function (changed) {
      if (!changed) return;
      try {
        window.dispatchEvent(new CustomEvent('aieb:progress-synced'));
      } catch (e) {}
    });
  }

  window.AIEB = {
    SPINE: SPINE, CHAIN: CHAIN, BUILD: BUILD, META: META, SURFACES: SURFACES,
    read: read, isDone: isDone, markDone: markDone, reset: reset,
    getSurface: getSurface, setSurface: setSurface, surfaceShows: surfaceShows,
    activeId: activeId, stateOf: stateOf, next: next, buildIndex: buildIndex,
    stepInfo: stepInfo, resume: resume, started: started, overall: overall,
    syncFromServer: syncFromServer, hasViewToken: function () { return !!viewToken(); }
  };

  autoSync();
})();

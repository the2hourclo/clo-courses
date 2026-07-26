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

   The spine (fixed order): setup → cp1 → cp2 → cp3 → cp4 → goal (goal = the AI Employee
   checkpoint: schedule / autonomy / runs on its own). All six gate.
   Finishing one marks it done, which unlocks the next. Hand-holding rule:
   the "active" node is always the first not-yet-done step — that's the ONE
   thing we surface; everything after it stays out of the way until reached.
   ============================================================ */
(function () {
  'use strict';

  /* ── CANONICAL HOST REDIRECT + STATE MIGRATION (2026-07-25) ──────────────
     The course moved from GitHub Pages to course.chiefleverageofficers.com so
     it shares a registrable domain with the API and can hold a first-party
     session. Both hosts still serve, and that is the danger: localStorage is
     per-ORIGIN, so a buyer with progress on github.io who lands on the new host
     would see an empty board. One canonical origin or none.

     THE REDIRECT ALONE IS NOT ENOUGH, and shipping it alone was a bug. Crossing
     origins abandons everything the old origin held: aieb_progress, the surface,
     every aieb_ckpt_* position, and aieb_view_token_v1. Losing the view token is
     the worst of it — without it syncFromServer returns early, so the buyer
     cannot even fall back to the server-confirmed ladder. They arrive at 0%,
     every column locked, with no self-service way back.

     So we carry the state across in the URL FRAGMENT, the same lane the #vt=
     token already uses: a fragment never reaches the server, Pages access logs,
     or a Referer header. On arrival we restore only keys this origin does not
     already have — a later visit must never clobber fresher local state — then
     scrub the URL.

     Path note: Pages served under /clo-courses (the repo name); Vercel serves
     the repo root, so that prefix is dropped.
     ──────────────────────────────────────────────────────────────────────── */
  var MIGRATION_PREFIX = 'aieb_';

  function b64urlEncode(text) {
    return btoa(unescape(encodeURIComponent(text)))
      .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  function b64urlDecode(text) {
    var s = String(text).replace(/-/g, '+').replace(/_/g, '/');
    while (s.length % 4) s += '=';
    return decodeURIComponent(escape(atob(s)));
  }

  // ARRIVAL SIDE — runs first, so restored state is in place before anything
  // below reads it. Never overwrites: whatever this origin already holds is by
  // definition more recent than a bookmark pointing at the retired host.
  try {
    var incoming = /(?:^#|[#&])m=([A-Za-z0-9_\-]+)/.exec(window.location.hash || '');
    if (incoming) {
      var carried = JSON.parse(b64urlDecode(incoming[1]));
      for (var ck in carried) {
        if (ck.indexOf(MIGRATION_PREFIX) !== 0) continue;   // never import a foreign key
        var mine = localStorage.getItem(ck);
        if (mine === null) { localStorage.setItem(ck, carried[ck]); continue; }

        /* MERGE, don't skip. This used to be a bare "only set it if this origin
           has nothing", which is key-granular and therefore lost real work: the
           board's five-flag map lives under ONE key, so a single folded ladder
           rung created `aieb_progress` here and the carried map — potentially
           four finished checkpoints — was discarded whole. Same for step
           positions: arriving at step 1 on the new host outranked step 6 carried
           from the old one.

           Both merges are UNION/MAX and never destructive, which is the only
           safe direction when two origins each hold partial truth. */
        /* LITERALS, not the STORE / STEP_PREFIX constants. This block runs at the
           very top of the file and those are `var`s assigned ~100 lines below, so
           hoisting makes them `undefined` right here — `ck === STORE` would be
           `ck === undefined` (never true) and `indexOf(undefined)` would search
           for the string "undefined" (never 0). Both merges would silently never
           fire, which is precisely the bug this code exists to fix. Keep these in
           step with the declarations below if either name's value changes. */
        if (ck === 'aieb_progress') {
          try {
            var theirs = JSON.parse(carried[ck]) || {}, ours = JSON.parse(mine) || {}, merged = {}, mk;
            for (mk in theirs) if (theirs[mk]) merged[mk] = true;
            for (mk in ours) if (ours[mk]) merged[mk] = true;
            localStorage.setItem(ck, JSON.stringify(merged));
          } catch (e2) {}
        } else if (ck.indexOf('aieb_ckpt_') === 0) {
          var t = parseInt(carried[ck], 10), o = parseInt(mine, 10);
          if (!isNaN(t) && (isNaN(o) || t > o)) localStorage.setItem(ck, String(t));
        }
      }
      // Scrub, but keep any OTHER fragment params (#vt= rides the same hash and
      // is absorbed further down — dropping it here would undo that lane).
      var keptHash = (window.location.hash || '')
        .replace(/(^#|&)m=[A-Za-z0-9_\-]+/, '$1').replace(/^#&/, '#').replace(/^#$/, '');
      history.replaceState({}, '', window.location.pathname + window.location.search + keptHash);
    }
  } catch (e) {}

  // DEPARTURE SIDE — pack this origin's state into the fragment and hand off.
  // Deliberately NOT wrapped in an early `return` on failure: if the redirect
  // is blocked or throws, falling through leaves the old host working exactly
  // as it did before, rather than a dead page with no window.AIEB.
  try {
    if (window.location.hostname === 'the2hourclo.github.io') {
      var carry = {};
      for (var i = 0; i < localStorage.length; i++) {
        var lk = localStorage.key(i);
        if (lk && lk.indexOf(MIGRATION_PREFIX) === 0) carry[lk] = localStorage.getItem(lk);
      }
      var path = window.location.pathname.replace(/^\/clo-courses/, '');
      var hash = window.location.hash || '';
      var payload = Object.keys(carry).length ? b64urlEncode(JSON.stringify(carry)) : '';
      if (payload) hash = (hash ? hash + '&' : '#') + 'm=' + payload;
      window.location.replace(
        'https://course.chiefleverageofficers.com' + path + window.location.search + hash
      );
      return;
    }
  } catch (e) {}

  // 2026-07-24: `goal` was a trophy column with no steps. Autonomy (schedule / runs on its
  // own) moved OUT of cp4 and INTO it, so it is now a REAL checkpoint with its own wizard —
  // the fifth and last. cp4 keeps hardening only. Order and ids are otherwise unchanged.
  var SPINE = ['setup', 'cp1', 'cp2', 'cp3', 'cp4', 'goal'];
  var CHAIN = ['setup', 'cp1', 'cp2', 'cp3', 'cp4', 'goal']; // every gating step — goal now gates too
  var BUILD = ['cp1', 'cp2', 'cp3', 'cp4', 'goal'];          // the five build checkpoints ("Checkpoint N of 5")

  var META = {
    setup: { name: 'Get set up',         short: 'Set up',             wizard: 'get-access-aieb.html',        color: '#4ade80' },
    cp1:   { name: 'Map the business',   short: 'Map the business',   wizard: 'checkpoint-map.html',         color: '#5b9bff' },
    cp2:   { name: 'Your first skill',   short: 'Your first skill',   wizard: 'checkpoint-first-skill.html', color: '#a78bfa' },
    cp3:   { name: 'A skill system',     short: 'A skill system',     wizard: 'checkpoint-system.html',      color: '#f5a623' },
    cp4:   { name: 'Make it reliable',   short: 'Make it reliable',   wizard: 'checkpoint-autonomy.html',    color: '#f472b6' },
    goal:  { name: 'Your AI Employee',   short: 'Your AI Employee',   wizard: 'checkpoint-ai-employee.html', color: '#fbbf24' }
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

  // The suffix each wizard ACTUALLY writes, verified against its own STORE line:
  //   cp1  checkpoint-map.html         _v6
  //   cp2  checkpoint-first-skill.html _v5
  //   cp3  checkpoint-system.html      _v4
  //   cp4  checkpoint-autonomy.html    _v5
  //   goal checkpoint-ai-employee.html _v6
  // `setup` (get-access-aieb.html) keeps no step position at all.
  //
  // Restoring a position MUST use this map, not STEP_SUFFIXES[0]. Writing every
  // checkpoint to _v6 puts cp2/cp3/cp4 under a key their wizard never reads, so
  // the wizard reopens at step 1 — and because readStepKey probes _v6 FIRST, the
  // orphan then permanently shadows the real key: the buyer advances, the board
  // stays frozen at the restored number, and snapshot() pushes that stale value
  // back over the truth on the next write. Writing to every suffix has the same
  // shadowing failure. One key per checkpoint, the one its wizard owns.
  var STEP_WRITE_SUFFIX = { cp1: '_v6', cp2: '_v5', cp3: '_v4', cp4: '_v5', goal: '_v6' };

  /* Read a per-checkpoint step key. Reads the OWNED suffix first, then treats any
     older generation as a ONE-SHOT MIGRATION: take its value, write it under the
     owned key, delete the old one.

     Before this, reads probed _v6 → _v5 → _v4 newest-first while writes were
     pinned to STEP_WRITE_SUFFIX. So a laptop still holding `cp2_v4 = 6` from
     before the wizard bumped, with no `_v5` yet, reported pos 6 forever: the
     server's real 3 was refused by applySnapshot as "older", localHasMoreThan
     then pushed the stale 6 back up, and the buyer's other device jumped four
     steps it had never seen. Migrating on read collapses the generations to one
     key, so the value can never be read again from a suffix nothing writes. */
  function readStepKey(id, tail) {
    var suffix = tail || '';
    var owned = STEP_WRITE_SUFFIX[id];
    try {
      if (owned) {
        var mineRaw = localStorage.getItem(STEP_PREFIX + id + owned + suffix);
        if (mineRaw !== null) { var mineN = parseInt(mineRaw, 10); if (!isNaN(mineN)) return mineN; }
      }
      for (var i = 0; i < STEP_SUFFIXES.length; i++) {
        if (STEP_SUFFIXES[i] === owned) continue;
        var key = STEP_PREFIX + id + STEP_SUFFIXES[i] + suffix;
        var raw = localStorage.getItem(key);
        if (raw === null) continue;
        var n = parseInt(raw, 10);
        localStorage.removeItem(key);                       // one-shot: never read twice
        if (isNaN(n)) continue;
        if (owned) localStorage.setItem(STEP_PREFIX + id + owned + suffix, String(n));
        return n;
      }
    } catch (e) {}
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
    if (!META[id]) return;
    var o = read();
    if (o[id] === true) return;          // idempotent
    o[id] = true; write(o);
  }
  function reset() { write({}); }        // dev helper: wipe checkpoint progress

  // The active node = the first gating step that isn't done. Everything done → 'goal',
  // which by then is itself done, so stateOf('goal') reads 'done' and overall() completes.
  function activeId() {
    for (var i = 0; i < CHAIN.length; i++) {
      if (!isDone(CHAIN[i])) return CHAIN[i];
    }
    return 'goal';
  }

  // done | active | locked. `goal` is an ordinary checkpoint now — it earns 'done' by
  // being completed, not by cp4 finishing.
  function stateOf(id) {
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
  // Counts the 6 gating steps (setup + cp1..cp4 + goal). 100% = the AI Employee is built.
  function overall() {
    var done = 0;
    for (var i = 0; i < CHAIN.length; i++) { if (isDone(CHAIN[i])) done++; }
    var a = activeId();
    return {
      done: done, total: CHAIN.length,
      pct: Math.round(done / CHAIN.length * 100),
      complete: isDone('goal'),
      nextId: a, nextName: (META[a] || META.goal).name, nextColor: (META[a] || META.goal).color
    };
  }

  // Has the buyer done anything at all? (chosen a surface, finished a step, or stepped into one)
  // Checks EVERY checkpoint's step position, not just cp1's. This decides the
  // `local` fallback, so under-counting here walls a real buyer out of a working
  // board on any auth blip: someone mid-way through checkpoint 2, having never
  // opened checkpoint 1's wizard, read as "never started".
  function started() {
    if (getSurface()) return true;
    var o = read();
    for (var k in o) { if (o[k]) return true; }
    for (var i = 0; i < CHAIN.length; i++) {
      if (stepInfo(CHAIN[i]).pos > 0) return true;
    }
    return false;
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
  // Same registrable domain as the page (course.chiefleverageofficers.com) as of
  // 2026-07-25. That is the whole point of the move: a cookie this host sets is
  // FIRST-PARTY, so it survives WebKit's 7-day purge of script-writable storage.
  // The old aieb-gated-mcp.vercel.app origin still answers and stays valid for
  // any page still served from github.io.
  var PROGRESS_URL = 'https://api.chiefleverageofficers.com/progress';
  // Dev/test hook only: lets a local smoke test point the sync at a local server.
  // Buyers never have this key set; the default above is the production truth.
  try { PROGRESS_URL = localStorage.getItem('aieb_progress_url_dev') || PROGRESS_URL; } catch (e) {}
  // Server ladder keys → this page's spine ids. Keep both ends in step if either moves.
  //
  // ⚠ 2026-07-24 — the two ends are NO LONGER 1:1. The client split the old cp4 into
  // cp4 "Make it reliable" (harden + harness) and goal "Your AI Employee" (schedule +
  // runs on its own). The server ladder still has FIVE rungs and no rung for reliability.
  // '5-autonomy' means "it runs on its own", which is now GOAL's gate, so it maps there —
  // mapping it to cp4 would mark the hardening checkpoint done and leave the buyer stuck
  // at 83% with the checkpoint they just finished still showing as next.
  // cp4 is client-only until the server ladder gains a reliability rung; IMPLIES below
  // covers it, since you cannot reach autonomy without passing through reliability.
  var LADDER_TO_SPINE = {
    '1-onboard': 'setup',
    '2-map': 'cp1',
    '3-first-skill': 'cp2',
    '4-system': 'cp3',
    '5-autonomy': 'goal'
  };

  // Spine ids a synced checkpoint implies are ALSO done. The ladder is ordered, so a
  // server-confirmed rung vouches for the client-only checkpoints that precede it.
  var IMPLIES = { goal: ['cp4'] };

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

  // Fold a server ladder (what the buyer demonstrably BUILT, reported by Claude)
  // into local state. Shared by both lanes that can deliver one: the view-token
  // sync below, and the signed-in session, which resolves the ladder through the
  // email -> member_ref link. Additive only — a rung the server confirms is
  // marked done, and nothing is ever un-marked.
  function foldLadder(ladder) {
    if (!ladder || !ladder.forEach) return false;
    var changed = false;
    ladder.forEach(function (cp) {
      var id = LADDER_TO_SPINE[cp && cp.id];
      if (!id || cp.status !== 'completed') return;
      // mark the mapped checkpoint AND anything it implies (see IMPLIES)
      var ids = [id].concat(IMPLIES[id] || []);
      ids.forEach(function (sid) {
        if (isDone(sid)) return;
        markDone(sid);
        changed = true;
      });
    });
    return changed;
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
        return foldLadder(payload.ladder);
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

  // Session sync runs alongside the view-token sync above, not instead of it.
  // They answer different questions — this one "whose board is this", that one
  // "what did they actually build" — and either can be absent without the other
  // failing. Both only ever refine an already-painted page.
  function autoSyncSession() {
    return syncCourseProgress().then(function () {
      // Always announce: the board needs to repaint even when nothing changed,
      // because signed-in vs signed-out decides whether it may draw a ladder at
      // all, and it starts out assuming it may not.
      announce();
      return sessionState;
    });
  }

  /* ── SIGNED-IN SESSION (2026-07-25) ──────────────────────────────────────
     Everything above this point is per-BROWSER. That was the bug: WebKit wipes
     localStorage after 7 days of Safari use without interaction on the site, so
     a buyer who took a fortnight off lost their board on the device they never
     left. Signing in with Google moves the durable copy to the server, keyed to
     the person rather than the browser, and the first-party session cookie is
     the one storage class that purge exempts.

     Local storage stays the FAST copy — the board still paints instantly from
     it, offline and signed-out included. The server is the DURABLE copy. Where
     they disagree the merge below is generous, never destructive.
     ──────────────────────────────────────────────────────────────────────── */
  /* SAME-ORIGIN ON PURPOSE. These are proxy rewrites in the course project's
     vercel.json, forwarded to api.chiefleverageofficers.com server-side.

     Calling api. directly would have worked, but WebKit caps cookies from a
     CNAME-cloaked subresource to 7 days: api. is a CNAME to cname.vercel-dns
     .com, a different registrable domain, which is exactly the shape ITP's
     CNAME Cloaking Defense targets. The cap is invisible for a week and would
     have quietly reinstated the very bug this feature exists to fix.

     Proxying through the page's own origin means the Set-Cookie arrives from
     the document host itself rather than a cloaked third party. It also drops
     CORS and preflights entirely — same-origin needs neither. */
  var AUTH_URL = '/auth/google';
  var COURSE_PROGRESS_URL = '/course-progress';
  try {
    var devApi = localStorage.getItem('aieb_api_base_dev');
    if (devApi) { AUTH_URL = devApi + '/auth/google'; COURSE_PROGRESS_URL = devApi + '/course-progress'; }
  } catch (e) {}

  var signedIn = false;
  function isSignedIn() { return signedIn; }

  // null = unknown / not signed in. true = this Google address matched a Lemon
  // Squeezy purchase. false = signed in, but we could not match them, so we know
  // nothing about what they built and must not imply otherwise.
  var courseLinked = null;
  function isLinked() { return courseLinked; }

  /* SESSION STATE IS THREE-VALUED, and collapsing it to a boolean was a bug.
     'in'      — the server affirmatively said signed_in
     'out'     — the server affirmatively said NOT signed in
     'unknown' — we could not ask: offline, blocked by a shield or ad-blocker,
                 5xx, DNS failure, database not reachable

     Only 'out' may hide the board. 'unknown' must fall back to whatever local
     storage holds, because this is a public page with nothing secret behind it —
     gating it on an auth service being reachable turns any blip into a buyer
     staring at a sign-in wall with their progress sitting intact one layer down. */
  var sessionState = 'unknown';
  function getSessionState() { return sessionState; }

  // The whole board state in one object — completed checkpoints, per-wizard step
  // positions, chosen surface. Deliberately mirrors what localStorage already
  // holds so the server never becomes a second, differently-shaped truth.
  function snapshot() {
    var steps = {};
    for (var i = 0; i < CHAIN.length; i++) {
      var id = CHAIN[i], info = stepInfo(id);
      if (info.pos || info.total) steps[id] = { pos: info.pos, total: info.total };
    }
    return { progress: read(), surface: getSurface(), steps: steps };
  }

  // Fold a server snapshot into this browser. Rules, in order of importance:
  //   1. A completed checkpoint NEVER becomes uncompleted. Completions are
  //      unioned, so a device that has been offline cannot un-finish work done
  //      elsewhere. This is what makes last-write-wins safe on the server.
  //   2. Step positions take the furthest of the two — being sent backwards
  //      through a wizard you already finished is worse than skipping ahead.
  //   3. A surface already chosen here wins; the server only fills a blank.
  function applySnapshot(remote) {
    if (!remote || typeof remote !== 'object') return false;
    var changed = false;

    var mine = read(), theirs = remote.progress || {};
    for (var id in theirs) {
      if (theirs[id] && !mine[id]) { mine[id] = true; changed = true; }
    }
    if (changed) write(mine);

    if (!getSurface() && remote.surface) { setSurface(remote.surface); changed = true; }

    var steps = remote.steps || {};
    for (var sid in steps) {
      var suffix = STEP_WRITE_SUFFIX[sid];
      if (!suffix) continue;                     // setup keeps no position
      var incoming = steps[sid] || {}, local = stepInfo(sid);
      if ((incoming.pos || 0) > local.pos) {
        try {
          localStorage.setItem(STEP_PREFIX + sid + suffix, String(incoming.pos));
          if (incoming.total) localStorage.setItem(STEP_PREFIX + sid + suffix + '_n', String(incoming.total));
          changed = true;
        } catch (e) {}
      }
    }
    return changed;
  }

  function announce() {
    try { window.dispatchEvent(new CustomEvent('aieb:progress-synced')); } catch (e) {}
  }

  // Push the current board state up. Debounced because markDone can fire
  // several times in a row as a wizard finishes.
  var pushTimer = null;
  function pushCourseProgress() {
    if (!signedIn || typeof fetch !== 'function') return;
    if (pushTimer) clearTimeout(pushTimer);
    pushTimer = setTimeout(function () {
      pushTimer = null;
      // Re-check at FIRE time, not just at schedule time. Sign out lands inside
      // the 400 ms window easily — the surface toggle and the Sign out link are
      // adjacent in the header — and this POST would then write an empty
      // snapshot over the row the DELETE was about to revoke, last-write-wins.
      if (!signedIn) return;
      fetch(COURSE_PROGRESS_URL, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ state: snapshot() }),
        credentials: 'include',
        cache: 'no-store',
        referrerPolicy: 'no-referrer'
      }).catch(function () {});   // silent: local state is already correct
    }, 400);
  }

  // Ask the server who we are and what it holds. Resolves to true when signed
  // in, so the board can decide between the ladder and the sign-in prompt.
  // Does this browser hold anything the remote snapshot lacks? Seeding only when
  // the server row is EMPTY was wrong: the row is created on the first device to
  // sign in, so a second device's local-only work was never uploaded — the exact
  // loss this feature exists to prevent.
  function localHasMoreThan(remote) {
    var mine = read(), theirs = (remote && remote.progress) || {};
    for (var id in mine) { if (mine[id] && !theirs[id]) return true; }
    if (getSurface() && !(remote && remote.surface)) return true;
    var remoteSteps = (remote && remote.steps) || {};
    for (var i = 0; i < CHAIN.length; i++) {
      var sid = CHAIN[i];
      if (stepInfo(sid).pos > ((remoteSteps[sid] || {}).pos || 0)) return true;
    }
    return false;
  }

  function syncCourseProgress() {
    if (typeof fetch !== 'function') { sessionState = 'unknown'; return Promise.resolve(sessionState); }
    return fetch(COURSE_PROGRESS_URL, {
      method: 'GET',
      credentials: 'include',
      cache: 'no-store',
      referrerPolicy: 'no-referrer'
    })
      .then(function (r) {
        // A 5xx is "we could not ask", not "you are signed out". Only a clean
        // 200 carries an answer either way.
        if (!r.ok) return null;
        return r.json();
      })
      .then(function (payload) {
        if (!payload || !payload.ok) { sessionState = 'unknown'; signedIn = false; return sessionState; }
        signedIn = !!payload.signed_in;
        sessionState = signedIn ? 'in' : 'out';
        if (!signedIn) { courseLinked = null; return sessionState; }
        // Whether the server could match this Google address to a purchase. It
        // has always been sent and never read, which is how a buyer signing in
        // with a personal address instead of their purchase address got an empty
        // board and a confident "Start here · step 1" — a claim about their
        // progress made from an account we could not identify.
        courseLinked = payload.linked === true;
        var changed = applySnapshot(payload.state);
        // The signed-in lane can also carry the VERIFIED ladder, resolved
        // server-side from this account's email to their member record. That
        // makes the board work on a device that never held a view token —
        // previously the only way to see what was actually built.
        if (foldLadder(payload.ladder)) changed = true;
        // Upload whenever this browser holds something the account does not —
        // on a fresh row AND on a second device joining an existing one.
        if (localHasMoreThan(payload.state)) pushCourseProgress();
        if (changed) announce();
        return sessionState;
      })
      .catch(function () { sessionState = 'unknown'; signedIn = false; return sessionState; });
  }

  /* WIPE LOCAL STATE. Called when a session ends or when a DIFFERENT account
     signs in on this browser. Both matter, and omitting either is a real leak:
     applySnapshot merges the signed-in person's server state INTO localStorage,
     so after A signs out their board is still sitting there. If B then signs in
     and the seed fires, A's progress is written into B's account — durably, on
     every device B owns, with no way for B to undo it. */
  function clearLocalState() {
    try {
      var doomed = [];
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        if (k && k.indexOf('aieb_') === 0) doomed.push(k);
      }
      for (var j = 0; j < doomed.length; j++) localStorage.removeItem(doomed[j]);
    } catch (e) {}
  }
  /* THE VIEW TOKEN GOES TOO, and exempting it was a hole. The reasoning for
     keeping it was that it is a per-BUYER credential from device activation
     rather than part of the signed-in session — true, and exactly why it must
     not outlive a sign-out on a shared machine. It names whoever ACTIVATED THIS
     BROWSER, so leaving it behind let the next person's first load fold the
     previous buyer's build ladder into their own state, and the markDone wrapper
     then pushed those rungs into the new account's server row. Nothing ever
     un-marks, so the victim could not undo it on any device.

     Cost of wiping it: a buyer who signs out and never signs back in stops
     seeing their verified ladder until they re-activate. That is the correct
     reading of "sign out" — and a signed-IN buyer does not need the token at
     all, because the session lane resolves the same ladder server-side. */

  var ACCOUNT_HINT_KEY = 'aieb_account_hint';

  // Read the address out of an ID token for COMPARISON AND DISPLAY ONLY. This is
  // the unverified client-side copy and it decides nothing about access — the
  // server verifies the same token independently before trusting a byte of it.
  function accountFromCredential(credential) {
    try {
      var body = String(credential).split('.')[1];
      var json = decodeURIComponent(escape(atob(body.replace(/-/g, '+').replace(/_/g, '/'))));
      return String(JSON.parse(json).email || '').trim().toLowerCase();
    } catch (e) { return ''; }
  }

  // Hand Google's ID token to our server, which verifies it and sets the
  // first-party cookie. Resolves true on success.
  function signInWithGoogle(credential) {
    if (!credential || typeof fetch !== 'function') return Promise.resolve(false);

    // Account switch on a shared browser: drop the previous person's board
    // BEFORE any merge or upload can carry it into the new account.
    var account = accountFromCredential(credential);
    try {
      var previous = localStorage.getItem(ACCOUNT_HINT_KEY);
      if (account && previous && previous !== account) clearLocalState();
      if (account) localStorage.setItem(ACCOUNT_HINT_KEY, account);
    } catch (e) {}

    return fetch(AUTH_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ credential: credential }),
      credentials: 'include',
      cache: 'no-store',
      referrerPolicy: 'no-referrer'
    })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (payload) {
        if (!payload || !payload.ok) return false;
        signedIn = true;
        // Pull down anything this person already had elsewhere, then repaint —
        // signing in on a new laptop should fill the board in, not blank it.
        return syncCourseProgress().then(function () { announce(); return true; });
      })
      .catch(function () { return false; });
  }

  function signOut() {
    // Clear locally FIRST and unconditionally. If the DELETE fails (offline, API
    // down) the person still expects their board gone from this browser — and a
    // shared machine is exactly where "sign out didn't really sign me out" does
    // damage. The server row is revoked on a best-effort basis after.
    // Kill any debounced push before it can fire against the row we are about
    // to revoke. `signedIn = false` below makes the callback a no-op too; both,
    // because this one is cheap and the failure is silent data loss.
    if (pushTimer) { clearTimeout(pushTimer); pushTimer = null; }
    clearLocalState();
    signedIn = false;
    courseLinked = null;
    sessionState = 'out';
    if (typeof fetch !== 'function') { announce(); return Promise.resolve(); }
    return fetch(AUTH_URL, {
      method: 'DELETE', credentials: 'include', cache: 'no-store', referrerPolicy: 'no-referrer'
    })
      .catch(function () {})
      .then(function () { announce(); });
  }

  // Every local mutation mirrors upward. Wrapping rather than editing the
  // originals keeps the offline/signed-out path byte-identical to before.
  var markDoneLocal = markDone, setSurfaceLocal = setSurface;
  markDone = function (id) { markDoneLocal(id); pushCourseProgress(); };
  setSurface = function (s) { setSurfaceLocal(s); pushCourseProgress(); };

  window.AIEB = {
    SPINE: SPINE, CHAIN: CHAIN, BUILD: BUILD, META: META, SURFACES: SURFACES,
    isSignedIn: isSignedIn, sessionState: getSessionState, linked: isLinked, account: function () {
      try { return localStorage.getItem(ACCOUNT_HINT_KEY) || ''; } catch (e) { return ''; }
    },
    signInWithGoogle: signInWithGoogle, signOut: signOut,
    syncCourseProgress: syncCourseProgress, pushCourseProgress: pushCourseProgress,
    read: read, isDone: isDone, markDone: markDone, reset: reset,
    getSurface: getSurface, setSurface: setSurface, surfaceShows: surfaceShows,
    activeId: activeId, stateOf: stateOf, next: next, buildIndex: buildIndex,
    stepInfo: stepInfo, resume: resume, started: started, overall: overall,
    syncFromServer: syncFromServer, hasViewToken: function () { return !!viewToken(); }
  };

  /* THE TWO LANES ARE ORDERED, NOT PARALLEL. The session lane answers "whose
     board is this"; only once it has answered may the view-token lane fold a
     ladder, because that token names the buyer who ACTIVATED THIS BROWSER, not
     the person signed in right now. Fired concurrently, the token lane could
     resolve first and brand its ladder onto whoever was signed in — and the
     markDone wrapper would push those rungs into their server row permanently.

     A signed-in person never needs this lane: syncCourseProgress already
     carries their verified ladder, resolved server-side through the email ->
     member_ref link. So it is strictly the signed-OUT fallback now. */
  autoSyncSession().then(function () {
    if (!signedIn) autoSync();
  });
})();

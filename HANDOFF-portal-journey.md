# CLO Portal — Customer Journey Handoff

**Date:** 2026-07-22 · **Repo:** `product/courses/clo-courses/` (nested git repo — commit inside it) · **Working folder:** `clo-course/`

---

## What this is

The **AI Employee Builder (AIEB) buyer portal** — a board-first, wizard-driven journey that takes a buyer from install → mapping their business → building skills → an autonomous AI Employee. Guiding principle: **maximize building, not learning.** The board + step-by-step wizards are the product; the written courses are reference.

## The intended journey (the spine)

```
Home (index.html)
  → Get Access wizard (get-access-aieb.html)      ← install + connect + onboard; full-focus, NO sidebar
    → Build Board (ai-employee-board.html)          ← THE HUB. one column per checkpoint.
      → CP1  Map the business   (checkpoint-map.html)          = the Business X-Ray
      → CP2  Your first skill   (checkpoint-first-skill.html)
      → CP3  A skill system     (checkpoint-system.html)
      → CP4  Make it run itself (checkpoint-autonomy.html)
      → 🌟  Your AI Employee    (goal — outcome column, no wizard)
```

The **board is the hub**; each **checkpoint is a wizard**. Finish a checkpoint → back to the board → the next unlocks. No skipping ahead.

## Key files

| File | Role |
|---|---|
| `index.html` | Portal home. Board-first body. `<body data-product="aieb">` forces the AIEB nav. |
| `get-access-aieb.html` | Install wizard. **Full-focus, NO sidebar** (permanent `wiz-focus` + a `body[data-page="get-access"]` CSS guard). Two tracks: Cowork / Claude Code. Finish banners (`#cwfinish`, `#finish`) both carry **"🔬 Start the Business X-Ray →" → `checkpoint-map.html`**. |
| `ai-employee-board.html` | The hub. `BOARD` array = columns + cards; `WIZARDS` map = each checkpoint's page. **Progress/state is STUBBED** (all "just-onboarded"). |
| `checkpoint-map.html` | CP1 (Business X-Ray). Also the **reusable checkpoint template** — CONFIG-driven (`var CONFIG = { id, name, color, board, steps:[...] }`). Steps have type `video`/`build`/`share`/`gate`. |
| `checkpoint-first-skill.html` · `checkpoint-system.html` · `checkpoint-autonomy.html` | CP2 / CP3 / CP4. Built from the template; steps mirror the board's cards. Video slots are empty ("🎬 Video coming soon") — EXCEPT where a step carries `slides:[...]` (see `slides.js`). |
| `slides.js` | **NEW (2026-07-24).** Swipeable slide viewer that fills a wizard step's video slot until the video is recorded. Give a step `slides: canvas('<canvas-dir>', ['01-…','02-…'])` (PNGs under `meta-create-skill/canvases/<dir>/slides/`) and the wizard renders a swipe / arrow-key / tap-to-enlarge deck instead of the "coming soon" slot. A real `video:` URL always wins over `slides:` — recording a video needs no cleanup. Wired: CP2 step 1 (v1-what-is-a-skill) + step 2 (v2-types-of-skills). |
| `nav.js` | Sidebar + product config for **two products** (`aieb`, `clo`). Consumed by `shell.js`. |
| `shell.js` | Portal shell (header, sidebar, ⌘K search). Product = `?product=` OR `<body data-product>`, default `clo`. Propagates `?product=` onto local links. |
| `progress.js` | **NEW (2026-07-22).** The journey's client-side progress store — the single source of truth for "which checkpoints are done" and "where do I continue". Exposes `window.AIEB` (`SPINE`, `META`, `isDone`, `markDone`, `activeId`, `stateOf`, `next`, `stepInfo`, `resume`, `started`). Loaded by the board, all 4 checkpoints, and home. Swap its localStorage read for a server fetch later. |

## Done this session (2026-07-22)

- Wizard finish → X-Ray checkpoint button on **both** tracks.
- Built **CP2/CP3/CP4** (were 404s from the board). Steps match the board cards.
- Home is **board-first**; Claude Code 101 + courses **archived to a "Reference" group** (sidebar + body). CC101's 8 links collapsed to the all-in-one page (every lesson still in ⌘K search via `CLO_LESSON_INDEX`).
- Wizard = **no sidebar** (full-focus).
- CP1 gained a **"Read & share your X-Ray"** step (Descript video + export-PDF-to-Polynet).
- `index.html` now loads the AIEB nav (`data-product="aieb"`).
- **0 broken internal links** (static audit across html + js).

## localStorage keys (the progress substrate)

- `aieb_surface` = `'cowork'` | `'claude-code'` — set by the wizard (`applyTrack`), read by the board + every checkpoint to swap surface-specific steps.
- `aieb_ckpt_<id>_v4` = current step index **within** a checkpoint. Resume within a checkpoint works.
- `aieb_ckpt_<id>_v4_n` = **NEW.** active-step COUNT for that checkpoint (written by each wizard's `save()`). The board reads it to live-fill the active column's cards (done/doing/todo) as you move through the wizard.
- `aieb_progress` = **NEW.** `{ setup:true, cp1:true, cp2:false, … }` — the cross-checkpoint "which checkpoints are complete" store. Owned by `progress.js`. A checkpoint marks itself done when you reach its completion screen; that unlocks the next. `setup` defaults to done (buying + installing precede the board).
- `TRACKKEY` (`aieb_track`) + various `aieb_*` done-sets = wizard step completion.

---

## SHIPPED 2026-07-22 (this session) — the three OPEN items are done

### 1. Click-through link + journey audit (Playwright) ✅
Walked home → board → wizard → all 4 checkpoints → completion. **No 404s, no broken internal links.** Nav + content links carry `?product=aieb`. The only console noise is third-party Descript-embed CSP errors (reddit/gtm/clarity/openai pixels) — harmless, ignore. The one real problem found (every completion screen dead-ended at "Back to board", and the board stub kept CP2–4 locked forever) is fixed by #2 + #3.

### 2. The journey is continuous (congratulate → continue forward) ✅
Every checkpoint's completion screen now **keeps the 🎉 and continues FORWARD**: a prominent primary **"Next: &lt;next checkpoint&gt; →"** (painted in the next checkpoint's colour) + a quiet secondary "or go to your board". CP4 shows a finale ("Your AI Employee is built… → See it on your board"). Wizard finish → CP1 still verified. (Owner's ask, reconfirmed mid-session: *"I don't want it to head back to board, I want it to continue to the next phase… it should congratulate them."*)

### 3. Progress tracking + resume — client-side, LIVE ✅
- `progress.js` holds `aieb_progress = { cp1:true, … }`. A checkpoint **marks itself done on its completion screen** (`AIEB.markDone(CONFIG.id)`), which flips the next column locked → active.
- **The board reads it** and renders real `done` / `active` / `locked` (the STUB is gone) — plus a **live card fill** on the active column driven by the wizard's saved step (`_v4` / `_v4_n`).
- A **"Continue where you left off →"** card on **both home and board** jumps to the active checkpoint's wizard, which resumes at the saved step. When all four are done it becomes a "You've built your AI Employee 🎉" banner.
- The board's old STUB comment (future server endpoint `GET …/api/progress?key=<license>`) is preserved as the documented **v2 upgrade path** — swap the localStorage read inside `progress.js` for that fetch when the server is ready.

---

## Gotchas — READ before testing

- **Serve from the right root.** The shell uses parent-relative paths (`../clo-course/...`, `../meta-create-skill/...`, `clo-community/assets/...`). Serving from **`clo-course/`** 404s the logo + cross-dir links. Serve from the **`clo-courses/` repo root** — `python -m http.server` in `product/courses/clo-courses/`, then open `/clo-course/index.html?product=aieb` — or the real deploy root.
- **Browser caches `nav.js` / `shell.js`.** After editing them, hard-refresh (Ctrl+Shift+R) or serve on a fresh port, or you'll see stale nav.
- **Playwright here:** `file://` is blocked (use the local http server). If the browser lock sticks ("Browser is already in use"), kill the stale `mcp-chrome` profile process. `favicon.ico` 404 + Descript-embed CSP errors in the console are harmless / third-party — ignore.
- **PowerShell + UTF-8 (important):** never edit these files with `Get-Content -Raw` / `Set-Content` — on PS 5.1 it misreads UTF-8 and turns em-dashes/arrows/emoji into mojibake (`â€"`). Use the **Edit/Write tools**, or `[System.IO.File]::ReadAllText/WriteAllText` with a UTF-8 encoding.
- **Empty video slots are intentional** ("🎬 Video coming soon") — Rashid records them; not bugs. Commands in CP2–CP4 build steps (`/ai-employee-builder:meta-create-skill`, plain-words) are best-guess — confirm with Rashid.
- **Not deployed.** All local edits in the nested `clo-courses` repo. Don't deploy unless asked.

## "Done" checklist — all verified in Playwright 2026-07-22
- [x] Every link on every page resolves (served from repo root).
- [x] Home → wizard → CP1 → CP2 → CP3 → CP4 → goal walks with no dead end.
- [x] Completing a checkpoint visibly continues to the next (primary "Next: … →").
- [x] Progress persists across reloads; board shows correct done/active/locked (+ live card fill).
- [x] "Continue" resumes at the right checkpoint + step (home + board).

## NOT done (deliberately) / notes for next chat
- **Not committed, not deployed** — all edits are local in this nested `clo-courses` repo. Commit inside it + deploy when the owner asks.
- **`get-access-aieb.html` (the setup wizard) is untouched** — `setup` defaults to done in `progress.js`, so the board/resume don't depend on the wizard marking it. If you want the board to show `setup` as *active/incomplete* until the wizard truly finishes, load `progress.js` there and call `AIEB.markDone('setup')` when the finish banner reveals.
- **Empty video slots stay intentional** ("🎬 Video coming soon") — Rashid records them.
- **Caching:** `progress.js` is new, and the board/checkpoints changed — hard-refresh (Ctrl+Shift+R) or cache-bust when testing, or you'll load a pre-progress copy (I hit exactly this mid-session).

---

## Continuation prompt (paste into a new chat)

> Continue the CLO buyer-portal journey work. **First read the handoff:** `product/courses/clo-courses/HANDOFF-portal-journey.md` — it has the full file map, the intended journey, localStorage keys, and gotchas. Then do these in order, verifying each in Playwright before moving on:
>
> **1. Click-through audit.** Serve the portal from the `clo-courses/` repo root (NOT `clo-course/`, or parent-relative links 404) — `python -m http.server` in `product/courses/clo-courses/`, open `/clo-course/index.html?product=aieb`. Walk the whole journey with Playwright: home → Get Access wizard (both Cowork and Claude Code tracks) → finish → Business X-Ray checkpoint → each checkpoint → board. Click every link + nav item. Report any 404, dead end, or confusing hop. (`file://` is blocked; hard-refresh after editing `nav.js`/`shell.js` — they cache.)
>
> **2. Make the journey continuous.** Verify the wizard finish still links to Checkpoint 1, and strengthen every checkpoint's completion screen so it clearly continues to the NEXT checkpoint (add a prominent "Next: <checkpoint> →", not just "back to board").
>
> **3. Build progress tracking + resume (client-side localStorage).** Add a progress store of completed checkpoints; make `ai-employee-board.html` read it and render real done/active/locked states (replace the STUB); mark a checkpoint complete when its gate passes (unlocking the next); and add a "Continue where you left off →" CTA on the home + board that jumps to the current checkpoint at its saved step (`aieb_ckpt_<id>_v4`).
>
> Keep the board-first, build-not-learn spirit: no sidebars on wizards, courses stay in "Reference." Everything is local edits in the nested `clo-courses` repo — don't deploy unless asked.

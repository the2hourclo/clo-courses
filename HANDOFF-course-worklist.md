# HANDOFF — AIEB buyer course, next worklist

**Written:** 2026-07-25 · **Repo:** `the2hourclo/clo-courses` (GitHub Pages)
**Live root:** https://the2hourclo.github.io/clo-courses/clo-course/
**Companion docs:** `HANDOFF-portal-journey.md` (the journey architecture), `meta-create-skill/HANDOFF-white-excali.md` (the diagram palette — DONE, kept as reference).

This picks up a multi-session pass on the buyer course. Everything in **§ Already shipped** is
live and verified. Start at **§ Do next** — it's ranked by impact per effort.

---

## How the journey is wired (read this first)

The portal is a **board + wizards**. The board (`ai-employee-board.html`) is the hub; each
checkpoint is a wizard page. `progress.js` is the single source of truth — `window.AIEB`, the
`SPINE`, the `META` map, done-state, and the server sync.

**The spine has SIX gating nodes (5 build checkpoints + setup):**

| id | name | wizard | ladder key (server) |
|---|---|---|---|
| `setup` | Get set up | `get-access-aieb.html` | `1-onboard` |
| `cp1` | Map the business | `checkpoint-map.html` | `2-map` |
| `cp2` | Your first skill | `checkpoint-first-skill.html` | `3-first-skill` |
| `cp3` | A skill system | `checkpoint-system.html` | `4-system` |
| `cp4` | **Make it reliable** | `checkpoint-autonomy.html` | *(no server rung — client-only)* |
| `goal` | **Your AI Employee** | `checkpoint-ai-employee.html` | `5-autonomy` |

**A wizard step** is `{ type:'video'|'build'|'gate', title, body, video?, slides?, command?,
demoSlot?, surface? }`. A `video:` URL beats a `slides:` deck beats the "coming soon" slot. Each
wizard's `render()` was synced to one superset, so any of those drops into any wizard.

**Decks that fill empty video slots** (via `slides.js`, swipe / arrows / tap-to-enlarge):
- CP2 step 1 → `v1-what-is-a-skill` (6) · step 2 → `v2-types-of-skills` 01–04
- CP3 step 1 → `v2` 05–06 + `v4-skill-system` (5) = 7 slides
- meta-create-skill course, "From Skill to Library" lesson → `v3-audit-library` (13)
- Running example across CP2/CP3/CP4/goal is LOCKED = the **Weekly Email** employee.

---

## Already shipped (live + verified — do not redo)

- **Slide legibility.** Slides authored at 1600px were rendering at 548px (0.34 scale) in a 640px
  column — 26px body became 8.9px. Slide steps now widen the column to ~1068px; a persistent
  "Enlarge" chip + lightbox carries phones. All 30 canvas slides + the audit deck.
- **All canvas slides repainted cream → white**, and the course page (`meta-create-skill`) fully
  migrated to white-excali — chrome AND all 39 inline diagrams (884 colour values). Only the two
  terminal graphics stay deliberately dark.
- **v4-skill-system deck built** (5 slides, Weekly Email spine) and wired into CP3.
- **Setup wizard finish bug fixed.** Pressing Next now completes acknowledgement steps, so the
  finish screen appears; the device-activation gate still blocks unactivated buyers.
- **Board-first routing.** Every route off home lands on the board, not straight into a wizard.
- **Activation-screen contrast** (7 pale-on-pale colours, incl. all 3 purchase-status messages).
- **Progress key** probes `_v6/_v5/_v4` so a wizard's store bump can't freeze its board column.
- **CP1 dead X-Ray embed → thumbnail link** (video has embedding disabled at source, verified via API).
- **`/setup-aieb` truth pass.** It sets up the WORKSPACE only — it does NOT run the X-Ray or build
  the first skill (Rashid confirmed). 8 false claims corrected; X-Ray named as the next checkpoint
  in a fresh window.
- **Community onboarding collapsed to step 1** (was two steps; intro template rewritten).
- **Three non-existent commands retired** — `note-friction` / `note-win` / `/review-retro` don't
  ship. The retrospective is AUTOMATIC (`hooks/retro_nudge.mjs`, SessionStart), so CP4/CP2 copy
  hands the buyer no command at all.
- **CP3 "two or three skills" fixed** — CP2 gives them one; the step now reuses that one.
- **Journey restructure** — self-improvement moved to CP2; autonomy split out of cp4 into the new
  `goal` checkpoint 5. Spine, board, finale, and the server-sync mapping all updated.
- **Claude Code track partial** — dead "Step 2" pointers fixed; a `/check-setup` done-signal block
  added. (The deeper CC work is still open — see below.)

---

## Do next (ranked)

### 1 — Resync the planning docs to the 5-checkpoint spine  ·  cheap, ~1hr  ·  START HERE
The product now reads: cp4 = **Make it reliable** (harden + harness), goal = **Your AI Employee**
(schedule / runs on its own). Six docs still describe the old 4-checkpoint + trophy shape and will
mislead whoever records next:
- `product/aieb-onboarding-journey/build-record-roadmap.md`
- `product/aieb-onboarding-journey/cp3-cp4-video-plan.md`
- `product/aieb-onboarding-journey/onboarding-gamification-spec.md`
- `product/aieb-onboarding-journey/demos/02-cp3-skill-system.md`
- `product/aieb-onboarding-journey/demos/04-cp4b-harness.md` (now belongs to cp4 "Make it reliable")
- `product/aieb-onboarding-journey/demos/05-cp4c-schedule.md` (now the `goal` checkpoint's demo)
This is the direct debt from the restructure — close it before it drifts further.

### 2 — Server side of the spine split  ·  needs the other repo
`aieb-gated-mcp` (per the repo lock, owned by a parallel task — coordinate, don't just edit) still
has a 5-rung ladder with no "reliability" rung, and `config/checkpoint-videos.json` still uses the
old checkpoint keys/titles. The client compensates today: `LADDER_TO_SPINE` maps `5-autonomy → goal`
and an `IMPLIES` map marks cp4 done alongside it (see `progress.js` ~line 200). That's a bridge, not
a fix — the clean end state is a real reliability rung on the server ladder. Until then, leave the
client bridge in place.

### 3 — Record the CP2 demo  ·  top content item
Run-of-show is written (`demos/01-cp2-create-first-skill.md`), CP2 is where buyers are, and the
recording retires the last bare step in that checkpoint. When it's shot, drop the URL in **BOTH**
homes (the two-homes ritual in `build-record-roadmap.md`): the wizard step's `video:` AND the
server `checkpoint-videos.json` row.

### 4 — Finish the Claude Code track review  ·  needs a subagent run
Four steps are authored but unreachable (not in `wizSteps()`): `#step2` (plugin install), `#step3`
(connect mechanics), `#step4` (`/check-setup`), `#step5` (Draw.io). Each needs a verdict: **surface**
into `wizSteps()`, **fold** into a step that renders, or **delete**. The workflow that was going to
reason this through died on a session limit — rerun it. Separately, the CC track still has **zero
video** anywhere; that's a recording, not a copy fix, and it sits earliest in the funnel.

### 5 — Remaining audit findings  ·  real, none blocking
- **Board ↔ CP1 wizard drift.** The board still lists "Why the X-Ray interview works" (removed from
  the wizard, which is on `_v5`) and "Welcome — what you just built" (points at a nonexistent video).
  CP1's board column matches the live wizard on almost none of its titles. Reconcile
  `ai-employee-board.html`'s cp1 `cards` against `checkpoint-map.html`'s real steps.
- **Setup column never advances** on the board (get-access progress isn't mirrored into the board's
  step count).
- **Accent colours fail AA as small text** — the four checkpoint accents on white need a darker
  `--cp-ink` for text while keeping the bright hue for fills.
- **Orphaned content in get-access-aieb.html** — FAQ, Common-fixes table, and the `/whats-next`
  callout are authored but unreachable because wizard mode is force-on.

---

## Conventions + traps (so you don't relearn them)

- **Deploy = commit + push to `main`.** GitHub Pages serves the repo directly; every file ships,
  so an untracked scratch file in the tree would go live. Verify on the `github.io` URL, not just
  locally — **local `curl` HTTPS is blocked by Norton in this env; use Python `urllib` or the
  browser.** (`localhost` http server works fine for Playwright.)
- **When a wizard's step ORDER changes, bump its `STORE` suffix** (`aieb_ckpt_<id>_vN`). Add the new
  suffix to the FRONT of `STEP_SUFFIXES` in `progress.js` or the board column reads as never-started.
- **PowerShell mangles emoji/UTF-8** — do bulk HTML edits with Python, and write emoji as HTML
  numeric entities (`&#127881;`), never `\uXXXX` (that produced lone surrogates and truncated a
  file to 0 bytes mid-session). Python `pathlib.write_text` truncates before it hits an encoding
  error, so a failed write can empty the file — re-copy from git if that happens.
- **The audit deck's width rule (`.deck-wide`)** on the course page is bounded to the content
  gutters, NOT viewport-centred, because that page has a sidebar AND a right TOC. Don't "simplify"
  it to the wizard's centring trick — it'll overlap both.
- **`get-access-aieb.finish-preview.html` is untracked** and predates this work — NOT mine to
  commit or delete. Decide: commit it or `rm` it. It's the only thing in `git status`.

---

## Verify-live checklist (paste into the next chat)

```
board: https://the2hourclo.github.io/clo-courses/clo-course/ai-employee-board.html
       → "Checkpoint 5 of 5", cp4 = "Make it reliable", goal has a "Start this checkpoint" button
CP2:   step "It gets better every time you use it" present before the gate
CP3:   7-slide deck, all white paper
goal:  checkpoint-ai-employee.html walks 3 steps → finale "See it on your board"
course: meta-create-skill/index.html — white chrome, diagrams white (no neon green, no black blobs)
```

# Skills-course slide rebuild — 2026-09-23 (working memory)

**Why this file exists:** the hosted Notion MCP was not authorized in the session that started this, so
there is no War Map task page. This file is the task page: read it cold, and append to the WORKING LOG
at every milestone. Move it to a War Map task when Notion is connected.

**Ask (Rashid, 2026-09-23):** revisit the skills-course slides (orchestrator skills, workflows, etc.),
make them easier to follow along, and make the AI Employee mascot the canonical one — "the previous
model made a mistake". Rashid approved the full plan and the running-example lock the same day
("I agree with everything you recommend").

## Scope — 9 decks, 54 slides, and where each one is shown

| Deck | Shown in | Wired by |
|---|---|---|
| v1-what-is-a-skill (6) | CP2 step "What is a skill" | `clo-course/checkpoint-first-skill.html` `slides:` + `slideNotes:` |
| v2-types-of-skills 01–04 | CP2 step "The 3 levels of skills" | same file |
| v6-how-to-create-a-skill (6) | CP2 step "How to create a skill" | same file |
| v5-retrospective (5) | CP2 step "It gets better every time you use it" | same file |
| v2-types-of-skills 05–06 + v4-skill-system (5) | CP3 step "What a skill system is" | `clo-course/checkpoint-system.html` |
| v7-harden (5), v8-harness (5) | CP4 steps "Review + harden", "Build a harness" | `clo-course/checkpoint-autonomy.html` |
| v9-schedule (5) | goal step "Schedule it / autonomy" | `clo-course/checkpoint-ai-employee.html` |
| v3-audit-library (13) | meta-create-skill course, "From Skill to Library" | `meta-create-skill/index.html` `AUDIT_SLIDES` (no narration) |

## Locked decisions (do not re-litigate)
- **Running example, names, slide rules:** `../DESIGN-SYSTEM.md` §9 (the Weekly Email AI Employee:
  `weekly-email/` lead skill → pull-stats / what-worked / draft-email / qa-draft), §10 (one name per
  idea; AI Employee = the skill system once it runs on its own), §11 (24px floor, title = takeaway,
  ≤ 2 non-repeating prose lines, canonical robot s ≥ 0.75, no borrowed legend colours, no terminals).
- **Robot:** always `python _tools/robot.py block …`; `python _tools/robot.py check v*/slides/*.html`
  must pass before shipping.
- **Deck order changes:** v1 → 01, 02, 03, 06, 04, 05 · v2 in CP3 → 06 then 05 · v4 → 4 slides (04 folded
  into 02) · v3 → main path 01, 02, 02-1, 02-2, 02-5, 03, 04, 05 then appendix 02-3, 02-4, 02-6, 02-7, 02-8.
- **Render at 2×** (render.ps1 default, 3200×2100) for every slide, so the portal's Enlarge view is crisp.
- **Narration** (`slideNotes`) is rewritten in the main thread after each deck's slides are final.

## Build / verify commands
```powershell
$sk = "C:\Users\rkham\OneDrive\Desktop\Rashid Business\.claude\skills\excali-graphic"
& "$sk\scripts\render.ps1" -Html "<slide>.html" -Out "<slide>.png"
python "$sk\scripts\excali-gate.py" "<slide>.html"      # 0 hard required
python _tools/robot.py check v*/slides/*.html            # all OK required
```
Portal preview: serve `clo-courses/` and open `clo-course/checkpoint-first-skill.html` etc.

## Traps
- `clo-courses` had **25 uncommitted files in `clo-course/`** from another session when this started
  (incl. all four checkpoint pages — only a `progress.js?v=5→7` bump in three of them, 35 lines in
  `checkpoint-ai-employee.html`). Commit ONLY this rebuild's paths; never `git add -A`.
- The slide viewer references slides by filename — renaming a slide file breaks its wizard.
- `robot.py` first version grabbed the header comment of the exemplar and wrote junk into 10 files
  (reverted from git). Fixed: it anchors inside `<svg>`.
- The exemplar reference PNG was stale (pre-toolbelt, 2026-07-19) — re-rendered 2026-09-23.

## Status
| Deck | Slides rebuilt | Gate | Robot check | Reviewer | Narration | Wired order |
|---|---|---|---|---|---|---|
| v1 | 6/6 | 0 hard | OK (01 ×2, 05) | 1 PASS/5 FAIL → all fixes applied, self-checked | done | 01,02,03,06,04,05 wired |
| v2 | 6/6 | 0 hard | OK (02, 03) | PASS | done | CP3 06→05 wired |
| v3 | 13/13 | 0 hard | OK | 12 PASS, 02-4 fixed + self-checked | n/a | main path + appendix wired |
| v4 | 4/4 (04 deleted) | 0 hard | OK | PASS (05 fixed after FAIL) | done | wired, 4 slides |
| v5 | 5/5 | 0 hard | OK | FAILs fixed, self-checked | done | unchanged |
| v6 | 6/6 | 0 hard | OK | FAILs fixed, self-checked | done | unchanged |
| v7 | 5/5 | 0 hard | OK | 04–05 FAIL → fixed, self-checked | done | unchanged |
| v8 | 5/5 | 0 hard | OK | 5 FAIL → fixed, self-checked | done | unchanged |
| v9 | 5/5 | 0 hard | OK | 5 PASS | done | unchanged |

## Follow-ups (not in this pass)
- Regenerate `storyboard.excalidraw` / `storyboard-preview.png` for v1–v3 (`storyboard-canvas` skill).
- The portal body copy around each deck still says "orchestrator" in CP2 step 2 and "a skill becomes an
  AI Employee" in CP3 — align with §10 when narration is rewritten.

## WORKING LOG
- **2026-09-23** — Audit of all 54 slides (3 parallel reviewers) → `findings-v1-v3.md`,
  `findings-v4-v6.md`, `findings-v7-v9.md`. Rashid approved plan + running example.
- **2026-09-23** — `_tools/robot.py` written. v4–v9: 12 robots re-copied from the hardened exemplar
  (diff = the 22 missing `fill="none"` + comment lines only; geometry identical). Exemplar PNG
  re-rendered. DESIGN-SYSTEM §8 renamed Level 3's mechanism to "lead skill"; §9–§11 added.
- **2026-09-23** — BRIEF.md written; six opus rebuild agents started in parallel (v1 · v2 · v3 · v4+v9 ·
  v5+v6 · v7+v8), each writing `<deck>-slides.md` here when done. `meta-create-skill/index.html`
  `AUDIT_SLIDES` reordered to the v3 main path + appendix (CRLF preserved).
- **2026-09-23** — v2, v4, v9 decks back (notes: `v2-slides.md`, `v4-slides.md`, `v9-slides.md`). Main
  thread fixes: v2-04 + v9-02 wording, v9-03 "or when a new file lands" → "the same time, every week"
  (Cowork schedules by time; a file trigger isn't true on every surface). §9 locked "this week's
  email" + the draft-email/ file names. CP3 (`checkpoint-system.html`) rewired (v2 06→05, v4 4 slides)
  + narration + intro rewritten; goal (`checkpoint-ai-employee.html`) v9 narration rewritten — its
  hunk is separate from the other session's uncommitted finish-screen work (lines 108/171/383/415).
- **Trap found:** reviewer sub-agents' reports land in the MAIN thread, not in the agent that spawned
  them — forward them (SendMessage) or the deck agent waits forever.
- **2026-09-23** — v1 and v5+v6 back. CP2 (`checkpoint-first-skill.html`): v1 reordered
  (01,02,03,06,04,05) + narration, v2 01–04 narration + body ("lead skill"), v6 + v5 narration, v5 body
  drops "run". Verified: every step's slides count == slideNotes count (CP2 6/4/6/5, CP3 6, goal 5).
- **2026-09-23** — v7+v8 back. Main thread renamed `## Conventions` → `## Your rules` on v7 02/03/04 and
  v8 01/05 (jargon; matches the v7-02 title). CP4 (`checkpoint-autonomy.html`) narration for both decks +
  both step intros rewritten ("rig" gone, "read like a robot" → "press release"). v7/v8 use ink, not
  green, for good outcomes (built before the §11.7 carve-out) — readable, left as is; optional polish.
- **2026-09-23** — v3 back. Final verification across all 55 slides: `robot.py check` 40 robots OK,
  gate 0 hard at `--floor 24`, every PNG newer than its HTML, all 55 portal-referenced slides exist and
  every slide file is referenced. Portal previewed locally (`aieb-course-preview`): CP2 + CP3 decks play
  in the new order with the matching narration per slide; only 404 is the `/course-progress` sync API
  (absent on a static server). DESIGN-SYSTEM §3b updated (tan sediment fill retired).
- **2026-09-23** — Committed in `clo-courses` (this rebuild's paths only; the four checkpoint pages were
  staged as HEAD + this rebuild's hunks, so the other session's Sept-4 work stays unstaged).
- **Open:** v1–v3 storyboard files are stale; v7/v8 use ink rather than green for good outcomes (optional
  polish); the main workspace's re-rendered `excali-graphic/assets/exemplars/canonical-robot-blackmarker.png`
  is uncommitted in the main repo (that repo has lots of other uncommitted work on its branch).
- **2026-09-23 — DEPLOYED** (Rashid: "you can deploy the courses"). Buyers use
  **course.chiefleverageofficers.com** = Vercel project `clo-courses`, deployed by hand with the CLI —
  NOT GitHub Pages (Pages serves `main`, 36 commits behind `live`; not buyer-facing). Pushed `513065c` to
  `origin/live`, then deployed a CLEAN worktree of `513065c` (not the working tree, which holds the
  Sept-4 session's uncommitted work) → `clo-courses-q5639nu9x-rashid-s-projects12.vercel.app`, aliased to
  course.chiefleverageofficers.com. Pre-check: all 6 public files the Sept-4 session changed were served
  as the COMMITTED version, so the live site = committed code and the clean deploy rolled nothing back.
  Post-check: new slide PNGs match the commit, retired v4-04 returns 404, progress.js /
  setup-experience.css unchanged. **Rollback:** `vercel rollback` or promote
  `clo-courses-hqjvkhcfz-rashid-s-projects12.vercel.app` (the Sept-2 production deploy).
- **Trap:** a worktree under the session scratchpad fails on Windows path length (business-x-ray canvases);
  use a short path (`%TEMP%\ccd-deploy`) + `core.longpaths=true`.

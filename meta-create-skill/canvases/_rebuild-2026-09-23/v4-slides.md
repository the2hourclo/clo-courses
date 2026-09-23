# v4-skill-system — rebuilt slides (2026-09-23)

CP3 "What a skill system is". Final deck: **01 → 02 → 03 → 05** (4 slides; old 04 folded into 02 and deleted).
Running example = §9 Weekly Email AI Employee. The ladder wording on 05 is shared, character for character,
with v9-schedule/05 (both built from one wording source).

All four: white bg + dot grid, Excalifont, shapes in `#rough`, text outside, 1600×1050, rendered 2×.
Nothing on any slide is below 24 px (checked with `excali-gate.py --floor 24`, not just the 16 px default).
Per the §9 wording lock, `draft-email/` "writes this week's email" (01, 02).

---

## 1 · `01-you-are-the-wiring` — "Separate Skills Leave Every Hand-Off to You"
**Job:** the before-state. Four separate skills each work fine, and you are the one carrying the work between them.

**What the viewer sees (left → right, top → bottom)**
- Header over the row: **FOUR SEPARATE SKILLS**, with "one job each · none of them knows about the next one" under it and a comb bracket spanning all four.
- Far left: **the AI** (canonical robot, s 0.9).
- A row of four ink folder boxes tagged STEP 1–4: `pull-stats/` (gets last week's numbers), `what-worked/` (finds the winners), `draft-email/` (writes this week's email, "↑ you built this one"), `qa-draft/` (checks it against your rules).
- In each of the three gaps a red detour climbs out of one box, up to a stick figure labelled **YOU**, and back down into the next box. Red labels over the three figures: "copy the output, open the next skill" · "explain the context all over again" · "check it, then paste it on".
- A dim bracket runs from under the robot along the bottom of all four boxes, with a tick into each: "the AI does each step · each one works fine on its own". (This replaces the old arrow into step 1 only, so the robot now visibly reaches every step.)
- Bottom line (red): **"The job only moves when you move it."**

**What changed:** robot 0.62 → 0.9 and connected to all four steps (it no longer claims "does every step" while pointing at step 1); every label 17–20 px → 24 px+ (box sub-labels split into two lines to fit); subtitle cut (it repeated the takeaway); "wire" metaphor replaced by the named idea "hand-off" (which 02 and 03 use); "YOU" labels ink, not red (red = failure only); row tightened (pitch 345 → 320) so 02 can place you at the end in the same frame.

**Gate:** 0 hard · 1 REVIEW (>3 accents = the robot's toolbelt legend, acknowledged) · no text < 24 px. **Robot check:** OK (s 0.9). **Visual review:** excali-reviewer PASS; polish applied (note re-worded to "↑ you built this one" so its arrow sits inside `draft-email/`; "again" said once).

---

## 2 · `02-system-runs-the-job` — "The Lead Skill Carries the Hand-Offs. You Make the Call."
**Job:** the after-state, in 01's exact frame: the lead skill carries every hand-off; you appear once, at the end.

**What the viewer sees**
- Header in the same spot as 01: **ONE SKILL SYSTEM** — "the same four skills, plus one lead skill that runs them in order".
- Same robot (**the AI**), same four boxes, same STEP tags, names, sub-labels and "↑ you built this one" — pixel-identical positions to 01, so swiping 01 → 02 only changes the gaps.
- Where the three stick figures stood, one long grey band: folder icon + **`weekly-email/`** + "the lead skill".
- Each hand-off is now a green path: up out of a box into the band, along inside it, and down into the next box. A fourth green path leaves `qa-draft/` through the band and lands on a single stick figure standing where a fifth step would be: **YOU**, captioned **"your call: / send it?"** (ink — this is old 04's "only the judgment call stays yours" column, folded in).
- Bracket under the four boxes (not under you): "the AI still does each step".
- Bottom line: **"Same four skills, same AI. The only thing that moved is you."**

**What changed:** the old left half (a repeat of 01) is gone; the after-state is drawn in 01's layout; the robot is now drawn ("same AI" was said with no AI on the slide); "off the path" / "the wiring" gone; old 04's review step folded in as the single "your call" figure; 48 of 54 sub-24 px lines → none.

**Gate:** 0 hard · 1 REVIEW (robot accents, acknowledged) · no text < 24 px. **Robot check:** OK (s 0.9, same block and position as 01). **Visual review:** excali-reviewer PASS, and it confirmed 01/02 share every position except the gaps; polish applied (band widened so the 4th path leaves through its flat edge; YOU moved 6 px in from the edge).

---

## 3 · `03-lead-skill-runs-the-rest` — "The Lead Skill Holds the Order and Every Hand-Off"
**Job:** open the lead skill — its SKILL.md holds the order and what passes between steps; the four skills only answer to it.

**What the viewer sees**
- A big folder, tab **`weekly-email/`** "the lead skill".
- Inside it, top: a file card tabbed **`SKILL.md`**, first line `## Steps`. Across it runs a green track with numbered stops **1 · 2 · 3 · 4**.
- Inside the folder, below the file: the four skill folders `pull-stats/`, `what-worked/`, `draft-email/` ("↑ you built this one"), `qa-draft/`. Each has exactly two green arrows, both to SKILL.md: one down from its numbered stop (SKILL.md starts it) and one up back to the track (it hands its result back). There is no line between any two skills.
- The hand-offs ride the track between stops, in ink: **last week's numbers** → **the winners** → **the draft** → **a checked draft**, and the track leaves the folder to a stick figure **YOU** — "your call: / send it?".
- Bottom line: **"None of the four knows the next one exists. They only answer to the lead skill."**

**What changed:** the four steps are now drawn INSIDE the lead skill and every hand-off goes through it (the old drawing had skills passing straight to each other, contradicting "none of them knows the next one exists"); the last hand-off is "a checked draft" going to you (was "an approved draft" from qa-draft); the point is said once (title) plus its consequence once (bottom line) — "IT HOLDS ONLY", the SKILL.md list box, the subtitle and "routes · does little itself" are cut; card descriptions cut; all labels ≥ 24 px.

**Gate:** CLEAN. **Robot check:** no robot (none needed — it is a file view). **Visual review:** excali-reviewer PASS; polish applied (note re-worded and centred on `draft-email/`; diagram moved down to balance the page).

---

## 4 · `05-skill-system-employee` — "A Skill System Is One Rung From Your AI Employee"
**Job:** the ladder — each rung labelled once — with CP3 marked as where you are and the top rung pointing forward.

**What the viewer sees (three cards rising left → right, joined by arrows)**
- **Skill** · `draft-email/` · a folder with its SKILL.md → one page · footer **a task** / "one step, when you ask".
- **Skill system** · `weekly-email/` · a numbered list 1–4 of `pull-stats/`, `what-worked/`, `draft-email/`, `qa-draft/` · footer **a function** / "one whole job, when you ask". Above it: **YOU ARE HERE ↓**.
- **AI Employee** (dashed card, tagged **NOT YET**) · `weekly-email/` · "same folder, now on a schedule" · the robot, with a clock ("Monday 7am") pointing at it · footer **owns the function / and starts itself**. Under the card: "↑ the next two checkpoints get it there".

**What changed:** each footer now carries a plain gloss ("one step, when you ask" / "one whole job, when you ask") so "function" can't be read as code or a department, and "when you ask" makes "starts itself" the difference; the repeated "a task / a function / a worker who owns it" row, the SCOPE wedge, the subtitle and the two-line takeaway are gone — each rung is labelled once, in the §10 ladder words; the ambiguous "The thing that owns it" and the unreadable "You still make the call." tag are gone; the title is now a takeaway; the top rung is dashed and points forward.

**Gate:** 0 hard · 1 REVIEW (robot accents, acknowledged) · no text < 24 px. **Robot check:** OK (s 0.9). **Visual review:** excali-reviewer FAIL on the first pass ("a function" undecodable for a cold owner) → fixed with the glosses above, plus a NOT YET tag on the dashed card and shorter arrows between cards; re-rendered, gate re-run, re-checked by eye.

---

## Final deck order
`01-you-are-the-wiring` → `02-system-runs-the-job` → `03-lead-skill-runs-the-rest` → `05-skill-system-employee`
(CP3 opens with v2-types-of-skills 06 then 05 before these — v2 owns those.)

## Files removed
- `v4-skill-system/slides/04-a-real-system.html` and `.png` — folded into 02 (the "your call" figure). Deleted, recoverable from git.

## `map.json`
Updated to the 4-column order and new labels; `borrowed_opening` now lists v2 06 then 05 (the locked CP3 order).

## Flags for the main thread
1. **Portal wiring must drop slide 04.** `clo-course/checkpoint-system.html` line ~193 still lists `'04-a-real-system'` in `canvas('v4-skill-system', [...])`; that PNG no longer exists. New list: `['01-you-are-the-wiring','02-system-runs-the-job','03-lead-skill-runs-the-rest','05-skill-system-employee']`, and its `slideNotes` array needs 4 entries, not 5. (I did not touch `clo-course/`.)
2. **Ladder wording changed at your request (both bookends, kept identical):** rung 3's grey line is now "same folder, now on a schedule" (was "once it runs on its own", which repeated "starts itself"), and rungs 1–2 gained the glosses "one step, when you ask" / "one whole job, when you ask" (v4 reviewer FAIL). The rung words themselves (a task / a function / owns the function and starts itself) are unchanged. To restore the lock's literal "once it runs on its own", change that one string on both 05 slides.
3. **"CP4 and the last checkpoint get it there" → rendered as "the next two checkpoints get it there".** Buyers never see "CP4" — the portal names that checkpoint "Make it reliable" and the last one "Your AI Employee"; a cold viewer cannot decode "CP4". Same meaning, decodable. If you want the literal text, change one string in 05 (`the next two checkpoints get it there`).
4. **Narration** (`slideNotes`) is stale for every slide — titles, labels and the 01/02 layout changed. Key words to narrate: hand-off, the lead skill `weekly-email/`, "your call", "none of the four knows the next one exists", the ladder words exactly as on 05.
5. The HTML was generated from small Python builders (kept in the session scratchpad, not in the repo); the saved `.html` files are plain, hand-editable slides in the house recipe.

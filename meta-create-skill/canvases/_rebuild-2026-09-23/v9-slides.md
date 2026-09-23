# v9-schedule — rebuilt slides (2026-09-23)

Goal checkpoint "Your AI Employee" → step "Schedule it / autonomy". The series' closing deck. Final order
unchanged: **01 → 02 → 03 → 04 → 05**. Running example = §9: `weekly-email/` (the lead skill running
`pull-stats/` → `what-worked/` → `draft-email/` → `qa-draft/`) runs itself Monday 7am; reads
`stats/last-week.csv`, writes `drafts/weekly-email.md`. The ladder on 05 is character-for-character the
v4-skill-system/05 wording (both slides are built from one wording source).

All five: white bg + dot grid, Excalifont, shapes in `#rough`, text outside, 1600×1050, rendered 2×. Nothing
below 24 px (checked with `excali-gate.py --floor 24`). Every slide is title + at most one other prose line.

---

## 1 · `01-you-are-still-the-trigger` — "You Are Still the Start Button"
**Job:** the AI Employee works perfectly, but it only runs on the weeks you remember to ask.

**What the viewer sees (left → right, then the strip)**
- Left: a stick figure **YOU**; a red arrow from you into the box, labelled "you remember / to ask" — the only thing that ever starts it.
- Centre: a box titled `weekly-email/` · "hardened · harness on". Inside it, centred, the canonical robot (s 0.95), captioned **your AI Employee**. Under the box: "WORKING PERFECTLY. WAITING."
- Right: a green arrow to a green box **WHAT COMES BACK** — "A checked draft, in `drafts/weekly-email.md`, every time it runs".
- Below: **SEVEN MONDAYS**, a strip of WEEK 1–7. Weeks 1, 3, 4: green tick + "ran". Weeks 2, 5, 6, 7: grey dash + "never ran".
- Bottom line: **"It ran on the weeks you remembered. Nothing was wrong with it the other four."**

**What changed:** robot 0.62 → 0.95 and centred in its box, captioned by role ("your AI Employee" — was "THE EMPLOYEE YOU BUILT"); red X for never-ran weeks → grey dash + "never ran" (red X read as "failed"); the punchline became the title, the subtitle and second takeaway line were cut (they restated each other); paths per §9; 54% sub-24 px words → none.

**Gate:** 0 hard · 1 REVIEW (robot's toolbelt legend, acknowledged) · no text < 24 px. **Robot check:** OK (s 0.95). **Visual review:** excali-reviewer PASS.

---

## 2 · `02-has-it-earned-it` — "A Schedule Is Earned, Not Switched On"
**Job:** it only goes on a schedule once it is proven, hardened (and passes its scorecard) and has a harness — all three, which you built last checkpoint.

**What the viewer sees**
- Header: **YOU ALREADY BUILT ALL THREE**.
- Three ink rows, each with a green tick:
  - **It is proven on real work.** — "You have run it on real weeks and used what came back."
  - **It is hardened and passes its scorecard.** — "It stops a bad draft itself, and all 5 tests still pass."
  - **It has a harness on it.** — "The reviewer reads it cold, and the reality check confirms it landed."
- A green bracket joins the three → arrow → green box **SCHEDULE IT** "only with all three".
- Below: a dashed red row with a red X — **Anything with one of those missing** — "Anything you have run twice is not ready to run alone for a month." → dashed arrow → dashed red box **NOT YET** "you keep starting it".
- Bottom line: **"A schedule multiplies whatever it already does, good or bad."**

**What changed:** "passes its scorecard" added to the hardened line (the v7/05 scorecard was missing from the gate); sub-lines rewritten in §10 names (stops, the scorecard's 5 tests, the reviewer, the reality check); "Anything with one of those missing" ink bold (was dim grey); "THE GATE BEFORE THE CALENDAR" → "YOU ALREADY BUILT ALL THREE" (drops "gate"; carries the old first takeaway line); subtitle cut; 23 px → 24 px+.

**Gate:** CLEAN. **Robot check:** no robot (none needed). **Visual review:** excali-reviewer PASS; polish applied (red-row line, "only with all three").

---

## 3 · `03-four-things-to-pin` — "Four Blanks To Fill Before It Runs Alone"
**Job:** before it runs alone, name exactly when it runs, where it reads from, where it writes, and how it tells you.

**What the viewer sees**
- Subtitle: "Each one is a sentence you say once, exact, not vague."
- Four ink cards around a centre, each with its own icon:
  1. clock — **1 · WHEN IT RUNS** — **Every Monday, 7:00am.** — "or when a new file lands"
  2. page — **2 · WHERE THE INPUT COMES FROM** — `stats/last-week.csv` — "the exact file, by name"
  3. folder — **3 · WHERE THE RESULT LANDS** — `drafts/weekly-email.md` — "a folder that already exists"
  4. speech bubble — **4 · HOW YOU GET TOLD** — **A message when it's ready.** — "and one when it couldn't finish"
- Centre: the canonical robot (s 0.9), **your AI Employee** — "one run, on its own", with a dim line to each card.
- Directly under card 3, tied to it by a short red tick, in red and wrapped to the card's width: **"Leave the folder vague and it writes nowhere, / then reports done."**

**What changed:** the centre clock (which made all four blanks read as timing) → the AI Employee; the clock survives only as blank 1's icon; paths corrected to §9 (`stats/last-week.csv`, `drafts/weekly-email.md`, no leading slash); the general warning → a blank-3 warning placed on blank 3; the cramped "ONE UNATTENDED RUN" hub label → the robot caption; cards ink (were green); the two-line takeaway cut (title + subtitle only); all text ≥ 24 px.

**Gate:** 0 hard · 1 REVIEW (robot accents, acknowledged) · no text < 24 px. **Robot check:** OK (s 0.9). **Visual review:** excali-reviewer PASS; polish applied (warning wrapped to box 3, blank-2 icon moved clear of its header).

---

## 4 · `04-draft-do-not-send` — "It Runs Without You. It Does Not Send Without You."
**Job:** work that only touches your own files just happens; anything that leaves the building, costs money or can't be undone waits for your yes.

**What the viewer sees**
- Left: "MONDAY, 7:12AM" over the canonical robot (s 0.8) holding the finished draft by its corner (the page sits under its gripper) — **your AI Employee** · "the draft is done".
- A line from the draft to a fork.
- Top branch (green arrow): header **IF IT ONLY TOUCHES YOUR OWN WORK** → ink box "Filing the draft. Updating your sheet. Writing a summary nobody outside sees." → green box **IT JUST DOES IT** "you find it finished, and you never had to say go".
- Bottom branch (red arrow): header on two lines over the action box, **IF IT LEAVES THE BUILDING, / COSTS MONEY, OR CAN'T BE UNDONE** → ink box "Sending to your list. Replying to a client. Spending. Posting. Deleting anything." → a short red arrow stopped by a thick red vertical line → dashed red box **IT WAITS FOR YOU** "drafted, ready, and sitting there until you say yes".
- Bottom line: **"The line is not about trust. It is about what a bad run would cost."**

**What changed:** title per the lock (the old footer line, now the title); header per the lock (adds "OR CAN'T BE UNDONE", so "Deleting anything" fits); the robot now holds the draft at the fork (it answers who "IT" is); "THE RAIL" label and its 19 px caption cut (a red stop line needs no new term); bottom line "The rail is not about…" → "The line is not about…"; all text ≥ 24 px.

**Gate:** 0 hard · 1 REVIEW (robot accents, acknowledged) · no text < 24 px. **Robot check:** OK (s 0.8). **Visual review:** excali-reviewer PASS; polish applied (red header wrapped to the action box, gripper now overlaps the page).

---

## 5 · `05-you-review-it-runs` — "It Runs Monday Morning. You Read the Result."
**Job:** the end state — it starts itself, you only review — and how far the buyer has come.

**What the viewer sees**
- Top band, a three-beat timeline:
  - **MONDAY, 7:00AM** — a clock → the canonical robot (s 0.78). Caption **"Your AI Employee starts itself."** / "nobody asked it to".
  - **7:12AM** — a draft page with a green tick. **"The draft is in the folder."** / "checked, and confirmed it saved" ("review" stays with the human beat).
  - **9:00AM** — a stick figure reading a green-edged page, coffee beside it. **"You read it and say yes."** / "the only step that's yours".
- A divider labelled **HOW FAR YOU'VE COME** (nothing sits under the timeline captions but white space and this divider).
- Bottom band, the ladder as three rising boxes joined by arrows, in the exact v4-05 words:
  - **Skill** · `draft-email/` · **a task**
  - **Skill system** · `weekly-email/` · **a function**
  - (Skill and Skill system also carry the grey glosses "one step, when you ask" / "one whole job, when you ask", as on v4-05.)
  - **AI Employee** · `weekly-email/` · "same folder, now on a schedule" · **owns the function / and starts itself** — with **YOU ARE HERE ↓** over it (v4-05 put YOU ARE HERE on the middle rung; this is the payoff).
- Bottom line: **"You went from doing the work, to running it, to reviewing it."**

**What changed:** the skill → system → employee labels no longer sit under the timeline captions (they read as captions of the wrong column) — the ladder has its own band below a labelled divider, centred in its own boxes; the wording now matches v4-05 exactly (was "a worker who owns it" + "and now it starts itself"); robot 0.68 → 0.78; robot captioned by role inside the column caption; subtitle and "That is your AI Employee." cut (title + one line).

**Gate:** 0 hard · 1 REVIEW (robot accents, acknowledged) · no text < 24 px. **Robot check:** OK (s 0.78). **Visual review:** excali-reviewer PASS; polish applied (7:12 subline, rung-3 grey line, rung glosses).

---

## Final deck order
`01-you-are-still-the-trigger` → `02-has-it-earned-it` → `03-four-things-to-pin` → `04-draft-do-not-send` → `05-you-review-it-runs` (unchanged; no files added or removed). `map.json` labels updated to the new titles.

## Flags for the main thread
1. **Narration** (`slideNotes` in `clo-course/checkpoint-ai-employee.html`) is stale on every slide: 01 now shows grey "never ran" dashes, not X's; 02 has the scorecard; 03's warning is about the folder only and the centre is the AI Employee, not a clock; 04 has no "rail" and adds "can't be undone"; 05's closing line should use the ladder words ("owns the function and starts itself"), not "a worker who owns it".
2. The ladder band now reads "same folder, now on a schedule" on rung 3 and carries the rung-1/2 glosses; v4-05 was changed to match, so the bookends stay identical (see v4-slides.md flag 2).
3. v9-02's red row now reads "Anything with one of those missing" over "Anything you have run twice…" (your wording): two "Anything"s in a row. Say if you want the sub-line back to "A skill you have run twice…".
4. v9-03 says "or when a new file lands" (a trigger) — kept from the original. The next portal step splits Cowork / Claude Code / Codex scheduling; if one surface cannot trigger on a file, cut that sub-line.

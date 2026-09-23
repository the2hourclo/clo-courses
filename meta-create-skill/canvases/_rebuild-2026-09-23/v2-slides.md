# v2 · Types of Skills — rebuild notes (2026-09-23)

Deck folder: `v2-types-of-skills/slides/`. All six slides rebuilt in place (filenames kept). Every slide teaches
on the Weekly Email example (DESIGN-SYSTEM §9), with one name per level:
L1 `draft-email/` (one SKILL.md) · L2 the same `draft-email/` grown · L3 `weekly-email/`, the lead skill.

**Where each slide is shown:** 01–04 in CP2 ("Your first skill", step "The 3 levels of skills").
06, then 05, in CP3 ("A skill system"), right before the v4-skill-system deck.

---

## CP2

### 1 · `01-three-levels` · "A Skill Grows in Three Levels"
**Job:** the three levels, side by side, smallest first.

**What the viewer sees (left to right):** three equal cards.
- **Card 1: "LEVEL 1 · Simple · one job, one file".** The folder `draft-email/` holds one file, `SKILL.md`, with a
  REQUIRED badge. Under it is a drawing of that page: a header block and a few lines of text.
- **Card 2: "LEVEL 2 · With workflows · one job, several versions".** The same `draft-email/`, now as a tree:
  - `SKILL.md` with the REQUIRED badge
  - `workflows/` (green fork), holding `weekly.md` and `launch.md`
  - `scripts/` (amber gear)
  - `references/` (blue book)
  - `assets/` (purple stack)

  The caption at the bottom reads "the same draft-email/, grown".
- **Card 3: "LEVEL 3 · Skill system · a lead skill runs other skills, in order".** The folder `weekly-email/`,
  labelled "the lead skill". Then "runs, in order:" and four numbered rows:
  1. `pull-stats/`
  2. `what-worked/`
  3. `draft-email/`, tagged "← same skill"
  4. `qa-draft/`

  The caption at the bottom reads "what your AI Employee is built from".

**Bottom line:** "Start on the left — most skills never need to move right."

**What changed:**
- Dropped the dashed "MORE CAPABLE →" arrow that collided with the subtitle, and the subtitle itself.
- Dropped the robot. It was decorative and off-model.
- The three example names (summarize-notes/, write-content/, content-pipeline/) are now draft-email/ ×2 and
  weekly-email/.
- L2 now reads "one job, several versions", not "several jobs".
- The L3 defining line went from 17px to 28px, and "= your AI Employee" became "what your AI Employee is built
  from".
- Removed every "orchestrator" and "routes".
- Removed the L3 tree lines. They made the four skills look stored *inside* `weekly-email/`.
- Every label is now 24px or larger.

**Gate:** CLEAN (0 hard, floor 24) · **Robot check:** no robot · **Visual review:** PASS after one round (fixes:
removed the L3 tree lines, added the REQUIRED badge on L2, made the L3 caption dim, changed "← levels 1–2" to
"← same skill").

### 2 · `02-level1-simple` · "A Simple Skill Is Just One File"
**Job:** Level 1 up close.

**Subtitle:** "This is what you are about to build."

**What the viewer sees:**
- **Top left:** a folder window titled `draft-email/`. Inside is a single file, `SKILL.md`, with a REQUIRED
  badge, and lots of empty space.
- **Top right:** a dashed arrow from that file leads to `SKILL.md` opened up, which has two parts:
  - An ink-outlined box labelled **"the header"**, containing:
    ```
    ---
    name: draft-email
    description: Drafts this week's email from last week's numbers.
    ---
    ```
  - A box labelled **"the steps"**, containing:
    1. Say what happened last week
    2. One idea, one link
    3. Keep it under 250 words
- **Bottom strip, left to right:**
  - Two cards go in: "your request · 'Write this week's email'" and "last week's numbers · opens 41% · clicks 5%".
    Both arrows converge on the robot, captioned "the AI".
  - A dashed arrow runs from the SKILL.md card down to the robot, labelled "follows this file".
  - An arrow leads to the output card `drafts/weekly-email.md`: draft lines, a green check, and "~80% to your
    standard · ready to use".

**What changed:**
- Cut the crossed-out row of four folders.
- The blue "THE DESCRIPTION — its trigger" box is now an ink box called "the header".
- Removed the `$ tree` terminal.
- The meeting-notes example is now draft-email/ with the request and last week's numbers going in and a draft
  coming out.
- The robot is now the canonical block at s 0.78. The old one was hand-drawn at s 0.48.
- Every label is now 24px or larger. There were 33 below it.
- The two-line bottom takeaway became the one locked subtitle.

**Gate:** 0 hard (1 REVIEW = the robot's belt colours, acknowledged) · **Robot check:** OK (s=0.78) ·
**Visual review:** PASS after one round (fixes: added the file → AI link, raised the strip off the bottom edge).

### 3 · `03-level2-workflows` · "One Skill, Several Versions of the Job"
**Job:** Level 2 up close. One request opens only the version it needs.

**Subtitle:** "Each version pulls only what it needs."

**What the viewer sees:**
- **Left:** a request card, "your request · 'Write the launch email'". An arrow runs down to the robot ("the AI"),
  and another arrow runs into the skill.
- **Center:** one big folder window titled `draft-email/`, tagged "one skill" at the top right. Inside it:
  - **Column 1, `SKILL.md` [REQUIRED].** It reads "picks the version:", then two rows:
    - `weekly email → weekly.md` in grey
    - `launch email → launch.md`, boxed in green

    A straight arrow drops from that boxed row into the `workflows/` card ("the versions"), where `launch.md` is
    boxed and `weekly.md` is grey.
  - **Legend under column 1:** "boxed = opened this time" and "grey = stays closed".
  - **Column 2, three folder cards in their legend colours:**
    - `scripts/` · "code it runs": `days-left.py` boxed, `stats-table.py` grey
    - `references/` · "docs it reads": `launch-offer.md` boxed, `weekly-format.md` grey
    - `assets/` · "examples it matches": `best-launch-email.md` boxed, `best-email.md` grey
  - Three arrows fan out from the boxed `launch.md` to the three boxed files. They mean "the launch version
    pulls one script, one reference and one asset".
- **Right:** an arrow out of the folder leads to the output card "the launch email": a green check, draft lines,
  and "~80% to your standard · ready to use".

**What changed:**
- New title: it is now "One Skill, Several Versions of the Job" with the subtitle "each version pulls only what
  it needs". The old one was "One Job, Flowing Through All Four Folders".
- The example changed from write-content/newsletter to draft-email/ with a launch request.
- All five collisions are fixed: the request quote on the pill, REQUIRED spilling out of its badge, the arrow
  through "# the router", "pulls" sitting on its arrow, and `newsletter.md` overrunning its highlight.
- Removed the `$ tree` prompt and the words "router" and "deterministic".
- The empty band at y 740–930 is now used. Every label is 24px or larger.
- The robot is the canonical block at s 0.8. The magnifier prop was tried and then removed, because the reviewer
  judged it ambiguous at portal scale.

**Gate:** 0 hard (1 REVIEW = the robot's belt, acknowledged) · **Robot check:** OK (s=0.8) · **Visual review:**
PASS after one round (fixes: removed the magnifier, pulled the arrow tips off the folder borders, put the opened
asset first, evened out the side margins).

### 4 · `04-level3-orchestrator` · "One Skill Runs the Others, In Order"
**Job:** Level 3 as a plant only. v4 teaches the detail.

**What the viewer sees:**
- **Top:** a dashed box. Inside it at the top is the lead card: folder `weekly-email/`, labelled "the lead skill".
- **The four steps:** a rail comes down from the lead card with an arrow into each of four step cards,
  STEP 1 to STEP 4, each with a folder icon:
  - `pull-stats/` · "gets last week's numbers"
  - `what-worked/` · "finds the winners"
  - `draft-email/` · "writes next week's email", with "↑ you build this one first" underneath
  - `qa-draft/` · "checks it against your rules"

  Arrows from each step to the next show the order.
- **Right:** an arrow leaves step 4, crosses the box edge, and reaches an ink stick figure: "you · review the
  draft".
- **Caption under the box:** "A skill system — you'll build this next."

**What changed:**
- Deleted the "THE FOUR FOLDERS" legend panel and the per-worker folder chips.
- Cut the three metaphors (orchestrator/conductor, routing map, team/workers) down to one: the lead skill.
- publish-post/ is now weekly-email/, and the steps are the §9 four with v4's exact sub-labels.
- Added "you" at the end.
- The title is now a takeaway.
- Removed "= your AI Employee".
- The robot is gone. It was not needed, and the plant stays minimal.
- There were 47 labels under 24px; now there are none.

**Gate:** CLEAN · **Robot check:** no robot · **Visual review:** PASS after one round (fixes: centred the "↑"
over draft-email/, re-centred the caption, moved the diagram down 40px for balance).

## CP3 (06 is shown first, then 05)

### 5 · `06-how-they-chain` · "Workflows Serve One Skill. Shared Skills Serve Many."
**Job:** the two kinds of home: a workflow inside one skill, or a shared skill of its own.

**What the viewer sees:**
- **Left card, "LEAD SKILL" · `weekly-email/`.** It reads "runs, in order:", then:
  1. `pull-stats/`
  2. `what-worked/`
  3. `draft-email/`, tagged "· weekly" in green
  4. `qa-draft/`
- **Right card, "LEAD SKILL" · `launch-email/`.** It reads "runs, in order:", then:
  1. `draft-email/`, tagged "· launch"
  2. `qa-draft/`
- **Center, two grey cards, both tagged "SHARED SKILL":**
  - `draft-email/` (top) shows `SKILL.md` and a green box: `workflows/`, holding `weekly.md` and `launch.md`, with
    the line "only draft-email/ uses these".
  - `qa-draft/` (bottom) reads "checks it against your rules".
- **Arrows:** both lead cards send an arrow to `draft-email/` and another to `qa-draft/`. Four arrows, and none
  cross. They show that the same two shared skills are called by both lead skills.
- **Legend at the bottom:** a grey card swatch for "shared skill — its own folder", and a green box swatch for
  "workflow — a file inside one skill".

**What changed:**
- New title. The old one was "The Three Levels Compose — They Don't Compete".
- Dropped the subtitle "read the arrows, not the names".
- Labels are by role (LEAD SKILL / SHARED SKILL / workflow), no longer "SKILL SYSTEM / ORCHESTRATOR".
- The shared-skill cards are grey/ink, not blue.
- The example is now the running one: publish-post/create-carousel and the writing-logic/write-hook/... skills
  became weekly-email/, launch-email/, draft-email/ and qa-draft/.
- The overruns on "serve one parent" are gone, and 16px headers are now 24px or larger.
- The "· weekly" / "· launch" tags show why launch appears both as a lead skill and as a version inside
  draft-email/.

**Gate:** CLEAN · **Robot check:** no robot · **Visual review:** PASS after one round (fixes: added the version
tags, shortened the legend so it doesn't repeat the title, made the running rows ink instead of grey, since grey
means "closed" on 03).

### 6 · `05-skill-vs-workflow` · "Its Own Skill, or a Workflow Inside One?"
**Job:** decide where a new addition lives.

**What the viewer sees:**
- **Top left, ink card:** "you want to add · writing subject lines".
- **Top right, green card:** "you want to add · a holiday version of the email".
- **Center:** "ask these five", with an arrow down to five numbered question pills. Each pill has an ink arrow
  left to the subject-lines answer and a green arrow right to the holiday answer.

  | # | Question | Subject lines (left, ink) | Holiday version (right, green) |
  |---|---|---|---|
  | 1 | How many skills need it? | several — both lead skills | one — only draft-email/ |
  | 2 | Would you ask for it by name? | yes — "write subject lines" | no — you ask for the email |
  | 3 | For any email, or one kind? | any email | one kind — holiday |
  | 4 | A new job, or a new version? | a new job | a new version of the email |
  | 5 | Can it work on its own? | yes — it stands alone | no — it leans on draft-email/ |

- **Bottom left, ink card:** "its own skill", showing `subject-lines/` holding `SKILL.md`.
- **Bottom right, green card:** "a workflow", showing `draft-email/` holding `workflows/holiday.md` (green fork).
- **Grey box at the bottom:** "Rule of thumb: mixed answers? Keep it nested — pulling it out later is cheap."

**What changed:**
- The colours are the right way round now: the workflow side is green and the own-skill side is ink. They used
  to be inverted.
- The rule box is grey with no book icon. It was references-blue with a book.
- The fork/"clean read" question is replaced by the plain "A new job, or a new version?".
- Old Q5 ("Parent works without it?") gave the wrong answer for the holiday example, so it is now "Can it work
  on its own?".
- The examples changed from write-hook/newsletter/"humanize this" to subject-lines/ and holiday.md.
- The "+" chip overlap and the clipped `newsletter.md` are gone.
- The robot is gone. It was legless, and the slide doesn't need it.
- The bottom two-line takeaway is cut; the rule box carries it.

**Gate:** CLEAN · **Robot check:** no robot · **Visual review:** PASS (optional arrow-spacing polish applied).

---

## Final deck order
01-three-levels → 02-level1-simple → 03-level2-workflows → 04-level3-orchestrator (CP2)
06-how-they-chain → 05-skill-vs-workflow (CP3). `map.json` is updated to this order and these titles.

**Files removed:** none.

## Flagged for the main thread
1. **CP3 wiring:** `clo-course/checkpoint-system.html` line 192 still lists `['05-skill-vs-workflow','06-how-they-chain']`.
   It should be `['06-how-they-chain','05-skill-vs-workflow']`. That file is outside my boundary, so I did not
   edit it.
2. **"this week's email" vs "next week's email":** the locked request ("Write this week's email", §9/v1) and 02's
   description say *this* week. §9's role for draft-email/, v4, and 04's sub-label say "writes *next* week's
   email". Both come from locked sources, so I kept both. Reconcile one phrasing in §9 and in the narration.
3. **05's title is a question.** The deck note locks "Its own skill, or a workflow inside one?", while §11.2 asks
   for a takeaway title. I kept the locked wording; the grey rule box carries the takeaway.
4. **New running-example file names** (not in §9; consider adding them so v1-02/04 match):
   - `workflows/weekly.md`, `workflows/launch.md`, `workflows/holiday.md`
   - `scripts/days-left.py`, `scripts/stats-table.py`
   - `references/launch-offer.md`, `references/weekly-format.md`
   - `assets/best-launch-email.md`, alongside §9's `assets/best-email.md`
   - Lead skill `launch-email/` and own skill `subject-lines/` (from the deck notes).
5. **draft-email/'s steps on 02** ("Say what happened last week · One idea, one link · Keep it under 250 words")
   deliberately avoid emojis and "lead with the number", so v5's correction still reads as new.
6. **Robots:** kept on 02 and 03 only (canonical block, s ≥ 0.78). Removed from 01, 04, 05 and 06, where they
   were decorative. No magnifier ships.
7. The filename `04-level3-orchestrator` still says "orchestrator". It is kept because the portal references
   slides by filename, and the word is not visible on the slide.
8. The deck's `storyboard.excalidraw` / `storyboard-preview.png` are stale (already a README follow-up).

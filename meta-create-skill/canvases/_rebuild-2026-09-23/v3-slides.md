# v3 · Audit the Library: rebuilt slides (2026-09-23)

Deck: `v3-audit-library/slides/` · 13 slides · shown without narration in the meta-create-skill course, lesson
"From Skill to Library" (`meta-create-skill/index.html` → `AUDIT_SLIDES`). **That array is already in the final
order below (checked line 553), so no rewire is needed.** No files removed or renamed.

## Deck-wide conventions (so the slides read as one system)

- **Running example:** the Weekly Email library (§9) grown messy: `weekly-email/`, `pull-stats/`, `what-worked/`,
  `draft-email/` (`workflows/weekly.md`, `launch.md`, plus the orphan `old-promo.md`), `qa-draft/`, plus the stray
  duplicate `email-writer/`. draft-email/'s description is always "Writes this week's email", email-writer/'s is
  always "Drafts my weekly newsletter", and qa-draft/'s is always "...against my rules".
- **One name per signal** (on 02, every card tag, the 03 report, 04 and 05): 1 Duplicate skills · 2 Collisions ·
  3 Buried routing · 4 Missing pointers · 5 Orphan workflows · 6 Overloaded skill · 7 Copied steps · 8 Stale rules.
- **Red circled numbers = signal numbers** (01, 02, 03, 04). On 02 the three in the messy library (1, 2, 5) are red
  and the other five are ink.
- **Card layout (all eight cards, generated from one template, so the geometry is identical):**
  - top-left: a grey pill tag "SIGNAL n OF 8 · NAME"
  - top-right: a severity badge in one ink/grey style (HIGH = filled ink, MEDIUM = ink outline, LOW = grey outline)
  - a takeaway-sentence title, 50px
  - the problem diagram, y 176–790
  - a "THE FIX" box, y 812–968, with a green check, a divider, then one bold line plus one supporting line or snippet
  - no "HOW THE AUDIT SPOTS IT" strip (it was a third prose line)
- **Colour:** red = the problem · green = the workflows/ folder name and fork icon, plus ✓ "fixed" checks · everything
  else ink/grey. No amber, blue or purple outside the robot's toolbelt.
- **Robots:** 12 canonical blocks via `_tools/robot.py block` (s 0.8 solo, 0.75 on 04/02-8, 0.7 × 2 on 05), each
  captioned by role. The props are separate shapes at the right gripper: a magnifier on 02 and 03, a coin on 02-1.
- **Type:** every text ≥ 24px. The gate was also run with `--floor 24`: 0 hard on all 13.

---

## Main path

### 1 · `01-before-skill-soup` · "A Messy Library Makes the AI Pick the Wrong Skill"
**Job:** show the same Weekly Email library grown messy, with its three problems numbered by signal.

**What the viewer sees:**
- **Left: a folder window titled `skills/`** with two columns, "skill" and "what its description says". Rows, top to bottom:
  - `weekly-email/` "runs the whole job, start to finish"
  - `pull-stats/` "gets last week's numbers"
  - `what-worked/` "finds the winners"
  - `email-writer/` "drafts my weekly newsletter" and `draft-email/` "writes this week's email · **check my email**" (red), sharing one pink band with a red ① in the left gutter
  - under draft-email/: green `workflows/` (with its fork icon) holding `weekly.md`, `launch.md` and a red `old-promo.md` "← no routing row points here" (pink band, red ⑤)
  - `qa-draft/` "checks against my rules · **check my email**" (red)
  - a red ② sits right after each of the two red "check my email" phrases
- **Right, a key:** ① DUPLICATE SKILLS "same job, different words" · ② COLLISIONS "two jobs claim the same words" · ⑤ ORPHAN WORKFLOWS "a file nothing points to".
- **Below the key:** a "you ask: check my email" pill with an arrow into the robot, and a red "?" by its head. Caption: THE AI · "two skills claim it — which one?"
- **Bottom line:** "Every skill made sense the day you added it. Nobody re-checked the whole library."

**Changed:**
- The library is now the running example. The old write-hook/humanize names are gone.
- The robot is canonical and fully visible (it was a head hidden under a pill).
- Problems carry signal numbers 1/2/5 (they were "PROBLEM 1/2/3").
- The claimed phrase is shown beside both colliding rows.
- The "healthy" label that was cut by the border is gone.
- Title and bottom line no longer repeat each other.

**Gate:** 0 hard (REVIEW = robot-belt accents + estimated text overlaps; browser-measured bounds show 0 overlaps) · **robot:** s 0.8 OK · **review:** PASS (2nd pass).

### 2 · `02-the-eight-signals` · "The Audit Checks Every Skill for Eight Problems"
**Job:** the index. Eight named problems, each with a severity.

**What the viewer sees:**
- **Left:** the robot holding a magnifier, captioned THE AI · "running the audit".
- **Right:** an inspection clipboard with columns SIGNAL · WHAT IT LOOKS LIKE · SEVERITY, and eight rows:
  1. **Duplicate skills** "two skills do the same job" HIGH
  2. **Collisions** "two different jobs claim the same words" HIGH
  3. **Buried routing** "the routing table sits too low in SKILL.md" HIGH
  4. **Missing pointers** "a skill never says “not me — use that one”" LOW
  5. **Orphan workflows** "a workflow file nothing points to" HIGH
  6. **Overloaded skill** "one skill doing unrelated jobs" MEDIUM
  7. **Copied steps** "the same step pasted into two skills" MEDIUM
  8. **Stale rules** "old rules nobody re-checks" MEDIUM
- Numbers 1, 2 and 5 are in red circles, the rest in ink.
- **Bottom line (the deck map):** "Red = the three in the messy library, up next. The other five close the deck."

**Changed:**
- One name per signal (it had three different sets of names).
- The group headers (a second taxonomy) are gone.
- Descriptions went from 20px to 26px.
- The amber MEDIUM badges are now ink/grey.
- The hand-drawn robot was replaced.
- A red-means-next legend was added, since there is no narration.

**Gate:** 0 hard · **robot:** s 0.8 OK · **review:** PASS.

### 3 · `02-1-duplicate-standalones` · "Two Skills Doing One Job — the AI Flips a Coin"
**Job:** signal 1: two skills doing the same job, described in different words.

**What the viewer sees:**
- **Top centre:** "you ask: Write this week's email" pill → an arrow down to the robot, which holds a coin. Caption: THE AI · "flips a coin". Dashed arrows run left and right from the robot.
- **Left file card:** `draft-email/SKILL.md` — name: draft-email, description: "Writes this week's email." (pink highlight). Under it: "you keep improving this one…"
- **Right file card:** `email-writer/SKILL.md` — description: "Drafts my weekly newsletter." (pink highlight). Under it, in red: "…but sometimes the AI picks this one".
- A red bracket joins the two captions: **"same job, different words"**.
- **THE FIX:** "Keep one skill for the job: merge email-writer/ into draft-email/." / "Now every fix you make lands in the skill the AI actually uses."
- **Tag and badge:** SIGNAL 1 OF 8 · DUPLICATE SKILLS · SEVERITY · HIGH.

**Changed:**
- The two descriptions now use different words (they were identical, which made this card look like 02-2).
- "USE WHEN" syntax, ">50% overlap" and "standalones" are gone. The 16px "50/50" text is gone.
- Canonical robot with a real coin prop.

**Gate:** 0 hard · **robot:** s 0.8 OK · **review:** PASS.

### 4 · `02-2-trigger-collisions` · "Two Jobs, Same Words — the Wrong Skill Answers"
**Job:** signal 2: two clearly different jobs claim the same phrase.

**What the viewer sees:**
- **Left:** "you ask: Check my email" pill → the robot with a red "?". Caption: THE AI · "both skills say they fit". Two red dashed arrows run to the right.
- **Right, two stacked file cards:**
  - `draft-email/SKILL.md`, header "its job: WRITES the email"; description "Writes this week's email." and, highlighted red, "Check my email."
  - `qa-draft/SKILL.md`, header "its job: CHECKS the email"; description "Checks the draft against my rules." and, highlighted red, "Check my email."
- **Red consequence line:** "Sometimes the writer answers when you wanted the checker."
- **THE FIX (shown inside a description):** "Delete the shared words from one description:" / `draft-email/ → Writes this week's email.` with "Check my email." struck through in red / "Now “check my email” has one owner: qa-draft/."
- **Tag and badge:** SIGNAL 2 OF 8 · COLLISIONS · HIGH.

**Changed:**
- humanize/ vs writing-humanize/ (which read as the same job) became two clearly different jobs.
- "USE WHEN / Do NOT use when" is gone. The fix is shown in the description itself.
- Different layout from 02-1, so the two cards read as different lessons (the reviewer confirmed).

**Gate:** 0 hard · **robot:** s 0.8 OK · **review:** PASS.

### 5 · `02-5-orphan-workflows` · "A Workflow the Routing Table Skips Never Runs"
**Job:** signal 5: a workflow file that no routing row points to.

**What the viewer sees:**
- **Left:** folder window `draft-email/workflows/` (workflows/ in green) listing `weekly.md`, `launch.md` and a red `old-promo.md` on a pink band.
- **Middle:** `draft-email/SKILL.md` with "## Routing":
  - "weekly email → workflows/weekly.md" and "launch email → workflows/launch.md", each with an ink arrow pointing left into its file
  - a red dashed empty row, "no row for old-promo.md"
  - a red X in the gap where old-promo.md's arrow would be
- **Right:** the robot looking at the table. Caption: THE AI · "opens only the files the table lists".
- **Red line:** "old-promo.md sits in the folder, but the AI never opens it."
- **THE FIX:** "Add a row for it in the routing table — or delete the file." / "Every workflow in the folder is one the AI can reach."
- **Tag and badge:** SIGNAL 5 OF 8 · ORPHAN WORKFLOWS · HIGH.

**Changed:**
- The running example replaces write-content/newsletter.md.
- "Dead code" and "Diff" are gone.
- The legless robot was replaced.
- The garden-path title was reworded (reviewer).

**Gate:** 0 hard · **robot:** s 0.8 OK · **review:** PASS.

### 6 · `03-how-the-audit-runs` · "The Audit Reads Every Skill and Changes Nothing"
**Job:** the audit reads everything, reports one signal per finding with evidence, and edits nothing.

**What the viewer sees:**
- **Left:** the messy library as a plain `skills/` folder window: weekly-email/, pull-stats/, what-worked/, email-writer/, draft-email/ (workflows/: weekly.md, launch.md, old-promo.md), qa-draft/. Under it: "read only · nothing changes".
- **Middle:** arrow → the robot with a magnifier. Caption: THE AI · "reads every file of every skill".
- **Right:** arrow → a "Library audit" report, subtitled "6 skills read · 3 findings · sorted by severity". Each finding has a red signal circle, a HIGH badge, a name, where, and quoted evidence:
  - ① **Duplicate skills** · `email-writer/ + draft-email/` · "“my weekly newsletter” = “this week's email”"
  - ② **Collisions** · `draft-email/ + qa-draft/` · "both descriptions say “check my email”"
  - ⑤ **Orphan workflows** · `draft-email/workflows/old-promo.md` · "no routing row points to it"
- **Bottom line:** "One signal per finding, with the evidence. Fixing waits for your yes."

**Changed:**
- "Reads every skill" replaces "every skill's description" (which contradicted the cards).
- One signal per finding (one finding had mixed "Duplicate · trigger collision").
- The mini eight-signal box and the green stamp are gone.
- 47 labels under 24px were fixed.
- Canonical robot.

**Gate:** 0 hard · **robot:** s 0.8 OK · **review:** PASS.

### 7 · `04-the-fix` · "Fix What the Audit Found — One Yes at a Time"
**Job:** you say it in plain words, the AI asks before each change, and every fix really removes its signal.

**What the viewer sees:**
- **Left column:** a speech bubble "Fix what the audit found." from an ink stick figure YOU → an arrow down to the robot. Caption: THE AI · "asks before each change".
- The robot's arrow points into a bracket around three repair rows. Each row is: red signal header, before box → labelled arrow with "✓ your yes" → after box.
  - **① DUPLICATE SKILLS:** before `email-writer/` (struck red) + `draft-email/` → "merge" → after `draft-email/` "email-writer/ merged in".
  - **② COLLISIONS:** before draft-email/ description "Writes this week's email." + "Check my email." (struck red) → "cut 3 words" → after "Writes this week's email." / "qa-draft/ now owns that phrase".
  - **⑤ ORPHAN WORKFLOWS:** before `draft-email/workflows/` weekly.md, launch.md, old-promo.md (struck) → "delete" → after weekly.md, launch.md / "old-promo.md deleted".
- **Bottom line:** "Every fix removes the problem itself, so the next audit won't find it again."

**Changed:**
- "The upgrade step" is renamed in the viewer's words ("fix what the audit found").
- The collision fix now REMOVES the phrase from one description. The old "Do NOT use when → writing-voice" didn't resolve the collision.
- The 16px "DISAMBIGUATE" and the labels under chevrons are gone.
- The owner gate is now a visible "your yes" on each fix.

**Gate:** 0 hard · **robot:** s 0.75 OK · **review:** PASS.

### 8 · `05-after-clean-library` · "After the Fix, Every Request Finds One Skill"
**Job:** the after state. The same library with 04's three fixes applied, and both problem requests routing to exactly one skill.

**What the viewer sees:**
- **Left:** a `skills/` folder window: weekly-email/, pull-stats/, what-worked/, draft-email/ (✓ "email-writer/ merged in"), workflows/ with weekly.md and launch.md, a grey struck ghost row old-promo.md (✓ "deleted"), qa-draft/ (✓ "now owns “check my email”").
- **Right, two lanes with the same robot:**
  - "you ask: Write this week's email" ("before: 2 skills fit") → THE AI → `draft-email/` ✓ "one match"
  - "you ask: Check my email" ("before: 2 skills fit") → THE AI → `qa-draft/` ✓ "one match"
- **Bottom line:** "One request, one skill — so the same request gets the same quality every week."

**Changed:**
- Nothing vanishes silently: email-writer/ is noted as merged, old-promo.md stays as a struck row, and qa-draft/'s ownership is shown.
- Both the duplicate request and the collision request are demonstrated (it used to show only the duplicate).
- It no longer depends on the appendix.

**Gate:** 0 hard · **robot:** 2 × s 0.7 OK · **review:** PASS.

---

## Appendix: the other five signals (same card layout, "SIGNAL n OF 8" tag)

### 9 · `02-3-missing-workflow-routing` · "Routing Buried at the Bottom Gets Skipped"
**Job:** signal 3: the routing table sits below other sections, so it isn't acted on.

**What the viewer sees:**
- **Left:** `draft-email/SKILL.md` top to bottom: the --- name/description --- header, then "## Purpose", "## Background" and "## About this skill" with a filler line each.
- A dashed fold: "acted on ▲" above it, red "skipped ▼" below.
- Below the fold, greyed out: "## Routing" with the weekly and launch rows.
- **Middle:** the robot looking at the top of the file. Caption: THE AI · **"acts on the first sections it reads"** (the bridge to v1-05: the whole file loads, and the top is what gets acted on).
- **Right:** a green `workflows/` folder (weekly.md, launch.md), "ready, but never opened". A dashed line from the buried rows to the folder has a red X and "never reached".
- **THE FIX:** "Move the routing table up, right under name and description." / "The first thing the AI acts on is which file each job needs."
- **Tag and badge:** SIGNAL 3 OF 8 · BURIED ROUTING · HIGH.

**Changed:**
- The bridge line was added (the old one said "reads top-down, stops early", which contradicted v1-05).
- The name now matches the index.
- The metrics-report example was replaced by draft-email/.
- The subtitle/badge collision is gone.

**Gate:** 0 hard · **robot:** s 0.8 OK · **review:** PASS.

### 10 · `02-4-no-cross-skill-callouts` · "Without Pointers, a Skill Never Hands Off"
**Job:** signal 4: a skill with no pointer lines keeps a job that belongs to another skill.

**What the viewer sees:**
- **Left:** "you ask: Now check it against my rules" → the robot. Caption: THE AI · "already in draft-email/". A red arrow labelled "keeps it" runs into the file.
- **Middle file:** `draft-email/SKILL.md`: description "Writes this week's email."; "## Steps 1. write this week's email 2. save it to drafts/"; a red dashed empty box, "no line says “checking? → qa-draft/”".
- **Right:** a `qa-draft/` folder chip, "where the check belongs". A grey dashed path from the robot to it has a red X and "never handed off".
- **Red line:** "The writer does a rough check itself. qa-draft/ never runs."
- **THE FIX:** the two added lines as they'd appear in the file:
  - `+ Checking a draft against my rules? Hand off to qa-draft/.`
  - `+ Need last week's numbers? Hand off to pull-stats/.`
- **Tag and badge:** SIGNAL 4 OF 8 · MISSING POINTERS · LOW.

**Changed:**
- The "publish this post" island metaphor and its squiggles are gone. The robot is now the actor.
- The two pointer lines are shown in the real file.
- "Greps" and "siblings" are gone.

**Gate:** 0 hard · **robot:** s 0.8 OK · **review:** FAIL in pass 2 (missing "you ask:" label, "your" vs "my rules"); both fixed and re-checked by me.

### 11 · `02-6-bloated-orchestrators` · "One Skill Doing Unrelated Jobs Should Be Split"
**Job:** signal 6: one skill doing unrelated jobs, and a split that accounts for every workflow.

**What the viewer sees:**
- **Left:** a folder window `weekly-email/` with description "Runs the weekly email. Now invoices, hiring too." Its workflows/ (green) holds five files, bracketed into three jobs:
  - run-weekly.md → **email**
  - send-invoice.md, chase-late.md → **invoices**
  - job-post.md, interviews.md → **hiring**
- **Right:** an arrow from each bracket to its own folder: `weekly-email/` (run-weekly.md), `invoices/` (send-invoice.md · chase-late.md), `hiring/` (job-post.md · interviews.md). Under them: "5 workflows in, 5 out — nothing lost".
- **THE FIX:** "Split it by job: the email, invoices and hiring each get a skill." / "weekly-email/ goes back to one job: running the weekly email."
- **Tag and badge:** SIGNAL 6 OF 8 · OVERLOADED SKILL · MEDIUM.

**Changed:**
- It is now one skill doing unrelated jobs (it was "bloated orchestrators").
- The split accounts for every workflow (the old one dropped 6 of 11).
- The amber strain marks are gone.

**Gate:** CLEAN · **robot:** none · **review:** PASS.

### 12 · `02-7-missing-shared-delegation` · "A Step Copied Into Two Skills Drifts Apart"
**Job:** signal 7: the same step copied into two skills drifts apart, and the fix gives it one home.

**What the viewer sees:**
- **Two file cards, side by side:**
  - `draft-email/SKILL.md` "## Steps": 1. write this week's email · 2. check it against my voice rules: always add a P.S. · lead with the number "← new rule" · 3. save it to drafts/. Footer: "updated last week".
  - `weekly-email/SKILL.md` "## Steps": 1. run the other skills · 2. the same check: always add a P.S. · red "missing: lead with the number" · 3. send you the draft. Footer, in red: "never got the new rule".
- A connector between the grey-shaded step blocks: "same step, written twice".
- **Red line:** "You updated one copy. The other copy never heard about it."
- **THE FIX:** "Give the step one home: qa-draft/. Both skills hand off to it." / `draft-email/ → qa-draft/ ← weekly-email/` "one copy, one place to update".
- **Tag and badge:** SIGNAL 7 OF 8 · COPIED STEPS · MEDIUM.

**Changed:**
- Insider jargon is gone (staccato, em-dashes, substack, shift).
- The shared home is qa-draft/, not a new humanize-voice/.
- The overlaps and the unnumbered step 2 are fixed.
- The amber highlight is now neutral grey.

**Gate:** CLEAN · **robot:** none · **review:** PASS.

### 13 · `02-8-sediment` · "Old Rules Pile Up and Nobody Re-checks Them"
**Job:** signal 8: old rules pile up. Test each one, and retire it only with your yes.

**What the viewer sees:**
- **Left:** `draft-email/SKILL.md` "## Rules" with added-dates (24px mono):
  - Current, no flag: lead with the number 2026-09 · no emojis 2026-09 · keep it under 200 words 2026-06.
  - On pink bands with red bars:
    - no em-dashes 2025-11 · "fails B · qa-draft/ already catches these"
    - never say “delve” 2025-08 · "fails A · nobody remembers why it's here"
    - always add a P.S. 2025-05 · "fails C · also written in weekly-email/"
- **Right:** a card "ASK OF EVERY OLD RULE", worded so that "yes" = stale:
  - A "Has everyone forgotten its reason?"
  - B "Does something else already do it?"
  - C "Is it written somewhere else too?"
  - then **"Any “yes” means it fails → review it"**
- Below the card: the robot. Caption: THE AI · "asks all three, rule by rule".
- **THE FIX:** "Review any rule that fails. Retire it only with your yes." / "Nothing is deleted on sight — you decide each one."
- **Tag and badge:** SIGNAL 8 OF 8 · STALE RULES · MEDIUM.

**Changed:**
- The logic is now "fails any one" (it said "fails all three", yet each example failed exactly one).
- All three questions share one polarity.
- The dates went from 17px to 24px.
- The robot is canonical (its arms used to be a V).
- The name is now "Stale rules" (it was "Sediment pass").

**Gate:** 0 hard · **robot:** s 0.75 OK · **review:** PASS.

---

## Final deck order
01-before-skill-soup → 02-the-eight-signals → 02-1-duplicate-standalones → 02-2-trigger-collisions →
02-5-orphan-workflows → 03-how-the-audit-runs → 04-the-fix → 05-after-clean-library → *appendix:*
02-3-missing-workflow-routing → 02-4-no-cross-skill-callouts → 02-6-bloated-orchestrators →
02-7-missing-shared-delegation → 02-8-sediment. `map.json` updated to this order. No file removed.

## Verification
- `excali-gate.py`: 0 hard on all 13. The remaining REVIEWs are of two kinds, both expected:
  - the >3-accent flag, triggered only by the robot's toolbelt legend
  - estimated text-box overlaps on 01, 02 and 02-2 (the gate counts adjacent split text as overlapping); a headless-Chrome measurement of the real rendered text bounds found 0 overlaps on all 13
- `robot.py check v3-audit-library/slides/*.html`: exit 0.
- `render.ps1` at 2× (3200×2100) for every slide.
- `excali-reviewer`, two passes:
  - pass 1: 7 PASS / 6 FAIL; every fix was applied
  - pass 2: 12 PASS / 1 FAIL (02-4, one missing label); fixed and re-checked

## Flagged for the main thread
1. **02-6 uses `weekly-email/`, not `email-everything/`.** The brief's example ("e.g. an email-everything/") would have to split its email work into a draft-email/ that already exists. That is signal 1 created by the fix, and the reviewer caught it. So the overloaded skill is the lead skill that grew invoice and hiring workflows. Revert only if you prefer the literal name. It would then need a "different library" label.
2. **02-8 dropped the tan "sediment" fill for the deck's pink problem tint.** The name is now "Stale rules", and every other card marks problems in pink. DESIGN-SYSTEM §3b still names "the tan sediment fill in 02-8-sediment" as the one semantic warm colour. Update §3b if you keep this.
3. **02-8 wording.** The questions are lettered A/B/C, because ink circled numbers read as signal numbers. The locked "fails any one → review it" appears as "Any “yes” means it fails → review it" so the polarity is spelled out.
4. **02-4 frames Missing pointers as "never hands off".** The AI, already working in draft-email/, keeps "Now check it against my rules" instead of passing it to qa-draft/. It is still draft-email/ taking qa-draft/'s job, as locked, but with a correct description ("Writes this week's email"). A vague catch-all description would have taught signal 2's fix instead.
5. **Trees show only draft-email/workflows/.** The §9 file list (scripts/check-links.py, references/voice-rules.md, assets/best-email.md …) isn't drawn, because no signal involves those folders and they would add three more legend colours. The names shown (weekly.md, launch.md) match §9.
6. **Severities kept from the old index:** 1, 2, 3 and 5 HIGH · 4 LOW · 6, 7 and 8 MEDIUM. The 03 report's three findings are therefore all HIGH, so "sorted by severity" isn't visibly exercised. Harmless.
7. **Optional polish the reviewer offered that I did not take:**
   - drop "##" from file headings; kept, because it is real file syntax (§2)
   - reword 02's bottom line to "…shown on the same skills…"
   - 02-4's Steps (write → save) differ from 02-7's (write → check → save); that is intentional, since 02-4's skill has no check
8. **Still stale (existing follow-up in README):** `v3-audit-library/storyboard.excalidraw` and `storyboard-preview.png`.
9. **The HTML files are standalone** and can be edited directly. I generated them from throwaway templates in my session scratchpad, which will not persist.

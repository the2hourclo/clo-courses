# Audit findings — v1–v3 (2026-09-23, read-only review of every PNG + HTML)

Portal scale ×0.6675 (24px→16, 20px→13, 17px→11). Nothing was edited by the review.

## 1. Mascot — every robot in v1–v3 is off-model

`canonical-robot` / `eyeGlow` appear 0 times in all 25 HTML files. 19 hand-drawn robots, all missing:
antenna glow ring, ear nubs, eye glow (flat dots), orange `#c2410c` chest panel with 3-dot header (they
have a grey rect), SKILLS toolbelt, elbowed arms with round grippers, thick legs + feet. Swap with
`python _tools/robot.py block --cx X --feet Y --s S` (s ≥ 0.75). v1-01's "WITHOUT A SKILL" robot will
wear the SKILLS belt — keep the block verbatim; the lane tag carries the difference.

| Slide | Now | cx / feetY / s today |
|---|---|---|
| v1-01 (two) | stick robot, green eyes | 560/490/.69 and 560/880/.69 |
| v1-05 | magnifier arm | 160/440/.60 (keep magnifier as a separate prop at the right gripper) |
| v2-01 | magnifier | 164/309/.47 |
| v2-02 | — | 770/876/.48 |
| v2-03 | magnifier | 150/467/.43 |
| v2-04 | — | 160/440/.60 |
| v2-05 | no legs, holds "+" | 624/~300/.42 (move "THE AI" label to y≈320) |
| v2-06 | — | 160/340/.58 |
| v3-01 | ONLY THE HEAD SHOWS — body hidden under the "write a hook" pill; red antenna, black eyes | 1230/~330/.50 (move pill left) |
| v3-02 | magnifier, black eyes + antenna | 190/552/.52 |
| v3-02-1 | no legs (coin where legs go), red antenna | 800/~320/.40 (coin to y≈350) |
| v3-02-2 | no legs, red antenna | 800/~575/.40 |
| v3-02-3 | no legs | 920/~470/.40 |
| v3-02-5 | no legs | 1370/~498/.40 |
| v3-02-8 | no legs, arms are a V from the checklist | 1190/~705/.45 |
| v3-03 | magnifier | 514/426/.60 (inside `translate(354,-14)`) |
| v3-04 | no legs, holds green marker | 345/~650/.42 (labels down ~25px) |
| v3-05 | no legs | 1230/~430/.40 (inside `translate(606,120)`) |

No robot: v1-02, 03, 04, 06; v3-02-4, 02-6, 02-7. v3-02-4 needs one ("grabs it" has no actor).

## 2. Per slide

### v1 · What Is a Skill
- **01 Why a Skill** — same request, same AI; the skill in the Process lane makes the output usable. Bubble tail cuts "one request · both paths". Five pills use the four folder colours before any folder is named (unexplained code). "conventions + order" and "the steps" overlap. List doesn't match DESIGN-SYSTEM §6's four inputs. Bottom line repeats the title. Labels the with-skill robot "an AI Employee" (wrong per §10). **Fix:** tag each pill with its home ("gold example → assets/"), merge the overlapping pills, move the tail, caption robots "the same AI".
- **02 Anatomy** — a skill is a folder with one required file + four optional. "REQUIRED" spills out of its badge. Comments 23px. "carve-outs", "routing map", "no text loaded" used undefined. `$ tree` terminal. **Fix:** widen badge, comments 26px, plain words ("# code the AI runs without reading it"), draft-email/ files.
- **03 Inside SKILL.md** — header decides whether it fires; body = map to workflows. Header box is blue (references colour). Example is `meta-create-skill` (recursive for a newcomer). "→ 'the AI's router landing page' (covered in depth elsewhere)" = two metaphors + a deferral. Body shows "When to Activate" right after saying the description decides — leaves "which part decides?" open. CORE INSTRUCTIONS arrow points at When to Activate. **Fix:** ink header box, draft-email/SKILL.md, "the AI reads this to decide whether to use the skill", replace When to Activate with "## Steps".
- **04 Four Folders** — what each folder is for, with a real file. Re-teaches 02's per-folder comments. Assets card shows `templates/orchestrator-skill-template.md` (not in assets/, "orchestrator" is a v2 term). Jargon: "deterministic" ×2, "source never loads", "eval-results viewer", "frontmatter.md" before 06. Assets caption runs past card edge. **Fix:** running-example files; drop the second caption line on each card.
- **05 Read & Load** — scans every description → loads one SKILL.md → folders on demand. No request on the slide, so "MATCH 'write an email' fits" matches nothing visible. Load arrow crosses "publishing/" and "TIER 2". 19 labels < 24px incl. every tier sub-line (20px — the actual lesson) and "AS THE AI READS EACH ROW" (18px). "'a sequence'? no" cryptic. Subtitle "progressive loading" jargon. **Fix:** add the request bubble beside the robot, route the arrow down the left gutter, tier sub-lines 24px.
- **06 Frontmatter** — two required fields + five optional dials. The block has had three names (header / THE DESCRIPTION / YAML frontmatter). Required green, dials blue (legend colours). Router box re-teaches 03 + 05. Dial captions opaque ("no bleed-through", "like a slash command"). Five identical gauge icons. **Fix:** "the header (frontmatter)", ink required box, drop router box, "safe to ignore until you need one", MOVE right after 03.

### v2 · Types of Skills
- **01 Three Levels** — three sizes. "MORE CAPABLE →" collides with subtitle. The Level-3 defining line "coordinates a team of skills = your AI Employee" is 17px. Level-3 example `content-pipeline/` never reappears (04/06 use `publish-post/`). L2 = "several jobs · one skill" but 03 titled "One Job…". 26 labels < 24px. **Fix:** drop dashed arrow, L3 line 24px, one L3 name (weekly-email/), L2 = "one job, several versions".
- **02 Level 1** — one job = one SKILL.md. "what the one file holds:" jammed on border. "# nothing else — that's the whole skill" 18px touching bottom border. Blue box labelled "THE DESCRIPTION" but holds `name` too. 33 labels < 24px. **Fix:** cut the crossed-out folder row (subtitle says "no folders"), spend space on type size; ink box "the header".
- **03 Level 2** — one skill using all four folders on a real job. Title contradicts 01. Five collisions (request quote hits pill, REQUIRED overflows, arrow strikes "# the router", "pulls" on its arrow, `newsletter.md` overruns highlight). Subtitle mixes skill name and request. ~190px empty (y≈740–930) while 24 labels ≤ 21px. **Fix:** "One Skill, Several Versions of the Job — Each Pulls Only What It Needs"; use the empty band to enlarge text.
- **04 Level 3** — a lead skill runs a team = a Skill System. 47 labels < 24px (tied worst). Three metaphors (orchestrator/conductor, routing map, team/workers). "THE FOUR FOLDERS" panel re-teaches v1-04. "Each worker is its own full skill — with all four folders" contradicts 01. "published post" overruns card. Title is a label. **Fix:** delete legend panel + per-worker folder chips, one metaphor ("lead skill"), "One Skill Runs the Others, In Order". Keep it a PLANT — v4 owns the detail.
- **05 Skill vs Workflow** (shown in CP3) — five questions decide own-skill vs workflow. Colours inverted ("ITS OWN SKILL" green = workflows colour; "A WORKFLOW" ink). Rule of Thumb box blue with book icon (references legend). "+" chip overlaps "a new capability to add". `newsletter.md` clipped. Left example write-hook, Q2's example "humanize this". "Needs a clean read?" depends on fork/context never taught. **Fix:** green on the workflow side, ink on the skill side, grey rule box; show AFTER 06.
- **06 How They Chain** (shown in CP3) — workflows serve one parent, shared skills serve many. `publish-post/` now holds newsletter/email/thread workflows (same files 03 put in `write-content/`; 04 said publish-post "does none of the work"). Subtitle "Read the arrows, not the names" admits labels don't help. Title says "Three Levels" but nothing maps to a level. Shared skills blue. "…serve one parent" overruns both green boxes. Headers 16px. **Fix:** "Workflows Serve One Skill. Shared Skills Serve Many."; running example; grey shared-skill cards.

### v3 · Audit the Library
- **01 Skill Soup** — growing library develops duplicates, orphans, collisions. Robot hidden behind pill. Numbering doesn't match 02 ("PROBLEM 2 · ORPHAN" is Signal 5, "PROBLEM 3 · COLLISION" is Signal 2). "healthy · one clear home" cut by box border. "both claim 'humanize this'" has no on-screen evidence. **Fix:** move pill, use signal numbers, show the claimed phrase beside the two rows.
- **02 Eight Signals** — index of eight checks. Names don't match cards ("Missing workflow routing" → "The Routing Table Is Buried", "Bloated orchestrators" → "One Skill Trying To Do Everything", "Stale rules" → "Sediment"); 03 uses a third set. Group headers add a second taxonomy. Descriptors 20px. MEDIUM amber (scripts colour). **Fix:** ONE name per signal on index, card title, report and filename.
- **02-1 Duplicate** — two skills doing one job. Both descriptions claim 'write a hook' → looks identical to 02-2. "50/50 coin flip" 16–17px. ">50% overlap" unexplained. "standalones" jargon. **Fix:** same job described in different words; "Two Skills, One Job — The AI Flips a Coin".
- **02-2 Collision** — one phrase claimed by two different skills. humanize/ vs writing-humanize/ read as the same job (looks like 02-1). "USE WHEN"/"Do NOT use when" never taught. Badge styled differently from 02-1. **Fix:** two clearly different jobs sharing one phrase (draft-email/ and qa-draft/ both claiming "check my email"); one-line fix shown inside the description.
- **02-3 Buried Routing** — routing table goes first. "reads top-down, stops early" contradicts v1-05. Subtitle runs into HIGH badge. Title ≠ index name. **Fix:** bridge line ("it acts on the first sections it reads"), match the name.
- **02-4 No Callouts** — a skill that can't point elsewhere steals other skills' jobs. write-hook/ grabbing "publish this post" isn't believable. Decorative "~" squiggles. Empty top (y 220–370). Empty folder icons (fix never shown in a file). Line strikes "write-content/". "greps", "siblings". **Fix:** draft-email/ grabbing "check this against my rules" (belongs to qa-draft/); show the two added lines; add a robot; remove squiggles.
- **02-5 Orphan** — workflow with no routing row is unreachable. Clearest card. Only "dead code", "Diff" and the legless robot need changing.
- **02-6 Bloated** — a skill covering unrelated jobs should be split. `write-content/` isn't a lead skill by v2's definition, yet index says "Bloated orchestrators". Split keeps 5 of 11 workflows (invoicing, sales-page, taxes, hiring, ad-copy, contracts vanish) while saying "2–3 focused skills". Stray amber "≡" marks. **Fix:** "One skill doing unrelated jobs"; split accounts for every workflow.
- **02-7 Shared Delegation** — a step copied into two skills drifts; give it one shared home. Insider jargon ("fix staccato", "kill em-dashes", "format for substack", "pick the shift"). Step 2 unnumbered. "SAME BLOCK, WRITTEN TWICE" overlaps bracket; "the copies already disagree" touches card. Shared skill `humanize-voice/` (a job with five names). **Fix:** running example; "The Same Step, Copied Into Two Skills".
- **02-8 Sediment** — old rules pile up; retire only with your yes. Says "fails all three → sediment" but each example fails exactly one. Mixed polarity (a "no" fails Q1, a "yes" fails Q2/Q3). 29 labels < 24px; dates 17px. **Fix:** "fails any one → review it"; word all three so "yes" = stale.
- **03 How the Audit Runs** — read-only scan → ranked report. 47 labels < 24px. "“humanize this”" overflows. Report tags write-hook + hook-writer "Duplicate · trigger collision" (blurs 02-1/02-2). "reads every skill's description" contradicts the cards (5 of 8 signals need bodies/folders). **Fix:** "reads every skill", one signal per finding, drop the mini eight-signal box.
- **04 The Fix** — approved repair merges, deletes, disambiguates. "the upgrade step" never introduced. Fix 3 adds "Do NOT use when → install voice = use writing-voice" (`writing-voice` never appeared; the shared phrase isn't removed, so the collision isn't resolved). "duplicate A"/"same trigger" under the merge chevron. "DISAMBIGUATE" (16px) crosses divider. **Fix:** name the step as a viewer would say it; fix 3 removes the phrase from one description.
- **05 After** — clean library: one request fires one skill. `humanize/` vanished though 04 said disambiguated, not merged. Only the duplicate fix demonstrated. **Fix:** keep both skills with the split visible (or make 04 a merge); also run the collision request.

## 3. Sequence verdicts
- **v1:** zoom-in works but the header is split (03, dropped 04–05, re-taught 06; router explained 3×). **Reorder 01 → 02 → 03 → 06 → 04 → 05.** 01 → 02 loses people because pill colours aren't tied to folder names. 02 and 04 overlap — trim one.
- **v2:** ladder works but examples change under the viewer (content-pipeline → publish-post; newsletter/email/thread move parents; L2 "several jobs" → "one job"). 05 interrupts; 06 shows the two kinds of home, so 05 should follow it. **Reorder 01 → 02 → 03 → 04 → 06 → 05**, strip 04.
- **v3:** nine slides separate setup (01) from payoff (03 → 05); 02-1 and 02-2 look like one lesson; 04 → 05 breaks. **Main path 01 → 02 → 02-1 → 02-2 → 02-5 → 03 → 04 → 05. Appendix after 05: 02-3, 02-4, 02-6, 02-7, 02-8.**

## 4. Cross-deck consistency
- ~25 skill names across v1–v3; v4-01 labels `draft-email/` "↑ the skill you already built" but no v1–v3 slide builds it. → DESIGN-SYSTEM §9.
- "AI Employee" defined three ways (v1-01 any AI with a skill; v2-01/04 = Skill System; v4-05 the thing that owns the system). → §10 ladder.
- Term drift: header / THE DESCRIPTION / YAML frontmatter; orchestrator / conductor / router vs "lead skill"; the voice-cleanup job has 5 names; publish-post vs publish-posts; three sets of signal names. → §10.
- Folder colours borrowed (blue: v1-03, v1-06, v2-02, v2-05, v2-06; green as "not a workflow": v2-05; amber MEDIUM: v3). → §11.7.
- Severity badge + "HOW THE AUDIT SPOTS IT" block appear in four layouts across v3 cards — pick one.
- Titles: v4+ uses takeaway sentences; v2-04/05/06 and every v3 card use labels. → §11.2.

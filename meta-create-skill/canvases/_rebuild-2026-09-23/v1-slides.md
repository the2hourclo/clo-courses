# v1 · What Is a Skill — rebuild notes (2026-09-23)

Deck folder: `v1-what-is-a-skill/slides/`. Every slide edited in place (filenames kept), rendered at 2× (3200×2100).
The running example everywhere is `draft-email/` (DESIGN-SYSTEM §9), and the request is always "Write this week's email".
Deck rule on all six slides: **a title that states the takeaway, plus one subtitle, and no bottom line**, so no two prose lines repeat.
Nothing on any slide is below 24 px. I checked this in a browser, not by estimate.
Subfolder colours appear only on subfolder names, their files, their icons, and the 01 pills that point at them.
The skill folder, the header box, badges and file-row boxes are ink or grey.
Green is used for a good outcome (01's output, 05's match) under the §11.7 carve-out.
One wording for scripts/ across the deck: **"the same way every time"**.
Legend glyphs are the same on 02, 04 and 05: workflows/ is one line splitting into two arrowheads, scripts/ is a cog with 8 square teeth.

---

## 1 · `01-why-a-skill` — Same Request, Same AI — the Skill Changes What Comes Back
**Job:** the same AI answers the same request two ways. The only difference is the skill it reads first.

**What the viewer sees**
- Title, then the subtitle "the only difference is the skill folder the AI reads first".
- A quiet grey spine across the top: INPUT → PROCESS → OUTPUT.
- **Input (left):** an ink stick figure labelled **you**, with a speech bubble whose tail points down at them: "Write this week's email". Two grey arrows fan out from the bubble, one to each lane, so it is visibly one request.
- **Top lane:** the canonical robot, captioned **the AI / no skill**.
  - Above its work: "guesses how you want it · different every time".
  - From the robot, three dashed red arrows fork in different directions, then a red "?", then a red arrow to a plain page of wavy scribbles.
  - That page is labelled **average at best** (red).
- A faint dashed line separates the two lanes.
- **Bottom lane:** the *same* robot, captioned **the same AI / with a skill**.
  - A short ink arrow labelled "reads" goes into an ink folder named **`draft-email/`**, tagged "the skill".
  - Inside the folder are five pills. Each has an arrow to where it lives:
    - "your rules + the order" → **SKILL.md** (ink)
    - "the steps for each version" → **workflows/** (green)
    - "runs the same way every time" → **scripts/** (amber)
    - "the gotchas" → **references/** (blue)
    - "your best email" → **assets/** (purple)
  - A green arrow leaves the top of the folder as a whole (its header band, not any one row). It turns down into a finished page with a green check.
  - That page is labelled **~80% to / your standard** (green), then "ready to use".

**What changed**
- **Robots:** the hand-drawn stick robots became the canonical robot, twice (s = 0.75, the same block in both lanes).
- **Captions:** "a generic AI" / "an AI Employee" became "the AI · no skill" / "the same AI · with a skill", set on two lines. The lane tags were dropped.
- **The request:** "launch email" became "this week's email", now spoken by "you" through a proper tail.
- **The skill:** it is now the named `draft-email/` folder in ink. It used to be a green box, which is the workflows colour.
- **Pills:** each one now names its home. "conventions + order" and "the steps" were merged or split into two distinct pills. Gaps between pills are now at least 12 px.
- **Output arrow:** the green arrow no longer starts at the workflows/ row.
- **Removed:** "the skill lives here" (it sat over the "?") and the bottom line (it repeated the title).
- **Outputs:** the labels now use the §10 wording.
- **Edges:** two lines that ran off the canvas are fixed.

**Checks:** gate 0 hard. There is 1 REVIEW flag (">3 accent colours"), acknowledged because the slide carries the subfolder legend and the robot's belt. Robot check: 2 robots, s = 0.75, OK. Visual review is recorded at the bottom.

---

## 2 · `02-skill-anatomy` — A Skill Is Just a Folder With One Required File
**Job:** structure only. What is physically inside a skill.

**What the viewer sees**
- Title, then the subtitle "the four folders are optional — add one only when the skill needs it".
- A plain file window. Its title bar shows three grey window dots, a folder icon and **draft-email**. There is no prompt.
- Inside, the folder is drawn as a tree with connector lines:
  - **`draft-email/`**
  - **`SKILL.md`**, with an ink **REQUIRED** badge — "your rules + the order"
  - **`workflows/`**, optional, with the split-arrow icon — "the steps for each version" → `weekly.md`, `launch.md`
  - **`scripts/`**, optional, with the cog icon — "code that runs the same way every time" → `check-links.py`
  - **`references/`**, optional, with the book icon — "the gotchas" → `voice-rules.md`
  - **`assets/`**, optional, with the stacked-pages icon — "your best email" → `best-email.md`

**What changed**
- The generic `skill-name/` became the real `draft-email/` with its files.
- The `$ tree` prompt is gone (§11.8). The title bar shows the folder name instead.
- The REQUIRED badge was widened so the word fits inside it.
- The notes grew from 23 px to 26 px and are now a few plain words each. The code-style "#" in front of them was dropped, because on 03 "#" means a heading.
- "carve-outs", "routing map" and "no text loaded" are gone. The "why" for each folder stays on 04.
- New workflows/ and scripts/ glyphs.

**Checks:** gate CLEAN · no robot · visual review at the bottom.

---

## 3 · `03-inside-skillmd` — The Header Decides If It Runs. The Body Says How.
**Job:** a SKILL.md has two parts. The header is read to decide whether to use the skill; the body says how to do the job.

**What the viewer sees**
- Title, then the subtitle "SKILL.md is a plain text file — you write it in ordinary words".
- A file card with the tab **`draft-email/SKILL.md`**.
- Top of the card, in a solid **ink box**, the header:
  - `---`
  - `name: draft-email`
  - `description: Writes this week's email in your voice. Use when asked to write or redo the weekly or launch email.`
  - `---`
- Below it, in a thin dashed grey outline, the body:
  - **# Draft Email**
  - **## Steps**:
    1. Pick the one thing worth saying
    2. Write it like `assets/best-email.md` (purple)
    3. Save it as a draft.
  - **## Which version**: a small table with the columns "Asked for…" and "Open this file". Its two rows are "this week's email → `workflows/weekly.md`" and "a launch email → `workflows/launch.md`" (green paths).
- Callouts on the right. The arrowheads stop just outside the card.
  - An arrow to the ink box: **the header** — "the AI reads this to decide whether to use the skill" (grey)
  - An arrow to the top of the dashed box: **the body** — "your instructions, in plain words" (grey)
  - Indented under "the body":
    - a grey bracket spanning all three steps: "the order to work in"
    - a grey bracket spanning both table rows: "which file to open for each version"

**What changed**
- The example is now `draft-email/SKILL.md` instead of `meta-create-skill`.
- The header box was blue (the references colour) and is now ink. The body now has its own dashed outline, so the slide reads as box against box.
- The "When to Activate" section is gone, because it contradicted "the header decides". "## Steps" and "## Which version" replace it.
- The router metaphor, "landing page" and "covered in depth elsewhere" are gone.
- The old arrows hit one line each. Brackets now span all of the steps and the whole table.
- Step 3 no longer introduces a fifth folder (`drafts/`).
- The two-line takeaway was cut.

**Checks:** gate CLEAN · no robot · visual review at the bottom.

---

## 4 · `06-frontmatter-properties` (shown 4th) — The Header Needs Two Lines. The Rest Can Wait.
**Job:** name the header ("frontmatter") once. It has two required lines and five optional settings that are safe to ignore.

**What the viewer sees**
- Title, then the subtitle "the header, called frontmatter, is everything between the two --- lines".
- The same file card with the tab `draft-email/SKILL.md`, showing only the header. Dotted leaders run from each line to a plain-words meaning on the right.
  - `---`
  - The **REQUIRED** badge (the same one as 02), then an **ink box** around two bold ink lines:
    - `name: draft-email` → "its name — the same as its folder"
    - `description: Writes this week's email…` → "tells the AI when to use it"
  - A plain grey tag, "optional · safe to ignore for now", then five grey, regular-weight rows:
    - `model: …` → which AI model runs it
    - `effort: high` → how hard it thinks
    - `context: fork` → starts with a clean slate
    - `allowed-tools: …` → which tools it may use
    - `disable-model-invocation: true` → only runs when you ask for it by name
  - `---`

**What changed**
- It now shows 4th, right after 03, and stands alone: it does not assume 04 or 05 were seen.
- The "THE AI'S ROUTER" box and the "vague description never fires" warning are gone.
- The green card and blue dials (legend colours) became one ink box, with everything else in grey or ink. The optional rows are grey, so the two required lines win the eye.
- The five identical gauge icons were dropped. The settings are real YAML lines instead.
- The captions are plain words. "no bleed-through" and "like a slash command" are gone.
- The block has one name: "the header, called frontmatter".
- The card was moved down to balance the margins. The bottom line was cut.

**Checks:** gate CLEAN · no robot · visual review at the bottom.

---

## 5 · `04-the-four-subfolders` — Each Folder Answers One Question the AI Asks
**Job:** what each optional folder is for, shown with a real file from `draft-email/`.

**What the viewer sees**
- Title, then the subtitle "the four folders inside draft-email/ · each with a real file from it".
- Four cards, 2 × 2, about 40 px apart. Each card has its folder in its legend colour, a legend icon, ONE question, and the real file opened below:
  - **workflows/** (split arrows): *"Which version is this — weekly or launch?"*
    - `workflows/weekly.md`: "1. Sum up the week in three lines / 2. One story, one link / 3. End on one question"
  - **scripts/** (cog): *"What must run the same way every time?"*
    - `scripts/check-links.py`: `for link in draft.links:` / `check(link) # does it open?`
  - **references/** (book): *"What mistakes do I avoid?"*
    - `references/voice-rules.md`: "– never open with 'Hope you're well'" / "– say 'you', not 'our customers'"
  - **assets/** (stacked pages): *"What should the email look like?"*
    - `assets/best-email.md`: "Subject: What I got wrong last week" / "Hey — quick one this week…"

**What changed**
- The meta-create-skill files were replaced by the four `draft-email/` files from 02. The old files were `test-skill.md`, `generate_eval_viewer.py`, `frontmatter.md` and `templates/orchestrator-skill-template.md`.
- Each card now has one caption (the question). The three old lines re-taught 02.
- "deterministic", "source never loads", "eval-results viewer" and "orchestrator" are gone.
- The assets caption no longer runs past its card.
- The workflows icon read as a "Share" icon and the scripts icon read as a sun. Both glyphs are new.
- The gaps between cards are wider.
- The bottom takeaway was cut, because it gave away 05.

**Checks:** gate CLEAN · no robot · visual review at the bottom.

---

## 6 · `05-read-and-load` — The AI Reads Every Description, Then Opens Only What It Needs
**Job:** how the AI picks one skill and loads only what the job needs, in three steps. Deeper means later.

**What the viewer sees**
- Title, then the subtitle "until a job needs a skill, the AI only reads its one line".
- **Left:** the canonical robot, captioned **the AI**, holding a magnifier (a separate prop at its right gripper).
  - Above it is a thought bubble whose circles trail down to its antenna: **"Write this week's email"** / "which skill does that?".
- **Step 1** (badge 1, top band): **"It reads every skill's description"**. Under `skills/` are six folders, each with its one-line description and a verdict:
  - `pull-stats/` gets last week's numbers — ✗ no
  - `what-worked/` finds what did best — ✗ no
  - `draft-email/` writes this week's email in your voice — green highlight box, green ✓ **match**. The magnifier's green arrow lands on this row.
  - `qa-draft/` checks a draft against your rules — ✗ no
  - `invoice-reminder/` chases unpaid invoices — ✗ no
  - `meeting-notes/` turns a call into notes — ✗ no
- **Step 2** (badge 2, indented band): an ink arrow drops from the match, down an empty gutter well clear of the other folders, into a page icon.
  - **"It opens that one skill's SKILL.md"** · `draft-email/SKILL.md` · "the other five stay closed".
- **Step 3** (badge 3, indented again): **"It opens only the files this email needs"**.
  - An ink trunk from the SKILL.md page branches with arrows to two of draft-email/'s five files:
    - `workflows/weekly.md`: ink-outlined file row, green text — **open**
    - `workflows/launch.md`: grey text, faded icon — stays closed
    - `scripts/check-links.py`: grey text, faded icon — stays closed
    - `references/voice-rules.md`: grey text, faded icon — stays closed
    - `assets/best-email.md`: ink-outlined file row, purple text — **open**

**What changed**
- **The request:** the missing request is now on the slide, so "match" matches something visible.
- **The library:** `carousel/`, `email-os/`, `write/` and `publishing/` became the six running-example skills, with plain ✗ no / ✓ match verdicts.
- **Steps 2 and 3:** step 2 is `draft-email/SKILL.md`. Step 3 shows its real files, and only weekly.md and best-email.md open.
- **The load arrows:** they no longer cross "publishing/" or "TIER 2", and no longer run beside the other skills' icons. They run down empty gutters, and the bands are fill only.
- **Cuts:** the step-1 line "one short line per skill…" (it repeated the subtitle), "SKILL.md points it to them", the LOAD ORDER spine, the two bottom lines, and the "progressive loading" jargon.
- **Layout:** everything moved up to keep 60 px margins. The open rows are 48 px tall. The closed rows are grey text with the legend colour on the icon only.
- **Type size:** all 19 labels under 24 px are fixed.
- **Robot:** the hand-drawn robot became the canonical one (s = 0.8), with a separate magnifier.

**Checks:** gate 0 hard. There is 1 REVIEW flag (">3 accent colours"), acknowledged because the slide carries the legend and the robot's belt. Robot check: s = 0.8 OK. Visual review is recorded at the bottom.

---

## Final deck order
`01-why-a-skill` → `02-skill-anatomy` → `03-inside-skillmd` → `06-frontmatter-properties` → `04-the-four-subfolders` → `05-read-and-load`

`map.json` is updated to this order and these labels. The wizard `slides:` array in `clo-course/checkpoint-first-skill.html` still needs reordering by the main thread.

**Files removed:** none.

## Flags
- **01 output wording:** the reviewer suggested "about 80% of / your standard". I kept the §10-locked "~80% to your standard" and split it over two lines ("~80% to" / "your standard") instead. Swap it if you prefer the reviewer's wording.
- **01 lane tags dropped:** with the brief's captions, the old red and green "WITHOUT/WITH A SKILL" pills repeated the captions.
- **01 scripts pill** reads "runs the same way every time". It is a verb phrase among noun phrases, but it is the one scripts/ wording the reviewer asked for, and a longer "code that…" pill does not fit.
- **06 icons dropped** (the brief allowed "distinct icons or drop"). `model: …` and `allowed-tools: …` use "…", because real values are platform-specific names that §1 keeps off slides.
- **The storyboard is stale:** `v1-what-is-a-skill/storyboard.excalidraw` and `storyboard-preview.png` still show the old slides. They are on the README follow-up list and were not touched.
- **Plant for v5:** the SKILL.md steps and weekly.md deliberately do NOT say "lead with the number". That is the v5 correction.

## Verification record
- Final build, all six slides:
  - `excali-gate.py`: 0 hard. The only REVIEW flag is the acknowledged accent count on 01 and 05.
  - `render.ps1`: 2×.
  - `_tools/robot.py check`: 3 robots OK.
  - A browser-measured check (every `<text>` box against every other label and every drawn stroke, and font size ≥ 24): clean. The only hit is 05's badge digit "2" sitting inside its own badge circle, which is intended.
- **Visual review:**
  - `excali-reviewer` first pass: 02 PASS, and 01, 03, 04, 05 and 06 FAIL.
  - I applied every located fix, except turning the good outcome from green to black. The main thread overruled that under the §11.7 carve-out.
  - I then re-rendered, re-checked and looked at every PNG again myself.
  - No second reviewer pass was run, on the main thread's instruction.

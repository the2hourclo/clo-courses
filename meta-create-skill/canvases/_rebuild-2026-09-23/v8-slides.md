# v8-harness — rebuilt slides (2026-09-23)

Deck = CP4 "Make it reliable", part 2. One job for the whole deck: what the skill CANNOT know about itself, so the
checks live outside the file. Running example (§9):
- `draft-email/` writes the draft.
- `qa-draft/` is **the reviewer**, the step in the `weekly-email/` system that never saw the draft being written.
- **The retry cap** and **the reality check** live in `weekly-email/`, the lead skill.

The file view shows the same rule wording as v7 (see v7-slides.md). Slides 02–04 carry a small dim section marker
above the title. The markers introduce the word "harness" before 05 needs it: "THE HARNESS · THE REVIEWER, PART 1"
/ "… PART 2" / "THE HARNESS · THE REALITY CHECK".

---

## 01 · `01-what-it-cannot-see` · Hardening Did Its Job. Two Got Through Anyway.
**Job:** the seam. The hardened skill stopped one failure, but two got past it.

**What the viewer sees**
- Title, then subtitle: "Three bad runs of the hardened skill".
- **Top centre, the hardened skill's file `draft-email/SKILL.md`:**
  - `## Conventions`, with "only use numbers from the stats", "always name the offer" and "…".
  - `## Self-check before handing it over`, with "read the draft against every rule".
- **Arrows:** grey arrows fan out FROM the file down to three cards.
- **The three cards**, each holding only a quote and a verdict badge:
  1. "Open rate hit 34%, our best month yet." → ink badge **STOPPED**
  2. "We are pleased to share this week's key learnings and actionable insights." → red badge **GOT THROUGH**
  3. "Done — saved to drafts/weekly-email.md" → red badge **GOT THROUGH**

**Changed vs old:**
- The explanation paragraphs and dim "why" labels are cut. These gave away 02's and 04's answers.
- The subtitle no longer says drafts were thrown AT the skill; it now matches the arrows, which flow from it.
- "READS LIKE A ROBOT" and "last month" are gone. The quote now uses the locked line "our best month yet".
- The bottom takeaways are cut; the slide went from 165 words to about 45.
- The badges read STOPPED / GOT THROUGH (was CAUGHT). Green is gone.
- The diagram is moved down for balance.

**Gate:** CLEAN · **Robot check:** no robot · **Visual review:** first pass FAIL (a cold viewer can't tell what's
wrong with runs 2–3, and the bottom sat empty). I fixed the balance. I did not add "what's wrong" tags, because the
locked brief says quote + badge only and the tags would pre-empt 02/04 (see Flags #3).

## 02 · `02-it-cannot-judge-its-own-work` · The Writer Can't Hear Its Own Voice. The Reviewer Can.
**Job:** the reviewer, part 1. A second reader that never saw the draft written hears what the writer can't.

**What the viewer sees**
- Marker "THE HARNESS · THE REVIEWER, PART 1", then the title.
- **Top centre:** the draft `drafts/weekly-email.md`, "We are pleased to share this week's key learnings and
  actionable insights." A dim label beneath says "breaks none of your rules".
- **Arrows:** two grey arrows drop from the draft to two identical canonical robots. Between them, a dim label reads
  "the same AI, twice".
- **Left robot**, captioned **`draft-email/`** · "wrote it" · red **"marking its own homework"**:
  - Its speech box, on the far left with a tail to the robot, says: "Reads well. Clear and professional."
- **Right robot**, captioned **`qa-draft/`** · **"the reviewer"** · "never saw it written":
  - Its speech box, on the far right with a tail to the robot, says: "Nobody talks like this. It reads like a press
    release, not like you."
- **Bottom line (bold):** "The reviewer is a separate skill, qa-draft/, that reads the draft cold."

**Changed vs old:**
- Retitled to name both halves.
- The robots are named by role and skill. Robot scale went from 0.6 to 0.75.
- "A CLOSED LOOP" and its dashed ring became "marking its own homework", which now sits as a caption, not inside
  the speech. "Loop" now means only 03's retry loop.
- Speech tails were added. The "same AI, twice" label was added.
- The reviewer's line was reworded. It used to say "three sentences … with nobody in them", which didn't match the
  one-sentence draft or its "We".
- One line now says what the reviewer is in practice.
- The subtitle and the "not a smarter reviewer" line are cut. Captions are 24–26px (were 20px).

**Gate:** 0 hard (accent REVIEW acknowledged: robots) · **Robot check:** 2 × s=0.75 OK · **Visual review:** first
pass FAIL (quote mismatch, narrator line inside the bubble, "same AI" unstated, bubbles misaligned); all fixed and
re-checked, now clean.

## 03 · `03-the-capped-loop` · The Reviewer Sends It Back — Three Times, Max
**Job:** the reviewer, part 2 (the retry cap). The draft is sent back at most three times, then it comes to you.

**What the viewer sees**
- Marker "THE HARNESS · THE REVIEWER, PART 2", then the title.
- **Top band, carrying 02's picture forward:**
  - The `draft-email/` robot ("fixes it") on the left and the `qa-draft/` robot ("the reviewer") on the right.
  - A top arrow, labelled "the draft", carries a small document icon from writer to reviewer.
  - A bottom arrow runs back from reviewer to writer, labelled "sent back with a note · at most 3 times".
- **Two columns below.**
  - **Left, "WITH THE RETRY CAP":**
    - Rounds 1, 2 and 3 each read "reviewer says no · the skill fixes it" (three send-backs).
    - A thick ink floor line, labelled **"THE RETRY CAP"**, with "lives in weekly-email/" beside it.
    - An arrow drops through it to an ink box: "Still no? It stops and comes to you, **with the reviewer's note
      attached.**"
  - **Right, in red, "WITHOUT ONE":** rounds 1–3 (same rows) → dashed → **round 47** (red) → dashed → a dashed red
    box, "still running. nothing reaches you."
- **Bottom line (bold):** "A runaway loop doesn't look like a failure. It looks like it's still working."

**Changed vs old:**
- Retitled from "The Cap Is The Feature". Marked as the reviewer, part 2.
- The two robots now pass the draft back and forth.
- The count now adds up: three send-backs match "Three Times, Max" (it used to show two send-backs and three reviews).
- The retry cap is named, with where it lives, so 05's "lives in weekly-email/" is not a surprise.
- The subtitle and "two AIs can disagree forever" are cut. Green is gone.

**Gate:** 0 hard (accent REVIEW acknowledged: robots) · **Robot check:** 2 × s=0.7 OK (two share the slide) ·
**Visual review:** first pass FAIL (the count didn't match the title; who keeps the cap disagreed with 05). Both
fixed. My own re-check also caught and fixed an outcome-box overflow and "round 47" crowding its row. Now clean.

## 04 · `04-trust-nothing-it-reports` · "Done" Is Not Proof. The Reality Check Opens the Folder.
**Job:** the reality check. Opening the folder beats trusting "Done".

**What the viewer sees**
- Marker "THE HARNESS · THE REALITY CHECK", then the title.
- **Left, "WHAT IT TOLD YOU":** a speech bubble, "Done — saved to drafts/weekly-email.md", with "Ready for your
  review." underneath in dim. Its tail points down to the robot, captioned **`draft-email/`** · "reporting back".
- **Centre:** a large red ≠ sign.
- **Right, a heavy ink box headed "THE REALITY CHECK · it opens the folder":**
  - Inside it, a plain folder view whose title bar shows a folder icon and `drafts/`. The body says "This folder is
    empty.", with a magnifying glass inside the window.
  - Below the folder, in red: ✗ "weekly-email.md isn't there".
  - Then: "So the job comes back to you **unfinished — not marked done.**"
- **Bottom line (bold):** "No rule in SKILL.md could stop this. The skill never opens the folder."

**Changed vs old:**
- The header is now "THE REALITY CHECK · it opens the folder" (was "SO THE HARNESS GOES AND LOOKS").
- "last written 6 days ago" is cut. The `> open` / `~/drafts` code is replaced by a folder view of `drafts/`.
- The report bubble now has a speaker (the robot).
- Retitled from "A Report Is Not Evidence". The subtitle is cut.
- "the file" in the bottom line became "SKILL.md" (it was ambiguous with the missing email file), and "catch"
  became "stop". Green is gone.

**Gate:** 0 hard (accent REVIEW acknowledged: robot) · **Robot check:** s=0.75 OK · **Visual review:** first pass
FAIL (the PNG it saw was stale, "the file" was ambiguous, no marker); all fixed and re-rendered, now clean.

## 05 · `05-the-rig-around-the-skill` · The Skill Guards Its Rules. The Harness Guards the Rest.
**Job:** the assembly. Your rules live inside the skill; the three checks the skill can't run on itself live outside
it, and each is a real object with a place it lives.

**What the viewer sees**
- Title, then subtitle: "Inside the file: your rules. Outside it: three checks the skill can't run on itself."
- **Left, a box "INSIDE THE SKILL · HARDENING"** containing two cards:
  - `draft-email/SKILL.md`: `## Conventions` with "only use numbers from the stats", "always name the offer" and
    "…", then `## Self-check before handing it over` with "read the draft against every rule".
  - **"the scorecard"**, "5 tests, re-run after every edit", with a row 1✓ 2✓ 3✓ 4✓ 5✓.
- **Between the two boxes:** a grey arrow labelled "the draft" goes into piece 1. A second grey arrow labelled "sent
  back" runs from piece 2 back to the skill (the retry loop from 03).
- **Centre, a solid box "OUTSIDE IT · THE HARNESS"** with three numbered pieces joined top to bottom by arrows:
  1. The reviewer robot next to **"1 · The reviewer"** · "reads the draft cold" · "lives in: **qa-draft/**"
  2. **"2 · The retry cap"** · "sends it back 3 times, max" · "lives in: **weekly-email/** · the lead skill"
  3. **"3 · The reality check"** · "opens the folder to check it landed" · "lives in: **weekly-email/** · the lead
     skill"
- **Right:** an arrow from piece 3 to an ink stick figure, captioned **"YOU"** · "you only see what needs your
  judgment".

**Changed vs old:**
- "(THE RIG)" is cut. The subtitle is the locked line.
- Each piece now carries a "lives in:" tag, and the reviewer robot is added to piece 1.
- The scorecard is added to the inside.
- The arrows now enter piece 1 and run 1 → 2 → 3 → you, in order. A send-back arrow was added.
- "you get only what needed a human" is replaced by the locked caption.
- The two bottom takeaways are cut.
- All text is 24px or larger (was 18–19px, the worst in the set).
- The harness border is solid; a dashed border had read as flimsy, and dashed red means "runaway" on 03. Green is
  gone.

**Gate:** 0 hard (accent REVIEW acknowledged: robot) · **Robot check:** s=0.75 OK · **Visual review:** first pass
FAIL (crowded boxes with an empty bottom fifth, no retry loop shown, "weekly-email/ · the lead skill" possibly
unfamiliar). I fixed the spacing and added the loop. The name stays as locked (see Flags #4). My own re-check is
clean.

---

## Final deck order
01-what-it-cannot-see → 02-it-cannot-judge-its-own-work → 03-the-capped-loop → 04-trust-nothing-it-reports →
05-the-rig-around-the-skill. The order is unchanged (03 depends on 02). No file was removed or renamed. `map.json`
is updated with the new labels and arc.

## Flags for the main thread
1. **Title shortened on 05:** "…The Harness Guards the Rest." (was "…Everything Else."). The gate's width estimate
   calls the longer title off-canvas at 42px or more.
2. **Section markers on 02–04:** "THE HARNESS · THE REVIEWER, PART 1 / PART 2" and "THE HARNESS · THE REALITY
   CHECK". The brief asked only for 03's "reviewer, part 2". I extended it on the reviewer's advice so "harness"
   appears before 05 and the deck is signposted. The markers are labels, not prose lines. An alternative the
   reviewer offered: number them to match 05 ("THE HARNESS · 1 · THE REVIEWER", "· 2 · THE RETRY CAP", "· 3 · THE
   REALITY CHECK"). But that treats 03 as its own piece rather than the reviewer's part 2, which conflicts with the
   lock, so I didn't use it.
3. **Declined on 01 (lock):** the reviewer asked for small "what went wrong" tags under each verdict ("sounds like a
   press release" / "the file was never saved"), because a cold viewer can't tell why "Done — saved" is bad. The
   lock says quote + badge only, and not to give away 02/04. The narration should say it instead ("two of these
   look fine, and they're not; the next slides show why").
4. **Declined on 05 (lock):** the reviewer worried that `weekly-email/` sits too close to `drafts/weekly-email.md`,
   and that "lead skill" might read as a sales lead. It suggested "the main skill" or renaming the folder. Both
   names are locked (§8, §9), and v4 teaches "the lead skill". 03 now introduces the retry cap as "lives in
   weekly-email/". If the name clash worries you, it's a §9 decision.
5. **Subtitle on 05:** "Inside the file: your rules" is locked. The left box also holds the scorecard, which sits
   inside the skill but outside SKILL.md; the box header "INSIDE THE SKILL" carries that difference. The reviewer
   suggested "Inside the skill: your rules and tests." I kept the lock.
6. **Scorecard location:** drawn inside the skill with no file name. I didn't invent a path.
7. **Robot added on 04** as the speaker of the "Done" report (§11.5: speech boxes get a tail to their speaker).
8. **Colour:** as in v7, a strict §11.7 reading, with no green outside the robot block. Decide once for all nine
   decks.
9. **v9 knock-on:** v9/02 ("It is hardened…") should add "and it passes its scorecard". v9 should also use
   `stats/last-week.csv` / `drafts/weekly-email.md` and the verb "stops", and name the three harness pieces as 05
   does.

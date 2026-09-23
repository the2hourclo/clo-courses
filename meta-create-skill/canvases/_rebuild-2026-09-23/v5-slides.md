# v5 — The Retrospective · rebuilt slides (2026-09-23)

Shown in CP2 **after** the buyer builds their first skill (v6 → build step → v5). Running example:
`draft-email/` and the one correction **"Drop the emojis and lead with the number."** (DESIGN-SYSTEM §9).
The file shown is the one v6 built (same `## The steps…` / `## The framework you follow` sections and lines).
**Wording lock (§9):** the email draft-email/ writes is always "this week's email"; "next week" only names
the FOLLOWING run (the box where the mistake comes back), whose email card reads "the email it writes".

**Final order:** 01 → 02 → 03 → 04 → 05 (unchanged). No file removed or renamed (04 keeps
`04-two-ways-to-run-it` because the portal references slides by filename). `map.json` updated.

---

## 01 · `01-correction-dies-in-the-chat` · "Fixing It In The Chat Doesn't Fix The Skill"
**Job:** a correction made in the chat never reaches the skill file, so next week repeats the mistake.

**What the viewer sees.** Subtitle: *"Next week starts a new chat, opens the same file, and makes the same
mistake."*
- **Top-left box, "THIS WEEK · this chat":** a red card, "CAME BACK WRONG" — **this week's email**: "emojis
  everywhere, the number buried at the bottom" → arrow → an ink stick figure ("you") → speech bubble (tail to
  you), "YOU TYPE BACK": *"Drop the emojis and lead with the number."*
- **Top-right, its own box, "NEXT WEEK · a new chat":** a red card, "THE SAME MISTAKE" — **the email it
  writes**: "emojis everywhere, the number buried at the bottom".
- **Middle:** a red dashed line drops from your bubble to a red no-entry sign: **"it never reaches the file"**.
- **Bottom-left:** `draft-email/SKILL.md` (tab on the card), unchanged: `## The steps, in the order you do
  them` / `- numbers → 3 winners → draft → check`, `## The framework you follow` / `- problem → one story →
  one ask`. An ink elbow arrow runs from the file right and up into the next-week box: **"next week opens
  this same file"**.

**Changed vs old:** "run 2" moved out of "THE CHAT" into its own "NEXT WEEK · a new chat" box; the backwards
arrowhead removed (flow now reads email → you → bubble); no "run" anywhere; `weekly-report/` + dashboard →
`draft-email/SKILL.md`; the file → next-week causal arrow added; "you" as a stick figure; the floating
"NOTHING CHANGED" stamp and the bottom takeaway cut (§11.3); panels taller so no text touches an edge.

**Checks:** gate CLEAN · no robot · visual review FAIL → fixed ("you" caption on the panel border: panels
+20px; stamp removed) → self-review PASS.

## 02 · `02-it-writes-the-fix-into-the-file` · "This Time, Your Correction Lands In The Skill File"
**Job:** the retrospective writes your correction into the skill file.

**What the viewer sees.** Subtitle (the one-line definition): *"The retrospective: the AI looks back at what
went wrong and edits the skill file."* Same layout as 01 on purpose (this week top-left, the following week
top-right, file bottom-left):
- **Top-left:** stick figure ("you") + bubble, "YOU SAY WHAT WAS WRONG": *"Drop the emojis and lead with the
  number. Fix the skill."* → arrow → the canonical robot (s=0.85), **"the AI"** / *"running the
  retrospective"*.
- **Down from the robot:** a green arrow into the file: **"written in — after your yes"**.
- **Bottom-left:** `draft-email/SKILL.md` (label on the file's tab): `## The framework you follow` /
  `- problem → one story → one ask`, then two lines each with a green **NEW** tag: **"No emojis. Not one."**
  and **"Lead with last week's number."**
- **Top-right, green, "GETS IT RIGHT":** **the email it writes** — "no emojis, last week's number up top" /
  *"without you saying it again"*. An ink elbow from the file up into it: **"next week opens the updated
  file"**.

**Changed vs old:** plain definition of the retrospective as the subtitle, and a new title so the two lines
don't repeat; bubble adds "Fix the skill." so the same words don't get opposite results on 01 and 02 (it
matches 04's "That was wrong — fix the skill."); arrow reads "written in — after your yes" (no 02 → 03
backtrack); green NEW tags replace "+ -"; the file label sits on the file; robot captioned and at s=0.85 (was
0.72, uncaptioned); blue "IT RUNS THE RETROSPECTIVE" box + `retrospective/` name removed; bottom takeaway cut.

**Checks:** gate 0 hard (1 REVIEW: accent count, acknowledged — robot belt) · robot check OK, s=0.85 · visual
review FAIL → fixed (definition subtitle; "Fix the skill." in the bubble) → self-review PASS.

## 03 · `03-nothing-lands-without-your-yes` · "It Proposes The Edit — You Are The One Who Approves It"
**Job:** you approve every edit.

**What the viewer sees.** Subtitle: *"Nothing is written into your skill until you say yes."*
- **Left:** the canonical robot (s=0.95), **"the AI"** / *"drafts a fix only for what it saw go wrong"*, arrow
  → the proposal.
- **Centre:** **"PROPOSED CHANGE to draft-email/SKILL.md"**: a grey **BEFORE** box (`## The framework you
  follow`, `- problem → one story → one ask`) → down arrow → a green **AFTER** box (the same two lines plus
  the two NEW-tagged lines "No emojis. Not one." / "Lead with last week's number.").
- **Right, "YOUR CALL" (ink):** level with BEFORE, a grey **NOT YET** box ("nothing is written, the file
  stays as it was"); level with AFTER, a green **YES** box ("the edit is written into the file"). Each arrow
  leaves the state it produces.

**Changed vs old:** file + lines → the v6 file; "+ -" → NEW tags (same as 02); YES/NOT YET swapped so the
arrows no longer read BEFORE → YES; the overflowing guard footnote is now the AI's role caption (same words,
nothing to overflow, no third prose line); duplicate bottom takeaway cut; all text ≥ 24px.

**Checks:** gate 0 hard (1 REVIEW, acknowledged — robot belt) · robot check OK, s=0.95 · visual review FAIL →
fixed (swap; footnote folded into the caption) → self-review PASS.

## 04 · `04-two-ways-to-run-it` · "Just Say What Went Wrong — Right Away, Or At Day's End"
**Job:** two ways to ask, and both are things you just say.

**What the viewer sees.** Subtitle: *"It reads which one you mean from how you say it."* Two ink panels:
- **"RIGHT AWAY"** — *"this week's email just came back wrong"*. YOU SAY: stick figure + bubble *"That was
  wrong — fix the skill."* IT DOES: • looks at the skill you just used • drafts one fix • you say yes, and
  it's in.
- **"AT THE END OF THE DAY"** — *"you're done working for the day"*. YOU SAY: stick figure + bubble *"Review
  what went wrong today."* IT DOES: • looks back at every skill you used today • drafts every fix it found •
  you approve them all in one go.

**Changed vs old:** `/ai-employee-builder:retrospective` pill and fork removed (§11.8); both modes are
sentences spoken by a stick figure; "session" gone; blue/amber panels, headings and bullets → ink (§11.7);
"one run just came back wrong" → "this week's email just came back wrong"; "no process to remember" takeaway
cut.

**Checks:** gate CLEAN · no robot · visual review PASS.

## 05 · `05-it-compounds` · "Every Correction Sticks — And They Add Up"
**Job:** corrections add up, one step per correction.

**What the viewer sees.** Subtitle: *"One fix each time you notice something. Said once, kept for good."*
A staircase climbing bottom-left to top-right:
- **Bottom-left, "WHERE IT STARTS":** an ink box, **"~80%"** / *"a strong first draft"*, with a short dashed
  drop onto the week-1 step.
- **Five steps, week 1 … week 5.** Beside each riser, in green, the one correction that lifted it: "+ no
  emojis, number first" (1 → 2), "+ plain text, no images", "+ sign off with your first name", "+ subject
  line under six words" (4 → 5).
- **Top-right, "BY WEEK 5" (green):** **"work you'd put your name on"**, with a green arrow up from week 5.

**Changed vs old:** start "average at best · cannot generate revenue" → "~80% · a strong first draft" (matches
v6); end → "work you'd put your name on"; "no emojis" + "lead with the number" are ONE step (one correction on
02/03); v1–v5 → week 1–week 5; "cite the source row" / "flag drops over 20%" → plain-words corrections; the
title no longer claims "every run"; start box moved to the bottom so height = quality; "+ under 300 words"
→ "+ plain text, no images" (v6-01 already had "Under 300 words"); "my" → "your"; key caption and bottom
takeaway cut.

**Checks:** gate CLEAN · no robot · visual review FAIL → fixed (start box to the bottom step; caption cut;
the two wording fixes) → self-review PASS.

---

## Visual review
`excali-reviewer` (Opus) on all 11 PNGs: v5 1 PASS / 4 FAIL (01, 02, 03, 05); all fixed as above,
re-rendered, and re-checked against the reviewer checklist — clean.

## Flags
- **v5-03 guard note:** the lock said "keep; fix the overflowing footnote". The reviewer counted the boxed
  note as a third prose line (§11.3). Closest compliant version: its words now sit as the AI's role caption
  ("drafts a fix only for what it saw go wrong"). The idea stays; the extra line and the overflow go.
- **Portal copy still names the command:** the CP2 step keeps `command:'/ai-employee-builder:retrospective'`
  + `commandIntro` below the slides. That's outside my scope; the 04 narration must not say "one command"
  now that the slide teaches "just say it".
- **Narration:** the v5 `slideNotes` in `clo-course/checkpoint-first-skill.html` describe the old slides
  ("run one / run two", "one command", "four of them"). 02's bubble now ends "Fix the skill."; 05 shows four
  corrections across five weeks. Rewrite from the blocks above.

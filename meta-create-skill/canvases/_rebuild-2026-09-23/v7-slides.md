# v7-harden — rebuilt slides (2026-09-23)

Deck = CP4 "Make it reliable", part 1. One job for the whole deck: a STATED RULE the skill can check
itself against. Running example: `draft-email/` writes `drafts/weekly-email.md` from `stats/last-week.csv`;
the fabricated line is "34% · our best month yet". Slides 02 and 03 share one geometry (swipe = before → after).

The four rules, worded the same on every v7/v8 slide that shows the file:
`- only use numbers from the stats` (= "the number rule") · `- always name the offer` · `- always close with a PS`
· `- no emojis. Not one.` (the last one is v5's correction). The self-check section, once filled, reads:
`- read the draft against every rule` · `- if one breaks, stop and say which` · `- only then hand it over`.

---

## 01 · `01-the-quiet-failure` · The Loud Failure Was Never the Problem
**Job:** a draft that is quietly wrong is worse than a run that visibly breaks.

**What the viewer sees**
- Title, then subtitle: "Two ways draft-email/ can get this week's email wrong".
- Two columns.
  - **Left, headed "IT BREAKS LOUDLY":** a chat window titled "your chat with the AI". Inside it, a reply bubble labelled
    "the AI": "I couldn't open your stats file, so I didn't write this week's email." Under the window: "You see it
    straight away." An ink arrow points down to an ink card: "You fix it in two minutes. **Nothing went out.**"
  - **Right, headed "IT LOOKS PERFECT":** a file view titled `drafts/weekly-email.md` with three lines: "Hey — quick
    one on last week." / "Open rate hit 34%, our best month yet." (boxed in red) / "The offer closes Friday. PS
    below." Under it, in red: "34% is nowhere in your stats. Nothing flags it." A red arrow points down to a red
    card: "It goes out to your list, **with your name on it.**"

**Changed vs old:** the "Hardening is not about…" line is cut (the word is defined on 03). The terminal panel
("> run weekly-email", "/data/stats.csv") is now a chat reply. The three closing sentences are cut; the two outcome
cards carry the punchline. The skill is now `draft-email/`. All text is 24px or larger (was 21px).

**Gate:** CLEAN · **Robot check:** no robot (by design: the outputs are the actors) · **Visual review:** PASS

## 02 · `02-your-rules-are-in-your-head` · Your Rules Are in the File. Nothing Checks the Draft.
**Job:** your rules are already in the file (from v6's interview and v5's correction), but no step checks the
draft against them.

**What the viewer sees**
- Title, then subtitle: "Your interview and your corrections put the rules in. One section is still empty."
- **Left, a big file view `draft-email/SKILL.md`:**
  - `## Conventions` with the four rules. A dim bracket over the first three says "from your interview", and an
    arrow at the fourth says "← your correction".
  - Below that, `## Self-check before handing it over`, followed by a large dashed red box that says **"empty"**.
- **Right, the weekly flow:**
  - A grey arrow from the file points to the canonical robot, captioned **"the AI"**, "reads this file, then writes
    the draft".
  - Below the robot, three stacked steps joined by down-arrows: "It writes this week's draft." → a dashed red box,
    **"no check here"** → "It hands it to you — **34% and all.**" (the last three words in red).
  - A dashed red line runs from the empty section in the file to the "no check here" step. The empty section *is*
    the missing step.

**Changed vs old:** reframed so it no longer contradicts v5/v6. The rules now ARE in the file; only the
self-check is empty. "On disk" and the stick figure's thought bubble are gone. The robot (the AI) now reads the
file. File text is 26px ink (was 21px dim). The title is shortened (see Flags).

**Gate:** 0 hard (accent REVIEW acknowledged: robot) · **Robot check:** s=0.75 OK · **Visual review:** PASS

## 03 · `03-written-into-the-file` · Hardening = A Check Before It Hands You Anything
**Job:** hardening = a self-check that reads the draft against your rules before it hands anything over.

**What the viewer sees**
- Title, then subtitle: "The same file. The empty section is now filled in."
- **Left:** the same `draft-email/SKILL.md`, identical to 02 (same four rules and provenance labels). The self-check
  section is now a heavy ink box on a light grey fill, holding:
  - `- read the draft against every rule`
  - `- if one breaks, stop and say which`
  - `- only then hand it over`
- **Right:**
  - The same robot, "the AI", reading the file.
  - The same three steps. The middle step is now a heavy ink box: **"It checks the draft against every rule."**
  - An ink arrow, labelled **"checked here"**, runs from the filled section to that step.
  - The last step reads "It hands it to you — only once every rule passes."

**Changed vs old:** no longer re-teaches v5's "write your correction into the file". It fills the same slot 02
showed empty, so "the same file" is now true (before, Conventions disappeared between 02 and 03). "fires here" is
now "checked here". The actor is now drawn and captioned (the AI). Green is gone.

**Gate:** 0 hard (accent REVIEW acknowledged: robot) · **Robot check:** s=0.75 OK · **Visual review:** PASS (after widening the middle step box)

## 04 · `04-it-stops-itself` · The Self-Check Stops the 34% Before You See It
**Job:** proof that the self-check stops the made-up 34%.

**What the viewer sees**
- Title, then subtitle: "The same draft from the first slide, with the self-check now in the file".
- **Top left, "WHAT IT JUST WROTE":** the `drafts/weekly-email.md` card from 01, with the 34% line boxed in red.
- **Top right, "THE RULES IT CHECKS AGAINST":** the `draft-email/SKILL.md` card. Under `## Conventions`, the first rule,
  `only use numbers from the stats`, is bold in an ink box. The other three rules are dim.
- **Joining the two:** grey lines from both cards merge into one arrow pointing down at the robot, captioned
  **"the AI"**, "checking its own draft".
- **The robot's speech box:** a big box with a tail pointing at the robot. It has a heavy ink border and the same
  light grey fill as 03's self-check box, so it reads as 03's check doing its job.
  - Header (ink): **"STOPPED · before it reached you"**.
  - It says, centred: "Line 2 says 34%. That number isn't in last week's stats, so I stopped here."
  - Last line: red "rule broken:" + "only use numbers from the stats".
  - Red appears only on the evidence: the 34% highlight and "rule broken:".

**Changed vs old:** one verb, "stops", throughout (title, header, speech). "No second AI…" is cut (v8 introduces the
second reader). The STOPPED box now has a speech tail to the robot. The robot's caption is now "the AI · checking
its own draft", not "THE SAME SKILL, ON ITS OWN OUTPUT". The mismatch between "rule you just wrote" and "the rule
you gave it" is gone. Green is gone.

**Gate:** 0 hard (accent REVIEW acknowledged: robot) · **Robot check:** s=0.8 OK · **Visual review:** first pass FAIL (red on the good news, lopsided box, tail touching the divider); fixed and re-checked, now clean

## 05 · `05-a-fix-that-stays-fixed` · After Every Edit, Re-Run These 5 Tests
**Job:** the scorecard, five inputs with a known right answer that the AI re-runs itself after every edit, so an
edit can't quietly break a rule.

**What the viewer sees**
- Title only at the top.
- **Left:** the robot, captioned **"the AI"**, "runs all five itself after every edit to the skill".
- **Right, a table headed "THE SCORECARD · draft-email/":** columns are TEST · WHAT IT'S GIVEN · THE RIGHT ANSWER ·
  TUESDAY'S EDIT (headers in ink).
  1. last week's stats → only numbers from the stats → ✓ pass
  2. stats with a week missing → flags the gap, invents nothing → ✓ pass
  3. notes that skip the offer → still names the offer → ✓ pass
  4. a quiet week → still closes with a PS → ✓ pass
  5. (whole row boxed in red) stats with no open rate → no open-rate number at all → ✗ **FAIL**, "wrote 34% again"
- **Bottom line (bold):** "Tuesday's edit broke the number rule. Test 5 stopped it before anything went out."

**Changed vs old:** retitled from "A Rule You Set Once Should Never Quietly Lapse". The slide now says who runs the
tests (the AI, itself, after every edit). "Rule one quietly stopped firing" is now the named number rule. The
Tuesday story is one bottom line, not a cold-open annotation plus two takeaways. Ticks and "pass" are ink, with no
green PASS repeated beside each tick. Row wording matches the file's rules.

**Gate:** 0 hard (accent REVIEW acknowledged: robot) · **Robot check:** s=0.8 OK · **Visual review:** first pass FAIL ("edit" undefined, crowded fail cell, faint headers); fixed and re-checked, now clean. One reviewer point declined, see Flags #5.

---

## Final deck order
01-the-quiet-failure → 02-your-rules-are-in-your-head → 03-written-into-the-file → 04-it-stops-itself →
05-a-fix-that-stays-fixed. The order is unchanged. No file was removed or renamed. `map.json` is updated with the
new labels and arc.

## Flags for the main thread
1. **Title shortened on 02:** "Your Rules Are in the File. Nothing Checks the Draft." The locked wording, ending
   "…Against Them.", renders inside the canvas, but `excali-gate.py`'s width estimate calls it off-canvas (a hard
   violation) at any size of 38px or more. I kept 44px and cut the last two words.
2. **Strict colour reading of §11.7:** no green anywhere except inside the robot block. Good outcomes, ticks, the
   self-check box and headers are ink; red is failure only. If other decks keep a green "good" card, the set will
   look inconsistent. Decide one way for all nine decks.
3. **Rule wording is now fixed** (listed at the top of this file): "never cite a number I didn't give it" became
   "only use numbers from the stats", and "never send without the PS" became "always close with a PS" (the skill
   never sends; v9 says so). v5/v6 should show these same Conventions lines if they show `draft-email/SKILL.md`.
4. **01's outcome** now says "It goes out to your list" (was "to a client"), which matches v4's "you send it to your
   list".
5. **v7/05 title kept as locked** ("After Every Edit, Re-Run These 5 Tests"). The reviewer read it as telling the
   viewer to run the tests, while the caption says the AI runs them, and proposed "Every Time SKILL.md Changes, the
   AI Re-Runs 5 Tests". I kept the lock. The caption now says "after every edit to the skill", and the column is
   headed "TUESDAY'S EDIT". Worth a look if you want the title to carry who runs the tests.
6. **Reviewer (excali-reviewer) ran on all five.** First pass: 01–03 PASS, 04 and 05 FAIL. All located fixes are
   applied except #5.
7. **Narration hooks:** 02 → 03 is a before/after swipe of the same layout. Narrate the one change: the empty box
   fills, and the "no check here" step becomes "It checks the draft against every rule."

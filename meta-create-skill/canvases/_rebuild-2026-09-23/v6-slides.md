# v6 — How to Create a Skill · rebuilt slides (2026-09-23)

Shown in CP2 **first** (v6 → build step → v5). Running example: `draft-email/`, the skill that writes
**this week's email** (DESIGN-SYSTEM §9 wording lock). No subfolder names anywhere on this deck (Rashid,
2026-07-26); the gold standard appears as the file `best-email.md`, never `assets/best-email.md`.

**The ONE label set for the five things you give** (verbatim on 02's file headings, 03's rows and 06's
file headings): **The steps, in the order you do them · The framework you follow · Your gold standard ·
Your real files · The exceptions.**

**Final order:** 01 → 02 → 03 → 04 → 05 → 06 (unchanged). No file removed or renamed. `map.json` updated.

---

## 01 · `01-clarity-first` · "A Skill Is Only As Clear As You Are About Your Own Work"
**Job:** what you tell it is the only thing that changes the result.

**What the viewer sees.** Subtitle: *"Same AI. Only what you told it changed."* Two rows split by a dashed
line, read left to right, built from identical parts:
- **Top row, "A VAGUE ANSWER".** An ink stick figure ("you") with a speech bubble (tail to them):
  *"Just write it the way I normally do."* → arrow → a grey file card `draft-email/SKILL.md` holding
  `- Write it well` / `- Make it professional` → arrow → the canonical robot, captioned **"the AI"** →
  arrow → a red box: **"a generic email"** / *"still guessing"*.
- **Bottom row, "A SPECIFIC ANSWER".** The same stick figure says *"Three winners, no more. Under 300 words.
  Match the best one I've sent."* → the same file name `draft-email/SKILL.md`, now holding
  `- Three winners, no more` / `- Under 300 words` / `- Match best-email.md` → the same robot, captioned
  **"the same AI"** → a green box: **"~80% to your standard"** / *"ready to use"*.
- Arrows mean: your answer becomes the file → the AI works from the file → this is what comes back.

**Changed vs old:** one file (`draft-email/SKILL.md`) in both rows instead of `meeting-notes/` vs
`weekly-report/`; the canonical robot in both rows; "you" drawn as a stick figure; subtitle replaced ("same
interview" pre-empted 02); the "same in both rows" line and the two-line takeaway cut (§11.3); Q3 report
gone; row headers ink (red/green only on the outcome boxes); the red box no longer says "average at best".
The specific answer deliberately does NOT say "no emojis" or "lead with the number" — that is v5's correction.

**Checks:** gate 0 hard (1 REVIEW: accent count, acknowledged — robot belt) · robot check OK, 2 × s=0.72
(two share the slide) · visual review PASS.

## 02 · `02-it-interviews-you` · "You Don't Write The Skill. It Interviews You."
**Job:** the AI interviews you and writes the file out of your answers.

**What the viewer sees.** Subtitle: *"Not a prompt — just questions about how you already do the job."*
- **Left:** the canonical robot (s=0.8), **"the AI"** / *"asking you"*. One tall speech box, tail to the
  robot, holds five questions separated by faint rules:
  1. *"What do you do first, then next?"* 2. *"What method do you follow?"* 3. *"Show me your best one so
  far."* 4. *"What files do you work from?"* 5. *"When do you NOT do it this way?"*
- **Middle:** five arrows, one per question, each labelled **"your answer"**.
- **Right:** `draft-email/SKILL.md` (filename on a tab), five sections in the same order, each a `##`
  heading + ink 24px lines:
  - `## The steps, in the order you do them` — `- numbers → 3 winners → draft → check`
  - `## The framework you follow` — `- problem → one story → one ask`
  - `## Your gold standard` — `- match best-email.md`
  - `## Your real files` — `- read stats/last-week.csv`
  - `## The exceptions` — `- launch week → its own format` / `- holiday week → five lines`

**Changed vs old:** the five questions now map 1:1 onto 03's five things; arrows labelled "your answer"; file
lines 24px ink (were 18px dim); the robot speaks all five through one speech box (its arrow used to reach
only question 3); headings use the one label set; the exceptions section now carries both exceptions 03 and
05 name; `weekly-report/`, the dashboard and the Q3 report gone; blue "WHAT IT ASKS YOU" header and bottom
takeaway cut.

**Checks:** gate 0 hard (1 REVIEW, acknowledged — robot belt) · robot check OK, s=0.8 · visual review PASS.

## 03 · `03-what-you-give` · "Five Things You Give It, And You Already Have All Five"
**Job:** name the five things, and show how much detail is enough.

**What the viewer sees.** Subtitle: *"One for each question the interview asks."* Column headers "WHAT YOU
GIVE" and "HOW MUCH DETAIL IS ENOUGH · the weekly email". Five numbered rows (ink badges 1–5), label left,
25px ink example right:
1. **The steps, in the order you do them** — "Read last week's numbers, pick the three winners, write it,
   then check it against your rules."
2. **The framework you follow** — "The problem, one story, one ask. Never two asks."
3. **Your gold standard** — "The best weekly email you've sent. The real email, not a description of it."
4. **Your real files** — "Last week's numbers, exactly as you export them, plus anything you always copy from."
5. **The exceptions** — "Launch week gets its own format. A holiday week: five lines, no numbers."

**Changed vs old:** one label set ("YOUR ASSETS" → "Your real files", "THE EDGE CASES" → "The exceptions");
right column 25px ink (was 19px dim); dim sub-lines cut; green badges → ink (§11.7); monthly roll-up,
dashboard export and "last quarter's report" gone; bottom takeaway cut.

**Checks:** gate CLEAN · no robot · visual review PASS.

## 04 · `04-gold-standard` · "One Real Example Beats A Paragraph Of Adjectives"
**Job:** a real example beats describing it.

**What the viewer sees.** Subtitle: *"Your gold standard is the best weekly email you've already sent."*
Two columns (dashed divider), each: input card → down arrow → the email it writes → outcome. Inputs and
headers are ink; colour lives only on the outcomes.
- **Left, "DESCRIBING IT":** a card of adjectives (`- make it professional`, `- keep it punchy`,
  `- on brand`, `- high quality`) → a red email card "the email it writes" with shapeless wavy lines →
  red **"a generic email"** / *"it guesses again, every week"*.
- **Right, "HANDING IT OVER":** a real email card `best-email.md`: **"Subject: 3 things that worked last
  week"**, "Short one today. Three things worked:", "1. The Tuesday post doubled replies", "2. One reply
  became two new clients", "3. …" → a green email card "the email it writes" with a tick and clean lines →
  green **"~80% to your standard"** / *"it has the real email to copy"*.

**Changed vs old:** "every run matches it" → "~80% to your standard" (§10); the Q3 report → the best weekly
email you've sent; outputs drawn as emails; input boxes + headers ink (were red/green); "the point" line and
two-line takeaway cut; everything ≥ 24px.

**Checks:** gate CLEAN · no robot · visual review FAIL → fixed (inputs/headers to ink; "3. …" excerpt line)
→ self-review PASS.

## 05 · `05-edge-cases` · "Tell It Where The Job Changes — One Skill, Every Version"
**Job:** one lesson — name the exceptions and one skill covers every version (one job, several versions).

**What the viewer sees.** Subtitle: *"The exceptions are the fifth thing you give, and the one people skip."*
Two columns with ink headers.
- **Left, "LEAVE THEM OUT":** three staggered folders, each with its own dim `SKILL.md`: `draft-email/`,
  `draft-launch-email/`, `draft-holiday-email/` → red **"three near-copies to keep in sync"** / *"fix one,
  and the other two drift"*.
- **Right, "NAME THEM ONCE":** `draft-email/SKILL.md` with `## The exceptions`: `- launch week → its own
  format`, `- holiday week → five lines` → a fork into three green boxes "weekly email", "launch email",
  "holiday email" → green **"one job, several versions"** / *"one file covers all three"*.

**Changed vs old:** two lessons merged into one; "the same skill doing more than one job" → "one job, several
versions"; ONE number (three) everywhere; amber heading → ink; weekly / monthly roll-up / board update →
weekly / launch / holiday email (v2 uses weekly + launch); bottom lines cut.

**Checks:** gate CLEAN · no robot · visual review PASS.

## 06 · `06-it-all-goes-in` · "Everything You Told It Now Lives In One File"
**Job:** the payoff — everything you gave sits in one file the AI reads every week.

**What the viewer sees.** Left: **02's exact file view** (`draft-email/SKILL.md`, same five headings and
lines, including both exceptions; only moved left). → ink arrow → the canonical robot (s=0.85), **"the AI"**
/ *"reads it every week"* → ink arrow → a green email card **"this week's email"** with clean lines and a
tick → green **"~80% to your standard"** / *"ready to use"*. Bottom line, bold ink: **"You say it once. It
keeps it."**

**Changed vs old:** "You do not maintain it" → "You say it once. It keeps it."; the checklist card replaced by
02's real file view; skill → AI → result arrows added; the cramped "YOUR SKILL" tab replaced by a full-size
filename tab; subtitle cut (title + bottom line only); "the weekly report" gone.

**Checks:** gate 0 hard (1 REVIEW, acknowledged — robot belt) · robot check OK, s=0.85 · visual review FAIL
→ fixed (holiday exception added to the shared 02/06 file view; bottom line green → ink) → self-review PASS.

---

## Visual review
`excali-reviewer` (Opus) on all 11 PNGs: v6 4 PASS / 2 FAIL (04, 06); both fixed as above, re-rendered and
re-checked against the reviewer checklist (occlusion, collisions, hierarchy, balance, 1-second read, icons,
cold-viewer terms) — clean.

## Flags
- **Reviewer suggestions NOT applied (by lock):** rename `stats/last-week.csv` → `last-week-stats.csv` (the
  reviewer worried a cold viewer might read `stats/` as a subfolder) — kept, because §9 locks that path
  "identical everywhere". "3 winners" → "3 wins" — kept, §9's own vocabulary ("finds the winners").
- **§9 vs "no subfolders":** §9 names the gold example `assets/best-email.md`; this deck shows it as
  `best-email.md` to honour the locked no-subfolder rule. Same file, folder omitted.
- **v6 ↔ v5 continuity (deliberate):** v6's answers never mention emojis or leading with the number, so the
  v5 correction is something the buyer didn't think to say; v5-05 now starts at v6's ~80%.
- **Narration:** `slideNotes` in `clo-course/checkpoint-first-skill.html` still describe the old slides
  (weekly report, "every run", "five near-copies", "other jobs this skill can cover"). Rewrite from the
  "What the viewer sees" blocks above.

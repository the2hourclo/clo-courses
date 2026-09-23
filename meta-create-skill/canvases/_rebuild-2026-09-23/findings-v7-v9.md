# Audit findings — v7-v9 (2026-09-23, read-only review of every PNG + HTML)

I found 10 changes that would make these slides easier to follow. Two of the causes span all three decks. First, every slide carries too much small prose. Second, the running Weekly Email example contradicts decks v4, v5 and v6.

Nothing was edited. Each deck's map.json holds only storyboard comments and no narration, so the slide text is all a viewer has. I measured text at portal size: the slides are 1600px wide and shown at 1068px, so everything scales by 0.6675 (24px becomes 16px, 21px becomes 14px, 18px becomes 12px).

## The mascot (all robots)

- **Five robots across four slides, all copied from the canonical block.** They sit on v7/04, v8/02 (two), v9/01 and v9/05. I diffed each against `<g id="canonical-robot">` and all 44 of 44 shapes match. **The toolbelt is present everywhere**, so the guess that v8/v9 lack it is wrong.
- **One drift, the same on all five.** Two explicit `fill="none"` attributes were removed: the antenna halo ring and the chest-panel outline. The exemplar's HARDENED 2026-07-24 note says never to remove them. The robots only look right because each sits inside a wrapper `<g filter="url(#rough)" fill="none">`. Move one out of that wrapper and the chest renders solid black.
- **Scale.** The robots are drawn at 0.60 to 0.75 size, about 131 to 163px tall in the portal. The five tools shrink to 4 to 6px, so the belt reads as a coloured stripe and no single tool can be picked out. The eyes, antenna and chest panel are still readable.
- **v8/01 draws no robot.** Its only use of the word is the caption "READS LIKE A ROBOT.", which makes the brand's hero the insult.
- **The robot doesn't always mean the same thing.** The label on v7/04 says "THE SAME SKILL". On v8/02 it is both the writer and the reviewer. On v9 it is the employee. The design system says the robot means "the AI".

## Per-slide review

### v7-harden

**01 · The Loud Failure Was Never The Problem**
- **Job:** a run that is quietly wrong is worse than a run that breaks.
- **Mascot:** none. That's fine, because the outputs are the actors.
- **Problems:**
  - "Hardening is not about the runs that break" uses the word hardening two slides before it is defined.
  - There are three closing sentences, and two of them repeat the outcome cards: "costs you two minutes" and "reaches a client".
  - The panel labelled `terminal` with "> run weekly-email" looks like code to an owner using claude.ai or Cowork.
  - The labels are 21px, about 14px in the portal.
- **Fix:** cut the "Hardening is not…" line. Redraw Run A as a chat reply ("I couldn't open your stats file").

**02 · You Already Have Standards. They Are Nowhere On Disk.**
- **Job:** your rules live in your head, not in the file.
- **Mascot:** a stick figure for "you"; no AI is shown. A robot reading the file would make "this file is all the skill ever reads" something you can see.
- **Problems:**
  - It contradicts decks v5 and v6. v5/02 shows corrections being written into `## Conventions`. v6/02 has the interview ask "What do you always check before it goes out?" and write the answer into the file. Here the file shows "## Conventions… nothing here".
  - "On disk" is jargon for this audience.
  - The file text is 21px dim grey mono, the hardest text to read in the deck.
  - "NOT ONE OF YOUR THREE RULES…" runs to within about 18px of the right edge.
- **Fix:** reframe as "Your Rules Are In The File. Nothing Checks The Draft Against Them." Show the rules under Conventions, and show an empty **"## Self-check before handing it over"** section.

**03 · Hardening Is Writing Them Down Where It Reads**
- **Job:** hardening adds a check against your rules before the draft is handed over.
- **Mascot:** none. The right-hand column says "It writes… It reads… It hands" and never says who "it" is.
- **Problems:**
  - "THE SAME FILE, ONE SECTION LONGER" is false. The `## Conventions` section from slide 02 has disappeared and `## Self-check` has taken its place.
  - "Them" in the title only makes sense if you remember slide 02.
  - "block" and "fires here" are jargon.
  - This slide re-teaches v5/02 ("Writes Your Correction Into The File"), which breaks the one-lesson-per-diagram rule.
- **Fix:**
  - Retitle to "Hardening = A Check Before It Hands You Anything".
  - Fill the same empty slot slide 02 showed.
  - Change "fires here" to "checked here".
  - Put a small robot labelled "THE AI" at the top of the right column.

**04 · It Catches Itself. Nothing Else Is Involved.**
- **Job:** proof that the rule stops the made-up 34%.
- **Mascot:** a canonical copy with the fill drift above, at 0.75 size. It is captioned "THE SAME SKILL, ON ITS OWN OUTPUT", and it isn't connected to the first-person "…so I cannot source it" box.
- **Problems:**
  - The verbs change: the title says "Catches", the box says "STOPPED", and the footer says "stopped on its own output".
  - "No second AI" answers a question nobody has asked yet.
  - The subtitle says "the rule you just wrote", but the header says "THE RULE YOU GAVE IT".
- **Fix:** give the STOPPED box a speech tail pointing to the robot, and caption the robot "THE AI, CHECKING ITS OWN DRAFT". Use one verb throughout ("stops").

**05 · A Rule You Set Once Should Never Quietly Lapse**
- **Job:** a set of test cases (the scorecard) proves the rules still work after you edit the skill.
- **Mascot:** none. That's fine.
- **Problems:**
  - The last slide brings in a new object (the scorecard), a new story ("You edited one line on Tuesday") and new jargon ("rule one quietly stopped firing"), all with no setup.
  - The rules were never numbered, so "rule one" means nothing.
  - It never says who runs the scorecard or how.
  - The ticks and PASS say the same thing twice.
- **Fix:** retitle to "After Every Edit, Re-Run These 5 Tests". Replace the story line with "Tuesday's edit broke the number rule. Test 5 caught it before anything went out."

### v8-harness

**01 · Hardening Did Its Job. Two Got Through Anyway.**
- **Job:** the file's rules caught one failure but missed two the skill can't see in itself.
- **Mascot:** none; the only robot is the word in the caption.
- **Problems:**
  - This is the densest slide: 165 words, 60% of them under 24px.
  - It gives away the answers that slides 02 and 04 are meant to teach ("no distance from them", "never the folder").
  - The subtitle says "Three bad drafts thrown **at** the skill", but the arrows flow **from** the skill.
  - "READS LIKE A ROBOT" doesn't match slide 02's "reads like a press release".
  - "34% last month" is odd in a weekly email.
- **Fix:** keep only the quote and the CAUGHT or GOT THROUGH badge in each column, cut the explanations, change the subtitle to "Three bad runs of the hardened skill", and use "READS LIKE A PRESS RELEASE".

**02 · The Writer Cannot Hear Its Own Voice**
- **Job:** a reviewer with no memory of writing the draft catches what the writer can't.
- **Mascot:** two canonical copies with the fill drift, at 0.6 size. The two identical robots teach "same AI, different distance" well.
- **Problems:**
  - Neither robot is called "the reviewer" or "the skill", but slide 03 uses those names.
  - "A CLOSED LOOP" uses the same word slide 03 uses for the fix loop.
  - The captions are 20px, about 13px in the portal.
  - Neither speech box has a tail, so it isn't clear which robot is talking.
  - It never says what a reviewer that never saw it written actually is, in practice (for example, a fresh session).
- **Fix:** label the robots "THE SKILL · wrote it" and "THE REVIEWER · never saw it written". Change "A CLOSED LOOP" to "MARKING ITS OWN HOMEWORK", and add speech tails.

**03 · The Cap Is The Feature**
- **Job:** limit the fix-and-review cycle to three tries, then it comes back to you.
- **Mascot:** none. Two small robots passing the draft back and forth would carry slide 02's picture forward.
- **Problems:**
  - The title needs context the viewer doesn't have yet: "cap" on what?
  - The fix loop is only introduced in the subtitle.
  - Slide 01 promised two blind spots, so this slide reads like it should be the second one, but it's actually part 2 of the reviewer.
- **Fix:** retitle to "Let The Reviewer Send It Back — Three Times, Max". This is otherwise the clearest slide in all three decks.

**04 · A Report Is Not Evidence**
- **Job:** checking the folder beats trusting "Done".
- **Mascot:** none. That's fine.
- **Problems:**
  - "SO THE HARNESS GOES AND LOOKS", but slide 05 calls this piece "A reality check".
  - "last written 6 days ago" on an empty folder is confusing.
  - The `> open` and `~/drafts` lines look like code.
- **Fix:** change the header to "THE REALITY CHECK · it opens the folder" and cut the "6 days ago" line.

**05 · The Skill Guards Its Rules. The Harness Guards Everything Else.**
- **Job:** your rules live inside the file; the three checks live outside it.
- **Mascot:** none. The reviewer robot from slide 02 is missing from piece 1.
- **Problems:**
  - It has the smallest text in all three decks: 18 to 19px, about 12px in the portal, and 57% of words under 24px.
  - The harness gets a second name, "(THE RIG)".
  - The subtitle "Read where each piece lives, not what it is called" gives a reading instruction instead of stating the point.
  - It never says where the harness physically lives. That goes against the design system's rule to show real objects rather than abstractions.
  - "you get only what needed a human" is ungrammatical.
  - The arrow enters the box between pieces 1 and 2, so the order isn't clear.
- **Fix:**
  - Drop "(THE RIG)".
  - Subtitle: "Inside the file: your rules. Outside it: three checks the skill can't run on itself."
  - Add a "lives in: …" tag, add the small reviewer robot to piece 1, and add arrows 1→2→3.
  - Change the caption to "you only see what needs your judgment".

### v9-schedule

**01 · The Last Thing On Your Plate Is Starting It**
- **Job:** the employee works, but you are still the start button.
- **Mascot:** canonical with the fill drift, at 0.62 size. It sits in the left third of a 500px box and leaves the rest empty.
- **Problems:**
  - "THE EMPLOYEE YOU BUILT" is the first time these three decks say "employee"; v7 and v8 said "skill".
  - The red X for "never ran" looks the same as the red X for "failed".
  - 54% of words are under 24px.
- **Fix:** scale the robot up to about 0.95 and centre it. Use a grey dash for weeks that never ran.

**02 · A Schedule Is Earned, Not Switched On**
- **Job:** schedule only after it has been proven, hardened and given a harness.
- **Mascot:** none. That's fine.
- **Problems:**
  - The v7/05 scorecard is missing from the gate.
  - "Anything with one of those missing" is in dim grey where it should have more weight.
  - The sub-lines are 23px.
- **Fix:** add "and it passes its scorecard" to the hardened line.

**03 · Four Blanks To Fill Before It Runs Alone**
- **Job:** before it runs alone, answer when it runs, where the input comes from, where the result lands and how you get told.
- **Mascot:** none. The clock in the middle suggests all four blanks are about timing.
- **Problems:**
  - "Leave one blank and… It runs against a folder that isn't there" only describes blank 3.
  - "/stats/last-week.csv" doesn't match v7/01's "/data/stats.csv".
  - "ONE UNATTENDED RUN" sits tight between the connector lines.
- **Fix:** change the warning to "Leave the folder vague and it writes nowhere, then reports done", and use the same file path in every deck.

**04 · Unattended Is Not Unsupervised**
- **Job:** your own internal work gets done automatically; anything outward waits for your yes.
- **Mascot:** none. A robot holding the draft at the fork would make it clear who "IT JUST DOES IT" refers to.
- **Problems:**
  - The title is abstract. The clear line is in the footer.
  - "Deleting anything" doesn't fit "LEAVES THE BUILDING OR COSTS MONEY".
  - "the rail" is another new term, and its caption is 19px.
- **Fix:**
  - Title: "It Runs Without You. It Does Not Send Without You."
  - Header: "…COSTS MONEY, OR CAN'T BE UNDONE".

**05 · It Runs Monday Morning. You Read The Result.**
- **Job:** the end state: it starts itself and you only review.
- **Mascot:** canonical with the fill drift, at 0.68 size.
- **Problems:**
  - The skill → skill system → AI Employee labels sit directly under the three timeline captions, so "It starts itself" reads as "A SKILL · a task".
  - The labels are off-centre from their columns.
  - "and now it starts itself" repeats column 1.
- **Fix:** move the skill → skill system → AI Employee arrow into its own band below a divider, with a label such as "HOW FAR YOU'VE COME", or cut it. v4/05 already taught it.

## Sequence verdicts

- **v7:** the arc works (pain, cause, fix, proof, lasting). Viewers get lost in two places:
  - **Slides 02–03:** "didn't I already put my rules in the file?" (v5/v6), plus the Conventions → Self-check label swap.
  - **Slide 05:** a cold open on a new object.

  Reframe the one job as "a check at hand-over", not "write it down". Either give slide 05 a bridge line or split it into (a) "an edit can silently break a rule" and (b) the scorecard.
- **v8:** the seam slide works, but it is overloaded and gives away slides 02 and 04. Slide 03 breaks the "two blind spots" pairing that slide 01 sets up, so mark it as the reviewer, part 2. Keep the order, since 03 depends on 02. Slide 05 needs the harness shown as a real thing.
- **v9:** the strongest arc. Slide 04 is effectively a fifth blank ("what it may do without you"). It can stay separate, but slide 03's warning should point at it. The only real stumble is how slide 05 stacks its labels.

## Cross-deck consistency

1. **The locked example contradicts v4.** In v4, `weekly-email/` is the lead skill that "routes · does little itself" over pull-stats, what-worked, draft-email and qa-draft. In v7 and v8, `weekly-email/SKILL.md` "Writes the weekly email" and checks itself, and **none of the four skill names appears anywhere in v7–v9**. v4 says qa-draft "checks it against your rules", which is exactly what v7 hardening and the v8 reviewer describe. The fix is small:
   - Use `draft-email/SKILL.md` in v7 and v8.
   - Name the v8 reviewer `qa-draft/`.
   - Keep `weekly-email/` as the employee in v9.
2. **v7 re-teaches v5/02 and v6/06** ("write it into the file").
3. **The file paths drift:** `/data/stats.csv` against `/stats/last-week.csv`, and `drafts/` against `/drafts/` against `~/drafts`. The made-up line also drifts: "our best month yet" becomes "last month".
4. **Too many names for the same thing:**
   - The writer is called skill, "the one that wrote it", "writer" and "it".
   - The reviewer is "the one that never saw it written" and "independent reviewer".
   - The harness is also "the rig"; the check is also "block" and "fires"; "catches" competes with "stops".
   - "Loop" means two different things on v8/02 and v8/03.
   - About 15 new terms appear across 15 slides.
5. **The scorecard is orphaned** after v7/05. It isn't in the v8/05 inside/outside picture or in the v9/02 gate.
6. **v7/04 says "No second AI", then v8 introduces "two AIs"** without ever saying this is where a second AI earns its place.
7. Examples outside these three decks: v5 and v6 use `weekly-report/`, and v6/01 uses `meeting-notes/`.

## Top 10 changes, ranked by impact on "easy to follow"

1. **Keep one sentence of prose outside each diagram.** Make the title the takeaway, and drop either the subtitle or the dim middle line. Today every slide carries three or four prose lines around the diagram, often repeating it (v7/01, v7/03, v8/01).
2. **Set a 24px text minimum.** The worst are v8/05 (18px), v8/01 (60% of words under 24px), v9/01 (54%), and the dim grey mono file text on v7/02–03.
3. **Fix the locked example** with the rename in cross-deck item 1.
4. **Reframe v7/02–03** as "the rules are in the file, but nothing checks the draft against them", and fill the same section on both slides.
5. **v9/05:** put the skill → skill system → AI Employee arrow in its own band, or cut it.
6. **Use one name per role:** skill, reviewer, harness, check. Drop "rig", "block", "fires" and the second meaning of "loop".
7. **Define hardening before using it:** cut the v7/01 middle line and retitle v7/03.
8. **v7/05 scorecard:** name the action in the title, use plain words for what broke, say who runs it, and then add it to v8/05 and v9/02.
9. **v8/01:** fix the arrow and subtitle contradiction, strip the explanations, and change "ROBOT" to "PRESS RELEASE".
10. **Make the robot usage consistent:**
    - Restore the two missing `fill="none"` attributes on all five robots.
    - Caption the robot as "the AI".
    - Add speech tails on v7/04 and v8/02.
    - Scale it up where there's room (v9/01).
    - Add it where "it" has no clear owner (v7/03, v8/05 piece 1, v9/04).

**Also worth doing:** replace the terminal and command panels on v7/01 and v8/04 with chat replies, since this audience uses claude.ai and Cowork.

Files are in `C:\Users\rkham\OneDrive\Desktop\Rashid Business\product\courses\clo-courses\meta-create-skill\canvases\`:
- `v7-harden\slides\`
- `v8-harness\slides\`
- `v9-schedule\slides\`
- `v4-skill-system\slides\` (where the example is set)
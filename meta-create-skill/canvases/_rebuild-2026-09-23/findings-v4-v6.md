# Audit findings — v4–v6 (2026-09-23, read-only review of every PNG + HTML)

Narration lives in `slideNotes` in `clo-course/checkpoint-first-skill.html` (CP2: v6 → build step → v5)
and `clo-course/checkpoint-system.html` (CP3: v2-05/06 → v4). Portal scale ×0.6675.

## Mascot
- All 7 robots (v4-01, v4-05, v5-02, v5-03, v6-02, v6-06) were real copies but pre-hardening (missing
  `fill="none"` on the antenna ring and chest panel). **Re-copied 2026-09-23 via `_tools/robot.py recopy`.**
- Scale: v4-01 at 0.62 (tools shrink to 4–6px dots) → needs ≥ 0.75. v5-02 (0.72) borderline.
- Missing where needed: v4-02 and v6-01 say "same AI" on both sides but draw no robot (§6: same robot in
  both lanes). No decorative robots anywhere.

## v4 — Skill System (CP3)
| # | Job | Problems | Fix |
|---|---|---|---|
| 01 | Separate skills make you the wire between steps | Strong. "STEP 1–4", "does every step" 17px. Robot too small; its arrow only reaches step 1 though it "does every step". | Robot ≥ 0.9; small labels ≥ 24px. |
| 02 | A system carries the hand-offs | 54 text lines, 48 < 24px. Left half repeats 01; right half teaches 03 early (`weekly-email/` "the lead skill") and 04 early ("YOU · your judgment · the final call · off the path"). "Off the path", "the wiring" unexplained. Says "Same AI", no AI drawn. | Cut the left half. Redraw the after-state in 01's exact layout (swipe = before → after). Add the robot. Fold 04's amber review column in. |
| 03 | The lead skill holds the order + hand-offs | Drawing contradicts claim: skills pass directly to each other, yet "None of them knows the next one exists". "Calls" only on the arrow into step 1. Same point ×4 (subtitle, "IT HOLDS ONLY", SKILL.md box, takeaway). Cards 16–17px. "routes" undefined. qa-draft hands off "an approved draft" but 04 says you approve. | Draw the 4 steps INSIDE the `weekly-email/` box, every arrow going through the lead skill. Drop card descriptions + "IT HOLDS ONLY". Last hand-off "a checked draft". |
| 04 | Only the judgment call stays yours | Title "What It Looks Like on a Real Job" doesn't state the point; same job as 01–03. Box labelled "THE SKILL SYSTEM" not `weekly-email/`. Header + footer bands repeat. You drawn amber (red/black on 01–02). | CUT — merge its review column into the new 02. |
| 05 | Skill → Skill System → AI Employee ladder | Each idea labelled 3–4× per column. "The thing that owns **it**" ambiguous. "You still make the call." tag shape unreadable. | Delete the "a task / a function / a worker who owns it" row. Takeaway per §10 ladder. |

## v5 — Retrospective (CP2, after the build step)
| # | Job | Problems | Fix |
|---|---|---|---|
| 01 | A correction made in chat never reaches the file | "RUN 2 · the same mistake" sits INSIDE "THE CHAT · this conversation only" — in one chat the AI would remember. Second arrowhead at the bubble edge (`polyline 1038,308 1046,315…` on a 1046→1084 line) reads backwards. Run text touches box edges. "Run" undefined. | Run 2 in its own "NEXT WEEK · new chat" box. Arrowhead to 1076–1084. "this week's / next week's email". |
| 02 | The retrospective writes the fix into the file | Shows the edit saved, then 03 says nothing is written until yes (backtrack). "Retrospective" used undefined. "`+ - No emojis`" diff notation. "THE SKILL ON DISK" floats ~100px above the file. Robot small, unlabelled. | Arrow "written in — after your yes". Green NEW tag instead of "+ -". One-line definition in the subtitle. Label on the file box. Robot captioned. |
| 03 | You approve every edit | Good. Footnote "It only proposes what it actually saw go wrong — it never guesses at a fix" (23px) overflows its 820px box both sides. | Widen to ~900px or shorten. |
| 04 | One command, two modes | `/ai-employee-builder:retrospective` is the centrepiece; takeaway says "There is no process to remember"; unclear whether you type the command or say the quoted sentence. Slash syntax only fits Claude Code (portal also serves Cowork/Codex). "Session" jargon. | Lead with "just say:" + the two quotes; drop the slash command from the slide (§11.8). |
| 05 | Corrections add up | "WHERE IT STARTED · average at best" contradicts v6-06 ("~80% to your standard"). One correction on 02/03 becomes two steps here. "v1–v5", "cite the source row", "flag drops over 20%" jargon. Title "Every Run" — corrections only happen when you notice. | Start box "~80% · a strong first draft". Merge the first two steps. "week 1…week 5". End "work you'd put your name on". |

## v6 — How to Create a Skill (CP2, shown first)
| # | Job | Problems | Fix |
|---|---|---|---|
| 01 | Clarity about your work beats clever prompting | Two rows use different skills (`meeting-notes/SKILL.md` vs `weekly-report/SKILL.md`) under "Only the answer it was given changed." Subtitle says "same interview" before 02 introduces it. "The AI is the same in both rows" — no robot. | One file (`draft-email/SKILL.md`) in both rows. Subtitle "Same AI. Only what you told it changed." Robot in both rows. |
| 02 | The AI interviews you and writes the file | The 5 questions don't match 03's 5 inputs ("What do you always check" has no input; "your assets" has no question). Answers never appear — questions point straight at file lines (18px dim → 12px). Robot's arrow reaches only question 3. | Make the 5 questions map 1:1 to 03's 5 inputs. Label arrows "your answer". File lines 24px ink. |
| 03 | The five things you give it | Example column the narration says to "read" is 19px dim (~12.7px). "YOUR ASSETS" here = "Your real files" on 06 + narration. | 24px ink right column. One label: "your real files". |
| 04 | A real example beats adjectives | "every run matches it" ≈ retired "matches your gold", overpromises. Gold standard is a "Q3 report" for a weekly skill. | "~80% to your standard". Gold = `assets/best-email.md` "the best weekly email you've sent". |
| 05 | Exceptions + other situations | Two lessons in one title. Numbers disagree ("five near-copies" / "not three you keep syncing" / "five that drift apart"). "the same skill doing more than one job" contradicts v4 "one job each". Amber heading = scripts colour. | Settle on "three". "one job, several versions" (§10). Ink heading. |
| 06 | Recap: all five in one file the AI reads | "You do not maintain it" conflicts with 05 "keep sharpening" and v5 "training". No skill → robot arrow. Skill drawn as a checklist card, but 02 showed the real SKILL.md. "YOUR SKILL" tab text touches border. | "You say it once. It keeps it." Add the skill → robot arrow. Reuse 02's file view. |

## Sequence verdicts
- **v4 → 4 slides:** 01 the problem → 02 the after-state in 01's layout incl. 04's review column → 03 the lead-skill file (steps inside the box) → 05 the ladder. (CP3 opens with v2-06 then v2-05 before v4 — v2 owns those.)
- **v5:** arc right. Lost at 02 → 03 (saved, then not) and at 05 (starts "average" after v6 promised ~80%).
- **v6:** lost at 02 → 03 (five questions, then five different things). 06 is the third listing — line 02 up with 03 exactly, and use 06 as the file → AI → result payoff.

## Cross-deck
1. Running example drifts: v4 Weekly Email; v5/v6 `weekly-report/` with a Q3 report, dashboard, board update; v6-01 adds `meeting-notes/`. → §9 (`draft-email/`).
2. ~80% (v6-06) vs "average at best" (v5-05).
3. "One job" (v4) vs "more than one job" (v6-05).
4. "You do not maintain it" (v6-06) vs "keep sharpening"/"training" (v6-05, v5).
5. Same thing labelled differently: `weekly-email/` vs "THE SKILL SYSTEM"; the five inputs have three label sets; "approved draft" vs "YOUR REVIEW"; "You" in red, black and amber.
6. Legend colours reused: blue marks the retrospective, "FIX IT NOW", "WHAT IT ASKS YOU"; amber marks the human step, "REVIEW THE SESSION", "THE EXCEPTIONS".
7. Text < 24px throughout (16–17px smallest, usually dim). Worst: v4-02 (48/54), v4-03 (30/51), v6-02 (all 19).
8. One platform-specific command: `/ai-employee-builder:retrospective` on v5-04.

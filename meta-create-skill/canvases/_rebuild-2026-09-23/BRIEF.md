# Rebuild brief — shared by every deck agent (2026-09-23)

You are rebuilding one or two slide decks of the AI Employee Builders skills course so a non-technical
service-business owner can follow along in the buyer portal. Rashid approved the plan and the locked
decisions; your job is execution to that contract, not re-deciding it.

## Read first (in this order)
1. `../DESIGN-SYSTEM.md` — ALL of it. §9 (the running example), §10 (one name per idea), §11 (slide rules)
   were added today and override anything older in the file or in the current slides.
2. Your deck's section of `findings-v1-v3.md` / `findings-v4-v6.md` / `findings-v7-v9.md` in this folder —
   the audit of every current slide, with located problems and the smallest fix.
3. `C:\Users\rkham\OneDrive\Desktop\Rashid Business\.claude\skills\excali-graphic\SKILL.md`, then
   `references/patterns.md` (patterns 12–16 are the ones this set uses) as needed.
4. Each current slide's `.html` + `.png` before you touch it.

## What to do per slide
- Edit the slide's `.html` IN PLACE (keep the filename — the portal references slides by filename; the
  only allowed removals are ones your deck notes name). Keep the house recipe: white bg + dot grid, real
  Excalifont (`Excalifont-Regular.woff2` already sits beside the slides), shapes inside
  `<g filter="url(#rough)">`, every `<text>` outside it, polyline arrowheads, 1600×1050 viewBox.
- Apply the findings' fixes AND the §9–§11 rules: running example, one name per idea, 24px floor for
  anything a viewer reads, title = the takeaway, ≤ 2 prose lines outside the diagram that never repeat
  each other, one job per slide, no subfolder colours on non-subfolder things, no terminals / prompts /
  slash commands, no collisions.
- **Robots:** never draw one. Generate each with
  `python ../_tools/robot.py block --cx <x> --feet <y> --s <scale> --id canonical-robot[-2]` (run from
  this folder, or give the full path) and paste it inside the rough group; add the `#eyeGlow` def from
  `python ../_tools/robot.py defs` to `<defs>` if missing. s ≥ 0.75 (≥ 0.7 when two share a slide).
  Caption each robot by role (§11.5). A prop (magnifier, marker) is a separate shape at the gripper —
  never edit the block. Where a slide says "same AI", draw the same robot in both lanes.
- Cut words before you shrink type. If a slide still will not fit at 24px, it is carrying two jobs —
  cut the second one.

## Verify every slide (no exceptions)
```powershell
$sk = "C:\Users\rkham\OneDrive\Desktop\Rashid Business\.claude\skills\excali-graphic"
python "$sk\scripts\excali-gate.py" "<slide>.html"          # must be 0 hard
& "$sk\scripts\render.ps1" -Html "<slide>.html" -Out "<slide>.png"   # 2x default — keep it
python ..\_tools\robot.py check "<slide>.html"               # must not FAIL (no output = no robot)
```
The gate's ">3 accent colours" REVIEW is acknowledged ONLY for slides that show the subfolder legend or a
robot (its belt colours are a fixed identity legend). Then LOOK at the rendered PNG with the Read tool and
judge it the way `.claude/agents/excali-reviewer.md` (in the workspace root) does: occlusion, label
collisions, hierarchy, crowding, the one-second read, ambiguous icons, and whether a cold viewer could
decode every term on the canvas. If you can spawn the `excali-reviewer` agent, do; otherwise run that
checklist yourself and be strict. Fix → re-render → re-check until clean.

## Boundaries
- Touch ONLY your own deck folder(s) plus your notes file. Do not edit `clo-course/`, `index.html`,
  `DESIGN-SYSTEM.md`, `_tools/`, other decks, or anything outside `canvases/`. Do not commit.
- If a locked decision makes a slide impossible or worse, do not silently deviate: build the closest
  compliant version and flag it in your notes file.

## Deliverable — `_rebuild-2026-09-23/<deck>-slides.md` (one per deck)
For each slide, in the FINAL viewing order:
- filename · final title · the one job
- **What the viewer sees**, left to right / top to bottom, in plain words (the main thread writes the
  portal narration from this, so be concrete: every label that matters, every arrow's meaning)
- what changed vs the old slide
- gate result, robot check result, visual review verdict
Then: the final deck order, any file removed, anything flagged. Update the deck's `map.json` to the final
order and labels.

End your final message with a short summary (slides done, anything flagged). Keep it tight.

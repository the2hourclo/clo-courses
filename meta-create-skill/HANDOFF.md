# Meta Create Skill Course — Session Handoff

**Purpose of this file:** Context for any future Claude session continuing work on this course. Read this first. It captures the state of the course, decisions already made, conventions to honor, and outstanding work.

**Last updated:** 2026-04-22

---

## Current focus: clean up the installation process

**The next session's main task:** tighten up the install lessons (L5 Claude Code, L6 Claude.ai) so they're production-ready.

### What currently exists in install-cc (L5)
- 5 steps, modeled after `business-x-ray`'s install flow:
  1. Install Claude Code Extension — has embedded screenshot (VS Code extensions panel, lifted from business-x-ray)
  2. Log in to Claude Code — text only
  3. Install GitHub CLI & Clone the Skill — copyable paste-into-Claude-Code prompt
  4. Verify the Skill is Installed — folder-tree ASCII diagram (screenshot was removed because it showed business-x-ray content, not meta-create-skill)
  5. Trigger the skill — 3 example prompts to try

### What currently exists in install-web (L6)
- Upload-via-Customize-Skills path
- Uses `claude.ai/customize/skills` primary path (correct as of 2026-04)
- Prerequisite: enable Code Execution at `claude.ai/settings/capabilities`
- Has placeholder "Screenshot pending" divs for real screenshots

### What the cleanup likely needs
1. **Real meta-create-skill screenshots** — the VS Code extension install screenshot is fine (generic), but the "verify" step needs a proper screenshot showing `meta-create-skill-standalone/` folder structure in VS Code file explorer
2. **Claude.ai install screenshots** — all 4-5 placeholders in L6 still need real captures
3. **Prompt polish** — the paste-into-Claude-Code prompt in Step 3 references `git clone https://github.com/the2hourclo/meta-create-skill-standalone` — verify this repo exists and works
4. **Test the flow end-to-end** — actually run through install-cc on a fresh project to catch gaps
5. **Optional:** add a video walkthrough embed once recorded

### Where the install screenshots live
- The one surviving screenshot (install Claude Code extension) is at `LESSON_CONTENT['install-cc']` Step 1, inside an `<img src="data:image/png;base64,…">` tag with class `install-screenshot`
- CSS for `.install-screenshot` was added next to `/* INSTALL SCREENSHOTS (L4-L5) — copied from business-x-ray */` block
- Source of the original screenshots: `../business-x-ray/index.html` lines 668 and 692 (the latter was deleted from meta-create-skill)

---

## Project at a glance

Interactive HTML course teaching users how to use the `meta-create-skill-standalone` skill.

- **File:** [clo-courses/meta-create-skill/index.html](index.html) — single self-contained file, ~580KB (grew from ~200KB after adding screenshots and interactive panels)
- **Preview URL (local):** `http://localhost:8765/meta-create-skill/` (start server with command below)
- **Preview URL (live):** https://the2hourclo.github.io/clo-courses/meta-create-skill/
- **Git repo:** https://github.com/the2hourclo/clo-courses (committed + pushed; Pages enabled)
- **Status:** Course content and structure is shipped. Installation screenshots need a polish pass.

### Sister courses in the same repo
- `../business-x-ray/index.html` — the visual template we cloned from (dark theme, #79EA20 accent, CLO logo). Has polished install screenshots we lifted from.
- `../clo-course/claude-code-101.html` — broader Claude Code 101 course

---

## How to preview

```bash
cd "c:/Users/rkham/OneDrive/Desktop/Cursor Projects/clo-courses"
python -m http.server 8765
# then open http://localhost:8765/meta-create-skill/
```

Hard-reload with `?v=N` query string if the browser caches an old version (e.g. `?v=42`). Router listens on hashchange, so `#lesson-id` jumps directly to any lesson.

**Playwright:** use `mcp__plugin_playwright_playwright__browser_navigate` + `browser_take_screenshot`. If the browser gets stuck, call `browser_close` first, then retry.

---

## Course structure — 19 lessons, 5 groups

| # | ID | Title | Sidebar label |
|---|----|----|----|
| 1 | `welcome` | Welcome & What You'll Build | Welcome & What You'll Build |
| 2 | `what-is-skill` | What Is a Skill? | What Is a Skill? |
| 3 | `comparison` | Why this skill exists | Foundational vs Production |
| 4 | `prereq` | Prerequisites & Two Paths | Prerequisites & Two Paths |
| 5 | `install-cc` | Install on Claude Code | Install on Claude Code |
| 6 | `install-web` | Install on Claude.ai | Install on Claude.ai |
| 7 | `anatomy` | Skill Anatomy | Skill Anatomy |
| 8 | `disclosure` | Progressive Disclosure | Progressive Disclosure |
| 9 | `types` | The Three Skill Types | The Three Skill Types |
| 10 | `decision` | Workflow vs Standalone | Workflow vs Standalone |
| 11 | `chain` | How Skills Chain | How Skills Chain |
| 12 | `progression` | From Skill to Library | From Skill to Library |
| 13 | `desc` | Descriptions That Trigger | Descriptions That Trigger |
| 14 | `improve` | Iterative Improvement | Iterative Improvement |
| 15 | `pin-output` | Pin the Output First | Pin the Output First |
| 16 | `frameworks` | Frameworks & Thinking Methods | Frameworks & Thinking Methods |
| 17 | `first-skill` | Build Your First Skill — step by step | Your First Skill |
| 18 | `ship` | Validate, Test, and Ship | Validate, Test, Ship |
| 19 | `frontmatter-lab` | YAML Frontmatter Builder Lab | YAML Builder Lab |

**Groups:**
- Orientation (L1–3)
- Install the Skill (L4–6)
- Core Teaching (L7–14)
- Ship It (L15–18)
- Reference (L19)

**Cross-references in prose:** several lessons point to other lessons by number. When lesson count changes, grep for `Lesson N` in the file and update all references.

### Recent structural moves (keep in mind)
- **L9/L10 swap** — `types` now precedes `decision` (Three Types BEFORE the Q1–Q5 decision tree). This was a deliberate SEED-framework alignment: show archetypes concretely, then give the rule for choosing between them.
- **Frameworks moved to Ship It** (L16) — it pairs naturally with Pin the Output: pin what you want → name the method that produces it → encode both.
- **Pin the Output is NEW** (L15) — teaches the reverse-engineering method: start with the gold output, reverse into the skill brief. Includes three tabbed worked examples (carousel, code review, meeting summarizer).
- **YAML Builder Lab is NEW** (L19) — interactive lab with:
  - Preset dropdown (5 skill archetypes)
  - Feature toggles + selects for every frontmatter field
  - Live YAML preview with syntax highlighting
  - **Visual canvas:** 10 live glyphs (brain, power meter, fork, subagent avatar, toolbox, timeline, routing, file scope, terminal, triggers+autocomplete) that react to form state
  - Tooltips on each glyph explaining *why* the field is set that way for the current preset
  - Behavior-tag summary + plain-English explanation at bottom
- **main can be wide** — lesson `frontmatter-lab` gets `.lesson-wide` class on `#main` (max-width 1400px vs 920px default) so the interactive lab has breathing room. Other lessons stay at 920px.

---

## Visual / brand conventions

- **Template:** matches `../business-x-ray/index.html` — dark theme, lime-green accent (#79EA20), CLO logo in header
- **Header:** CLO logo (base64 PNG lifted from Business X-Ray) + "Meta Create Skill" + "Interactive Course" subtitle
- **CSS tokens:** defined in `:root` — `--bg`, `--surface`, `--accent`, etc. Do not introduce new colors without good reason.
- **Existing reusable components:**
  - `.matrix-table` / `.matrix-wrap` — comparison tables (L3, L4, L7, L10)
  - `.install-step` — numbered circle + body (L5, L6, L12 stages, L17)
  - `.install-screenshot` — bordered/rounded wrapper for install screenshots (L5)
  - `.fw-card` / `.fw-grid` — framework cards (L16)
  - `.ex-tabs` / `.ex-tab-panel` — tabbed content (L9 skill types, L12 evolution canvas, L15 pin-output examples)
  - `.type-card` — 3-card comparison header (L9)
  - `.rule` / `.rule-num` / `.rule-body` — numbered rule rows (used throughout)
  - `.feature-card` / `.feature-card.dq` — visual-left + text-right cards (L3 feature cards, L10 decision-Q cards)
  - `.callout` / `.callout warn` / `.callout note` — accent-border boxes
  - `.folder-tree` — ASCII folder listings
  - `.code-block` — syntax-highlighted code examples
  - `.fw-nav` / `.fw-nav-pill` — jump nav (L16 frameworks)
  - `.stage-trigger` — dashed-orange between-stage callouts (L12 progression)
  - `.evo-canvas` / `.evo-tab` / `.evo-panel` — interactive 5-stage library evolution (L12)
  - `.exploded-view-wrap` — hero visual with radial document explosion (L1)
  - `.scope-map` — 4-card install scope visual (L7)
  - `.yaml-builder` + `.yb-*` — interactive YAML builder (L19 lab)
  - `.glyph-grid` + `.glyph-card` — live-updating visual canvas cards (L19 lab)
  - `.pin-hero` / `.pin-flow` / `.pin-example` — Pin the Output visuals (L15)

---

## Voice & content conventions (Rashid's preferences)

Pulled from memory and session feedback. Honor these on every edit.

### Generic examples only, not Rashid's specific skills
- Do NOT name `write`, `write-hook`, `writing-humanize`, `writing-format`, `writing-logic`, `business-x-ray`, `publishing`, `youtube-strategy`, `carousel`, etc. by their actual Rashid-library names in the lesson content
- Use generic illustrative names: `write-content`, `write-newsletter`, `code-review`, `release`, `summarize-transcript`, `voice-cleanup`, `format-platform`
- The L12 From Skill to Library lesson uses generic names throughout (write-content, write-hook, voice-cleanup, format-platform)
- **Exception:** the course teaches `meta-create-skill-standalone` and references `create-skill` (the foundational counterpart) by those names because that IS what the course is about

### Anthropic's built-in skill creator is NOT a feature
- Do NOT mention "Anthropic's built-in skill creator" anywhere. It doesn't exist as a distinct feature.
- L3 comparison is ONLY `create-skill` (foundational) vs `meta-create-skill-standalone` (production) — 2 columns, not 3

### Claude.ai install path — use Customize → Skills (correct as of 2026-04)
- Primary path: `claude.ai/customize/skills` → Upload ZIP → enable toggle
- Prerequisite: enable Code Execution at `claude.ai/settings/capabilities`
- Alternative (secondary): Project Knowledge upload — for project-scoped use only
- Claude.ai does NOT have hooks, plugins, custom slash commands, or user Python script execution
- Do NOT confuse Projects with the Customize area — they're separate surfaces

### Writing voice (from writing-humanize skill)
- Active voice. Subject does action to object.
- Imperative instructions ("Identify X"), not descriptive ("You should identify X")
- No em dashes in prose — use periods, "and", "so", "because"
- No distancing metaphors ("the machine", "the system") — say "your business/library/skill"
- Vary conversational filler naturally (so, now, look, basically, honestly, just) — 2-5 per section, don't cluster 3+ in one sentence
- Explain WHY rules exist, not just WHAT the rules are
- Avoid expletive subjects ("There is/are", "It comes down to")
- Avoid confidence-hedging vague modifiers ("various", "numerous")
- Real examples beat abstract rules

### Bridge-between-lessons rule (added this session)
- Each lesson's closing paragraph should bridge to the next lesson's topic — a question, tension, or setup. No self-contained mini-essays.
- Already audited + fixed for L1→2, L2→3, L7→8, L8→9, L9→10, L10→11, L11→12, L12→13, L13→14, L14→15, L15→16, L16→17, L17→18.

### Visual conventions from Business X-Ray
- Folder trees use box-drawing chars: `├──` `└──` `│`
- YAML examples in code-block use `.kw` (cyan) + `.str` (green) + `.hl` (accent) spans
- SVGs use inline styles, not classes, with the dark palette

---

## Design decisions locked in (don't re-debate)

1. **Logo in header** = CLO base64 PNG from Business X-Ray (not a letter-in-green-box)
2. **Comparison table** (L3) is 2-column — `create-skill` foundational vs `meta-create-skill-standalone` production. No third Anthropic column.
3. **L3 intro reframed around stakes** — "at 3 skills / 7 skills / 12 skills / 20 skills" failure narrative. Don't revert to the blander "skill-authoring tools stop there" framing.
4. **L3 has 6 feature cards** with visuals (decision tree, library audit, route-fix, self-heal, eval bars, trigger target)
5. **L10 decision tree** is rendered as a 3-column decision matrix table PLUS feature-card-style Q1–Q5 visual cards, NOT an SVG flowchart. The old SVG tree was hard to read visually. Do not revert.
6. **L10 Q1–Q5 each has a visual** showing workflow (purple) vs standalone (green) side-by-side
7. **L9 Three Skill Types** uses interactive ex-tabs showing example SKILL.md + folder tree + "why this pattern fits" for each of Simple / With Workflows / Orchestrator
8. **L11 How Skills Chain** uses a system-level SVG showing 3 generic orchestrators → shared standalones (not one specific orchestrator). Caption emphasizes "read the arrows, not the names."
9. **L12 From Skill to Library** teaches the 5-stage evolution with:
   - An interactive 5-tab evolution canvas at the top (SVG per stage showing folder structure + delegation arrows)
   - Detail install-step blocks for each stage with folder trees and dashed-orange "trigger" callouts
   - Stage 3 has a "Why move siblings outside?" block explaining the motivation (not just the mechanics)
10. **L13 Descriptions** uses the "pushy descriptions" framing
11. **L15 Pin the Output** teaches the reverse-engineering method. Three tabbed worked examples: carousel, code review, meeting summary. Two hero visuals (forward-vs-reverse + 6-step flow).
12. **L16 Frameworks** has 33 frameworks across 7 color-coded categories, with a 7-pill jump nav at the top. Includes a "Why frameworks matter" side-by-side visual (without-framework vs with-framework).
13. **L17 Your First Skill** opener was rewritten to bridge from Pin the Output + Frameworks: "You filled in the worksheet. You know the gold output, the qualities, the moves..."
14. **L7 Full YAML frontmatter reference** was REPLACED with a pointer to L19 YAML Builder Lab (interactive > static table). Don't re-add the static table.
15. **L19 YAML Builder Lab** — all 15 frontmatter fields covered (name, description, when_to_use, argument-hint, hooks, user-invocable, disable-model-invocation, allowed-tools, paths, shell, context, agent, model, effort). Effort has all 5 values (low/medium/high/xhigh/max per Anthropic docs). Visual canvas order: Model/Effort/Context/Subagent (row 1), Tools/Hooks/Invocation/Path scope (row 2), Shell + Triggers-wide (row 3).
16. **Single-file architecture** — everything lives in `index.html`. No external JS/CSS/images except inline base64 (logo + 1 install screenshot). Preserves portability for GitHub Pages.

---

## Outstanding work (as of last session)

1. **[NEXT UP] Clean up install-cc (L5) and install-web (L6)** — see top of this doc for specifics
2. **Real-life example demonstration** — Rashid asked for an end-to-end example of creating a skill using `meta-create-skill-standalone`. Not yet built.
3. **Confirm the `meta-create-skill-standalone` GitHub repo exists** — the install-cc step 3 prompt clones from `https://github.com/the2hourclo/meta-create-skill-standalone`. Verify the repo is live and contains the correct SKILL.md + workflows.
4. **Optional:** record video walkthrough; embed at top of L5/L6

---

## How to work efficiently on this file

- **Search before editing** — the file is ~580KB, read specific sections with `Read` tool offset/limit. Don't load the whole thing. `Grep` for `LESSON_CONTENT['<id>']` to find lesson blocks.
- **LESSON_CONTENT sections** are template strings — each lesson's prose lives in one `LESSON_CONTENT['<id>'] = \`...\`;` block
- **CSS is at the top** (~lines 10-300). Main JS below. Lesson content after that. Body is minimal — just `.header`, `.app`, `.sidebar`, `.main`, and the script.
- **Cross-references** — when you add/remove a lesson, grep for `Lesson \d+` and update all pointers.
- **Base64 screenshots are huge** — each is 100-250KB on a single line. Use Python to manipulate them; don't use Read or Edit directly on those lines. Keep the string-replacement approach (see `_splice_screenshots.py` pattern that was used earlier).
- **Verify after every material change** — navigate via Playwright to the edited lesson, take a full-page screenshot, check it renders cleanly. Clean up screenshots after.
- **Cleanup discipline** — delete verify screenshots after reviewing: `rm -f v-*.png check-*.png read-*.png` in the working dir, plus prune `.playwright-mcp/page-*.yml` files

---

## Git + Deploy workflow

```bash
cd "c:/Users/rkham/OneDrive/Desktop/Cursor Projects/clo-courses"
git status
git add meta-create-skill/index.html
git commit -m "Short description"
git push origin main
# GitHub Pages rebuilds automatically (1-2 min)
```

- Remote: `https://github.com/the2hourclo/clo-courses.git`
- Pages is already enabled on `main` branch root path. No re-enable needed when adding new content.
- Verify build at https://github.com/the2hourclo/clo-courses/actions
- Live URL: https://the2hourclo.github.io/clo-courses/meta-create-skill/
- File size is bloated by base64 screenshots (~580KB vs source size without them ~200KB). GitHub Pages serves it fine.

---

## Recent feedback patterns (for future sessions)

Observations from what Rashid corrects / asks for:
- Prefers concrete examples over abstract teaching
- Values visual scanability (tables, cards, jump nav, live visuals) over long prose
- Wants the course to teach the *system* of skills, not just one skill
- Often asks "can Claude decide this for me?" — address that directly in lessons where relevant
- Reviews lesson-by-lesson by reading through in order, not by jumping to specific topics
- Asks for readability review before considering a section done
- Does NOT want Rashid-specific skill names in generic teaching content
- Asks for interactive visuals where they'd replace dense text (see: YAML Lab, evolution canvas, Q1-Q5 visuals)
- Likes Apple-style hero visuals (see: L1 exploded view)
- Wants tooltip-style explanations on hover for interactive elements
- Reference group (lab) is separate from Ship It — respects the "reference you come back to" vs "linear learn-and-do" distinction

---

## Useful memory pointers

User memory (auto-loaded) has full context on Rashid's voice, skill library, business framework. Key items to recall:
- **Writing active voice is #1 rule** — `feedback_active_voice_rule.md`
- **No em dashes** — `feedback_no_em_dashes.md`
- **No distancing metaphors** — `feedback_no_machine_analogies.md`
- **Probabilistic openers**, avoid "You've" stacks — `feedback_probabilistic_openers.md`
- **SEED framework** for concept explanations — `feedback_seed_usage.md`

These apply to course prose, not just newsletters.

---

## If a fresh session is picking this up

1. Read this entire file
2. If the task is installation cleanup (the next focus), start by previewing L5 and L6 in the browser: `http://localhost:8765/meta-create-skill/#install-cc` and `#install-web`
3. Read [index.html](index.html) in chunks as needed — don't load it all at once
4. Ask Rashid what specifically he wants updated on the install lessons
5. Honor the locked-in design decisions above unless he explicitly says otherwise
6. Run `writing-humanize` on any new prose before declaring it done
7. Test the actual install flow (if possible) — clone the repo, open VS Code, verify the paste-prompt works
8. Update this HANDOFF.md at the end of your session if you changed anything structural

Good luck. Ship it.

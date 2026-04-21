# Meta Create Skill Course — Session Handoff

**Purpose of this file:** Context for any future Claude session continuing work on this course. Read this first. It captures the state of the course, decisions already made, conventions to honor, and outstanding work.

**Last updated:** 2026-04-21

---

## Project at a glance

Interactive HTML course teaching Rashid's users how to use the `meta-create-skill-standalone` skill.

- **File:** [clo-courses/meta-create-skill/index.html](index.html) — single self-contained file, ~200KB
- **Preview URL:** `http://localhost:8765/meta-create-skill/` (start server with command below)
- **Git repo target:** https://github.com/the2hourclo/clo-courses (not yet committed)
- **Status:** Content is 95% done. Real screenshots for install lessons deferred until Rashid records a video walkthrough.

### Sister courses in the same repo
- `../business-x-ray/index.html` — the visual template we clone from (dark theme, #79EA20 accent, CLO logo)
- `../clo-course/claude-code-101.html` — the broader Claude Code 101 course (6 skill sections we referenced but don't extract from directly anymore)

---

## How to preview

```bash
cd "c:/Users/rkham/OneDrive/Desktop/Cursor Projects/clo-courses"
python -m http.server 8765 &
# then open http://localhost:8765/meta-create-skill/
```

Hard-reload with `?v=N` query string if browser caches an old version (e.g. `?v=11`). Router listens on hashchange, so using `#lesson-id` jumps directly to any lesson.

**Playwright:** use `mcp__plugin_playwright_playwright__browser_navigate` + `browser_take_screenshot`. If the browser gets stuck, call `browser_close` first, then retry.

---

## Course structure — 17 lessons, 4 groups

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
| 9 | `decision` | Workflow vs Standalone | Workflow vs Standalone |
| 10 | `types` | The Three Skill Types | The Three Skill Types |
| 11 | `chain` | How Skills Chain | How Skills Chain |
| 12 | `progression` | From Skill to Library | From Skill to Library |
| 13 | `desc` | Descriptions That Trigger | Descriptions That Trigger |
| 14 | `frameworks` | Frameworks & Thinking Methods | Frameworks & Thinking Methods |
| 15 | `improve` | Iterative Improvement | Iterative Improvement |
| 16 | `first-skill` | Build Your First Skill — step by step | Your First Skill |
| 17 | `ship` | Validate, Test, and Ship | Validate, Test, Ship |

**Groups:** Orientation (1-3) → Install the Skill (4-6) → Core Teaching (7-15) → Ship It (16-17)

**Cross-references in prose:** several lessons point to other lessons by number. When lesson count changes, search for `Lesson N` in the file and update all references.

---

## Visual / brand conventions

- **Template:** match `../business-x-ray/index.html` — dark theme, lime-green accent (#79EA20), CLO logo in header
- **Header:** CLO logo (base64 PNG lifted from Business X-Ray) + "Meta Create Skill" + "Interactive Course" subtitle
- **CSS tokens:** defined in `:root` — `--bg`, `--surface`, `--accent`, etc. Do not introduce new colors without good reason.
- **Existing reusable components:**
  - `.matrix-table` / `.matrix-wrap` — comparison tables (used in L3, L4, L7, L9)
  - `.install-step` — numbered circle + body (used in L5, L6, L12 stages, L16)
  - `.fw-card` / `.fw-grid` — framework cards (L14)
  - `.ex-tabs` / `.ex-tab-panel` — tabbed content (L10 skill types)
  - `.type-card` — 3-card comparison header (L10)
  - `.rule` / `.rule-num` / `.rule-body` — numbered rule rows (used throughout)
  - `.callout` / `.callout warn` / `.callout note` — accent-border boxes
  - `.folder-tree` — ASCII folder listings
  - `.code-block` — syntax-highlighted code examples
  - `.fw-nav` / `.fw-nav-pill` — jump nav (L14 frameworks)
  - `.stage-trigger` — dashed-orange between-stage callouts (L12 progression)
  - `details.ref-details` — collapsible sections (L7 full YAML table)

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

### Visual conventions from Business X-Ray
- Folder trees use box-drawing chars: `├──` `└──` `│`
- YAML examples in code-block use `.kw` (cyan) + `.str` (green) + `.hl` (accent) spans
- SVGs use inline styles, not classes, with the dark palette

---

## Design decisions locked in (don't re-debate)

1. **Logo in header** = CLO base64 PNG from Business X-Ray (not a letter-in-green-box)
2. **Comparison table** (L3) is 2-column — `create-skill` foundational vs `meta-create-skill-standalone` production. No third Anthropic column.
3. **L9 decision tree** is rendered as a 3-column decision matrix table, NOT an SVG flowchart. The old SVG tree was hard to read visually. Do not revert.
4. **L10 Three Skill Types** uses interactive tabs showing example SKILL.md + folder tree + "why this pattern fits" for each of Simple / With Workflows / Orchestrator
5. **L11 How Skills Chain** uses a system-level SVG showing 3 generic orchestrators → shared standalones (not one specific orchestrator). Caption emphasizes "read the arrows, not the names."
6. **L12 From Skill to Library** teaches the 5-stage evolution with folder trees per stage and dashed-orange "trigger" callouts between stages
7. **L13 Descriptions** uses the "pushy descriptions" framing
8. **L14 Frameworks** has 33 frameworks across 7 color-coded categories, with a 7-pill jump nav at the top
9. **L15 Iterative Improvement** leads with the "v1 myth" philosophy. "What to evolve" and "Signals" are merged into one section "What breaks, and how you'll spot it"
10. **L7 Full YAML frontmatter reference** is collapsible (`<details>` element) so casual readers skip it
11. **Screenshot placeholders** in L5/L6 are intentional — real screenshots deferred until Rashid records a video walkthrough
12. **Single-file architecture** — everything lives in `index.html`. No external JS/CSS/images except the CLO base64 logo inline. Preserves portability for GitHub Pages.

---

## Outstanding work (as of last session)

1. **Real install screenshots** — deferred. Rashid will likely record a video instead of capturing stills. Current screenshot-placeholder divs show "Screenshot pending — [description]"
2. **Real-life example demonstration** — Rashid asked for an end-to-end example of creating a skill using `meta-create-skill-standalone`. Not yet built.
3. **Git commit + push** — nothing committed yet. Rashid preferred local-only until he's satisfied with content.
4. **GitHub Pages enable** — once committed, enable Pages on the `/meta-create-skill/` path

---

## How to work efficiently on this file

- **Search before editing** — the file is ~200KB, read specific sections with `Read` tool offset/limit. Don't load the whole thing.
- **LESSON_CONTENT sections** are template strings — each lesson's prose lives in one `LESSON_CONTENT['<id>'] = \`...\`;` block. Use `Grep` to find them.
- **CSS is at the top** (~lines 10-200). JS is below CSS. Body is minimal — just `.header`, `.app`, `.sidebar`, `.main`, and the script.
- **Cross-references** — when you add/remove a lesson, grep for `Lesson \d+` and update all pointers.
- **Verify after every material change** — navigate via Playwright to the edited lesson, take a full-page screenshot, check it renders cleanly. Clean up screenshots after.
- **Cleanup discipline** — delete verify screenshots after reviewing: `rm -f v-*.png check-*.png read-*.png` in the working dir, plus `find .playwright-mcp -type f -name '*YYYY-MM-DD*' -delete`

---

## Recent feedback patterns (for future sessions)

Observations from what Rashid corrects / asks for:
- Prefers concrete examples over abstract teaching
- Values visual scanability (tables, cards, jump nav) over long prose
- Wants the course to teach the *system* of skills, not just one skill
- Often asks "can Claude decide this for me?" — address that directly in lessons where relevant
- Reviews lesson-by-lesson by reading through in order, not by jumping to specific topics
- Asks for readability review before considering a section done
- Does NOT want Rashid-specific skill names in generic teaching content
- Prefers to defer screenshots/visuals to video production when possible
- Wants cross-references between lessons where useful (e.g. "Lesson 9 Q1-Q5 matrix")

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
2. Read [index.html](index.html) in chunks as needed — don't load it all at once
3. Start the local server to preview
4. Ask Rashid what specifically he wants updated
5. Honor the locked-in design decisions above unless he explicitly says otherwise
6. Run `writing-humanize` on any new prose before declaring it done
7. Update this HANDOFF.md at the end of your session if you changed anything structural

Good luck. Ship it.

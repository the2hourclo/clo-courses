# Claude Code 101 — Module Build Contract

You are building ONE module page of the "Claude Code 101" course for a buyer-facing membership portal. The course is being rebuilt from a dense 23-lesson wall into a **visual, progressive multi-module course**. Your job: render your module's depth in the new visual style — simple on the surface, depth on demand. Read this whole contract, then build your assigned module exactly to its spec.

The proven pattern page (study it for tone + structure): `product/courses/clo-courses/clo-course/claude-code-101.html` (the Overview / front door). Match its voice, density, and use of `cc-` components.

---

## 1. Page skeleton (EXACT — shell-integrated)

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>MODULE_TITLE — Wiki</title>
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="shell.css">
<link rel="stylesheet" href="cc-course.css">
</head>
<body hidden data-page="DATA_PAGE">

<div id="doc-content">
  <h1>MODULE H1</h1>
  <p class="cc-lead">One- or two-sentence intro to this module.</p>

  <!-- ... your sections ... -->

  <!-- bottom module nav -->
  <div class="cc-modnav">
    <a href="PREV_HREF"><span class="dir">← Previous</span><span class="ttl">PREV_TITLE</span></a>
    <a class="next" href="NEXT_HREF"><span class="dir">Next →</span><span class="ttl">NEXT_TITLE</span></a>
  </div>
</div>

<script src="nav.js"></script>
<script src="toc.js"></script>
<script src="shell.js"></script>
<script src="cc-course.js"></script>
</body>
</html>
```
- `<body hidden …>` is correct — `shell.js` reveals it on load. Do NOT remove `hidden`.
- All CSS comes from `cc-course.css` (shared). Do NOT paste a big `<style>` block. If you truly need a one-off rule, add a tiny namespaced `<style>` in the head, but prefer the shared classes below.
- File lives in `clo-course/` next to the others, so all hrefs are bare filenames (`cc101-2-foundation.html`) and images are `kit/NAME.png`.

---

## 2. Shared `cc-` components (already styled in cc-course.css — just use them)

- **Section heading with icon chip:** `<h2 id="x" class="cc-h"><span class="cc-ico">🧠</span> Title <span class="cc-sub">— the subtitle</span></h2>` then `<div class="cc-cbody"> … </div>` (left-bordered body).
- **Concept body:** inside `cc-cbody`, lead with `<p><b>What it is.</b> …</p>` then `<p><b>Why you use it.</b> …</p>` then a try-it: `<div class="cc-eg">Try it: <code>your prompt</code></div>`.
- **Embedded visual (a rendered PNG):** `<figure class="cc-viz"><img src="kit/NAME.png" alt="…" loading="lazy"></figure>` — optionally `<figcaption>` inside the figure. Use for the big teaching visuals.
- **Floated robot-part tile (square):** `<div class="cc-tile"><img src="kit/tile-X.png" alt="…" loading="lazy"></div>` placed as the FIRST child of a `cc-cbody` (floats right, text wraps).
- **Go deeper (collapsible depth):** `<details class="cc-deep"><summary>Go deeper: …</summary><div class="cc-deepbody"> … </div></details>`. Put reference depth, edge cases, and the more-technical material here. Inside, use `<h4>` subheads, `<ul>`, `<p>`, and `.cc-mono` / `<code>` for code/paths.
- **Copyable prompt block:** `<div class="cc-prompt"><p>the exact prompt to paste into Claude Code</p><button class="cc-copy">Copy</button></div>` then optionally `<p class="cc-cue">Or just say: <b>"short phrase"</b></p>`. (cc-course.js wires the copy button.)
- **Before / after:** `<div class="cc-ba"><div class="cc-ba-card before"><div class="cc-ba-tag">Before</div><p>…</p></div><div class="cc-ba-card after"><div class="cc-ba-tag">After</div><p>…</p></div></div>`.
- **Two-column compare:** `<div class="cc-cmp"><div class="cc-cmp-col"><h4>…</h4><ul>…</ul></div><div class="cc-cmp-col win"><h4>…</h4><ul>…</ul></div></div>`.
- **Numbered steps:** `<div class="cc-flow"><div class="cc-flow-step"><div><b>Step</b> — …</div></div> …</div>`.
- **Best-practice card:** `<div class="cc-bp"><h4>Title</h4><p>…</p></div>`.
- **Table:** `<table class="cc-tbl"><thead>…</thead><tbody>…</tbody></table>`.
- **Callouts (shell):** `<div class="callout callout--tip"><svg class="callout-ico" …></svg><div>…</div></div>` (variants: `--tip`, `--info`, `--warn`, `--danger`). Copy the tip SVG from ai-employee-roadmap.html if you need one.
- **Close CTA:** `<div class="cc-cta"><h3>…</h3><p>…</p><a href="…">…</a></div>` (optional; the cc-modnav is the main nav).

Inline code / file paths: `<span class="cc-mono">.claude/skills/</span>` or `<code>…</code>`.

---

## 3. Visual assets you can embed (all under `kit/`, already rendered + on-brand)

**Deck visuals (course-ready, chrome stripped):**
| file | shows |
|---|---|
| `kit/cc-tab-trap.png` | robot stuck in a chat tab, tools greyed out — "in a tab you get answers, not a workforce" |
| `kit/cc-why-cc.png` | capability table: Claude.ai (2/7) vs Cowork (4/7) vs Claude Code (9/9) across Skills/Sub-agents/MCPs/Memory/Hooks/CLAUDE.md/visibility/worktrees |
| `kit/cc-glass-box.png` | the VS Code window — explorer + Claude Code action log + MCP panel + terminal. "a chatbot is a black box, Claude Code is a glass box you can see into" |
| `kit/cc-skill-playbook.png` | a SKILL.md as a 2-page playbook — left = frontmatter (name/description/when/tools/voice/model), right = the body steps. "the title says WHEN, the body says HOW" |
| `kit/cc-routing.png` | CLAUDE.md as a routing map — "publish today's draft" → finds the skill + the right file |
| `kit/cc-memory.png` | robot + brain + MEMORY.md quadrants (voice rules / past decisions / preferences / context). "Skills capture HOW, CLAUDE.md decides WHEN, Memory remembers WHO" |
| `kit/cc-mcps.png` | the robot's MCP hub → Notion, Gmail, Postiz, Calendar (purple connections) |
| `kit/cc-ai-employee.png` | the canonical AI Employee robot reveal (all pillars converge) |
| `kit/cc-parallel-chats.png` | 4 robots on 4 laptops — "4 employees, 4 jobs, 4 skills, all running at once" |
| `kit/cc-subagents.png` | one orchestrator dispatches specialist robots with colored desks, who report back |
| `kit/cc-network.png` | "You at the Center" — you (CEO) → 4 leads (Content/Research/Sales/Operations) → sub-agents |

**Kit mini-diagrams + tiles (robot-anchored):**
| file | shows |
|---|---|
| `kit/kit-loop.png` | the agentic loop Gather → Act → Verify → Done, with loop-back |
| `kit/kit-permissions.png` | the permission gate: safe/approved? → proceed, else ask (Deny / Allow once / Always allow) |
| `kit/kit-lifecycle.png` | one prompt → the 6 parts fire in order |
| `kit/kit-hooks.png` | hooks fire automatically at lifecycle checkpoints (conveyor) |
| `kit/kit-subagents.png` | orchestrator + specialist robots (alt to cc-subagents) |
| `kit/kit-mcp.png` | antenna/USB → Notion/Gmail/Calendar/CRM (alt to cc-mcps) |
| `kit/tile-memory.png` `kit/tile-routing.png` `kit/tile-skills.png` `kit/tile-harness.png` `kit/tile-connections.png` | zoomed robot-part tiles (square; use as floated `cc-tile`) |

Use the deck `cc-*` visuals as the section HERO where one fits; use `tile-*` as small floated accents. Don't overload — 1–3 big visuals per module is right. Embed every big visual with `loading="lazy"`. Never invent or hand-draw a robot; only embed these files.

---

## 4. House voice (non-negotiable)

- **Plain words, ~5th-grade.** Gloss any jargon once, in plain English ("MCP — think USB ports for your AI"). The buyer is a non-technical business owner.
- Each concept follows **what it is · why you use it · try-it prompt.**
- **Overview stays simple; depth goes in `Go deeper`.** The page should be skimmable; a reader who wants more opens the collapsibles.
- **No em-dashes in prose** — use a period, comma, or the middot `·`. **No colons inside body sentences** (rewrite as two sentences or a comma). These are brand rules; they don't apply to code, tables, or metadata.
- Humans are never the robot. Don't add new graphics — embed the provided PNGs.
- Keep paragraphs short. Bold the key phrase. Real prompts the reader can paste, not vague advice.

---

## 5. Build + render-verify

1. Write your module HTML to `clo-course/<filename>.html`.
2. Render it in the shell to confirm it loads and the images appear:
```bash
cd "c:/Users/rkham/OneDrive/Desktop/Cursor Projects/product/courses/clo-courses/clo-course"
CHROME="/c/Program Files/Google/Chrome/Application/chrome.exe"
NAME="<filename>"   # without .html
TMP="C:\\Users\\rkham\\AppData\\Local\\Temp\\_mod_${NAME}.png"
TMPN="/c/Users/rkham/AppData/Local/Temp/_mod_${NAME}.png"
URL="file:///c:/Users/rkham/OneDrive/Desktop/Cursor%20Projects/product/courses/clo-courses/clo-course/${NAME}.html"
rm -f "$TMPN"
"$CHROME" --headless=new --disable-gpu --no-sandbox --user-data-dir="C:\\Users\\rkham\\AppData\\Local\\Temp\\_ccud_${NAME}" --hide-scrollbars --screenshot="$TMP" --window-size=1300,5200 --force-device-scale-factor=1 --virtual-time-budget=7000 "$URL" 2>/dev/null ; sleep 1.5
ls -la "$TMPN"
```
(The `--user-data-dir` flag avoids a transient "Missing headless user data directory" error — keep it.)
```bash
# (the working reference module to match for structure/voice is cc101-1-what.html)
```
3. **Read the rendered PNG.** Confirm: the shell revealed the content (not blank), every `kit/*.png` you referenced is visible (no broken-image icon), the layout is clean (tiles float, visuals full-width, nothing overlapping), and the voice/structure match this contract. Fix and re-render until it's right.
4. Report: the file path, the section list (h2 ids), which visuals you embedded, and a one-line self-assessment.

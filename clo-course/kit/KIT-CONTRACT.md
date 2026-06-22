# Shared Visual Kit — Build Contract

Every kit visual is a **standalone SVG-on-black HTML** rendered to a crisp PNG and embedded as `<img>` in the portal pages. This file is the contract: read it, then build your assigned visual exactly to spec. Consistency across visuals matters more than personal flourish.

The full brief (the house style) is `strategy/plans/2026-06-22-course-visual-rebuild-brief.md`. This contract is the operational subset.

---

## 1. The frozen robot — NEVER hand-draw one

The canonical AI Employee robot is **frozen**. You must paste it from the snippet files in this folder — never invent, simplify, or redraw a robot.

- `robot-canonical-full.txt` — the FULL figure (antenna + visor eyes + chest panel + toolbelt + limbs). Use for a single HERO robot that IS the subject.
- `robot-canonical-face.txt` — the FACE-SIGNATURE bust (antenna + visor eyes + compact body, no limbs). Use when **several** robots appear (network nodes, a row, sub-agent workers).
- `robot-eyeglow-def.txt` — paste **once** inside `<defs>` or the visor eyes + halo won't render.

**How to place a robot:** both snippets are origin-centered (an inner `translate(...)` re-centers the native art to 0,0). Paste the snippet, then wrap it in ONE transform to position + scale it:
```svg
<g transform="translate(CX,CY) scale(S)">
  …paste robot-canonical-full.txt (or face) here verbatim…
</g>
```
- Full figure native ≈ 280w × 760h. Typical scale on a 1600-wide canvas: **0.22–0.40**.
- Face bust native ≈ 210w × 430h. Typical scale for a row of workers: **0.16–0.26**.
- A **broken/error robot** (only if a spec calls for it): paste the face, recolor every `rgb(121,234,32)` → `rgb(231,76,60)`, swap the two eyes for red `X`/`?` glyphs, drop the antenna ring glow.
- A **human** (owner / customer) is ALWAYS a simple amber stick figure (`#fbbf24`), never the robot.

Working reference (full robot placed + labeled): `../ai-employee-anatomy.html`.

---

## 2. Brand palette + canvas chrome (paste this scaffold)

```html
<!DOCTYPE html><html><head><meta charset="utf-8">
<style>
  @font-face{font-family:'Excalifont';src:url('Excalifont-Regular.woff2') format('woff2');}
  html,body{margin:0;padding:0;background:#0F0F0F;}
  .canvas{width:CANVAS_Wpx;height:CANVAS_Hpx;position:relative;overflow:hidden;}
  text{user-select:none;}
</style></head><body>
<div class="canvas">
<svg width="CANVAS_W" height="CANVAS_H" viewBox="0 0 CANVAS_W CANVAS_H" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- paste robot-eyeglow-def.txt contents here (gives #eyeGlow + #halo) -->
    <pattern id="dotgrid" width="36" height="36" patternUnits="userSpaceOnUse">
      <circle cx="18" cy="18" r="1.1" fill="rgba(255,255,255,0.05)"/>
    </pattern>
  </defs>
  <rect width="CANVAS_W" height="CANVAS_H" fill="#0F0F0F"/>
  <rect width="CANVAS_W" height="CANVAS_H" fill="url(#dotgrid)"/>
  <!-- your visual here -->
</svg></div></body></html>
```

**Colors (locked):**
| Token | Hex | Meaning |
|---|---|---|
| CLO green | `rgb(121,234,32)` / `#79EA20` | active state / Claude actions / the robot's glow |
| Claude-Code orange | `#d97757` | the Claude Code brand (chest panel, tool brand) |
| MCP purple | `#a855f7` | connections / MCP nodes |
| Cream paper | `rgb(240,240,235)` | files Claude reads (CLAUDE.md, MEMORY.md, .md) — drawn as little file cards |
| White linework | `rgb(240,240,245)` | robot outlines / connector arrows |
| Muted label | `#9aa0a6` | sub-labels, secondary text |
| Near-black | `#0F0F0F` | background |

**Type:** everything in `font-family="Excalifont"`. Title ~44–48px white. Section labels ~24–28px green. Body/sub-labels ~17–20px `#9aa0a6` or `#c8cad8`. Mono snippets (file contents, prompts) may use `Consolas, monospace`.

**Arrows / connectors:** hand-drawn feel — white `stroke-width="2.6"` curved `path` + a small filled `polygon` arrowhead (see anatomy.html labels for the exact pattern). Dashed green for "flow/active" connections. NO colons in any prose label.

**No emoji as the only signal** is fine to KEEP — emoji + word labels match the slides (e.g. `🧠 BRAIN = Memory`). Echo the slide visual language: `marketing/youtube/claude-code-for-business-part-2/final-slides/exports/*.png` are the reference beats — open the one named in your spec and match its composition.

---

## 3. Render to PNG (exact, tested command)

Build `kit/<NAME>.html`, then render. Use a UNIQUE temp filename (your NAME) — many renders run at once. OneDrive blocks headless-chrome writes, so render to `%TEMP%` then `cp` into `kit/`.

```bash
cd "c:/Users/rkham/OneDrive/Desktop/Cursor Projects/product/courses/clo-courses/clo-course"
CHROME="/c/Program Files/Google/Chrome/Application/chrome.exe"
NAME="kit-loop"; W=1600; H=900          # <-- set to your visual's canvas size
TMP_WIN="C:\\Users\\rkham\\AppData\\Local\\Temp\\_render_${NAME}.png"
TMP_NIX="/c/Users/rkham/AppData/Local/Temp/_render_${NAME}.png"
URL="file:///c:/Users/rkham/OneDrive/Desktop/Cursor%20Projects/product/courses/clo-courses/clo-course/kit/${NAME}.html"
rm -f "$TMP_NIX"
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --screenshot="$TMP_WIN" --window-size=${W},${H} --force-device-scale-factor=2 --virtual-time-budget=5000 "$URL" 2>/dev/null
sleep 1
cp "$TMP_NIX" "kit/${NAME}.png"
ls -la "kit/${NAME}.png"   # confirm it exists + has non-trivial size (>30KB)
```
`--window-size` MUST equal your canvas W×H (no scrollbars). Output PNG is 2×W × 2×H (retina). Keep canvases ≤ 1600 wide so embedded images stay reasonable.

---

## 4. Self-verify before you report done

After rendering, **Read your own PNG** and confirm:
1. The robot is the canonical figure (rounded head, green visor eyes with glow, orange Claude-Code chest panel, toolbelt) — NOT a redrawn/simplified robot.
2. Palette matches §2 (green active, orange = Claude Code, purple = MCP). No stray off-brand colors.
3. Every text label is fully on-canvas, legible, not clipped or overlapping. Excalifont rendered (hand-drawn look), not a fallback serif/sans.
4. The composition matches your assigned spec and reads in one glance (the teaching beat is obvious).
5. Background is `#0F0F0F` with the faint dot grid.

If any check fails, fix the HTML and re-render before reporting. Report the final `kit/<NAME>.png` path + a one-line self-assessment.

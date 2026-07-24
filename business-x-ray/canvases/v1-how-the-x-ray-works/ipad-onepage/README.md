# Business X-Ray — One-Page Scroll (for iPad recording)

All 24 X-Ray teaching slides stacked into **one continuous white page** you scroll top→bottom while recording on iPad. Visuals stay **SVG** (vector — crisp at any zoom when you draw over them).

## Files
- **`business-x-ray-onepage.pdf`** — the deliverable. One page, 11.9″ × 191.8″ (kept under the 200″ PDF limit). Import into GoodNotes / Notability / your recording app.
- **`business-x-ray-onepage.html`** — self-contained source (Excalifont embedded as base64, so it travels as a single file).
- **`redesigned-bowties/`** — the 9 redesigned slides that override the originals in the PDF build (folder name is legacy; it holds more than bow-ties now). **All edits live in the PDF only** — the original cream source slides and the course `index.html` were left untouched:
  - **00** — "the whole journey": the middle SCANNER simplified from a busy CT-gantry (arch + rim + scan-planes + console + robot) down to the AI robot reading your business through a magnifying glass, one caption.
  - **05 / 06 / 06b / 17b** — bow-tie reskin to match the big-idea **Back-to-Front funnel** (`marketing/big-idea-visuals/back-to-front-funnel/`): bold funnel wings + rectangle MIDDLE neck + thicker strokes. Blue-front / green-back / amber-commit color coding kept.
  - **02** — "One File, Seven Pictures" now shows 7 recognizable mini-thumbnails (funnel · lanes · node-map · scored grid · hub-and-spokes · timeline · numbered build list), one per tab.
  - **08** — swimlane lanes reordered to **YOU (top) / VA / SYSTEM (bottom)**; "TOOLS" renamed SYSTEM; handoff zigzag redrawn.
  - **17** — MCP mapping updated: **Kit + Zoom** moved to native "PLUGS IN TODAY" (5 tools); Calendly = "via adapter, MCP emerging"; Google Docs = "no port yet".
  - **19** — polish per excali-reviewer: removed the inconsistent rail tick-marks + the lone "DO NEXT" tag, nudged the crowded "sorts by type" label. (The router fan does NOT overlap — that was verified fine.)
  - **20** — "No Blueprint, No Build" gate redrawn as a clear checkpoint: top lane OPEN (barrier lifted, green) for the qualified request; bottom lane SHUT (barrier down, red) for the shallow one.
- **`build_onepage.py`** — regenerator (pass each redesigned slide as `slug=redesigned-bowties/slug.html`).

## Regenerate
```bash
cd <this folder>
python build_onepage.py \
  "05-bowtie-a-stranger-to-client=redesigned-bowties/05-bowtie-a-stranger-to-client.html" \
  "06-bowtie-b-the-leaks=redesigned-bowties/06-bowtie-b-the-leaks.html" \
  "06b-front-middle-back=redesigned-bowties/06b-front-middle-back.html"
```
Then render to PDF with headless Chrome (`@page` size drives the single page):
```bash
chrome --headless=new --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="business-x-ray-onepage.pdf" "business-x-ray-onepage.html"
```

## Notes
- Background flipped from the deck's cream (`rgb(250,249,245)`) to pure white; the whiteboard dot-grid was lightened to a whisper so the surface reads clean white.
- Slide order follows the teaching order in `../map.json` (spine `00`, then the 5 act columns).
- Originals in `../slides/` are never modified by the build.

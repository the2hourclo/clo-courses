#!/usr/bin/env python3
"""Build a self-contained ONE-PAGE white-background scroll of the Business X-Ray
SVG teaching slides, for iPad recording. Originals are never modified."""
import base64, re, os, sys

ROOT = r"c:\Users\rkham\OneDrive\Desktop\Cursor Projects\product\courses\clo-courses\business-x-ray\canvases\v1-how-the-x-ray-works"
SLIDES = os.path.join(ROOT, "slides")
OUTDIR = os.path.join(ROOT, "ipad-onepage")
os.makedirs(OUTDIR, exist_ok=True)
FONT = os.path.join(SLIDES, "Excalifont-Regular.woff2")

# Teaching order per map.json (spine first, then columns in sequence)
ORDER = [
    "00-the-whole-journey",
    "01-you-are-the-bottleneck", "02-one-file-seven-pictures", "03-the-interview",
    "04-business-map", "05-bowtie-a-stranger-to-client", "06-bowtie-b-the-leaks",
    "06b-front-middle-back", "07-department-walk", "08-swimlane-a-lanes",
    "09-swimlane-b-three-levels", "10-swimlane-c-why-drill", "11-diagnosis-colors",
    "12-system-connection-map",
    "13-assets-a-day-one-handover", "14-assets-b-scoring", "15-leverage-score",
    "16-operating-system-map", "17-mcp-mapping",
    "17b-build-back-to-front", "18-roadmap", "19-implementation-router",
    "20-blueprint-gate", "21-the-loop",
]

# Optional overrides: slug -> alternate source html (e.g. redesigned bow-ties).
OVERRIDES = {}
for arg in sys.argv[1:]:
    slug, path = arg.split("=", 1)
    OVERRIDES[slug] = path

# ---- geometry: keep page under the 200in (14400pt) PDF limit ----
SLIDE_W = 1140.0
RATIO   = 1050.0 / 1600.0          # native slide aspect
SLIDE_H = round(SLIDE_W * RATIO, 3)  # 748.125
GAP     = 20
N       = len(ORDER)
TOTAL_H = round(N * SLIDE_H + (N - 1) * GAP, 3)
print(f"slides={N} slide={SLIDE_W}x{SLIDE_H} total_h={TOTAL_H}px  ({TOTAL_H*0.75/72:.1f} in)")
assert TOTAL_H * 0.75 <= 14400, "page too tall for PDF (>200in)"

font_b64 = base64.b64encode(open(FONT, "rb").read()).decode()

svg_re = re.compile(r"<svg\b.*?</svg>", re.S)
sections = []
for slug in ORDER:
    src = OVERRIDES.get(slug, os.path.join(SLIDES, slug + ".html"))
    html = open(src, encoding="utf-8").read()
    m = svg_re.search(html)
    if not m:
        raise SystemExit(f"no <svg> in {src}")
    svg = m.group(0)
    # Strip fixed pixel size on the root <svg>; CSS drives width, viewBox keeps aspect.
    svg = re.sub(r'(<svg\b[^>]*?)\swidth="\d+"\s*height="\d+"', r"\1", svg, count=1)
    sections.append(f'<section class="slide" data-slug="{slug}">{svg}</section>')

doc = "".join(sections)
# White-friendly dots (were warm cream grey rgb(210,208,200))
doc = doc.replace("rgb(210,208,200)", "rgb(226,226,226)")

html_out = f"""<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">
<title>Business X-Ray — One-Page Scroll</title>
<style>
@font-face{{font-family:'Excalifont';src:url(data:font/woff2;base64,{font_b64}) format('woff2');font-display:block;}}
:root{{
  --bg:#ffffff; --ink:rgb(33,33,33); --dim:rgb(120,120,125);
  --green:rgb(45,140,60); --red:rgb(214,69,58); --amber:rgb(214,140,40);
  --blue:rgb(52,120,190); --purple:rgb(147,112,219);
  --sans:"Excalifont",Inter,system-ui,sans-serif;
  --mono:"Consolas","Cascadia Mono","DejaVu Sans Mono",ui-monospace,monospace;
}}
*{{margin:0;padding:0;box-sizing:border-box;-webkit-print-color-adjust:exact;print-color-adjust:exact;}}
html,body{{width:{SLIDE_W}px;background:#ffffff;}}
.slide{{width:{SLIDE_W}px;height:{SLIDE_H}px;background:#ffffff;overflow:hidden;margin-bottom:{GAP}px;}}
.slide:last-child{{margin-bottom:0;}}
.slide svg{{display:block;width:{SLIDE_W}px;height:{SLIDE_H}px;}}
text{{font-family:var(--sans);}} .mono{{font-family:var(--mono);}}
@page{{size:{SLIDE_W}px {TOTAL_H}px;margin:0;}}
</style></head><body>{doc}</body></html>"""

out_html = os.path.join(OUTDIR, "business-x-ray-onepage.html")
open(out_html, "w", encoding="utf-8").write(html_out)
print("wrote", out_html, f"({len(html_out)/1024:.0f} KB)")
print("PAGE_W", SLIDE_W, "PAGE_H", TOTAL_H)

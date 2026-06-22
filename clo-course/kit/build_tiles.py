#!/usr/bin/env python3
# Build 5 zoomed robot-part tiles (480x480) from the FROZEN canonical robot.
# One shared template -> 5 HTML files. Each tile sets a tight viewBox window.
import os

HERE = os.path.dirname(os.path.abspath(__file__))

def read(name):
    with open(os.path.join(HERE, name), "r", encoding="utf-8") as f:
        return f.read()

robot_full = read("robot-canonical-full.txt")   # has inner translate(-929,-541)
eyeglow_def = read("robot-eyeglow-def.txt")

# Wrap the snippet so its inner translate(-929,-541) is cancelled -> native coords.
robot_native = '<g transform="translate(929,541) scale(1)">\n' + robot_full + '\n</g>'

# The HELD MAP (Routing) — copied from ai-employee-anatomy.html, drawn in its native coords.
held_map = '''<g transform="rotate(-5 540 612)">
    <rect x="452" y="556" width="150" height="116" rx="9" fill="#16202C" stroke="rgb(121,234,32)" stroke-width="2.2"/>
    <text x="527" y="582" text-anchor="middle" font-family="Excalifont" font-size="14" fill="rgb(121,234,32)">CLAUDE.md</text>
    <line x1="466" y1="591" x2="588" y2="591" stroke="rgba(121,234,32,0.35)" stroke-width="1"/>
    <rect x="470" y="602" width="36" height="20" rx="3" fill="none" stroke="rgba(240,240,245,0.8)" stroke-width="1.4"/>
    <rect x="548" y="602" width="36" height="20" rx="3" fill="none" stroke="rgba(240,240,245,0.8)" stroke-width="1.4"/>
    <rect x="470" y="640" width="36" height="20" rx="3" fill="none" stroke="rgba(240,240,245,0.8)" stroke-width="1.4"/>
    <rect x="548" y="640" width="36" height="20" rx="3" fill="rgba(121,234,32,0.14)" stroke="rgb(121,234,32)" stroke-width="1.6"/>
    <line x1="506" y1="612" x2="548" y2="612" stroke="rgba(240,240,245,0.55)" stroke-width="1.2"/>
    <line x1="488" y1="622" x2="488" y2="640" stroke="rgba(240,240,245,0.55)" stroke-width="1.2"/>
    <line x1="566" y1="622" x2="566" y2="640" stroke="rgba(240,240,245,0.55)" stroke-width="1.2"/>
  </g>'''

# viewBox windows (x y w h) tuned around each native part + breathing room.
# canvas is always 480x480; the svg viewBox does the zoom.
TILES = {
    "memory":      {"vb": "788 196 224 214", "label": "Memory",      "body": robot_native},
    "skills":      {"vb": "756 608 292 140", "label": "Skills",      "body": robot_native},
    "harness":     {"vb": "766 612 268 240", "label": "Harness",     "body": robot_native},
    "connections": {"vb": "832 124 136 162", "label": "Connections", "body": robot_native},
    "routing":     {"vb": "440 540 176 148", "label": "Routing",     "body": held_map},
}

# label strip color = CLO green
TEMPLATE = '''<!DOCTYPE html><html><head><meta charset="utf-8">
<style>
  @font-face{{font-family:'Excalifont';src:url('Excalifont-Regular.woff2') format('woff2');}}
  html,body{{margin:0;padding:0;background:#0F0F0F;}}
  .card{{width:480px;height:480px;position:relative;overflow:hidden;background:#0F0F0F;}}
  .svgwrap{{width:480px;height:432px;position:absolute;top:0;left:0;}}
  .strip{{position:absolute;left:0;bottom:0;width:480px;height:48px;
    display:flex;align-items:center;justify-content:center;
    border-top:1px solid rgba(255,255,255,0.10);background:#0F0F0F;}}
  .strip span{{font-family:'Excalifont';font-size:26px;color:rgb(121,234,32);letter-spacing:0.5px;}}
  text{{user-select:none;}}
</style></head><body>
<div class="card">
  <div class="svgwrap">
  <svg width="480" height="432" viewBox="{vb}" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
    <defs>
{eyeglow}
      <pattern id="dotgrid" width="36" height="36" patternUnits="userSpaceOnUse">
        <circle cx="18" cy="18" r="1.1" fill="rgba(255,255,255,0.05)"/>
      </pattern>
    </defs>
    <rect x="-2000" y="-2000" width="6000" height="6000" fill="#0F0F0F"/>
    <rect x="-2000" y="-2000" width="6000" height="6000" fill="url(#dotgrid)"/>
{body}
  </svg>
  </div>
  <div class="strip"><span>{label}</span></div>
</div>
</body></html>'''

for name, t in TILES.items():
    html = TEMPLATE.format(vb=t["vb"], eyeglow=eyeglow_def, body=t["body"], label=t["label"])
    out = os.path.join(HERE, "tile-{}.html".format(name))
    with open(out, "w", encoding="utf-8") as f:
        f.write(html)
    print("wrote", out)
print("done")

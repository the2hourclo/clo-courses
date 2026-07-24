# White-excali migration of the Skill Systems course — DONE

**File:** `meta-create-skill/index.html` (~4,060 lines, self-contained page)
**Live:** https://the2hourclo.github.io/clo-courses/meta-create-skill/
**Status: COMPLETE.** Chrome migrated 2026-07-24; all 39 inline SVG diagrams migrated the same day.

Keep this file as the colour reference for anyone adding or editing a diagram on this page —
the SVGs carry literal `fill=`/`stroke=` attributes and do **not** read the `:root` tokens.

---

## What was done

**Pass 1 — page chrome.** The `:root` values were flipped dark → paper with token NAMES left
alone, so all ~378 lines of page CSS keep resolving with zero find-replace. That migrated the
header, sidebar, TOC, body prose, headings, cards, callouts, tabs, buttons, progress bar,
breadcrumbs, and code wells.

**Pass 2 — the diagrams.** 884 hardcoded colour values across the 39 inline `<svg>` blocks
(plus the handful of literal `rgba()` left in the page CSS) were mapped to the white-excali
palette, applied per-line so the three traps below were handled instead of steamrolled.
Every lesson was rendered and eyeballed at 1440px and spot-checked at 430px.

Also on this page (unrelated to the skin, don't undo it): the 13-slide `v3-audit-library` deck
is mounted in the **From Skill to Library** lesson via `mountAuditDeck()`, called at the end of
`renderLesson()`. It uses `../clo-course/slides.js`. Its slide PNGs are already white.

---

## The colour map — use this for any NEW diagram

Values come from `clo-course/tokens.css`. Left column is the retired dark skin; never
reintroduce it.

| Retired dark value | Role | → White-excali |
|---|---|---|
| `#79EA20` | accent green | `#2D8C3C` |
| `#5cb818` | darker green (folder tabs) | `#256F30` |
| `#8ff030` | light green (gradient top stop) | `#3FA24E` |
| `#c084fc` | purple | `#6B46C1` |
| `#8c5bd9` | purple tab (darker step) | `#553098` |
| `#5b9cf6` | blue | `#3B6FB0` |
| `#FF6B6B` | red | `#B3402A` |
| `#FFA500` / `#fbbf24` | orange / amber | `#B26B00` |
| `#06b6d4` / `#22d3ee` | cyan ramp | `#0E7490` / `#2E9CB8` |
| `#e4e5ef` | primary text | `#21211E` (ink) |
| `#9ea3ba` | muted text | `#6B6B63` |
| `#4a4d60` | dim text | `#9A9A90` |
| `#181818` / `#131313` | panel / surface fill | `#FFFFFF` on a cream card, `#F4F4F0` on a white one |
| `#0d0d0d` | page fill | `#F4F4F0` (inset chip) |
| `#2a2a2a` / `#3a3a3a` | border | `#E2E2DC` |
| `#444` / `#666` | border | `#D4D4CC` |
| `#555` | dim text/dot | `#9A9A90` |
| `rgba(121,234,32,α)` | green tint | `rgba(45,140,60,α)` — α unchanged; 0.03–0.15 lands on `--accent-dim` |
| `rgba(192,132,252,α)` | purple tint | `rgba(107,70,193,α)` |
| `rgba(91,156,246,α)` | blue tint | `rgba(59,111,176,α)` |
| `rgba(255,107,107,α)` | red tint | `rgba(179,64,42,α)` |
| `rgba(255,165,0,α)` | orange tint | `rgba(178,107,0,α)` |

### The three traps — same-hex, different meaning

A global find-replace gets each of these wrong. They were resolved per-line and must stay that way.

1. **Two graphics are deliberately DARK.** `glyphShell` (the terminal chip) and `glyphTriggers`
   (the slash-command bar) keep `fill="#21211E"` / `stroke="#3A3A34"` — a code well is the
   sanctioned home for a dark artifact on cream. Green ON that dark band is **`#7BD389`**
   (`--accent-text`), never the page accent; the traffic-light dots are `#F08A7A` / `#E3B341` /
   `#7BD389`; a dim value on the band is `#8A8A80`. These are the only two dark fills left in
   the file — every other `#21211E` is text.
2. **Dark values sitting ON a solid accent become white, not ink.** The exploded-view folder
   label and the green ✓ badge were `#0d0d0d` on green → `#FFFFFF`. `fill="#fff"` on a
   saturated red/orange badge was already correct and stayed.
3. **The same grey is a border in one place and text in another.** `#444`/`#555`/`#666` split
   between `#D4D4CC` (border) and `#9A9A90` (text/dot) by usage, not by hex.

### Structural strokes that carry meaning

A chart axis or a target ring is not a hairline divider. Those went to `#D4D4CC`, not
`#E2E2DC` — at the divider value they vanish on cream. See the eval bar-chart baseline and the
trigger-accuracy rings in the **Foundational vs Production** lesson.

---

## Related, NOT part of this job

- The `.deck-wide` rule (top `<style>`) is deliberately bounded to the content gutters, because
  this page has a fixed sidebar AND a right TOC. Viewport-centring overlaps both — measured
  183→1283 against a sidebar ending at 280 and a TOC starting at 1185. Leave the ±56px bounds alone.

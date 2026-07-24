# HANDOFF — finish the white-excali migration of the Skill Systems course

**File:** `meta-create-skill/index.html` (~4,000 lines, self-contained page)
**Live:** https://the2hourclo.github.io/clo-courses/meta-create-skill/
**Status: HALF DONE.** The page chrome is migrated. The 39 inline SVG diagrams are not.
**Started:** 2026-07-24

---

## What is already done — do not redo

The page carries its **own** design system (a `:root` token block + ~378 lines of CSS in the
second `<style>`, lines ~19–398). It does not inherit the site skin, which is why it stayed dark
after the 07-22 white-excali switch.

**The `:root` values were flipped dark → paper.** Token NAMES were left alone, so all 378 lines of
page CSS keep resolving with zero find-replace. That one edit migrated: header, sidebar, TOC, body
prose, headings, cards, callouts, tabs, buttons, progress bar, breadcrumbs, code wells.

Verified in a browser: the reading experience now matches the rest of the site.

Also added on the same pass (unrelated to the skin, don't undo it): the 13-slide
`v3-audit-library` deck is mounted in the **From Skill to Library** lesson via
`mountAuditDeck()`, called at the end of `renderLesson()`. It uses `../clo-course/slides.js`.

---

## What is LEFT — the actual job

**735 hardcoded colour attributes across 39 inline `<svg>` diagrams.** They are written as literal
`fill="#…"` / `stroke="#…"` attributes, so they ignore the tokens entirely and are still painted in
the dark skin. On the new paper background they fail in three ways:

| Failure | Example | Why it's wrong now |
|---|---|---|
| **Invisible text** | `fill="#e4e5ef"` ×55 | Near-white label text on a near-white page |
| **Black blobs** | `fill="#181818"` ×67, `#131313` ×13, `#0d0d0d` ×9 | Dark card fills read as solid black rectangles |
| **Glaring accents** | `fill/stroke="#79EA20"` ×230 | Neon green designed for a black background; unreadable on paper |

Reproduce in one look: open the **From Skill to Library** lesson. The Stage-1 diagram shows a
neon-green folder with a solid black `SKILL.md` card inside it. That is the whole problem in one
picture.

### The colour map to apply

Verified counts as of 2026-07-24. Left column is what's in the file; right column is the
white-excali equivalent (values from `clo-course/journey.css`).

| Dark value | Count | Role | → White-excali |
|---|---:|---|---|
| `#79EA20` | 230 | accent green | `#2D8C3C` |
| `#5cb818` | 14 | darker green | `#256F30` |
| `#8ff030` | 1 | light green | `#2D8C3C` |
| `#c084fc` | 98 | purple | `#6B46C1` |
| `#8c5bd9` | 4 | purple alt | `#6B46C1` |
| `#5b9cf6` | 38 | blue | `#3B6FB0` |
| `#FF6B6B` | 39 | red | `#B3402A` |
| `#FFA500` | 22 | orange | `#B26B00` |
| `#fbbf24` | 1 | amber | `#B26B00` |
| `#e4e5ef` | 55 | primary text | `#21211E` |
| `#9ea3ba` | 72 | muted text | `#6B6B63` |
| `#4a4d60` | 8 | dim text | `#9A9A90` |
| `#181818` | 67 | panel fill | `#FFFFFF` (or `#F4F4F0` where it needs to read as a raised card) |
| `#131313` | 13 | surface fill | `#FFFFFF` |
| `#0d0d0d` | 9 | page fill | `#FAFAFA` |
| `#2a2a2a` | 20 | border | `#E2E2DC` |
| `#3a3a3a` | 8 | border | `#E2E2DC` |
| `#444` | 17 | border | `#D4D4CC` |
| `#555` | 5 | border | `#D4D4CC` |
| `#666` | 9 | border | `#D4D4CC` |
| `#fff` | 5 | white text//fill | context — see carve-out |

### ⚠ Do NOT do this as a blind find-replace

Three traps, each of which a global replace gets wrong:

1. **Terminal / code-well graphics are SUPPOSED to stay dark.** The white-excali system keeps code
   wells as dark bands (`--bg-code:#21211E`) — that is the sanctioned home for a dark artifact on
   paper. Any SVG drawing a terminal window, a code block, or a file-contents view should keep its
   dark fill and keep its light `#e4e5ef` text. Flipping those makes them worse.
2. **`fill="#fff"` flips meaning.** On dark it was a highlight; on paper it may need to become ink.
   Only 5 instances — check each by eye.
3. **Inverted pairs.** Several diagrams use a dark fill *with* light text as a matched pair. If you
   flip only one side you get white-on-white or black-on-black. Treat each `<svg>` as a unit.

### Suggested method

Work **one `<svg>` at a time**, not one colour at a time. There are 39; roughly a dozen carry most
of the teaching weight. For each: apply the map, decide the terminal/code-well carve-out, then
render the lesson in a browser and look at it. The lessons are JS template literals in
`LESSON_CONTENT['<id>']` — call `renderLesson('<id>')` in the console to jump straight to one.

Lesson ids are listed in the `LESSONS` array near line 423.

---

## Definition of done

- [ ] No `#e4e5ef` or `#9ea3ba` text sitting on a light fill anywhere.
- [ ] No `#181818` / `#131313` / `#0d0d0d` fill left EXCEPT deliberate terminal/code-well graphics.
- [ ] No `#79EA20` anywhere — it is the retired dark-skin accent.
- [ ] Every one of the 39 diagrams eyeballed in a browser at desktop width.
- [ ] Spot-check mobile (≤900px) — `.deck-wide` and the diagrams both reflow.

## Related, NOT part of this job

- The `.deck-wide` rule (top `<style>`) is deliberately bounded to the content gutters, because
  this page has a fixed sidebar AND a right TOC. Viewport-centring overlaps both — measured
  183→1283 against a sidebar ending at 280 and a TOC starting at 1185. Leave the ±56px bounds alone.
- The audit deck's slide PNGs are already white; they need nothing.

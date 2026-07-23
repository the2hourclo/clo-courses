> ## DECISIONS LOCKED (2026-06-01)
>
> - **Fonts: SYSTEM FONTS everywhere** (no webfonts). `get-access.html` drops its Bricolage + Hanken Google-Fonts import. `--font-display` and `--font-body` both resolve to the system stack; headings differ by size/weight only.
> - **Branding/colors:** keep CLO dark + green `#79EA20` (adopt Claude-Docs STRUCTURE, keep CLO skin).
> - **CONTENT PRESERVATION GUARANTEE:** every existing SVG diagram (Business Map, Bow-Tie funnel, process swimlanes), the asset-explorer drawer, ALL lesson content, ALL animations/transitions (fade-ins, the drawer slide-in, hover states, progress-bar fills, SVG highlight transitions), and ALL interactive JS (`goToLesson`, `selectMapCol`, `selectBowtieStage`, `switchProcess`, the drawer, SVG click handlers) are KEPT 100% UNTOUCHED. The two big pages are WRAPPED, never rewritten -- the only edits are: (1) strip the page's bespoke header, (2) swap its `:root` for the shared tokens link, (3) find-replace token NAMES, (4) add the shared `<head>` tags. No content, SVG, animation, or script is removed, rewritten, or reflowed.
>   - **The ONE intentional change** is page-level chrome: each page's own top *header bar* is replaced by the shared global top bar (that replacement IS the consistency win). Two header-adjacent elements are keep-by-default decisions, not removals: the Business X-Ray **progress bar** (relocate into the shell, or keep in place) and each SPA's **internal lesson sidebar** (kept visible for v1; optionally lifted into the global rail later). Nothing in the content/lesson area changes.

---
I have the ground truth I need: the real file sizes, the iframe-swap shell with the temp-open gate, the three divergent `:root` blocks, the SPA internal structure of both big pages (`.app > .sidebar + .main`, JS state-driven `goTo`/`goToLesson` with no URL routing), and the logo at `../clo-community/assets/clo-logo-full.png`. Here is the plan.

---

# CLO Course Portal — Claude-Docs Revamp Plan

> Adopt the Claude Code docs **layout, structure, components, and navigation UX** while keeping the CLO **dark + green (#79EA20) brand**. Static HTML on GitHub Pages, vanilla JS, license gate preserved. No build server required.

---

## 1. Target design language (what makes Claude Docs feel that way — structure, not color)

The "feel" comes from five portable moves, none of which depend on Anthropic's palette or fonts:

1. **A persistent app-shell, not a page reload.** A two-row sticky top bar + a fixed ~288px left sidebar + a centered prose column + a sticky right "On this page" rail. The shell never re-renders; only the content pane and right TOC swap on navigation. This is what makes it feel like *one product* instead of separate pages.
2. **Three-tier wayfinding in the left rail.** Top-level **tabs** swap the whole sidebar group-set → **uppercase group labels** (non-clickable dividers) → **page links** (with a soft tinted "you're here" pill). No breadcrumb dependency; the sidebar *is* the map.
3. **One accent, used once.** The bright accent appears on exactly one role-class: active-tab underline, active-TOC link border, active-sidebar pill tint, and the primary CTA + focus ring. Body links stay neutral. This restraint is most of the "premium docs" feeling.
4. **Editorial low-density rhythm.** ~675px readable measure, 16px body at ~1.6 line-height, large top margins on section headings, generous whitespace. Content-first, not packed.
5. **Modern docs affordances as flat rounded primitives.** Rounded-2xl callouts/cards/code-wells with 1px hairline borders + faint ring on focus *instead of drop shadows*; copy-to-clipboard on code; Cmd+K command-palette search; auto-built right-rail TOC with scroll-spy; "Was this helpful?" footer.

**What we explicitly do NOT adopt:** Anthropic's clay/coral accent (#D97757), warm cream surfaces (#FAF9F5), the Anthropic Serif/Sans fonts, Mintlify/Next.js, Inkeep search, the corporate footer. We adopt the *relationships* (one accent, ~5 surface layers, ~5 text layers, hue-tinted neutrals, accent-bar "you-are-here" language) and re-skin them in CLO dark+green.

---

## 2. Current state & gap analysis

**Today's shell** (`clo-course/index.html`, 263 lines): a JS license gate (LemonSqueezy validate — currently **temp-open** via `if (true) return renderPortal()` at line 97) that renders a 44px **top-tab bar** and swaps standalone pages through a **single `<iframe>`** (`.frame-wrap > #courseFrame`). Hash deep-linking exists at the tab level only (`#business-x-ray`), via `history.replaceState` + a click-replay on load.

**The four content pages are isolated islands:**

| File | Lines / size | Layout | `:root` bg | Fonts | Radius |
|---|---|---|---|---|---|
| `index.html` | 263 | top-tab + iframe shell | `#0a0a0a` | system | 8px |
| `business-x-ray.html` | 1,943 / **1.77 MB** | SPA: `.app > #sidebar(260px) + #main(900px)` + right `#drawer(440px)` | `#0d0d0d` | system | 8/12px |
| `claude-code-101.html` | 6,446 / 468 KB | SPA: `.app > .sidebar(280px) + .main` | `#0F0F0F` | system | 12/8px |
| `get-access.html` | 691 / 59 KB | static centered `.container(760px)` + green radial-gradient hero | `#0c0d0c` | **Bricolage + Hanken (Google Fonts)** | 9/14px |
| `roadmap.html` | 130 / 6 KB | static `.hero(900px)` + `.embed-section(1100px)` | `#0d0d0d` | system | 8/12px |

**The biggest problems:**

- **Five different `:root` blocks** — three near-identical-but-not backgrounds (`#0a0a0a` / `#0c0d0c` / `#0d0d0d` / `#0F0F0F`), four radius scales, divergent `--accent-dim` opacities (.08 / .12 / .15), and one page (`get-access`) loading custom Google Fonts the others don't. There is **no shared token file** — every page redefines everything from scratch.
- **Five different chrome treatments** — each page invents its own header (sticky+progress bar, compact icon+title, hero eyebrow, etc.), its own sidebar widths (260 vs 280), its own max-width (760/900/1100). It looks like five products.
- **The iframe problem.** The iframe is the root cause of the island effect:
  - Sub-pages **cannot inherit** the shell's tokens/fonts (separate document = separate `:root`), forcing per-page duplication.
  - **No unified navigation:** the shell's tabs and each SPA's internal sidebar are two disconnected nav systems. There is no single left rail showing "where am I across the whole portal."
  - **No deep-linking into content:** `business-x-ray` and `claude-code-101` are JS-state SPAs (`goToLesson(id)` / `goTo(id)`) with **no URL change** — lessons are not bookmarkable, back/forward doesn't work, and the shell's hash can't reach a lesson.
  - **No cross-page right-rail TOC, no scroll-spy, no global search** — the iframe boundary blocks all of it.
- **`roadmap.html` is fully detached** — it's standalone HTML that the shell happens to load; it has no relationship to the nav system.

**Conclusion:** the iframe shell must go. It is incompatible with every Claude-Docs pattern we want (persistent rail, unified nav, in-content deep-links, global TOC, global search).

---

## 3. Proposed architecture — the key decision

### Recommendation: **One real shell document + injected shared header/sidebar partial, NO iframe, NO build step.**

Two viable static-GH-Pages approaches were considered:

| Option | How | Verdict |
|---|---|---|
| **A. Single SPA shell that `fetch()`-injects page bodies** | `index.html` is the only "real" page; on nav it `fetch()`es `business-x-ray.html`, extracts the content fragment, injects into `#content`, re-runs that page's `<script>`. | ❌ Rejected as primary. The two big SPAs (1.77 MB + 468 KB) carry massive inline `<style>` + `<script>` that would have to be sandboxed/re-executed on inject — fragile, and re-running their JS in the shell's scope risks global collisions (both define `function goTo`-style globals). Also breaks `view-source` debuggability per page. |
| **B. Each page stays a real document; a shared `shell.js` injects the identical top-bar + left-sidebar + right-TOC into each, and `shell.css`/`tokens.css` are linked by all.** ✅ | Every page is its own URL (already true), so **deep-linking and back/forward work for free**. The chrome is *generated by one JS module* from a single `nav.js` manifest, so it's truly identical everywhere. Tokens live in one file. No iframe, no build. | ✅ **Recommended.** |

**Why B wins for this codebase specifically:** the two huge pages already *are* self-contained documents with their own sidebars — we don't want to re-execute their 6k-line scripts inside a parent. We want to (a) strip their bespoke header, (b) let `shell.js` draw the *global* chrome around them, and (c) repurpose their existing internal `#sidebar` nav as the **lesson-level** sidebar that `shell.js` renders inside the global left rail. We keep their content + interactivity 100% untouched.

### Resulting page anatomy (every page, identical)

```
┌─ TOP BAR (shell.js) ─────────────────────────────────────────┐
│ [CLO logo]   [Search ⌘K]            [← Community] [Sign out] │  row 1: utility
│ Get Started · Setup · Business X-Ray · Claude Code · Roadmap │  row 2: section tabs
├──────────┬──────────────────────────────────┬───────────────┤
│ SIDEBAR  │  CONTENT (page's own body)        │  ON THIS PAGE │
│ (shell.js│  EYEBROW                          │  (toc.js,     │
│  renders │  H1                               │   scroll-spy) │
│  manifest│  …prose / lessons / SPA…          │  · Section A  │
│  + this  │                                   │  · Section B  │
│  page's  │  ── Was this helpful? ──          │               │
│  lessons)│  ◀ Prev          Next ▶           │               │
└──────────┴──────────────────────────────────┴───────────────┘
```

### How the license gate survives (central, unchanged)

The gate logic stays the *single source of truth* but moves into **`shell.js`** so every page is gated, not just `index.html`:

1. `shell.js` runs first on every page. It reads `localStorage['clo_community_license']` (+ `?license_key=`), runs the **exact existing `validateLicense()`** against LemonSqueezy (preserve the store/product/variant checks verbatim).
2. **Temp-open preserved:** keep the `if (true)` short-circuit (line 97) as a single `const GATE_OPEN = true;` flag in `shell.js` so flipping it back on re-protects *all* pages at once. This is strictly better than today (today only `index.html` is gated; sub-pages opened directly are wide open).
3. On fail → `shell.js` renders the existing lock/expired screens (lifted out of `index.html` into `gate.js`/`shell.js`) and **does not inject the shell or reveal content** (`<body hidden>` until gate passes).
4. `index.html` becomes the portal **home page** (a real "Get Started" landing), no longer an iframe host. Direct hits to `business-x-ray.html` are now legal and gated.

**Trade-off accepted:** every page now makes one LemonSqueezy call on load (when gate is live). Mitigate with a short-lived `sessionStorage` "validated this session" stamp so navigation within a session doesn't re-hit the API. This is a net security *improvement* over the iframe model.

**One open dependency for Rashid:** removing the iframe means `index.html` no longer "owns" the others — confirm nothing external deep-links to the old `index.html#business-x-ray` form (we'll add a redirect shim that maps old hashes → real page URLs, see §7).

---

## 4. CLO-branded design system (Claude-Docs structure, CLO palette)

Mapping Claude Docs' **relationships** onto CLO's dark+green: one accent reserved for active/CTA only, ~5 hue-tinted surface layers, ~5 text layers, hairline borders + focus rings instead of shadows, a consistent radius scale (6/12/16), and a mono only for code. Neutrals are tinted *very slightly* toward green so the dark UI reads as branded even with almost no color.

### Ready-to-paste `tokens.css`

```css
/* tokens.css — single source of truth, linked by every page */
:root{
  /* ── SURFACE LAYERS (bg-000 brightest card → bg-500 deepest page) ── */
  --bg-000:#1c1f1b;   /* raised card / hover surface */
  --bg-100:#161916;   /* card / panel */
  --bg-200:#121512;   /* sidebar, secondary panels */
  --bg-300:#0e110e;   /* content surface */
  --bg-400:#0b0d0b;   /* page background (canonical — replaces all of 0a/0c/0d/0F) */
  --bg-code:#0a0c0a;  /* code well — always its own darkest surface */

  /* ── TEXT LAYERS (100 strongest → 500 faintest) ── */
  --text-100:#e9eae6; /* headings / primary */
  --text-200:#c8cabf; /* strong body */
  --text-300:#9ea3ba; /* body / secondary (kept from current --text-muted) */
  --text-400:#6c7184; /* muted captions */
  --text-500:#4a4d60; /* dim / disabled (kept from current --text-dim) */

  /* ── BORDERS (hue-tinted, low-opacity hairlines) ── */
  --border-100:#1c201c; /* default hairline */
  --border-200:#262b26; /* hover / focus hairline */
  --border-300:#333833; /* strongest divider */

  /* ── ACCENT (CLO green — used on ONE role-class only) ── */
  --accent:#79EA20;
  --accent-hover:#8af23a;
  --accent-ink:#0a0c0a;                  /* text on a green fill */
  --accent-dim:rgba(121,234,32,.10);     /* canonical tint — replaces .08/.12/.15 */
  --accent-dim-2:rgba(121,234,32,.16);   /* active pill / hover tint */
  --accent-border:rgba(121,234,32,.35);
  --accent-ring:rgba(121,234,32,.45);    /* focus ring */

  /* ── SEMANTIC (callouts, scores, tiers — defined ONCE) ── */
  --note:#9ea3ba;     --note-bg:rgba(158,163,186,.08);
  --tip:#79EA20;      --tip-bg:rgba(121,234,32,.10);
  --warn:#f59e0b;     --warn-bg:rgba(245,158,11,.10);
  --danger:#f87171;   --danger-bg:rgba(248,113,113,.10);
  --info:#3b82f6;     --info-bg:rgba(59,130,246,.10);
  --score-green:#4ade80; --score-yellow:#fde68a; --score-red:#f87171;
  /* business-x-ray annotation colors preserved verbatim */
  --ann-red:#FF6B6B; --ann-orange:#FFA500; --ann-green:#90EE90; --ann-purple:#9370DB;

  /* ── RADIUS (Claude Docs scale: inline / control / container) ── */
  --radius-sm:6px;    /* inline code chips */
  --radius:12px;      /* controls: nav items, search pill, copy btn, tabs */
  --radius-lg:16px;   /* containers: cards, callouts, code blocks, accordions */
  --radius-full:9999px;

  /* ── SPACING SCALE ── */
  --sp-1:4px; --sp-2:8px; --sp-3:12px; --sp-4:16px;
  --sp-5:24px; --sp-6:32px; --sp-7:48px; --sp-8:64px;

  /* ── LAYOUT ── */
  --topbar-h:104px;        /* two rows: 48 utility + 56 tabs */
  --topbar-row1-h:48px;
  --sidebar-w:288px;       /* Claude Docs 18rem */
  --toc-w:240px;
  --content-max:720px;     /* readable prose measure (CLO content) */
  --container-max:1472px;  /* outer shell cap */

  /* ── TYPE ── */
  --font-body:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; /* system stack -- DECIDED: no webfonts */
  --font-display:var(--font-body); /* same as body -- system fonts; headings differ by size/weight only */
  --font-mono:'SF Mono','Monaco','Consolas',ui-monospace,monospace;

  /* ── TYPE SCALE ── */
  --t-eyebrow:12px;  --t-h1:30px; --t-h2:22px; --t-h3:18px;
  --t-body:16px;     --t-small:14px; --t-code:14px;
  --lh-body:1.6;     --lh-tight:1.25;

  /* ── ELEVATION (rings, not shadows) ── */
  --ring:0 0 0 1px var(--border-100);
  --ring-focus:0 0 0 2px var(--accent-ring);
}
```

**Decision for Rashid (font strategy):** Claude Docs uses *one* family for everything. We have two reasonable CLO options — (A) **single family** (Hanken Grotesk everywhere, most "one-product" feel), or (B) **Bricolage display for headings + Hanken body** (keeps `get-access`'s current editorial flavor, closer to the Excalifont brand accent). The token block supports both; default the plan to **(B)** since `get-access` already ships those fonts and they read as CLO. Either way the fonts load **once** in the shared `<head>` partial, never per page. (See §9.)

### Type & rhythm rules (applied in `shell.css`)
- H1 `--t-h1`/700/`--font-display`, tracking -0.02em, `--text-100`.
- H2 `--t-h2`/700, `margin-top:var(--sp-7)`; H3 `--t-h3`/600, `margin-top:var(--sp-6)` — big top margins = section rhythm.
- Body `--t-body`/`--lh-body`/`--text-300`; prose capped at `--content-max`.
- Body links: `--text-200`, weight 600, `border-bottom:1px solid var(--border-300)` — **neutral, never green** (green is reserved).
- Inline code: `background:var(--accent-dim)` is **not** used; use a neutral chip `background:rgba(158,163,186,.10); color:var(--text-200); border-radius:var(--radius-sm); padding:2px 8px; font:var(--t-code)/1.5 var(--font-mono); box-decoration-break:clone`.

---

## 5. Component specs (CLO skin + vanilla implementation notes)

Each component below is a CSS class in `shell.css` and (where interactive) a function in `shell.js`. All flat, rounded, hairline-bordered, ring-on-focus — no drop shadows.

### 5.1 Top bar (two rows, sticky)
- **Row 1 (utility, 48px):** CLO logo (`../clo-community/assets/clo-logo-full.png`, ~28px tall, links to portal home) · `Search ⌘K` pill (right of logo) · spacer · `← Community` link · `Sign out` button. Keep current `signOut()` (clears `localStorage`, reloads).
- **Row 2 (section tabs, 56px):** horizontal tab row from `nav.js` manifest. Active tab = 2px `--accent` underline bar (`--radius-full`), inactive = `--text-300`.
- **CLO skin:** bar bg `--bg-400` with `border-bottom:1px solid var(--border-200)`; sticky `top:0; z-index:100`; subtle `backdrop-filter:blur(8px)`.
- **Impl:** `shell.js` builds both rows from the manifest and marks active tab by matching `location.pathname`. Search pill opens the modal (§5.10) and binds `⌘/Ctrl+K`.

### 5.2 Left sidebar (288px, fixed, independent scroll)
- **Structure:** uppercase non-clickable **group labels** (`--t-eyebrow`/700/`--text-500`/letter-spacing 1.2px) over `<ul>` of page links. Active page = **soft pill**: `background:var(--accent-dim-2)`, `color:var(--accent)`, `border-radius:var(--radius)`, `aria-current="page"`. Hover = `background:rgba(255,255,255,.03)`.
- **Two-level rendering:** top-level pages come from `nav.js`; for the SPA pages, `shell.js` *reads the page's existing `#sidebar` lesson list* (or a `data-lessons` manifest) and renders the lessons as a nested, indented sub-list under the active page so lessons appear in the global rail.
- **CLO skin:** sidebar bg `--bg-200`, `border-right:1px solid var(--border-100)`, `position:fixed; top:var(--topbar-h); width:var(--sidebar-w); height:calc(100vh - var(--topbar-h)); overflow-y:auto`.
- **Impl:** fake-bold the active item with `text-shadow:-.2px 0 0 currentColor,.2px 0 0 currentColor` to avoid layout shift (Claude Docs trick). Collapsible sub-groups only where dense (Business X-Ray's 16 lessons): `<details>`/`<summary>` with a rotating chevron, default-open for the active group.

### 5.3 Right-rail "On this page" TOC + scroll-spy (`toc.js`)
- **Behavior:** auto-build from the content column's `h2`/`h3` (slugify each into a kebab `id`, inject a hover-reveal anchor link `#id` to the heading's left). H3 indented under H2. Active section highlighted `--accent` + left `border-left:2px solid var(--accent)`.
- **CLO skin:** heading "On this page" `--t-small`/600/`--text-400`; links `--t-small`/`--text-400`, active `--accent`. `position:sticky; top:calc(var(--topbar-h) + 16px)`.
- **Impl:** `IntersectionObserver` with `rootMargin:'0px 0px -70% 0px'` to mark the in-view heading. **Perf note for the 6k-line page:** observe only `h2,h3` (a few dozen nodes), never all elements — see §9.

### 5.4 Code blocks (copy + language label)
- **Look:** `--radius-lg` container, `background:var(--bg-code)`, `border:1px solid var(--border-100)`, no shadow. Language label top-left (`--t-eyebrow`/`--text-400`). Copy icon-button top-right, flush corner (`border-radius:0 var(--radius) 0 var(--radius)`... i.e. rounded outer edges only), `--text-300` icon, hover tint `rgba(255,255,255,.04)`.
- **Impl:** `shell.js` post-processes every `pre>code`: wraps it, reads `class="language-x"` for the label, adds a copy button (`navigator.clipboard.writeText`, swap icon→✓ for 1.5s). Idempotent (skip if already wrapped) so the SPA pages' existing `.code-block` divs can opt in by adding `data-codeblock`.

### 5.5 Callout boxes (Note / Tip / Warning / Danger / Info)
- **Look:** `--radius-lg`, **full 1px border + soft tinted fill** (not left-border-only), leading 20px icon + content. Note=`--note`/`--note-bg`; Tip=`--accent`/`--tip-bg` (CLO green); Warning=`--warn`/`--warn-bg`; Danger=`--danger`/`--danger-bg`; Info=`--info`/`--info-bg`. Padding `16px 20px`, `margin:var(--sp-4) 0`.
- **Impl:** pure CSS — `.callout.callout--tip` etc. The SPA pages' existing "education callout" divs get reclassed to these (find-replace per page in the polish phase, §8 P3).

### 5.6 Cards / card-grid
- **Look:** clickable `<a class="card">`, `--radius-lg`, `background:var(--bg-100)`, hairline border, **transparent 2px ring that lights to `--accent-border` on hover** (not a shadow lift). Title `--t-body`/600/`--text-100`, muted description, optional 16px icon. `.card-grid{display:grid;gap:var(--sp-4);grid-template-columns:repeat(2,1fr)}` collapsing to 1 col under 768px.
- **Use:** portal home "Get Started" tiles; end-of-page "Next steps".

### 5.7 Tabs (content tabs)
- **Look:** tablist with `border-bottom:1px solid var(--border-100)`, `gap:24px`; active tab = absolutely-positioned 2px `--accent` underline bar.
- **Impl:** `business-x-ray`'s `switchSetupTab()` / `switchProcess()` and `claude-code-101`'s tab functions already exist — **keep their JS**, just restyle the markup to `.tabs/.tab` classes. Same accent-bar language as the section tabs and TOC (one "you-are-here" vocabulary across the whole UI).

### 5.8 Prev / Next footer nav
- **Look:** two `.card`-style links at content bottom — left `◀ Prev · {title}`, right `{title} · Next ▶`. Above it, a lightweight **"Was this page helpful? 👍 👎"** row (writes a `localStorage` tally; no backend).
- **Impl:** `shell.js` computes prev/next from the **flattened `nav.js` order** (and, on SPA pages, the lesson order), so it works across pages *and* across lessons.

### 5.9 Breadcrumbs
- **Look:** thin eyebrow above H1: `SECTION / Page` (e.g. `GETTING STARTED / Business X-Ray`), `--t-eyebrow`/`--text-400`. Matches Claude Docs' "uppercase eyebrow over big heading."
- **Impl:** derived from the manifest (active tab label + page title). The sidebar remains primary wayfinding; breadcrumb is context only.

### 5.10 Search modal (Cmd+K, no backend)
- **Look:** trigger pill `Search… ⌘K` in row 1 (`--radius`, `--bg-200`, hairline). On open: full-screen `position:fixed;inset:0;z-index:200` overlay with `backdrop-filter:blur(8px)`, centered panel (`--bg-100`, `--radius-lg`), an input + `ESC` hint, a live-filtering grouped result list (page title + section + snippet), arrow-key navigation, Enter → navigate.
- **Index (static, build-free):** ship a single hand/script-generated `search-index.json` — one entry per page **and per H2/H3 anchor** ({title, section, url, hash, snippet}). For the huge pages we index headings + lesson titles, not full text (keeps the JSON small). Client-side fuzzy match in `search.js` (tiny ~40-line scorer; FlexSearch optional later). Fully static-host + license-gate friendly. **No Inkeep, no "Ask AI"** (out of scope; flag as a later option).

---

## 6. Information architecture (proposed sidebar taxonomy)

Three-tier model: **section tabs (row 2)** → **group labels** → **page/lesson links**. Driven entirely by `nav.js`.

```
TAB: Get Started          → index.html
  GETTING STARTED
    • Welcome / Portal Home          index.html
    • Get Access (setup checklist)   get-access.html
  COMMUNITY
    • Join AI Employee Builders      ../clo-community/   (cross-link, opens onboarding)

TAB: Claude Code 101      → claude-code-101.html
  (its existing internal sections become the group labels:
   FOUNDATIONS / CORE TOOLS / SKILLS / AGENTS / HOOKS / MCP …)
    • each existing lesson → a sidebar leaf (nested under active page)

TAB: Business X-Ray       → business-x-ray.html
  THE SKILL
    • Setup
    • Business Map
    • Bow-Tie Funnel
    • Process Swimlanes
    …(all 16 existing lessons, grouped by their current `group` property)
    • Asset Explorer (drawer)

TAB: Roadmap              → roadmap.html
  ROADMAP
    • Skill Release Status
    • Request a Skill
```

**Where onboarding/community fits:** the clo-community onboarding page stays a **separate document** (it has its own gate + purpose). It is surfaced two ways: (1) the persistent `← Community` link in top-bar row 1 (kept from today), and (2) a "Join AI Employee Builders" leaf under the **Get Started → Community** group. We do **not** absorb it into the shell yet (different lifecycle); a Phase-5 stretch goal is to give it the same `shell.css`/header partial so the brand is continuous, without merging nav.

**Naming:** use **"AI Employee Builders"** for the community per current branding (memory: renamed 2026-05-25). Keep "Chief Leverage Officer" as the portal brand wordmark in the logo lockup.

---

## 7. File-by-file migration plan

**New shared files (create in `clo-course/`):**

| File | Contents |
|---|---|
| `tokens.css` | the `:root` block from §4 (the only place tokens live) |
| `shell.css` | layout grid, top-bar, sidebar, TOC, all component classes from §5 |
| `nav.js` | the `nav.js` manifest (tabs → groups → pages → lessons), plain JS object/array |
| `shell.js` | gate (lifted from `index.html`) + builds top-bar/sidebar/breadcrumb/prev-next, wires search & code-copy |
| `toc.js` | right-rail TOC builder + scroll-spy |
| `search.js` | Cmd+K modal + client-side index search |
| `search-index.json` | static index (pages + headings/lessons) |
| `partials/head.html` | the canonical `<head>` snippet (fonts once, the 5 CSS/JS links) — copy-pasted into each page's head (documented, since no server includes) |

**Per-page changes (order matters):**

**Step 0 — Safety.** All five files are tracked (git status confirms). Branch is already `writing-scaffold-refactor`. Work on a fresh feature branch; never `Write`-overwrite the 1.77 MB / 468 KB pages — edit surgically (strip header block, swap `:root`, add 5 link tags). Keep a copy of `index.html`'s gate functions before refactor.

1. **`index.html` → portal home (do first).**
   - Cut `validateLicense`, `renderLocked`, `renderExpired`, `handleUnlock`, `signOut`, the `PRODUCT`/`STORAGE_KEY` consts → move verbatim into `shell.js` (+ `GATE_OPEN` flag preserving the `if(true)` temp-open).
   - Delete `.frame-wrap`/`<iframe>`/`wireTabs`. Replace body with a real **"Get Started" landing**: hero + a `.card-grid` of section tiles (Get Access, Business X-Ray, Claude Code 101, Roadmap) using shared components.
   - Add the 5 shared `<link>`/`<script>` tags; delete its local `:root` + nav CSS.
   - **Add a hash-redirect shim:** if `location.hash` matches an old tab id (`#business-x-ray` etc.), `location.replace()` to the real page URL — preserves any existing bookmarks/links to the old iframe hashes.

2. **`roadmap.html` (smallest — proves the pattern).** Delete its `:root` + bespoke `.header`; add the 5 shared links; remove its standalone header markup (the shell draws it). Keep `.hero`/`.embed-section`/stat-cards content; reclass stat-card colors to `--score-*`. This is the reference "simple page" migration.

3. **`get-access.html`.** Remove its Google-Fonts `<link>` (now in shared head) and its `:root`; remove the green radial-gradient hero background (or demote it to a single optional `.hero--glow` utility in `shell.css`). Keep the checklist/fork/tracker content; map `--surface-3`/`--accent-dim-2` to shared tokens. Add shared links.

4. **`claude-code-101.html` (468 KB SPA — wrap, don't rewrite).**
   - **Strip only the bespoke `.header`** (lines ~48–86 CSS + the `<header>` markup) — the shell draws the global top-bar.
   - Replace its `:root` (lines 8–35) with the shared `tokens.css` link; delete the duplicate token vars. Its component CSS (`.nav-item`, `.code-block`, callouts) stays but is *re-pointed* at shared token names via find-replace (`--bg-card`→`--bg-100`, `--border-active`→`--accent`, etc.).
   - **Keep `.app > .sidebar + .main` and all JS (`goTo`, `selectTool`, etc.) untouched.** The shell renders the *global* rail; this page's internal `.sidebar` either (a) gets hidden and its lesson list is read by `shell.js` into the global rail (preferred), or (b) is kept as-is for v1 and the global rail just shows the page link (faster, less risk). **Recommend (b) for first ship, (a) in Phase 4.**
   - Add an `id` to each `.lesson`/section so `goTo` can also update `location.hash` (one-line patch per nav handler) → makes lessons deep-linkable.
   - Add the 5 shared links.

5. **`business-x-ray.html` (1.77 MB SPA — same treatment).**
   - Strip the sticky `.header` (+ its progress bar) at line 315; the shell draws the top-bar. Keep the progress bar by relocating it into the shell's row-2 right edge *only if cheap* — else drop for v1.
   - Replace `:root` with shared link; re-point its many tokens (3 border shades → `--border-100/200/300`, annotation/score/tier colors already match the shared set).
   - **Keep the SPA, the 16 lessons, the 440px drawer, all SVG interactivity, `goToLesson`/`selectMapCol`/`switchProcess` — untouched.** Add `location.hash` updates in `goToLesson` for deep-linking.
   - Repurpose its existing `#sidebar` as the lesson sub-list source for the global rail (Phase 4), or keep visible for v1.
   - Add the 5 shared links.

**The "two huge pages" principle:** we **never reflow their content**. We do three mechanical things to each — (1) delete the local header + `:root`, (2) add 5 shared `<head>` tags, (3) find-replace local token names → shared token names. Their bodies, lessons, and scripts are inert to the refactor. This keeps the 1.77 MB / 6,446-line diffs small and reviewable.

---

## 8. Phased rollout (each phase independently shippable)

**Phase 1 — Shared shell + tokens (foundation).**
Create `tokens.css`, `shell.css`, `shell.js`, `nav.js`, `partials/head.html`. Move the gate into `shell.js` (temp-open preserved). Migrate `index.html` → portal home and `roadmap.html` (the two small files). Ship: consistent dark+green tokens, one persistent top-bar + left sidebar, gate working on every page, no more iframe for these two. *Shippable: portal looks unified on home+roadmap; big pages still old.*

**Phase 2 — Navigation UX (sidebar + search + TOC).**
Add `toc.js` (right-rail + scroll-spy) and `search.js` + `search-index.json` (Cmd+K). Wire the full `nav.js` taxonomy (§6), active-pill, breadcrumb eyebrow, prev/next. *Shippable: full three-zone docs nav + global search on migrated pages.*

**Phase 3 — Component pass.**
Roll the §5 components (callouts, cards, code-copy, tabs restyle) across `get-access` and the two big pages: strip their headers, swap `:root` → shared links, find-replace token names, add the 5 head tags, add `location.hash` deep-linking to `goTo`/`goToLesson`. *Shippable: all five pages on one design system; lessons bookmarkable.*

**Phase 4 — Per-page polish + lesson rail.**
Read SPA internal lesson lists into the global sidebar (option (a)); collapsible sub-groups for the 16 X-Ray lessons; relocate progress bars; "Was this helpful?" tally; responsive cascade (TOC hides <1280px, sidebar → hamburger <1024px, tab row hides on mobile — matching Claude Docs). *Shippable: full parity.*

**Phase 5 — Stretch.** Give `clo-community/` onboarding the same head partial for brand continuity; optional FlexSearch upgrade; optional "Copy page as markdown."

---

## 9. Risks & open questions

**Risks / mitigations:**
- **Search without a backend.** Solved with a static `search-index.json` + client scorer. Risk = stale index (hand-maintained). Mitigation: a tiny local Node/PowerShell script that regenerates it from the pages' headings; until then, index pages + top-level lessons only (acceptable coverage).
- **Scroll-spy perf on the 6,446-line page.** Observing all DOM nodes would jank. Mitigation: `IntersectionObserver` on **only `h2,h3` of the active content column** (a few dozen nodes) — O(headings), not O(DOM). TOC rebuilds only on lesson change, not on scroll.
- **iframe-removal blast radius.** Removing the iframe changes how pages are reached (direct URLs vs `index.html#tab`). Mitigation: the **hash-redirect shim** in `index.html` (old `#business-x-ray` → real URL) + verify no external links/emails point at the old hash form. Each big page's internal JS is untouched, so SPA behavior can't regress.
- **Gate now runs on every page.** One LemonSqueezy call per page-load when live. Mitigation: `sessionStorage` "validated" stamp so intra-session nav skips re-validation; keep the exact existing `validateLicense` (store/product/variant checks) so behavior is identical. Net: *more* pages protected than today.
- **Token find-replace on the big pages.** Risk of missing a hardcoded hex (e.g. inline `stroke:#79EA20` in SVGs). Mitigation: grep each page for raw hexes after re-pointing; leave SVG annotation colors (`--ann-*`) as-is since they already match.
- **CSS specificity collisions.** The big pages have large inline `<style>` blocks that could override `shell.css`. Mitigation: namespace all shell classes (`.clo-shell-*`) and scope page styles to `.main`/`.app`; load `shell.css` last; never reuse generic class names like `.card` inside a page without the shell prefix.
- **File-safety on 1.77 MB page.** Per CLAUDE.md rules: surgical `Edit` only, never `Write`; confirm diffs before applying.

**Open questions for Rashid (decide before execution):**
1. **Font strategy:** single family (Hanken everywhere) vs display+body (Bricolage headings + Hanken body, default in plan)? Affects brand feel.
2. **License gate:** keep temp-open (`GATE_OPEN=true`) for this whole revamp, or re-enable the live gate as part of Phase 1? (Plan assumes temp-open stays until you say otherwise.)
3. **Business X-Ray progress bar:** preserve it (relocate into shell) or drop for v1? (Plan defaults to drop-for-v1, restore in Phase 4.)
4. **SPA internal sidebars:** hide them and lift lessons into the global rail in Phase 1 (more polish, more risk) or keep them visible until Phase 4 (recommended, safer)?
5. **"Ask AI" / Copy-page-as-markdown:** in scope at all, or explicitly out? (Plan treats as out / Phase-5 stretch.)
6. **Community onboarding page:** brand-align it (same head partial) in Phase 5, or leave fully separate?

---

**Files referenced (all absolute):**
- Shell to refactor: `C:\Users\rkham\OneDrive\Desktop\Cursor Projects\clo-courses\clo-course\index.html`
- SPA pages (wrap, don't rewrite): `...\clo-course\business-x-ray.html` (1.77 MB), `...\clo-course\claude-code-101.html` (6,446 lines)
- Static pages: `...\clo-course\get-access.html`, `...\clo-course\roadmap.html`
- Logo: `...\clo-course\..\clo-community\assets\clo-logo-full.png`
- Community onboarding (separate, Phase 5): `...\clo-courses\clo-community\`
- New shared files to create in `...\clo-course\`: `tokens.css`, `shell.css`, `shell.js`, `nav.js`, `toc.js`, `search.js`, `search-index.json`, `partials/head.html`
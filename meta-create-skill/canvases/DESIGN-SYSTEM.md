# AIEB Skill-Teaching Videos — Design System

The single source of truth for every diagram in this canvas set. Every diagram — this
video and all future ones — is built against these rules so the whole series reads as one
system. Built with the `excali-graphic` skill (white bg, real Excalifont, wobble-on-shapes-only,
color-by-meaning). Render → gate (`excali-gate.py`, 0 hard) → `excali-reviewer` (PASS) → ship.

---

## 1. Platform-agnostic voice (HARD RULE)

This training must work for **Claude Code, Cowork, claude.ai, or any AI platform that reads skills.**
Skills are a portable format — the same skill folder loads across all of them.

- **NEVER write "Claude" or "Claude Code"** in any diagram. Say **"the AI"**, **"your AI assistant"**,
  or **"the AI agent"**. The router is **"the AI's router"**, not "Claude's router".
- The canonical robot may appear (it's the brand's "AI employee" mascot), but its chest panel
  carries **no platform text/label** — keep it a neutral panel.
- Real frontmatter field names (`name`, `description`, `context`, `model`, `effort`, `allowed-tools`,
  `disable-model-invocation`) STAY — they're the actual skill spec, valid in Claude Code and Cowork.
  Only genericize the *prose* around them.

## 2. Tangible objects over abstractions (the north star)

The closer a diagram is to the **real object as it actually exists**, the better. Prefer:
- A skill → an actual **folder + files** (a real `tree` listing, box-drawing connectors `├── └── │`).
- SKILL.md → an actual **document/file view** (real YAML fences, real heading, real markdown table) —
  not boxes-with-labels pointing at regions.
- Routing → the AI **physically scanning/crawling the list of skill descriptions**, a highlight
  sweeping row by row, with its **thinking pattern** shown (match? no… match? yes → fires).
- "The AI" → the **canonical black-marker robot** (excali-graphic pattern #12; source at
  `.claude/skills/visual-content/canonical/`).
Ask on every element: "what real object or view shows this, instead of a labelled box?"

## 3. The Subfolder Legend (FIXED — color + icon, identical in EVERY diagram)

Whenever an individual subfolder is named or drawn, it ALWAYS gets its locked color **and** icon:

| Subfolder | Color | Hex (rgb) | Icon | The question it answers |
|---|---|---|---|---|
| `workflows/` | green | `rgb(45,140,60)` | branching paths (a fork) | "which job?" |
| `scripts/` | amber | `rgb(214,140,40)` | gear / cog | "what deterministic work?" |
| `references/` | blue | `rgb(52,120,190)` | open book | "what deeper doc, only if needed?" |
| `assets/` | purple | `rgb(147,112,219)` | stacked copy / template | "what do I copy into the output?" |

- **`SKILL.md` is NOT a subfolder** — it's the one REQUIRED file. Distinguish it by **weight**
  (ink `rgb(33,33,33)`, bold) + a **`REQUIRED` badge**, never by stealing a subfolder color.
- **Load-timing** (read-every-time vs read-on-demand) is encoded by **position + brackets/labels**,
  NOT by row hue — so it coexists with the subfolder legend on the same diagram (e.g. the anatomy tree).

## 3b. The paper is WHITE (2026-07-24) — and the neutrals are grey, not beige

The canvas set was repainted from cream to **white** so the slides dissolve into the white
card they sit in inside the buyer portal's wizard (the slide viewer's frame is `#FFFFFF`).
A beige rectangle floating on a white card is the exact thing this rules out.

| Role | Use | Never |
|---|---|---|
| paper / `--bg` | `rgb(255,255,255)` | `rgb(250,249,245)` (the retired cream) |
| dot grid texture | `rgb(224,224,222)` @ 0.5 opacity | any warm/beige dot |
| hairline divider | `rgb(228,228,226)` | `rgb(220,218,210)` |
| divider (heavier) | `rgb(223,223,221)` | `rgb(214,212,204)` |
| neutral zone container | `rgb(225,225,223)` stroke | `rgb(216,214,206)` |
| faint zone/row outline | `rgb(212,212,210)` · `rgb(217,217,215)` | any R>G>B neutral |

**The rule:** a neutral is **grey** (R=G=B, or within 2) — never warm. A colour whose red
channel sits meaningfully above its blue is either a *semantic* accent (the subfolder legend,
red for failure) or a mistake. (`02-8-sediment`'s old tan fill was retired 2026-09-23 — it now uses
the same light red problem tint as the other signal cards.) Semantic warm colours
are untouched by this rule; decorative ones are not allowed to be warm.

## 4. Other color meanings (reserved — do not repurpose)

- **red `rgb(214,69,58)`** = failure / warning / "silently never fires" ONLY.
- **ink `rgb(33,33,33)`** = structure / neutral / the required file. **dim `rgb(120,120,125)`** = sub-labels.
- Using all four subfolder colors on one diagram trips the gate's ≤3-accent REVIEW flag — that is
  **accepted and acknowledged** for the subfolder diagrams (Rashid's call, 2026-07-07). Not a HARD fail.

## 5. Shared object vocabulary (draw the same object the same way everywhere)

- Robot = the AI (canonical). Folder/tree = a skill on disk. Open binder/checklist = the skill's contents.
- The **skill-binder** the robot holds in "Why a Skill" is the SAME object the anatomy tree then opens up —
  one object carried across the video, not a new metaphor per slide.

## 6. Shared ELEMENT vocabulary + the causal chain (make "this causes this" legible)

The same **elements at play** must recur across diagrams, drawn the same way, so the viewer builds ONE
mental model and can trace cause → effect. "Why a Skill" is the ANCHOR that introduces the vocabulary;
every other diagram echoes the same objects where relevant (it does NOT cram all of them onto every slide).

**INPUT elements — what's inside a skill** (the 4 contents, established in "Why a Skill", same icons/labels everywhere):
- **Conventions** — how you want it done
- **Gotchas + origins** — the real past failures, with what/when/why
- **Gold example** — the real artifact to match, not a template
- **Order + carve-outs** — the sequence of steps + the exceptions that stop over-correction

**Where each element LIVES** (this is the connective tissue: Why-a-Skill → Anatomy → Subfolders should let a
viewer point and say "the gold example lives in `assets/`"):
- SKILL.md body → conventions, the step order, the routing map
- `references/` → the deeper gotchas/docs
- `assets/` → the gold example / templates
- `workflows/` → the ordered steps for each job

**OUTPUT elements — what comes out** (same two output cards everywhere the result is shown):
- **Without the skill** → generic output + a hidden mistake (red)
- **With the skill** → matches your gold (green)

**The causal spine to keep visible across the set (Input → Process → Output):**
`same INPUT + same AI → the skill makes the PROCESS predictable (and still dynamic) → OUTPUT is ~80% to your standard and revenue-ready, instead of varied/average`.
The skill lives in the **Process** — it's what makes the AI Employee know exactly HOW to do the job. When a diagram shows an input element and an output, wire them so the reader sees THIS piece produced THAT result.

**Locked wording (retired confusing labels — do NOT reuse):**
- The good output is **"~80% to your standard · ready to generate revenue"** — NOT "matches your gold" (that phrase read as jargon; 2026-07-07). ~80% is on-brand (the eval-loop target).
- The bad output is **"average at best · can't be used to generate revenue"** — NOT just "generic".
- A skill's value = **"makes the process predictable AND dynamic — the AI Employee knows exactly HOW"** (a skill is a guide, NOT a rigid macro; the AI still thinks). Without it: "varied · guesses the HOW every time."
- Do NOT use a floating **"general knowledge"** cloud to mean the AI's built-in ability — it confused viewers. Show the SAME robot in both process lanes instead (same AI, the skill is the only difference).

## 7. One lesson per diagram — no two diagrams teach the same thing

Each diagram owns ONE job; do not let a second diagram re-teach it. Enforced splits so far:
- **Structure** (what's inside a skill: the folder + files) → the anatomy tree ONLY. It carries no
  load-timing content.
- **Reading + loading skills** (routing + progressive disclosure) → ONE combined visual, "How the AI
  Reads & Loads Skills". Routing and the three load-tiers are the SAME story told by folder depth:
  the AI scans every skill's **description** (Tier 1) → matches one → that skill's **SKILL.md body**
  loads (Tier 2) → its **subfolder files** load on demand (Tier 3). Depth = load order. Merged
  2026-07-07 (was two separate diagrams — progressive-disclosure + routing — collapsed into one big
  library tree so it's easier to follow).
When adding a diagram, name its ONE job and check no existing diagram already teaches it.

## 8. Locked vocabulary (the 3 levels of skills)

- **Level 1 · Simple** — one job, one `SKILL.md`.
- **Level 2 · With Workflows** — one skill that uses its supporting folders. The diagram MUST show all
  four subfolders AT WORK during a real job (dynamic use), not just `workflows/`: `workflows/` (the jobs) +
  `scripts/` (deterministic work) + `references/` (deeper docs) + `assets/` (templates/gold), in their
  locked legend colors. This makes Video 1's static anatomy come alive. (Rashid, 2026-07-07.)
- **Level 3 · Skill System** — a **lead skill** that runs other skills in order. The mechanism is always
  called **"the lead skill"** on a slide — never "orchestrator", "conductor" or "router" (v4 already said
  "lead skill" 15 times and "orchestrator" zero; v2 used three names for it, 2026-09-23). A skill system is
  what your **AI Employee** is built from — it becomes the AI Employee once it runs on its own (§9).
  (Rashid, 2026-07-07; renamed 2026-09-23.)
- In a "how they compose" diagram, label by ROLE, not by a per-element "Level N" tag (that mislabels —
  the lead skill is the Level-3 thing; its nested workflows serve one parent; the shared skills it
  reaches out to are reused by many and are themselves Level 1/2, NOT "Level 3").

## 9. THE running example — one AI Employee across all nine decks (LOCKED 2026-09-23)

Every deck teaches on the **same** job, so what the buyer builds in one deck is the thing the next deck
extends. Before 2026-09-23 the set used ~25 skill names in v1–v3, a `weekly-report/` in v5–v6, and gave
`weekly-email/` two contradictory roles (lead skill in v4, the writer in v7–v8) — the #1 reason the set
was hard to follow. Rashid approved this model 2026-09-23.

```
weekly-email/          the LEAD SKILL — runs the other four in order          (v4, v9)
├─ pull-stats/         gets last week's numbers   reads stats/last-week.csv
├─ what-worked/        finds the winners
├─ draft-email/        writes this week's email   ← the FIRST skill the buyer builds (v1, v2, v5, v6, v7)
└─ qa-draft/           checks the draft against your rules ← the independent REVIEWER (v8)

writes  drafts/weekly-email.md      gold example  assets/best-email.md  ("the best weekly email you've sent")
```

**Where each deck stands on it:**
| Deck | Teaches on |
|---|---|
| v1 What is a skill | `draft-email/` — request "Write this week's email"; its SKILL.md, its folders, the library it is picked from |
| v2 Types of skills | L1 `draft-email/` (one file) → L2 `draft-email/` with `workflows/weekly.md` + `workflows/launch.md` (one job, several versions) → L3 `weekly-email/` runs the four (a one-row plant, v4 owns the detail) |
| v3 Audit the library | the same email library after it has grown messy (a duplicate of `draft-email/`, a collision with `qa-draft/`, an orphan workflow…) |
| v4 Skill system | `weekly-email/` running the four; `draft-email/` = "the skill you already built" |
| v5 Retrospective | a correction to `draft-email/` ("Drop the emojis and lead with the number") |
| v6 How to create a skill | the interview that produces `draft-email/SKILL.md` |
| v7 Harden | `draft-email/` gets a self-check against your rules |
| v8 Harness | the checks around it: `qa-draft/` (the reviewer) + the retry cap + the reality check |
| v9 Schedule | `weekly-email/` runs itself Monday 7am — now it is your AI Employee |

**Wording:** the email is always **"this week's email"** (the request is "Write this week's email"; it is
built from last week's numbers). The correction story in v5 uses "next week" only for the FOLLOWING run.
**draft-email/ files** (v1 + v2 use these names): `SKILL.md` · `workflows/weekly.md` · `workflows/launch.md`
· `scripts/check-links.py` · `scripts/days-left.py` · `references/voice-rules.md` ·
`references/launch-offer.md` · `assets/best-email.md` · `assets/best-launch-email.md`.

**Paths and facts stay identical everywhere:** `stats/last-week.csv`, `drafts/weekly-email.md`,
`assets/best-email.md`, the schedule is Monday 7am, the fabricated number is "34% · our best month yet".

## 10. One name per idea (LOCKED 2026-09-23)

| Say | Never say on a slide | Meaning |
|---|---|---|
| **skill** | — | a folder the AI loads to do one job your way |
| **the header** (introduce once as "the header, called frontmatter") | "THE DESCRIPTION" for the whole block, "YAML frontmatter" | the few lines at the top of SKILL.md: `name` + `description` |
| **description** | "trigger" as a noun | the header line the AI reads to decide whether to use the skill |
| **one job, several versions** | "several jobs" | what a Level-2 skill holds (weekly vs launch email) |
| **lead skill** | orchestrator, conductor, router | the skill that runs other skills in order |
| **skill system** | "THE SKILL SYSTEM" as a box label when the folder name fits | a lead skill + the skills it runs — one whole job, end to end |
| **AI Employee** | calling ANY AI with a skill "an AI Employee" | the skill system once it runs on its own. Ladder: **skill** = a task → **skill system** = a function → **AI Employee** = owns the function and starts itself |
| **the retrospective** | "retro", "session review" | turns your plain-words correction into an edit to the skill file — after your yes |
| **hardening** | "block", "fires" | writing your rules into the skill + a self-check before it hands you anything |
| **self-check** | "gate" | the `## Self-check before handing it over` section of SKILL.md |
| **stops** | catches / blocks / fires | what the self-check does to a bad draft |
| **the scorecard** (5 tests) | eval, test suite | inputs with a known right answer, re-run after every edit |
| **the harness** | "the rig" | the checks that live OUTSIDE the skill file: the reviewer, the retry cap, the reality check |
| **the reviewer** (`qa-draft/`) | "the one that never saw it written" as its only name | reads the draft cold; never saw it being written |
| **the retry cap** | "capped loop" as a title | the reviewer sends it back at most 3 times, then it comes to you |
| **the reality check** | "the harness goes and looks" | opens the folder to confirm the file really landed |
| **a run** (define once: "one time the skill does the job") | — | prefer "this week's email / next week's email" where it fits |

**Output promise:** with a skill = **"~80% to your standard · ready to use"**; without = **"average at
best"**. After corrections (v5) = **"work you'd put your name on"**. Never "matches your gold",
"every run matches it", or a starting point of "average at best" for a skill that exists.

## 11. Slide rules that make a deck easy to follow (LOCKED 2026-09-23)

Slides are 1600×1050 shown ~1068 px wide in the portal (×0.6675). Every rule below came from the
2026-09-23 audit of all 54 slides.

1. **24 px floor** for anything the viewer must read — including dim sub-labels, file lines, example
   columns and hand-off labels (24 px shows at 16 px). Make room by cutting words, never by shrinking.
   Only chrome (traffic-light dots, a folder tab) may sit below it.
2. **The title IS the takeaway** — a sentence that states the point ("One Skill Runs the Others, In
   Order"), not a label ("Level 3 · Orchestrator").
3. **At most two prose lines outside the diagram, and they never repeat each other.** Title + (subtitle
   OR bottom takeaway). The diagram does the teaching; a line that restates the title or a card is cut.
4. **One job per slide, and no slide gives away the next one's answer.**
5. **The AI = the canonical robot, captioned by role** ("the AI", "the AI · writing it", "the reviewer ·
   never saw it written"). Copy it with `_tools/robot.py block` — never draw a robot — at **s ≥ 0.75**
   (≥ 0.7 when two share a slide) so the SKILLS toolbelt reads. `python _tools/robot.py check` must pass.
   Where a slide says "same AI" it shows the same robot in both lanes. Speech boxes get a tail to their
   speaker.
6. **You = an ink stick figure.** Red is failure only, so a person is never drawn red; "your call" tags
   are ink.
7. **The subfolder colors are only for subfolders** (§3). The header box, rule boxes, severity badges and
   "its own skill" labels are ink or grey — never green/amber/blue/purple. **Carve-out:** green for a
   good OUTCOME (the "~80% to your standard" output, a ✓, a matched row) and red for failure keep their
   house meaning (§4, §6) — that is not borrowing the legend. Just don't let a green outcome arrow start
   from the `workflows/` row, where it reads as "workflows/ made this".
8. **No terminals, prompts or slash commands** on a slide — the buyer may be on Cowork, Claude Code or
   Codex. Show a chat reply ("I couldn't open your stats file") or a plain file/folder view (title bar =
   the folder name, no `$ tree`).
9. **No collisions:** no text over a line, arrowhead, border or another label. `excali-gate.py` 0 hard,
   then the `excali-reviewer` PASS on the PNG.

---

**Origin:** 2026-07-07, building meta-create-skill video 1 ("What Is a Skill"). Rashid locked: literal
folder tree, tangible real objects over abstractions, fixed color+icon per subfolder, and platform-agnostic
voice (Cowork + any platform, not Claude-Code-specific).

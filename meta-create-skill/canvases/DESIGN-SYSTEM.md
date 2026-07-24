# AIEB Skill-Teaching Videos — Design System

The single source of truth for every diagram in this canvas set. Every diagram — this
video and all future ones — is built against these rules so the whole series reads as one
system. Built with the `excali-graphic` skill (cream bg, real Excalifont, wobble-on-shapes-only,
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
- **Level 3 · Skill System / Orchestrator** — lead with **"Skill System"** (the result / the product
  concept = your **AI Employee**); **"orchestrator"** is the *mechanism* (a skill that coordinates other
  skills). An orchestrator coordinating a team of skills IS a Skill System. Always tie it to "your AI
  Employee." This plants the concept the later `build-skill-system` video pays off. Do NOT call Level 3
  just "Orchestrator" anymore. (Rashid, 2026-07-07.)
- In a "how they compose" diagram, label by ROLE, not by a per-element "Level N" tag (that mislabels —
  the orchestrator is the Level-3 thing; its nested workflows serve one parent; the shared standalone
  skills it reaches out to are reused by many and are themselves Level 1/2, NOT "Level 3").

---

**Origin:** 2026-07-07, building meta-create-skill video 1 ("What Is a Skill"). Rashid locked: literal
folder tree, tangible real objects over abstractions, fixed color+icon per subfolder, and platform-agnostic
voice (Cowork + any platform, not Claude-Code-specific).

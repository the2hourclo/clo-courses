# Get Access — Asset TODO List

An honest inventory of the visual assets the two Get Access pages could still use, and how to capture them without breaking your own install. The old version of this doc described a video-embed hook and a 6-screenshot shot list that no longer match the pages — this version is reconciled against what actually exists.

**The pages these assets power:**

- `clo-course/get-access-aieb.html` — **AI Employee Builders** (thin plugin from the `the2hourclo/aieb-thin-plugin` GitHub marketplace + `/setup-aieb` device activation + gated MCP). Tracks: Claude Code and Claude Cowork.
- `clo-course/get-access.html` — **CLO community** (SkillStack + `clo-community` plugin).

Screenshots live in `clo-course/assets/get-access/`.

---

## What exists today

| File | Used by | Status |
|---|---|---|
| `assets/get-access/02-claude-code-extension.png` | both pages (Install Claude Code step) | ✅ in place |
| `assets/get-access/claude-code-mascot.png` | get-access-aieb.html (track chooser) | ✅ in place |
| `assets/get-access/cowork-logo.png` | get-access-aieb.html (track chooser) | ✅ in place |
| `assets/get-access/community-robot.png` | get-access-aieb.html (community section) | ✅ in place |

**No video embed slot exists on either page anymore.** The old `GET_ACCESS_VIDEO_ID` script line was removed from `get-access.html` — if we record a walkthrough video, a player slot has to be added back to the page first.

---

## Still worth capturing (TODO)

None of these are wired into the pages yet — each one needs both the capture **and** a `<figure>` slot added to the page. Prioritized:

### For get-access-aieb.html (the main funnel)

- [ ] **Walkthrough video (~5 min), Claude Code track** — install extension → add `the2hourclo/aieb-thin-plugin` marketplace → install `ai-employee-builder` → `/setup-aieb` → secure device-activation page → first skill run. Blur the license key on the activation page. Requires re-adding a video embed slot to the page.
- [ ] **Cowork track screenshots** — Customize → Personal plugins with the marketplace add dialog open; `/setup-aieb` printing the secure link; the device activation page (key blurred); a skill responding in chat.
- [ ] **Claude Code track screenshots** — `/plugin` Marketplaces tab with the aieb-thin-plugin marketplace added; `/setup-aieb` output; `/check-setup` passing.

### For get-access.html (community buyers)

- [ ] **SkillStack flow screenshots** — `/plugins` panel (Marketplaces + Plugins tabs, "Install for you" scope menu); `/activate-license` success output (key blurred); clo-community enabled in the plugins list; `onboard me` interview starting.

**Format:** PNG, ~1600px wide, cropped to the relevant area. Always blur real license keys.

---

## Capturing without breaking your own setup

You already have everything installed on your main account. **Do NOT uninstall to get clean shots.**

**Best: a throwaway Windows user account (true clean slate).** Claude Code plugins live per-Windows-user (`~/.claude/`), so a fresh account is genuinely blank.

1. Settings → Accounts → Other users → **Add account** → "I don't have this person's sign-in info" → **"Add a user without a Microsoft account"**. Name it `clo-demo`.
2. **Fast User Switch** into it (Start menu → profile icon → clo-demo). Your main session stays parked.
3. Install VS Code + Claude Code extension (and/or the Claude desktop app for Cowork shots), sign in to Claude.
4. Run the real buyer flow with a test license key, capture as you go. Start any screen recorder **inside** the clo-demo session.
5. Switch back and delete `clo-demo` when done (Settings → Accounts → Other users → Remove).

**Zero-effort alternative:** the typed commands and panels look identical whether or not things are already installed — capture the `/plugin` panel and `/setup-aieb` moment on your normal account and crop before any account-specific output.

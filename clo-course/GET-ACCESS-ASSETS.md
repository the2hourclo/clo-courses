# Get Access — Recording Script & Asset Guide

Everything you need to (1) **record the walkthrough video**, (2) **capture the 6 screenshots**, and
(3) **embed the video**. The written steps below match the on-page steps exactly, so there's one source of truth.

**The page these assets power:** `clo-course/get-access.html` — the **"Get Access"** tab in the course portal (`clo-course/index.html`). It's the default tab people land on. Screenshots live in `clo-course/assets/get-access/`.

> Target length: **~5 minutes.** Keep it brisk. The page has the detail; the video is the "watch me do it."
> Record the install in the **VS Code panel** (the default, recommended path). The page also has a Terminal toggle for advanced buyers, but the video should follow the VS Code flow.

---

## 0. Before you hit record

- [ ] Record in a **fresh Windows user account** (`clo-demo`) so viewers see a true clean slate — real "Install" buttons, nothing pre-installed. Fast User Switch into it; your main setup stays untouched. (See Section 5.)
- [ ] Start the screen recorder **inside** the `clo-demo` session.
- [ ] Have a **real (or test) license key** ready to paste, but **blur/cover it** in the final video and screenshots.
- [ ] Screen res **1920×1080**, VS Code at a comfortable zoom (Ctrl/Cmd + `+` once or twice so text is readable on mobile).
- [ ] Close noisy tabs, notifications off.
- [ ] Optional cold open: one line of why — *"In about 20 minutes you'll go from nothing to your first AI Employee running on your machine."*

---

## 1. The recording script (scene by scene)

Each scene = one step on the page. **Bold = on-screen action.** Plain = what to say.

### Scene 1 — Find your license key  *(~30s)*  → no screenshot needed
- "When you subscribed, Lemon Squeezy emailed you a license key. Two places to find it."
- **Show the purchase email**, point at the key. "It's right here in your receipt."
- **Open** `app.lemonsqueezy.com/my-orders`, **enter your email**, **open the order**, point at the key + copy button. "Or grab it from My Orders — and this is also where you renew or manage your subscription."
- "Copy it somewhere handy — you'll paste it once, in a minute." *(Blur the key.)*

### Scene 2 — Install the four free tools  *(~45s)*  → capture `02-claude-code-extension.png`
- "Four free things let Claude run on your computer. I'll go fast — links are on the page."
- "**Claude subscription** — claude.ai. **VS Code** — the editor we work in. **Node.js** — grab the LTS button, click through the installer, you never touch it again."
- **In VS Code:** open **Extensions** (left bar, or Ctrl/Cmd+Shift+X), **search "Claude Code"**, **click Install**, **sign in**.
- **End on:** the Spark ✱ icon now in the top-right. "That spark means Claude Code is ready." *(Screenshot here.)*

### Scene 3 — Open Claude Code & add SkillStack  *(~70s)*  → capture `03-open-panel.png`, `04-install-scope.png`
- **Click the Spark ✱ icon** (top-right) — or the "Claude Code" button bottom-right. "There's the chat panel. This is where everything happens — no terminal." *(Screenshot 03.)*
- "SkillStack is the system that delivers paid plugins. We add it once."
- **Type** `/plugins` → Enter. "This opens the plugin manager — two tabs, Plugins and Marketplaces."
- **Marketplaces tab** → paste `https://github.com/SkillStacks/skillstack.git` and add it.
- **Plugins tab** → find **skillstack** → **click Install** → **choose "Install for you."** "Always pick *Install for you* so it works everywhere." *(Screenshot 04.)*
- "It asks me to restart — that's expected." **Click the restart banner** (or type `/reload-plugins`). *(If stuck: Ctrl/Cmd+Shift+P → 'Reload Window'.)*

### Scene 4 — Activate your license  *(~45s)*  → capture `05-activate-license.png`
- **Type** `/activate-license` → Enter.
- **Paste your license key** when it asks → Enter. *(Blur it.)*
- "It sets everything up, confirms the key, and — here — **prints the two commands** I run next." **Point at them.** *(Screenshot 05.)*

### Scene 5 — Install clo-community  *(~45s)*  → capture `06-clo-community-installed.png`
- "I just run the two commands it gave me." Back in **`/plugins` → Marketplaces tab**, **paste the storefront URL** it printed (the `store.skillstack.sh/...` one) and add it.
- **Plugins tab** → find **clo-community** → **Install** → **"Install for you"** again.
- **Restart / `/reload-plugins`** when the banner appears.
- **Show** `/plugins` → Plugins tab → clo-community enabled. "There it is — the whole library's installed." *(Screenshot 06.)*

### Scene 6 — Onboard  *(~40s)*  → capture `07-onboard.png`
- "Now the fun part."
- **Type** `onboard me` → Enter. **Show Claude starting the interview.** *(Screenshot 07.)*
- "It scaffolds your workspace, runs a Business X-Ray, learns your voice, connects your tools, and builds your first custom skill. About 20–30 minutes — just answer the questions."
- Close: "That's it. You're in. Everything's set up for *your* business."

---

## 2. Screenshot shot list

Drop files into **`clo-course/assets/get-access/`** with these exact names. The page shows each automatically once the file exists. (No screenshot for Step 1 — the Lemon Squeezy step is text-only.)

| # | Filename | Status | Capture |
|---|----------|--------|---------|
| 1 | `02-claude-code-extension.png` | ✅ done (reused) | Claude Code extension installed; Spark ✱ icon top-right. |
| 2 | `03-open-panel.png` | ⬜ needed | Claude Code chat panel open, text box at the bottom. |
| 3 | `04-install-scope.png` | ⬜ needed | The install-scope menu, **"Install for you"** highlighted. |
| 4 | `05-activate-license.png` | ⬜ needed | `/activate-license` success + the two printed install commands. |
| 5 | `06-clo-community-installed.png` | ⬜ needed | clo-community enabled (`/plugins` → Plugins tab). |
| 6 | `07-onboard.png` | ⬜ needed | Claude starting the `onboard me` interview. |

**Format:** PNG, ~1600px wide, cropped to the relevant area. Always blur real license keys.

---

## 3. Embed the video

1. Upload the recording to **YouTube** (Unlisted is fine) — or Loom/Vimeo if you prefer (steps below are for YouTube).
2. Copy the video ID from the URL — e.g. `https://youtu.be/`**`dQw4w9WgXcQ`** → the ID is `dQw4w9WgXcQ`.
3. Open `clo-course/get-access.html`, find this line in the `<script>` block near the bottom:

   ```js
   const GET_ACCESS_VIDEO_ID = '';
   ```

4. Paste your ID between the quotes:

   ```js
   const GET_ACCESS_VIDEO_ID = 'dQw4w9WgXcQ';
   ```

5. Save. The placeholder turns into the embedded player automatically. Done.

*(Not YouTube? Tell me your host and I'll wire that embed instead.)*

---

## 4. Exact commands (copy/paste reference)

The VS Code path uses the `/plugins` panel (Marketplaces tab to add, Plugins tab to Install → "Install for you"). These are the equivalent typed commands — identical in the panel or the terminal:

```
/plugin marketplace add https://github.com/SkillStacks/skillstack.git
/plugin install skillstack@skillstack-marketplace      ← choose "Install for you"
/reload-plugins
/activate-license                                       ← paste your license key
# /activate-license then prints the next two commands — run those. They look like:
/plugin marketplace add https://store.skillstack.sh/s/the2hourclo/clo-os/marketplace.json
/plugin install clo-community@clo-os                    ← choose "Install for you"
/reload-plugins
onboard me
```

> If the commands `/activate-license` prints differ from the last two above, use **its** versions — they're tailored to the account.

---

## 5. Capturing the install WITHOUT uninstalling your own setup

You already have SkillStack + clo-community installed. **Do NOT uninstall to get clean shots** — it would force you to re-activate your own Lemon Squeezy license afterward, and re-running the install just shows "already added," which looks broken.

### Best: a throwaway Windows user account (true clean slate)
Claude Code plugins live per-Windows-user (`~/.claude/`), so a fresh account is genuinely blank.
1. Settings → Accounts → Other users → **Add account** → "I don't have this person's sign-in info" → **"Add a user without a Microsoft account"** (this makes a local-only account — no Microsoft email needed). Name it `clo-demo`.
2. **Fast User Switch** into it (Start menu → your profile icon → clo-demo). Your main session stays parked and running — no logout.
3. Install VS Code + Claude Code extension + Node.js (LTS), sign in to Claude.
4. Record the full flow + capture the screenshots. Start the recorder **inside** the clo-demo session.
5. Switch back to your normal account. Delete `clo-demo` when done (Settings → Accounts → Other users → Remove).

### Zero-effort alternative (no clean account)
The commands look identical whether or not SkillStack is installed, because the screenshot is the typed command / the `/plugins` panel, not the result. Capture the `/plugins` Plugins + Marketplaces tabs on your normal account and annotate a "click Install → Install for you" arrow.

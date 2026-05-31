# Client email — 3 months free (license key + setup link)

A ready-to-send email for giving a client 3 months of free CLO-OS Community access.
You grant the access on your side, then send them this with their license key.

**Fill in before sending:** `{{CLIENT_NAME}}`, `{{LICENSE_KEY}}`.
**Setup link** points to the existing Get Access page (no separate page needed):
`https://the2hourclo.github.io/clo-courses/clo-course/get-access.html`

---

## Subject
Your 3 months free — CLO-OS Community (license key inside)

## Body

Hi {{CLIENT_NAME}},

You're set up with **3 months free** of the CLO-OS Community — the full skill library running right inside Claude Code. No charge, nothing to buy.

**Your license key:**

    {{LICENSE_KEY}}

(Keep this handy — you'll paste it once during setup.)

**Set it up in ~20 minutes:**
Open the step-by-step guide here → https://the2hourclo.github.io/clo-courses/clo-course/get-access.html

When the guide asks for your license key (Step 2 / Step 4), use the one above — you can ignore the "find it in your purchase email" part, since I've sent it to you directly.

**Want the shortcut?** Once Claude Code is installed (Step 1 of the guide), there's a copy-paste prompt that lets Claude do the rest of the install for you — it'll even install what it needs and fix any errors as it goes.

Near the end of your 3 months I'll check in about continuing. Any trouble before then, just reply here.

Rashid

---

## Even shorter version (for clients already using Claude Code)

Subject: Your CLO-OS license key (3 months free)

Hi {{CLIENT_NAME}},

Here's your **3-months-free** license key for the CLO-OS Community plugin:

    {{LICENSE_KEY}}

Setup (you already use Claude Code, so this is quick):
1. In the Claude Code chat, type `/plugin` → click **Manage Plugins** → **Marketplaces** tab → add `https://github.com/SkillStacks/skillstack.git` → **Plugins** tab → install **skillstack** → "Install for you".
2. Run `/activate-license` and paste the key above. It prints two commands — run them to install **clo-community** ("Install for you"), then `/reload-plugins`.
3. Type `onboard me` to build your first AI Employee.

Full guide if you want it: https://the2hourclo.github.io/clo-courses/clo-course/get-access.html

Reply here if anything snags.

Rashid

---

### Notes for you (not part of the email)
- **How to grant the free key:** see your saved trick — `reference_lemonsqueezy_trial_extension.md`. Net: get them a license key without a real charge (100%-off one-time code at checkout, or issue/subscription + PATCH `trial_ends_at` 3 months out), then paste that key here.
- The clo-community subscription is **$850 / 3 months** (store 10600, product 926993). After the free window, that's what renews — mention it when you check in.
- One key activates **one** plugin. If you also want to give them `ai-employee-builder`, that needs its own key.

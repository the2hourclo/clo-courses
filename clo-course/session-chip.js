/* session-chip.js — "you are signed in, as this account" on every course page.
 *
 * WHY (Rashid, 2026-07-27): the wall went up and the course stopped LOOKING
 * signed in. Only the board ever said whose account it was; on every other page
 * — home, the checkpoints, the lessons — a member had no way to tell whether
 * their work was being saved, or to whom. On a shared laptop that is worse than
 * cosmetic: you cannot notice you are on the wrong account if nothing ever
 * names it.
 *
 * Deliberately SELF-CONTAINED. These pages have three different layouts and
 * roughly half of them never load progress.js, so anything that depended on the
 * page's own markup or on AIEB being present would silently skip the pages that
 * need it most. One script tag, no other assumptions.
 *
 * It renders nothing at all when signed out — behind the wall that state is
 * unreachable anyway, and a "signed out" badge on a page you had to sign in to
 * reach would just be noise.
 */
(function () {
  "use strict";

  var API_PROGRESS = "/course-progress";
  var API_AUTH = "/auth/google";
  var ACCOUNT_HINT_KEY = "aieb_account_hint";

  // The board already draws its own chip in its top bar. Two badges saying the
  // same thing in different places reads as a bug, so defer to the page.
  if (document.querySelector("#signout, [onclick*=\"doSignOut\"]")) return;

  function accountHint() {
    try { return localStorage.getItem(ACCOUNT_HINT_KEY) || ""; } catch (e) { return ""; }
  }

  // Masked, not full. The server keeps only a hash of the address; this is the
  // one place the human-readable form belongs — in front of the person it is,
  // and shoulder-surfable screens are the norm in a coffee shop.
  function masked() {
    var raw = accountHint();
    var at = raw ? raw.indexOf("@") : -1;
    return at > 0 ? raw[0] + "••••" + raw.slice(at) : "";
  }

  function injectStyles() {
    if (document.getElementById("aieb-session-chip-style")) return;
    var css = document.createElement("style");
    css.id = "aieb-session-chip-style";
    css.textContent = [
      "#aieb-session-chip{position:fixed;top:10px;right:14px;z-index:2147483000;",
      "display:flex;align-items:center;gap:8px;padding:5px 11px;border-radius:999px;",
      "font:500 11.5px/1.4 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;",
      "background:rgba(250,250,250,.9);border:1px solid rgba(0,0,0,.09);color:#6b6b6b;",
      "-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);opacity:.72;transition:opacity .18s}",
      "#aieb-session-chip:hover{opacity:1}",
      "#aieb-session-chip .dot{width:6px;height:6px;border-radius:50%;background:#3fa66a;flex:none}",
      "#aieb-session-chip button{all:unset;cursor:pointer;text-decoration:underline;",
      "text-underline-offset:2px;color:inherit;font:inherit}",
      "#aieb-session-chip button:hover{color:#191919}",
      "@media (prefers-color-scheme:dark){#aieb-session-chip{background:rgba(23,23,23,.9);",
      "border-color:rgba(255,255,255,.12);color:#a8a8a8}#aieb-session-chip button:hover{color:#f2f2f2}}",
      "@media (max-width:640px){#aieb-session-chip{top:auto;bottom:10px;right:10px;font-size:11px}}"
    ].join("");
    document.head.appendChild(css);
  }

  function render(label) {
    injectStyles();
    var chip = document.createElement("div");
    chip.id = "aieb-session-chip";
    chip.innerHTML =
      '<span class="dot" aria-hidden="true"></span>' +
      '<span>' + (label ? "Saved to " + label : "Progress saving") + "</span>" +
      '<button type="button" id="aieb-session-signout">Sign out</button>';
    document.body.appendChild(chip);

    document.getElementById("aieb-session-signout").addEventListener("click", function () {
      // Clear locally FIRST and unconditionally, exactly as progress.js does. If
      // the DELETE fails the person still expects to be signed out of THIS
      // browser, and a shared machine is where "sign out didn't sign me out"
      // does real damage.
      try {
        localStorage.removeItem(ACCOUNT_HINT_KEY);
        localStorage.removeItem("aieb_view_token_v1");
      } catch (e) {}
      var done = function () { window.location.replace("/clo-course/sign-in.html"); };
      if (typeof fetch !== "function") { done(); return; }
      fetch(API_AUTH, { method: "DELETE", credentials: "include", cache: "no-store", referrerPolicy: "no-referrer" })
        .catch(function () {})
        .then(done);
    });
  }

  function start() {
    if (typeof fetch !== "function") return;
    fetch(API_PROGRESS, { credentials: "include", cache: "no-store" })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (data) {
        if (!data || !data.signed_in) return;   // signed out renders nothing
        render(masked());
      })
      .catch(function () {
        // No answer means we do not know. Claiming "saved" when we cannot
        // confirm it is the one lie this chip exists to prevent.
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();

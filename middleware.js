// middleware.js — the sign-in wall for the course.
//
// WHY (Rashid, 2026-07-27): "if they open up the page if they're signed out
// anywhere in the course it should sign them in… it needs to be walled, only if
// you sign in can you access it via Google."
//
// Before this, every page under /clo-course/ was a plain static file that
// answered 200 to anyone with the URL, and a Google button existed on exactly
// TWO of them. So the normal journey — activation page → checkpoint-map →
// checkpoints — never once offered a sign-in, and every buyer's progress sat in
// localStorage where the server could not see it. The board looked empty because
// nothing was ever sent to it.
//
// WHAT THIS GATES: identity, not entitlement. Any Google account gets through.
// That is deliberate for now — a buyer whose Google address differs from their
// checkout address must still be able to reach the page that lets them fix it,
// and locking real customers out the night before a launch is a worse failure
// than a stranger reading a lesson. Tightening this to paying members only is a
// one-line change below (`requireMember`), to make once the email→member join
// has been watched for a while.
//
// THE VALIDATION IS REAL. Checking only that a cookie EXISTS would be theatre —
// anyone can set `clo_course_session=x`. Every gated request asks the API whether
// the session actually resolves, which costs one same-apex round trip at the
// edge and is the difference between a wall and a picture of a wall.

const API = "https://api.chiefleverageofficers.com";
const SESSION_COOKIE = "clo_course_session";
const SIGN_IN_PATH = "/clo-course/sign-in.html";

// Set true to require a matching PURCHASE, not merely a Google account. Leave
// false until the email→member join has proven itself on real traffic; a false
// negative here reads to a paying customer as "you don't own this".
const requireMember = false;

export const config = {
  // Only page requests. Assets must stay open or a gated page renders naked:
  // the CSS, progress.js, and the checkpoint JSON all load from these paths, and
  // a redirect served in place of a stylesheet is a broken page, not a wall.
  matcher: ["/clo-course/:path*"]
};

function isAsset(pathname) {
  return /\.(css|js|mjs|json|png|jpe?g|gif|svg|webp|ico|woff2?|ttf|eot|map|mp4|webm|pdf)$/i.test(pathname);
}

export default async function middleware(request) {
  const url = new URL(request.url);
  const { pathname, searchParams } = url;

  if (isAsset(pathname)) return;
  if (pathname === SIGN_IN_PATH) return;

  // THE ACTIVATION LINK IS ITS OWN CREDENTIAL. `?activate=CODE` is a one-time,
  // short-lived code that /setup-aieb minted on a specific machine minutes ago.
  // Walling it would mean a buyer on a fresh laptop has to sign in before they
  // can reach the page whose whole job is connecting them — and the licence-key
  // fallback lives on that page, for exactly the people Google cannot match.
  // Gating the one door built for the locked-out is how you strand them.
  if (searchParams.has("activate")) return;

  const cookie = request.headers.get("cookie") || "";
  const hasCookie = cookie.split(";").some((pair) => pair.trim().startsWith(`${SESSION_COOKIE}=`));

  let signedIn = false;
  if (hasCookie) {
    try {
      const response = await fetch(`${API}/course-progress`, {
        headers: { cookie, "user-agent": request.headers.get("user-agent") || "aieb-middleware" },
        cache: "no-store"
      });
      if (response.ok) {
        const data = await response.json();
        signedIn = Boolean(data?.signed_in) && (!requireMember || Boolean(data?.linked));
      }
    } catch {
      // FAIL OPEN, deliberately. If our own API is unreachable we cannot tell a
      // stranger from a paying member — and locking every customer out of the
      // course during an outage is a far worse outcome than a few unauthenticated
      // page views. The paid content is gated by the MCP regardless; this wall
      // exists to make progress tracking work, not to protect secrets.
      return;
    }
  }

  if (signedIn) return;

  // Carry where they were headed, so signing in lands them there and not on a
  // generic home page. A wall that forgets the destination is a wall that makes
  // people give up.
  const target = new URL(SIGN_IN_PATH, url.origin);
  target.searchParams.set("next", pathname + url.search);
  return Response.redirect(target.toString(), 302);
}

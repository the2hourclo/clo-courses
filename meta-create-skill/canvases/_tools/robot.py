"""Canonical AI Employee robot for the meta-create-skill canvas set.

Every robot on every slide is the excali-graphic exemplar block, copied verbatim. This
tool reads that block from the exemplar at run time, so a slide can never carry a stale
or hand-drawn robot (v1-v3 shipped 19 hand-drawn ones; v4-v9 carried a pre-hardening
copy missing two explicit fill="none" attributes).

  python robot.py block --cx 560 --feet 880 --s 0.8 [--id canonical-robot-2]
      Print a ready-to-paste <g id=... transform=...> block. Paste it INSIDE the
      <g filter="url(#rough)"> shapes group. The slide's <defs> must carry #eyeGlow
      (print it with: python robot.py defs).
  python robot.py defs
      Print the radialGradient #eyeGlow def the eyes need.
  python robot.py recopy FILE.html [FILE.html ...]
      Replace the body of every <g id="canonical-robot*"> in place with the exemplar
      body, keeping each copy's own transform.
  python robot.py check FILE.html [FILE.html ...]
      List every robot and its scale. Exit 1 if a copy differs from the exemplar, a
      scale is below MIN_SCALE, #eyeGlow is missing, or the file draws a robot-like
      figure without the canonical block (the word "robot" in a comment with no copy).
"""
import argparse
import pathlib
import re
import sys

MIN_SCALE = 0.7  # below this the SKILLS toolbelt tools shrink to unreadable dots in the portal
NATIVE_CX, NATIVE_FEET = 1400, 943
ROBOT_G = re.compile(r'(<g id="canonical-robot[^"]*" transform="([^"]*)">)(.*?)(</g>)', re.S)


def exemplar_path():
    here = pathlib.Path(__file__).resolve()
    for parent in here.parents:
        cand = parent / ".claude/skills/excali-graphic/assets/exemplars/canonical-robot-blackmarker.html"
        if cand.exists():
            return cand
    sys.exit("robot.py: cannot find .claude/skills/excali-graphic/assets/exemplars/canonical-robot-blackmarker.html above this folder")


def exemplar_parts():
    text = exemplar_path().read_text(encoding="utf-8")
    # The header comment also names the block, so anchor inside the <svg>: the marker
    # comment, then the first <g> after that comment closes.
    start = text.index('id="canonical-robot"', text.index("<svg"))
    g_open = text.index("<g ", text.index("-->", start))
    body_start = text.index(">", g_open) + 1
    body_end = text.index("</g>", body_start)  # the block holds no nested <g>
    body = text[body_start:body_end].rstrip().lstrip("\n")
    body = "\n".join(line.rstrip() for line in body.splitlines())
    m = re.search(r'<radialGradient id="eyeGlow".*?</radialGradient>', text, re.S)
    return body, m.group(0)


def block(cx, feet, s, gid="canonical-robot"):
    body, _ = exemplar_parts()
    tx, ty = cx - NATIVE_CX * s, feet - NATIVE_FEET * s
    return (f'  <!-- canonical AI Employee robot, verbatim via _tools/robot.py - cx={cx:g} feetY={feet:g} s={s:g} -->\n'
            f'  <g id="{gid}" transform="translate({tx:.2f},{ty:.2f}) scale({s:g})">\n{body}\n  </g>')


def scale_of(transform):
    m = re.search(r"scale\(([\d.]+)", transform)
    return float(m.group(1)) if m else 1.0


def recopy(paths):
    body, _ = exemplar_parts()
    for p in paths:
        p = pathlib.Path(p)
        text = p.read_text(encoding="utf-8")
        new, n = ROBOT_G.subn(lambda m: f"{m.group(1)}\n{body}\n  {m.group(4)}", text)
        if n and new != text:
            p.write_text(new, encoding="utf-8")
        print(f"{p}: {n} robot(s) {'recopied' if new != text else 'already current'}")


def check(paths):
    body, _ = exemplar_parts()
    norm = lambda t: re.sub(r"\s+", " ", t).strip()
    bad = 0
    for p in paths:
        p = pathlib.Path(p)
        text = p.read_text(encoding="utf-8")
        robots = list(ROBOT_G.finditer(text))
        for m in robots:
            s = scale_of(m.group(2))
            issues = []
            if norm(m.group(3)) != norm(body):
                issues.append("body differs from exemplar")
            if s < MIN_SCALE:
                issues.append(f"scale {s:g} < {MIN_SCALE}")
            bad += bool(issues)
            print(f"{p.name}: robot s={s:g} {'OK' if not issues else 'FAIL: ' + '; '.join(issues)}")
        if robots and 'id="eyeGlow"' not in text:
            bad += 1
            print(f"{p.name}: FAIL: robot present but #eyeGlow missing from <defs>")
        if not robots and re.search(r"<!--[^>]*\brobot\b", text, re.I):
            bad += 1
            print(f"{p.name}: FAIL: a comment mentions a robot but no canonical block is present (hand-drawn?)")
    return 1 if bad else 0


def main():
    ap = argparse.ArgumentParser()
    sub = ap.add_subparsers(dest="cmd", required=True)
    b = sub.add_parser("block")
    b.add_argument("--cx", type=float, required=True)
    b.add_argument("--feet", type=float, required=True)
    b.add_argument("--s", type=float, required=True)
    b.add_argument("--id", default="canonical-robot")
    sub.add_parser("defs")
    r = sub.add_parser("recopy"); r.add_argument("files", nargs="+")
    c = sub.add_parser("check"); c.add_argument("files", nargs="+")
    a = ap.parse_args()
    if a.cmd == "block":
        if a.s < MIN_SCALE:
            print(f"<!-- WARNING: s={a.s:g} is below {MIN_SCALE}; the toolbelt will not read -->", file=sys.stderr)
        print(block(a.cx, a.feet, a.s, a.id))
    elif a.cmd == "defs":
        print(exemplar_parts()[1])
    elif a.cmd == "recopy":
        recopy(a.files)
    else:
        sys.exit(check(a.files))


if __name__ == "__main__":
    main()

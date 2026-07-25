/* ============================================================
   nav.js — portal config manifest (single source of truth for the nav)
   ONE product (2026-07-25). The old two-product split (`clo` + `aieb`,
   switched by ?product=) is GONE: delivery moved to a single gated MCP
   server where access is decided by the Lemon Squeezy PRODUCT ID, not by
   which portal you happen to be on. So the portal shows EVERY course to
   everyone, and the premium (Full Access) courses carry an upgrade CTA
   instead of being hidden behind a second nav.
   Consumed by shell.js. Old ?product=aieb links still work — the param is
   simply ignored now.

   ⚠ WHY THE GLOBAL IS STILL A MAP WITH TWO KEYS (do not "clean this up"):
   nav.js and shell.js are separate HTTP resources with INDEPENDENT cache
   entries, and this repo already ships them un-cache-busted on 13 of 14 pages.
   A browser holding an OLD shell.js does `window.CLO_PRODUCTS[PRODUCT_KEY]`
   with PRODUCT_KEY of 'clo' or 'aieb'. Every shell page ships <body hidden>,
   and ONLY shell.js unhides it — so if that lookup returns undefined the next
   line throws and the buyer gets a SILENT BLANK WHITE PAGE. Pointing both old
   keys at the one config means a stale shell.js keeps working and simply
   renders the new merged nav. Collapse the map only once you are certain no
   old shell.js is cached anywhere, which you cannot be.
   ============================================================ */
var CLO_CONFIG = {
  brand: 'AI Employee Builder',
  storageKey: 'aieb_license',
  // The upgrade target for everything in the Skill Library group. Single source
  // of truth — every "Unlock with Full Access" CTA reads this, none hardcode it.
  // Matches the `community` tier's upgrade_url in the gated MCP's skills manifest.
  checkout_url: 'https://chiefleverageofficer.lemonsqueezy.com/checkout/buy/14c15890-c46a-4ab8-ab8d-9e56cd04d38a',
  // grouped left-sidebar nav. `page` matches each page's <body data-page>. hrefs are ROOT-relative.
  nav: [
    // ── Two surfaces, deliberately, and they are not the same job:
    //    Home = the CHOICE screen — where you are in one line, one button to
    //           continue building, and the docs. This is where the logo lands.
    //    Build Board = the whole journey laid out, for when you want the map.
    //    (The third one, ai-employee-roadmap.html, IS retired — it tracked 7
    //    phases in its own aer_* keys against the board's 6 checkpoints in
    //    aieb_progress, two stores that never synced and could disagree about
    //    where you were. Its URL redirects to the board; its prompt appendix
    //    lives on under Reference.)
    { group: 'Get Started', items: [
      { label: 'Portal Home', page: 'home', href: 'clo-course/index.html', keywords: ['home','portal home','start','overview','welcome','continue','continue building','whats next','next step','dashboard'] },
      { label: 'Build Board', page: 'board', href: 'clo-course/ai-employee-board.html', keywords: ['board','build board','journey','checkpoints','path','progress','home base','what to build next','roadmap','map'] },
      { label: 'Get Access', page: 'get-access', href: 'clo-course/get-access-aieb.html', keywords: ['install','setup','claude code','cowork','plugin','license','activate','connect','onboard','getting started','first steps'] }
    ]},
    { group: 'Courses', items: [
      // `page:'business-x-ray'` belongs to the deep wiki, which is the page that actually
      // carries <body data-page="business-x-ray">. The DOING version is a board checkpoint.
      { label: 'Business X-Ray', page: 'business-x-ray', href: 'clo-course/business-x-ray.html', keywords: ['audit','diagnose','bottleneck','business map','bow-tie','funnel','swimlanes','process','assets','asset explorer','score','operating system','digital assets','map my business','where to start'] },
      { label: 'Skill Systems', page: 'meta-skill', href: 'meta-create-skill/index.html', keywords: ['create skill','build skill','make a skill','meta','capture','automate','skill system','authoring','new skill'] }
    ]},
    { group: 'Claude Code 101', items: [
        { label: '1 · What Claude Code Is', page: 'cc101-what', href: 'clo-course/cc101-1-what.html', keywords: ['what is claude code','chatbot','ai employee','glass box','vs code','where it lives','agentic loop','how it thinks','terminal','git','github','why claude code'] },
        { label: '2 · The Foundation', page: 'cc101-foundation', href: 'clo-course/cc101-2-foundation.html', keywords: ['tools','built-in tools','read','grep','bash','edit','write','permission','permissions','allow','deny','plan mode','modes','settings','safe'] },
        { label: '3 · Memory', page: 'cc101-memory', href: 'clo-course/cc101-3-memory.html', keywords: ['memory','claude.md','claude md','memory.md','hierarchy','rules','context window','imports','remember','routing'] },
        { label: '4 · Skills', page: 'cc101-skills', href: 'clo-course/cc101-4-skills.html', keywords: ['skill','skills','playbook','frontmatter','build your first skill','slash command','arguments','refine','follow-up','workflows','harness','harden','reliable','automatic check','quality gate'] },
        { label: '5 · Extending', page: 'cc101-extending', href: 'clo-course/cc101-5-extending.html', keywords: ['sub-agents','subagents','agents','parallel','mcp','connections','notion','extend'] },
        { label: '6 · Hooks', page: 'cc101-hooks', href: 'clo-course/cc101-6-hooks.html', keywords: ['hooks','automatic','automation','autopilot','lifecycle','sequence diagram','events','stop','quality gate','pretooluse','posttooluse','sessionstart','sessionend','triggers','reactions'] },
        { label: '7 · The Whole Picture', page: 'cc101-whole', href: 'clo-course/cc101-7-whole-picture.html', keywords: ['lifecycle','everything in action','network','quick reference','cheat sheet','best practices','whole picture'] },
        { label: 'All-in-one page (reference)', page: 'claude-code-101', href: 'clo-course/claude-code-101.html', keywords: ['overview','anatomy','ai employee','building blocks','fundamentals','basics','plain english','all in one','reference'] }
      ]},
      { group: 'Reference', items: [
        { label: 'Prompts & cheat sheet', page: 'prompts', href: 'clo-course/prompts.html', keywords: ['prompt','prompts','copy paste','cheat sheet','when do i','appendix','every skill','workflow','tune up','keep sharp','harden','eval','what do i type','say to claude'] }
      ]},
      // ── Skill Library = the FULL ACCESS tier (the `community` tier in the gated MCP's
      //    skills manifest: write chain, copywriter, excali-graphic, brand tools…).
      //    Everyone SEES this group — that is the point of the collapse. What they can
      //    RUN is decided by the MCP off their Lemon Squeezy product ID, so these pages
      //    carry an "Unlock with Full Access" CTA rather than being hidden from the nav.
      //    Keywords deliberately avoid entitlement words ('included', 'what you get') so
      //    ⌘K doesn't answer "what do I get" with a page of things you may not own yet.
      //    When a skill course is built, swap its placeholder href (anchor on the library
      //    page) for its real page + give it a `page` key so it highlights as active.
      { group: 'Skill Library', items: [
        { label: 'Overview', page: 'skill-library', href: 'clo-course/skill-library.html', keywords: ['skill library','skills','library','full access','upgrade','premium','newsletter','youtube','carousel','copywriter'] },
        { label: 'Newsletter', href: 'clo-course/skill-library.html#newsletter', keywords: ['write','newsletter','writing chain','voice','email','substack'] },
        { label: 'YouTube', href: 'clo-course/skill-library.html#youtube', keywords: ['youtube','video','titles','thumbnails','hooks','scripts','channel'] },
        { label: 'Carousel', href: 'clo-course/skill-library.html#carousel', keywords: ['carousel','slides','instagram','visual','svg','charts'] },
        { label: 'Copywriter', href: 'clo-course/skill-library.html#copywriter', keywords: ['copywriter','campaign','offer','sales','emails','vsl','bullets'] },
        { label: 'Skill Releases', page: 'skill-releases', href: 'clo-course/skill-releases.html', keywords: ['release','status','planned','in progress','request','vote','upcoming','feature request','coming soon','skill roadmap'] }
      ]}
  ]
};

// Both legacy product keys resolve to the ONE config — see the cache warning at the
// top of this file. `?product=aieb` and `?product=clo` now land on the same portal.
window.CLO_PRODUCTS = { clo: CLO_CONFIG, aieb: CLO_CONFIG };
// Preferred handle for new code.
window.CLO_PRODUCT = CLO_CONFIG;

/* ============================================================
   CLO_LESSON_INDEX — every course's lessons, so ⌘K search surfaces ANY
   lesson from ANY page (not just the current course). hrefs ROOT-relative;
   clicking a lesson on another course navigates to its page #<lessonId>,
   which the shell honors on load. Keep in sync with each course page's
   own LESSONS array (these are the searchable titles, by course).
   ============================================================ */
window.CLO_LESSON_INDEX = [
  { page: 'business-x-ray', label: 'Business X-Ray', href: 'clo-course/business-x-ray.html', lessons: [
    { id: 'welcome', group: 'Getting Started', name: 'Welcome' },
    { id: 'setup', group: 'Getting Started', name: 'Set Up the Skill' },
    { id: 'why-map', group: 'The Methodology', name: 'Why Map Your Business' },
    { id: 'biz-map', group: 'The Methodology', name: 'The Business Map' },
    { id: 'bowtie', group: 'The Methodology', name: 'Bow-Tie Funnel' },
    { id: 'level3', group: 'The Methodology', name: '3-Level Drill Down' },
    { id: 'annotations', group: 'The Methodology', name: 'Annotation System' },
    { id: 'swimlanes', group: 'The Methodology', name: 'Process Swim Lanes' },
    { id: 'assets', group: 'The Methodology', name: '24 Digital Assets' },
    { id: 'asset-map', group: 'The Methodology', name: 'Asset Explorer' },
    { id: 'roadmap', group: 'The Methodology', name: 'The Roadmap' },
    { id: 'synthesis', group: 'The Methodology', name: 'Putting It All Together' },
    { id: 'prompts', group: 'Run Your X-Ray', name: 'Key Prompts' },
    { id: 'assets-score', group: 'Run Your X-Ray', name: 'Reading Your Scorecard' },
    { id: 'ready', group: 'Run Your X-Ray', name: "You're Ready" },
    { id: 'next-step', group: 'Run Your X-Ray', name: 'Your Next Step' },
    { id: 'workshop-xray', group: 'Workshop Replays', name: 'Day 1 — Business X-Ray' },
    { id: 'workshop-assets', group: 'Workshop Replays', name: 'Day 2 — Digital Assets' }
  ]},
  { page: 'claude-code-101', label: 'Claude Code 101', href: 'clo-course/claude-code-101.html', lessons: [
    { id: 'anatomy', group: 'Overview', name: 'The AI Employee (anatomy)' },
    { id: 'big-idea', group: 'Overview', name: 'You employ it, not chat with it' },
    { id: 'how-it-thinks', group: 'Overview', name: 'How it thinks — the loop & permissions' },
    { id: 'memory', group: 'The Parts', name: 'Memory — the brain' },
    { id: 'routing', group: 'The Parts', name: 'Routing — the map' },
    { id: 'skills', group: 'The Parts', name: 'Skills — the tools' },
    { id: 'harness', group: 'The Parts', name: 'Harness — the belt' },
    { id: 'connections', group: 'The Parts', name: 'Connections — MCP' },
    { id: 'agents', group: 'The Parts', name: 'Agents — the helpers' },
    { id: 'hooks', group: 'The Parts', name: 'Hooks — reflexes' },
    { id: 'commands', group: 'The Parts', name: 'Commands & Routines' },
    { id: 'lifecycle', group: 'The Whole Picture', name: 'How it all fits together' },
    { id: 'cheatsheet', group: 'The Whole Picture', name: 'Cheat sheet & best practices' }
  ]},
  { page: 'meta-skill', label: 'Skill Systems', href: 'meta-create-skill/index.html', lessons: [
    { id: 'welcome', group: 'Orientation', name: "Welcome & What You'll Build" },
    { id: 'what-is-skill', group: 'Orientation', name: 'What Is a Skill?' },
    { id: 'comparison', group: 'Orientation', name: 'Foundational vs Production' },
    { id: 'prereq', group: 'Install the Skill', name: 'Prerequisites & Two Paths' },
    { id: 'install-cc', group: 'Install the Skill', name: 'Install on Claude Code' },
    { id: 'install-web', group: 'Install the Skill', name: 'Install on Claude.ai' },
    { id: 'anatomy', group: 'Core Teaching', name: 'Skill Anatomy' },
    { id: 'disclosure', group: 'Core Teaching', name: 'Progressive Disclosure' },
    { id: 'types', group: 'Core Teaching', name: 'The Three Skill Types' },
    { id: 'decision', group: 'Core Teaching', name: 'Workflow vs Standalone' },
    { id: 'chain', group: 'Core Teaching', name: 'How Skills Chain' },
    { id: 'progression', group: 'Core Teaching', name: 'From Skill to Library' },
    { id: 'desc', group: 'Core Teaching', name: 'Descriptions That Trigger' },
    { id: 'improve', group: 'Core Teaching', name: 'Iterative Improvement' },
    { id: 'pin-output', group: 'Ship It', name: 'Pin the Output First' },
    { id: 'frameworks', group: 'Ship It', name: 'Frameworks & Thinking Methods' },
    { id: 'first-skill', group: 'Ship It', name: 'Your First Skill' },
    { id: 'ship', group: 'Ship It', name: 'Validate, Test, Ship' },
    { id: 'frontmatter-lab', group: 'Reference', name: 'YAML Builder Lab' }
  ]},
  { page: 'cc101-what', label: 'Claude Code 101 · What Claude Code Is', href: 'clo-course/cc101-1-what.html', lessons: [
    { id: 'watch', group: '1 · What Claude Code Is', name: 'Watch first: what Claude Code is' },
    { id: 'problem', group: '1 · What Claude Code Is', name: 'The problem with a chat box' },
    { id: 'employee', group: '1 · What Claude Code Is', name: 'You employ it, not chat with it' },
    { id: 'why', group: '1 · What Claude Code Is', name: 'Why Claude Code, not just Claude.ai' },
    { id: 'where', group: '1 · What Claude Code Is', name: 'Where it lives, and why VS Code' },
    { id: 'loop', group: '1 · What Claude Code Is', name: 'How it thinks (the loop)' }
  ]},
  { page: 'cc101-foundation', label: 'Claude Code 101 · The Foundation', href: 'clo-course/cc101-2-foundation.html', lessons: [
    { id: 'tools', group: '2 · The Foundation', name: 'The built-in tools' },
    { id: 'permissions', group: '2 · The Foundation', name: 'The permission system' }
  ]},
  { page: 'cc101-memory', label: 'Claude Code 101 · Memory', href: 'clo-course/cc101-3-memory.html', lessons: [
    { id: 'claude-md', group: '3 · Memory', name: 'CLAUDE.md, the most important file' },
    { id: 'memory-file', group: '3 · Memory', name: 'Memory remembers who you are' },
    { id: 'hierarchy', group: '3 · Memory', name: 'The memory hierarchy' },
    { id: 'context', group: '3 · Memory', name: 'The context window' }
  ]},
  { page: 'cc101-skills', label: 'Claude Code 101 · Skills', href: 'clo-course/cc101-4-skills.html', lessons: [
    { id: 'what', group: '4 · Skills', name: 'A skill is a playbook' },
    { id: 'trigger', group: '4 · Skills', name: 'How a skill gets used' },
    { id: 'build', group: '4 · Skills', name: 'Build your first skill' },
    { id: 'refine', group: '4 · Skills', name: 'Refining is normal' },
    { id: 'harness', group: '4 · Skills', name: 'Make it reliable, add a harness' }
  ]},
  { page: 'cc101-extending', label: 'Claude Code 101 · Extending', href: 'clo-course/cc101-5-extending.html', lessons: [
    { id: 'subagents', group: '5 · Extending', name: 'Sub-agents, helpers with their own desk' },
    { id: 'parallel', group: '5 · Extending', name: 'Run several at once' },
    { id: 'mcp', group: '5 · Extending', name: 'Connections (MCP)' }
  ]},
  { page: 'cc101-hooks', label: 'Claude Code 101 · Hooks', href: 'clo-course/cc101-6-hooks.html', lessons: [
    { id: 'what', group: '6 · Hooks', name: 'What a hook is' },
    { id: 'lifecycle', group: '6 · Hooks', name: 'The complete lifecycle (interactive)' }
  ]},
  { page: 'cc101-whole', label: 'Claude Code 101 · The Whole Picture', href: 'clo-course/cc101-7-whole-picture.html', lessons: [
    { id: 'lifecycle', group: '6 · The Whole Picture', name: 'How it all fits together' },
    { id: 'in-action', group: '6 · The Whole Picture', name: 'Everything in action' },
    { id: 'network', group: '6 · The Whole Picture', name: 'You at the top' },
    { id: 'cheatsheet', group: '6 · The Whole Picture', name: 'Quick reference and best practices' }
  ]}
];

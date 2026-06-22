/* ============================================================
   nav.js — portal config manifest (single source of truth for nav + gate)
   Ported verbatim from the old index.html PRODUCTS block, PLUS a grouped
   `nav` taxonomy per product for the Claude-Docs-style left sidebar.
   Switched by ?product= (default: clo). Consumed by shell.js.
   ============================================================ */
window.CLO_PRODUCTS = {
  clo: {
    brand: 'Chief Leverage Officer',
    title: 'Chief Leverage Officer — Wiki',
    storageKey: 'clo_community_license',
    pluginName: 'clo-community',
    license: { store_id: 10600, product_id: 926993, variant_id: 1457440 },
    checkout_url: 'https://chiefleverageofficer.lemonsqueezy.com/checkout/buy/14c15890-c46a-4ab8-ab8d-9e56cd04d38a',
    community: { url: 'clo-community/', label: '← Community', external: false },
    // quick-start checklist shown in the bottom-right onboarding widget. hrefs ROOT-relative.
    onboarding: [
      { label: 'Join the community', href: 'clo-community/', hint: 'Meet the other builders on Polynet' },
      { label: 'Get access & install', href: 'clo-course/get-access.html', hint: 'Set up Claude Code + the plugin' },
      { label: 'Run your Business X-Ray', href: 'clo-course/business-x-ray.html', hint: 'Map your business, find the bottleneck' },
      { label: 'Build your first Skill System', href: 'meta-create-skill/index.html', hint: 'Ship a skill that chains' }
    ],
    // grouped left-sidebar nav. `page` matches each page's <body data-page>. hrefs are ROOT-relative.
    nav: [
      { group: 'Get Started', items: [
        { label: 'Portal Home', page: 'home', href: 'clo-course/index.html', keywords: ['start','overview','welcome','toolkit','dashboard'] },
        { label: 'Get Access', page: 'get-access', href: 'clo-course/get-access.html', keywords: ['install','setup','claude code','plugin','license','activate','skillstack','onboard','marketplace','getting started','first steps'] },
        { label: 'Roadmap', page: 'roadmap', href: 'clo-course/ai-employee-roadmap.html', keywords: ['roadmap','whats next','next step','journey','path','harness','agent','command','routine','what to build next','continue building','ai employee roadmap'] }
      ]},
      { group: 'Courses', items: [
        { label: 'Business X-Ray', page: 'business-x-ray', href: 'clo-course/business-x-ray.html', keywords: ['audit','diagnose','bottleneck','business map','bow-tie','funnel','swimlanes','process','assets','asset explorer','score','operating system','digital assets','map my business','where to start'] },
        { label: 'Claude Code 101', page: 'claude-code-101', href: 'clo-course/claude-code-101.html', keywords: ['fundamentals','basics','tools','skills','agents','hooks','mcp','terminal','commands','slash commands','subagents','context','memory','getting started'] },
        { label: 'Skill Systems', page: 'meta-skill', href: 'meta-create-skill/index.html', keywords: ['create skill','build skill','make a skill','meta','capture','automate','skill system','authoring','new skill'] }
      ]},
      // ── Premium section: CLO-only. AIEB never gets this block, so it stays the base tier.
      //    When a skill course is built, swap its placeholder href (anchor on the library page)
      //    for its real page + give it a `page` key so it highlights as active.
      { group: 'Skill Library', items: [
        { label: 'Overview', page: 'skill-library', href: 'clo-course/skill-library.html', keywords: ['skill library','skills','premium','library','included','pro','what you get','newsletter','youtube','carousel','copywriter'] },
        { label: 'Newsletter', href: 'clo-course/skill-library.html#newsletter', keywords: ['write','newsletter','writing chain','voice','email','substack'] },
        { label: 'YouTube', href: 'clo-course/skill-library.html#youtube', keywords: ['youtube','video','titles','thumbnails','hooks','scripts','channel'] },
        { label: 'Carousel', href: 'clo-course/skill-library.html#carousel', keywords: ['carousel','slides','instagram','visual','svg','charts'] },
        { label: 'Copywriter', href: 'clo-course/skill-library.html#copywriter', keywords: ['copywriter','campaign','offer','sales','emails','vsl','bullets'] },
        { label: 'Skill Releases', page: 'skill-releases', href: 'clo-course/skill-releases.html', keywords: ['release','status','planned','in progress','request','vote','upcoming','feature request','coming soon','skill roadmap'] }
      ]}
    ]
  },
  aieb: {
    brand: 'Chief Leverage Officer',
    title: 'Chief Leverage Officer — AI Employee Builder',
    tierBadge: { label: 'AI Employee Builder', star: false },
    storageKey: 'aieb_license',
    pluginName: 'ai-employee-builder',
    // TODO: fill AIEB's real Lemon Squeezy IDs before re-enabling the license gate
    license: { store_id: 0, product_id: 0, variant_id: 0 },
    checkout_url: 'https://www.polynet.ai/c/ai-employee-builders',
    community: { url: 'https://www.polynet.ai/c/ai-employee-builders', label: 'Community ↗', external: true },
    onboarding: [
      { label: 'Join the community', href: 'https://www.polynet.ai/c/ai-employee-builders', hint: 'Meet the other builders' },
      { label: 'Get access & install', href: 'clo-course/get-access-aieb.html', hint: 'Set up Claude Code + the plugin' },
      { label: 'Run your Business X-Ray', href: 'clo-course/business-x-ray.html', hint: 'Find your highest-leverage build' },
      { label: 'Build your first Skill System', href: 'meta-create-skill/index.html', hint: 'Ship a skill that chains' }
    ],
    nav: [
      { group: 'Get Started', items: [
        { label: 'Portal Home', page: 'home', href: 'clo-course/index.html', keywords: ['start','overview','welcome','toolkit','dashboard'] },
        { label: 'Get Access', page: 'get-access', href: 'clo-course/get-access-aieb.html', keywords: ['install','setup','claude code','plugin','license','activate','skillstack','onboard','getting started','first steps'] },
        { label: 'Roadmap', page: 'roadmap', href: 'clo-course/ai-employee-roadmap.html', keywords: ['roadmap','whats next','next step','journey','path','harness','agent','command','routine','what to build next','continue building','ai employee roadmap'] }
      ]},
      { group: 'Courses', items: [
        { label: 'Claude Code 101', page: 'claude-code-101', href: 'clo-course/claude-code-101.html', keywords: ['fundamentals','basics','tools','skills','agents','hooks','mcp','terminal','commands','subagents'] },
        { label: 'Business X-Ray', page: 'business-x-ray', href: 'clo-course/business-x-ray.html', keywords: ['audit','diagnose','bottleneck','business map','bow-tie','swimlanes','process','assets','score','operating system'] },
        { label: 'Skill Systems', page: 'meta-skill', href: 'meta-create-skill/index.html', keywords: ['create skill','build skill','meta','capture','automate','skill system','authoring'] }
      ]}
    ]
  }
};

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
  ]}
];

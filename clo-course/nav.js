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
    tierBadge: { label: 'Full Access', star: true },
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
        { label: 'Get Access', page: 'get-access', href: 'clo-course/get-access.html', keywords: ['install','setup','claude code','plugin','license','activate','skillstack','onboard','marketplace','getting started','first steps'] }
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
        { label: 'Roadmap', page: 'roadmap', href: 'clo-course/roadmap.html', keywords: ['release','status','planned','in progress','request','vote','upcoming','feature request','whats next','coming soon'] }
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
      { label: 'Get access & install', href: 'aieb-course/get-access.html', hint: 'Set up Claude Code + the plugin' },
      { label: 'Run your Business X-Ray', href: 'clo-course/business-x-ray.html', hint: 'Find your highest-leverage build' },
      { label: 'Build your first Skill System', href: 'meta-create-skill/index.html', hint: 'Ship a skill that chains' }
    ],
    nav: [
      { group: 'Get Started', items: [
        { label: 'Portal Home', page: 'home', href: 'clo-course/index.html', keywords: ['start','overview','welcome','toolkit','dashboard'] },
        { label: 'Get Access', page: 'get-access', href: 'aieb-course/get-access.html', keywords: ['install','setup','claude code','plugin','license','activate','skillstack','onboard','getting started','first steps'] }
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
    { id: 'setup', group: 'Get Set Up', name: 'Install & Setup' },
    { id: 'basics-terminal', group: 'Start Here', name: 'Terminal' },
    { id: 'basics-git', group: 'Start Here', name: 'GitHub & Git' },
    { id: 'intro', group: 'What Claude Code Is', name: 'What Is Claude Code?' },
    { id: 'environments', group: 'What Claude Code Is', name: 'Where It Lives' },
    { id: 'agentic-loop', group: 'What Claude Code Is', name: 'How It Thinks' },
    { id: 'tools', group: 'Built-in Foundation', name: 'Built-in Tools' },
    { id: 'permissions', group: 'Built-in Foundation', name: 'Permission System' },
    { id: 'claude-md', group: 'Memory', name: 'CLAUDE.md' },
    { id: 'memory-hierarchy', group: 'Memory', name: 'Memory Hierarchy' },
    { id: 'context', group: 'Memory', name: 'Context Window' },
    { id: 'skills-intro', group: 'Skills', name: 'What Is a Skill?' },
    { id: 'skill-invocation', group: 'Skills', name: 'How Skills Trigger' },
    { id: 'first-skill', group: 'Skills', name: 'Build Your First Skill' },
    { id: 'skill-builder', group: 'Skills', name: 'Skill Builder' },
    { id: 'skill-deep-dive', group: 'Skills', name: 'Skill Deep Dive' },
    { id: 'skill-routing', group: 'Skills', name: 'Routing & Scaling' },
    { id: 'subagents', group: 'Extending', name: 'Sub-Agents' },
    { id: 'mcp', group: 'Extending', name: 'MCP Connections' },
    { id: 'hooks', group: 'Extending', name: 'Hooks' },
    { id: 'lifecycle', group: 'Complete Picture', name: 'Full Lifecycle' },
    { id: 'in-action', group: 'Complete Picture', name: 'Everything in Action' },
    { id: 'reference', group: 'Complete Picture', name: 'Quick Reference' }
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

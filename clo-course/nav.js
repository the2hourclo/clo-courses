/* ============================================================
   nav.js — portal config manifest (single source of truth for nav + gate)
   Ported verbatim from the old index.html PRODUCTS block, PLUS a grouped
   `nav` taxonomy per product for the Claude-Docs-style left sidebar.
   Switched by ?product= (default: clo). Consumed by shell.js.
   ============================================================ */
window.CLO_PRODUCTS = {
  clo: {
    brand: 'Chief Leverage Officer',
    title: 'Chief Leverage Officer — Course Portal',
    storageKey: 'clo_community_license',
    pluginName: 'clo-community',
    license: { store_id: 10600, product_id: 926993, variant_id: 1457440 },
    checkout_url: 'https://chiefleverageofficer.lemonsqueezy.com/checkout/buy/14c15890-c46a-4ab8-ab8d-9e56cd04d38a',
    community: { url: 'clo-community/', label: '← Community', external: false },
    // grouped left-sidebar nav. `page` matches each page's <body data-page>. hrefs are ROOT-relative.
    nav: [
      { group: 'Get Started', items: [
        { label: 'Portal Home', page: 'home', href: 'clo-course/index.html', keywords: ['start','overview','welcome','toolkit','dashboard'] },
        { label: 'Get Access', page: 'get-access', href: 'clo-course/get-access.html', keywords: ['install','setup','claude code','plugin','license','activate','skillstack','onboard','marketplace','getting started','first steps'] }
      ]},
      { group: 'Courses', items: [
        { label: 'Business X-Ray', page: 'business-x-ray', href: 'clo-course/business-x-ray.html', keywords: ['audit','diagnose','bottleneck','business map','bow-tie','funnel','swimlanes','process','assets','asset explorer','score','operating system','digital assets','map my business','where to start'] },
        { label: 'Claude Code 101', page: 'claude-code-101', href: 'clo-course/claude-code-101.html', keywords: ['fundamentals','basics','tools','skills','agents','hooks','mcp','terminal','commands','slash commands','subagents','context','memory','getting started'] },
        { label: 'Meta Skill', page: 'meta-skill', href: 'meta-create-skill/index.html', keywords: ['create skill','build skill','make a skill','meta','capture','automate','skill system','authoring','new skill'] }
      ]},
      { group: 'Resources', items: [
        { label: 'Roadmap', page: 'roadmap', href: 'clo-course/roadmap.html', keywords: ['release','status','planned','in progress','request','vote','upcoming','feature request','whats next','coming soon'] }
      ]}
    ]
  },
  aieb: {
    brand: 'AI Employee Builder',
    title: 'AI Employee Builder — Course Portal',
    storageKey: 'aieb_license',
    pluginName: 'ai-employee-builder',
    // TODO: fill AIEB's real Lemon Squeezy IDs before re-enabling the license gate
    license: { store_id: 0, product_id: 0, variant_id: 0 },
    checkout_url: 'https://www.polynet.ai/c/ai-employee-builders',
    community: { url: 'https://www.polynet.ai/c/ai-employee-builders', label: 'Community ↗', external: true },
    nav: [
      { group: 'Get Started', items: [
        { label: 'Portal Home', page: 'home', href: 'clo-course/index.html', keywords: ['start','overview','welcome','toolkit','dashboard'] },
        { label: 'Get Access', page: 'get-access', href: 'aieb-course/get-access.html', keywords: ['install','setup','claude code','plugin','license','activate','skillstack','onboard','getting started','first steps'] }
      ]},
      { group: 'Courses', items: [
        { label: 'Claude Code 101', page: 'claude-code-101', href: 'clo-course/claude-code-101.html', keywords: ['fundamentals','basics','tools','skills','agents','hooks','mcp','terminal','commands','subagents'] },
        { label: 'Business X-Ray', page: 'business-x-ray', href: 'clo-course/business-x-ray.html', keywords: ['audit','diagnose','bottleneck','business map','bow-tie','swimlanes','process','assets','score','operating system'] },
        { label: 'Meta Skill', page: 'meta-skill', href: 'meta-create-skill/index.html', keywords: ['create skill','build skill','meta','capture','automate','skill system','authoring'] }
      ]}
    ]
  }
};

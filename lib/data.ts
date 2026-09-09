/**
 * Content model for the whole site.
 *
 * Every page reads from here so copy, ordering and metadata can be swapped
 * for a CMS later without touching a single component.
 */

/* -------------------------------------------------------------------- */
/*  Projects                                                             */
/* -------------------------------------------------------------------- */

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  intro: string;
  year: string;
  role: string;
  services: string[];
  /** Vector artwork key rendered by <ProjectArt />. */
  art: "archin" | "vntnr" | "aeorim";
  scope: string;
  date: string;
  chapters: { title: string; body: string[] }[];
  review: { quote: string; author: string; role: string };
};

export const projects: Project[] = [
  {
    slug: "archin",
    name: "Archin",
    tagline: "Archin Design Studio",
    intro:
      "We partner with businesses across industries to help them reach their goals. Here is a closer look at some of our selected work.",
    year: "2025",
    role: "Lead Designer",
    services: ["Website Design", "Product Design", "Branding", "Development"],
    art: "archin",
    scope: "Website Design, Branding",
    date: "30th May 2025",
    chapters: [
      {
        title: "Discovery & Strategy",
        body: [
          "We opened with a deep discovery sprint: a brand audit, a competitive sweep of the studio's field, and a pair of working sessions with the founders. What surfaced was a wish for something calm and structured — an identity that reads the way their buildings do.",
          "From there we set the tone: quiet, precise, unmistakably architectural. We mapped three creative directions rooted in drafting geometry, timeless type and a grounded earth palette, then chose the one that gave the brand the most room to grow.",
        ],
      },
      {
        title: "Creation & Deliverables",
        body: [
          "Branding stayed deliberately restrained. A minimal logomark borrows from drafting notation, the custom logotype signals precision, and the wider system leans on generous white space, a strict grid and neutral tones.",
          "We shipped a full kit at handover: logo suite, guidelines, stationery and editable source files for social and pitch decks. The website came with documentation and a training session so the team could keep building on their own.",
        ],
      },
    ],
    review: {
      quote:
        "LLW took a loose set of ideas and returned a brand that finally looks like the studio we actually are.",
      author: "Aditya Menon",
      role: "Founder, Archin Design Studio",
    },
  },
  {
    slug: "vntnr",
    name: "VNTNR",
    tagline: "VNTNR Wine Merchant",
    intro:
      "We have partnered with businesses across various industries to help them achieve their goals.",
    year: "2018",
    role: "Logo Designer",
    services: ["Designing", "Branding", "Redesigning", "Development"],
    art: "vntnr",
    scope: "Logo Design, Branding",
    date: "12th November 2018",
    chapters: [
      {
        title: "Discovery & Strategy",
        body: [
          "VNTNR arrived with a strong catalogue and a shop front that undersold it. Our first job was to work out what the merchant stood for beyond the bottles: provenance, patience and a refusal to talk down to the customer.",
          "We built the strategy around a single idea — the label should feel like the cellar. Warm, dim, tactile. That informed the type, the crop of every photograph and the pacing of the storefront.",
        ],
      },
      {
        title: "Creation & Deliverables",
        body: [
          "The wordmark is set in an extended grotesque with a registered mark tucked at the shoulder, so it holds up printed small on a neck label and blown up across a landing page.",
          "Deliverables covered the mark, label system, packaging templates and a commerce front-end with a subscription flow, all handed over with a living style guide.",
        ],
      },
    ],
    review: {
      quote:
        "The mark works everywhere — on a bottle, on a tote, on a billboard. That consistency changed how people read us.",
      author: "Marta Iversen",
      role: "Founder, VNTNR",
    },
  },
  {
    slug: "aeorim",
    name: "Aeorim",
    tagline: "Aeorim Studio",
    intro:
      "We have collaborated with companies from diverse sectors to turn their visions into reality. Here is a look at some of our featured work.",
    year: "2023",
    role: "Website Designer",
    services: ["Branding", "Revamp", "Development", "Designing"],
    art: "aeorim",
    scope: "Website Revamp, Branding",
    date: "8th August 2023",
    chapters: [
      {
        title: "Discovery & Strategy",
        body: [
          "Aeorim had outgrown a site built for a much smaller company. We audited every template, cut the page count by half and rebuilt the information architecture around the two journeys that actually converted.",
          "A short research phase with their sales team told us what buyers really asked for. Those questions became the spine of the new narrative.",
        ],
      },
      {
        title: "Creation & Deliverables",
        body: [
          "The revamp introduced a modular section library, so marketing can assemble a new page in an afternoon without a designer in the loop.",
          "We handed over the component set, a motion specification and a performance budget, alongside a rebuilt brand palette tuned for contrast on dark surfaces.",
        ],
      },
    ],
    review: {
      quote:
        "Half the pages, twice the pipeline. The new system pays for itself every time we launch something.",
      author: "Priya Raman",
      role: "Head of Growth, Aeorim",
    },
  },
];

export const getProject = (slug: string) =>
  projects.find((project) => project.slug === slug);

export const getNextProject = (slug: string) => {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
};

/* -------------------------------------------------------------------- */
/*  Services                                                             */
/* -------------------------------------------------------------------- */

export type Service = {
  title: string;
  tags: string[];
  copy: string;
  price: string;
  timeline: string;
  art: "web" | "fix" | "seo" | "cms";
};

export const services: Service[] = [
  {
    title: "Website Development",
    tags: ["Next.js & React", "Responsive Build", "Domain & Deploy"],
    copy: "A website built from scratch — structure, design, code and launch. Fast, mobile-first and yours to own, with no page-builder lock-in.",
    price: "$249",
    timeline: "2 – 4 Weeks",
    art: "web",
  },
  {
    title: "Fixes & Maintenance",
    tags: ["Bug Fixing", "Broken Layouts", "Ongoing Care"],
    copy: "Something broken, slow or throwing errors? We diagnose it, fix it and tell you plainly what went wrong — then keep it healthy month to month.",
    price: "$39",
    timeline: "1 – 3 Days",
    art: "fix",
  },
  {
    title: "SEO & Performance",
    tags: ["Technical SEO", "Core Web Vitals", "Schema & Sitemaps"],
    copy: "Rankings follow the fundamentals: clean markup, fast pages, correct metadata. We fix all three and hand you a before/after report.",
    price: "$99",
    timeline: "1 – 2 Weeks",
    art: "seo",
  },
  {
    title: "WordPress & Shopify",
    tags: ["Theme Customisation", "Ecommerce", "Migrations"],
    copy: "CMS and store work done carefully — custom sections, product pages, checkout tweaks and migrations that do not break what already works.",
    price: "$149",
    timeline: "1 – 3 Weeks",
    art: "cms",
  },
];

/* -------------------------------------------------------------------- */
/*  Testimonials                                                         */
/* -------------------------------------------------------------------- */

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  initials: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Our old site broke every second week. LLW rebuilt it in three weeks and it has not gone down since.",
    author: "Rohan Deshpande",
    role: "Co-founder, NovaTech",
    initials: "Rohan Deshpande",
  },
  {
    quote:
      "They fixed a checkout bug two agencies had given up on — and it took them a single day.",
    author: "Ananya Iyer",
    role: "Creative Director, Bloom Agency",
    initials: "Ananya Iyer",
  },
  {
    quote:
      "The SEO pass moved us onto page one for our main keyword in under two months. Worth every rupee.",
    author: "Karthik Nair",
    role: "Product Manager, Hexa Studio",
    initials: "Karthik Nair",
  },
];

export type Stat = {
  value: number;
  label: string;
  /** Rendered before/after the counted value, e.g. $1M or 98%. */
  prefix?: string;
  suffix?: string;
};

export const stats: Stat[] = [
  { value: 120, suffix: "+", label: "Projects Delivered" },
  { value: 98, suffix: "%", label: "Client satisfaction rate" },
  { value: 24, suffix: "h", label: "Average first reply" },
];

/* -------------------------------------------------------------------- */
/*  Founder timeline                                                     */
/* -------------------------------------------------------------------- */

export const timeline = [
  { role: "Full-stack web, SEO & maintenance studio", period: "2024-Now" },
  { role: "SEO and performance practice added", period: "2023-2024" },
  { role: "Ecommerce, WordPress and Shopify builds", period: "2018-2023" },
  { role: "LLW founded", period: "2015-2018" },
] as const;

/* -------------------------------------------------------------------- */
/*  Awards                                                               */
/* -------------------------------------------------------------------- */

export const awards = [
  { org: "Awwwards", title: "SOTY 2023 — 1st Winner", project: "Archin" },
  {
    org: "CSS Awards",
    title: "Top 5 Best of eCommerce Websites 2023",
    project: "VNTNR",
  },
  {
    org: "CSS Awards",
    title: "Winner — US Behance Portfolio Review 2024",
    project: "Aeorim",
  },
  {
    org: "Dribble",
    title: "Top 10 Best of Mobile App Design 2024",
    project: "Swat Co.",
  },
  {
    org: "FWA Awards",
    title: "Winner — Best of Architecture Website 2025",
    project: "Unerio",
  },
] as const;

/* -------------------------------------------------------------------- */
/*  Pricing                                                              */
/* -------------------------------------------------------------------- */

export type Plan = {
  name: string;
  copy: string;
  delivery: string;
  priceLabel?: string;
  price: string;
  cadence?: string;
  features: string[];
  featured?: boolean;
};

export const plans: Plan[] = [
  {
    name: "Quick Fix",
    copy: "For one specific problem — a broken page, a layout that collapses on mobile, an error you cannot trace. Priced per fix, not per hour.",
    delivery: "1-3 days",
    priceLabel: "From",
    price: "$39",
    features: [
      "One bug, error or broken layout fixed",
      "Root cause explained in plain English",
      "Re-tested on mobile, tablet and desktop",
      "100% money-back guarantee",
    ],
  },
  {
    name: "Launch Plan",
    copy: "A complete website built from scratch — structure, design, code, content wiring and go-live. The plan most new clients start on.",
    delivery: "2-4 weeks",
    priceLabel: "Starting at",
    price: "$249",
    features: [
      "Up to 6 custom-designed pages",
      "Built in Next.js or WordPress — your call",
      "On-page SEO and speed pass included",
      "Domain, hosting and deployment handled",
      "30 days of free fixes after launch",
      "100% money-back guarantee",
    ],
    featured: true,
  },
  {
    name: "Growth Retainer",
    copy: "Ongoing care once you are live — SEO work, new sections, speed monitoring and a fixed number of change requests each month.",
    delivery: "Monthly",
    price: "$199",
    cadence: "/month",
    features: [
      "Unlimited small fixes and content edits",
      "Monthly technical SEO and speed report",
      "New sections and pages as you need them",
      "Priority reply, pause or cancel anytime",
      "100% money-back guarantee",
    ],
  },
];

/* -------------------------------------------------------------------- */
/*  FAQ                                                                  */
/* -------------------------------------------------------------------- */

export const faqs = [
  {
    q: "Do you only design, or do you build the website too?",
    a: "We build. Design is one step — we take a project from wireframe through to working, deployed code in Next.js, React or WordPress, connected to your domain and live.",
  },
  {
    q: "Can you fix an existing site you did not build?",
    a: "Yes, that is a large part of what we do. Send us the URL and access, and we come back the same working day with what is wrong, what it costs and how long it takes.",
  },
  {
    q: "Do you handle SEO as well?",
    a: "We handle technical SEO — clean markup, metadata, schema, sitemaps, internal linking and Core Web Vitals. You get a before/after report so you can see exactly what moved.",
  },
  {
    q: "You are on Fiverr too — should I book there or here?",
    a: "Either works, and the person doing the work is the same. Fiverr is easiest for a single scoped job with buyer protection built in. Book direct if you want a larger build, a retainer or an ongoing relationship.",
  },
  {
    q: "What if I am not satisfied with the work?",
    a: "You get your money back. We keep iterating first — every engagement includes revision rounds — but if you are still unhappy we refund you rather than hand over something you will not launch.",
  },
  {
    q: "How affordable is this really?",
    a: "Fixes start at $39 and a full custom website starts at $249. We work from Mumbai, which keeps our rates well under a Western agency rate without changing the quality of the code.",
  },
] as const;

/* -------------------------------------------------------------------- */
/*  Blog                                                                 */
/* -------------------------------------------------------------------- */

export const posts = [
  {
    title: "Bridging Design & Development",
    excerpt: "Clean UI into seamless code",
    readTime: "2 Min Read",
    art: 0,
  },
  {
    title: "High-Performance Website",
    excerpt: "Principles devs should build with",
    readTime: "3 Min Read",
    art: 1,
  },
  {
    title: "Design That Converts",
    excerpt: "Strategic visuals drive results",
    readTime: "2 Min Read",
    art: 2,
  },
  {
    title: "What Your Brand Needs",
    excerpt: "Consistency and sanity",
    readTime: "1 Min Read",
    art: 3,
  },
  {
    title: "Webflow vs. Code",
    excerpt: "Choosing the right approach",
    readTime: "3 Min Read",
    art: 4,
  },
  {
    title: "Macro Impact on Design",
    excerpt: "Designing details that elevate",
    readTime: "1 Min Read",
    art: 5,
  },
] as const;

/* -------------------------------------------------------------------- */
/*  Tools (About page)                                                   */
/* -------------------------------------------------------------------- */

export const tools = [
  {
    name: "Next.js",
    role: "Development",
    badge: "PRO",
    copy: "Our default for custom builds. Server rendering and image optimisation out of the box mean sites that score well on Core Web Vitals before we tune anything.",
  },
  {
    name: "WordPress",
    role: "CMS & Ecommerce",
    copy: "When a client needs to edit content themselves, WordPress and WooCommerce stay the pragmatic choice — customised properly, not stacked with plugins.",
  },
  {
    name: "Figma",
    role: "Design",
    copy: "Every build starts here. Layouts, components and states are agreed in Figma first, so nothing is being invented halfway through development.",
  },
] as const;

/* -------------------------------------------------------------------- */
/*  Marquee word lists                                                   */
/* -------------------------------------------------------------------- */

export const capabilityWords = [
  "Development",
  "Bug Fixing",
  "SEO",
  "WordPress",
  "Shopify",
  "Performance",
] as const;

export const trustMarquee = [
  "Website Development",
  "Bug Fixing & Maintenance",
  "SEO & Performance",
  "WordPress & Shopify",
  "Money-Back Guarantee",
  "Also on Fiverr",
] as const;

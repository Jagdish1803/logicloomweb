/**
 * Global site configuration — single source of truth for metadata,
 * navigation and contact details.
 */

export const site = {
  name: "LLW",
  title: "LLW — Web Design, Development & SEO Studio",
  description:
    "We build websites from scratch, fix the ones that are broken, and get them ranking — clean code, honest pricing and a money-back guarantee, from Mumbai.",
  url: "https://logicloomweb.com",
  locale: "en_IN",
  email: "logicloomweb@gmail.com",
  city: "Mumbai",
  country: "India",
  timeZone: "Asia/Kolkata",
} as const;

/* -------------------------------------------------------------------- */
/*  Guarantee                                                            */
/*  Rendered by <Guarantee /> in the Fiverr section and listed as a       */
/*  feature on every pricing plan.                                        */
/* -------------------------------------------------------------------- */

export const guarantee = {
  headline: "100% money-back guarantee",
  copy:
    "If you are not satisfied with the work we deliver, you get your money back — no arguments, no paperwork. We would rather refund you than hand over something you are not happy to launch.",
} as const;

/* -------------------------------------------------------------------- */
/*  Fiverr                                                               */
/*                                                                       */
/*  `profile` and both gig `url`s are the real links. What still needs    */
/*  your eye is the display copy: `title`, `price` and `delivery` on each */
/*  gig are our best guess, because Fiverr blocks automated readers so    */
/*  we could not scrape the live gig pages. Make them match the gig.      */
/*                                                                       */
/*  `sellerLevel`, `rating` and `reviewCount` are intentionally blank —   */
/*  the seller strip hides whichever of them is empty. Fill them in only  */
/*  with your real Fiverr numbers; do not invent them.                    */
/*                                                                       */
/*  To add a third or fourth gig, copy a block below and paste its URL.   */
/* -------------------------------------------------------------------- */

export type FiverrGig = {
  title: string;
  blurb: string;
  price: string;
  delivery: string;
  url: string;
};

export type Fiverr = {
  profile: string;
  /** Optional — each is hidden in the seller strip while left empty. */
  sellerLevel: string;
  rating: string;
  reviewCount: string;
  gigs: FiverrGig[];
};

export const fiverr: Fiverr = {
  profile: "https://www.fiverr.com/logicloomweb",
  sellerLevel: "",
  rating: "",
  reviewCount: "",
  gigs: [
    {
      /** TODO: replace with this gig's real title, price and delivery time. */
      title: "I will design and develop a responsive business website",
      blurb:
        "A complete website built from scratch — design, build, mobile-responsive, connected to your domain and live.",
      price: "$45",
      delivery: "5 days",
      url: "https://www.fiverr.com/s/mmx420V",
    },
    {
      /** TODO: replace with this gig's real title, price and delivery time. */
      title: "I will fix any website bug, error or broken layout",
      blurb:
        "Broken pages, plugin conflicts, PHP or JavaScript errors, layouts that fall apart on mobile — diagnosed and fixed.",
      price: "$15",
      delivery: "1 day",
      url: "https://www.fiverr.com/s/ZoB8kwp",
    },
  ],
};

export const navLinks = [
  { label: "Works", href: "/works" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
] as const;

export const footerNav = {
  navigation: [
    { label: "About", href: "/about" },
    { label: "Works", href: "/works" },
    { label: "Services", href: "/services" },
    { label: "Blog", href: "/blog" },
  ],
  social: [
    { label: "Fiverr", href: fiverr.profile },
    { label: "Twitter(X)", href: "https://x.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "Dribble", href: "https://dribbble.com" },
  ],
  legals: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Term of Service", href: "/terms-and-condition" },
  ],
} as const;

import { categories, categorySlug } from "./categories";

export const siteConfig = {
  name: "Relay",
  tagline: "Technology, reported from close range",
  title: "Relay - An editorial Astro theme for technology publications",
  description:
    "An Astro theme for technology publications: devices, tools, platforms, security, robotics, and the culture around them.",
  siteUrl: "https://relay.xocoweb.workers.dev",
  authorName: "Andrei Alba",
  email: "hello@example.com",
  language: "en",
  dateLocale: "en-US",
  /**
   * Reading speed used to estimate the "min read" line on cards and articles.
   * Read time is counted from the post body at build time, so no post carries
   * it in frontmatter. Lower it for denser, more technical writing.
   */
  wordsPerMinute: 225,
  locale: "en_US",
  socialImage: "/og-image.png",
  /** Short bio shown in the footer and under the About page header. */
  bio: "A publication about the machines we use every day — the devices, tools, and infrastructure behind them, and the people arguing about how they should work.",
  /**
   * Slugs pinned to the homepage hero slider, in slide order. Unknown or
   * drafted slugs are skipped, and any remaining slots fall back to the newest
   * posts — so leaving this empty gives you a purely chronological hero.
   */
  featuredPosts: [
    "the-foldable-finally-stopped-being-a-party-trick",
    "smartwatches-are-quietly-becoming-medical-devices",
    "what-actually-happens-when-you-press-send",
  ],
  /**
   * The byline that fronts the About page. `name` has to match an
   * `author.name` used in post frontmatter: the block links to that author's
   * archive and is skipped entirely when the name has no published posts.
   */
  editor: {
    name: "Mara Chen",
    title: "Who runs it",
    /** Shown under the byline on the About page. Falls back to a generic line. */
    bio: "Mara runs the desk and still files on devices, which is how most of the standards here got set. She spent years taking phones and wearables apart before writing about them, and it shows in the assignments she hands out: explain the constraint, name the trade-off, say who pays for it.",
  },
  newsletter: {
    enabled: false,
    action: "",
    method: "post",
    emailFieldName: "email",
    title: "The week in technology.",
    description:
      "One email every couple of weeks with new stories, field notes, and the tools worth your attention. No spam, unsubscribe anytime.",
    terms: "By subscribing you agree to our Terms of Use and Privacy Policy.",
  },
  contact: {
    enabled: false,
    action: "",
    method: "post",
    office: ["123 Release Lane", "Austin, TX 78701"],
    responseTime: "Usually within two business days.",
  },
  socials: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "TikTok", href: "https://www.tiktok.com" },
    { label: "YouTube", href: "https://www.youtube.com" },
    { label: "RSS", href: "/rss.xml" },
  ],
};

export const categoryNavigation = categories.map((category) => ({
  label: category,
  href: `/category/${categorySlug(category)}/`,
}));

/**
 * Desktop navigation. The first few categories sit inline; the rest fold into
 * a hover submenu so the bar keeps its rhythm no matter how many categories a
 * publication defines.
 */
export const primaryNavigation: {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}[] = [
  ...categoryNavigation.slice(0, 4),
  {
    label: "More",
    href: "/posts/",
    children: [
      ...categoryNavigation.slice(4),
      { label: "Authors", href: "/author/" },
      { label: "All posts", href: "/posts/" },
    ],
  },
];

export const footerNavigation = [
  {
    title: "Categories",
    links: categoryNavigation,
  },
  {
    title: "Sections",
    links: [
      { label: "All posts", href: "/posts/" },
      { label: "Authors", href: "/author/" },
      { label: "Search", href: "/search/" },
      { label: "RSS", href: "/rss.xml" },
    ],
  },
  {
    title: "Publication",
    links: [
      { label: "About", href: "/about/" },
      { label: "Contact", href: "/contact/" },
      { label: "Privacy", href: "/privacy/" },
      { label: "Sitemap", href: "/sitemap.xml" },
    ],
  },
];

export type Publication = {
  id: string;
  type: "article" | "podcast";
  title: string;
  blurb: string;
  /** ISO date, YYYY-MM-DD */
  date: string;
  href: string;
  author?: string;
};

// Placeholder entries: replace with real Substack posts and podcast episodes.
export const publications: Publication[] = [
  { id: "p1", type: "article", title: "What 'learning to code' actually means", blurb: "Notes from a semester of watching first-years fight with their first segfault.", date: "2026-01-14", href: "https://substack.com", author: "CS Society" },
  { id: "p2", type: "podcast", title: "Ep. 01 — Research without a lab", blurb: "Three students on finding a professor, a problem, and the nerve to email.", date: "2026-01-28", href: "https://substack.com" },
  { id: "p3", type: "article", title: "A field guide to open source", blurb: "Your first pull request is smaller than you think.", date: "2026-02-09", href: "https://substack.com", author: "CS Society" },
  { id: "p4", type: "podcast", title: "Ep. 02 — Hackathons, honestly", blurb: "What we built, what broke, and what we'd skip next time.", date: "2026-02-21", href: "https://substack.com" },
  { id: "p5", type: "article", title: "Cryptography for the curious", blurb: "From Caesar to elliptic curves, without the scary notation.", date: "2026-03-03", href: "https://substack.com", author: "CS Society" },
  { id: "p6", type: "article", title: "Why your side project never ships", blurb: "A short, kind post-mortem.", date: "2026-03-18", href: "https://substack.com", author: "CS Society" },
  { id: "p7", type: "podcast", title: "Ep. 03 — Internships, decoded", blurb: "Seniors walk through applications, rejections, and the offers that stuck.", date: "2026-04-06", href: "https://substack.com" },
  { id: "p8", type: "article", title: "Autumn of Code: a retrospective", blurb: "Forty students, six weeks, a lot of merged PRs.", date: "2026-04-22", href: "https://substack.com", author: "CS Society" },
  { id: "p9", type: "podcast", title: "Ep. 04 — AI and the humanities major", blurb: "A conversation across the aisle about what these tools are for.", date: "2026-05-11", href: "https://substack.com" },
  { id: "p10", type: "article", title: "Reading a research paper in 30 minutes", blurb: "A repeatable method for skimming, then going deep.", date: "2026-06-02", href: "https://substack.com", author: "CS Society" },
  { id: "p11", type: "article", title: "Design systems for people who hate Figma", blurb: "Tokens, components, and fewer arguments.", date: "2026-08-19", href: "https://substack.com", author: "CS Society" },
  { id: "p12", type: "podcast", title: "Ep. 05 — Welcome back", blurb: "The new semester, the new team, and what's coming.", date: "2026-08-30", href: "https://substack.com" },
  { id: "p13", type: "article", title: "Notes on algorithms you'll meet again", blurb: "Five ideas that keep reappearing, in disguise.", date: "2026-09-10", href: "https://substack.com", author: "CS Society" },
  { id: "p14", type: "podcast", title: "Ep. 06 — Building the club website", blurb: "Meta episode: how this very site gets made.", date: "2026-09-25", href: "https://substack.com" },
  { id: "p15", type: "article", title: "October: what we're reading", blurb: "Papers, posts and one very long thread.", date: "2026-10-05", href: "https://substack.com", author: "CS Society" },
  { id: "p16", type: "article", title: "Winter break project ideas", blurb: "Twelve small things you can finish in a week.", date: "2025-12-04", href: "https://substack.com", author: "CS Society" },
  { id: "p17", type: "podcast", title: "Ep. 00 — Pilot", blurb: "Why we're starting a podcast at all.", date: "2025-11-15", href: "https://substack.com" },
];

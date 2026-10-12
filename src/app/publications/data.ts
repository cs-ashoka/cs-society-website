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
  { id: "p1", type: "article", title: "October: what we're reading", blurb: "Papers, posts and one very long thread.", date: "2026-10-05", href: "https://substack.com", author: "CS Society" },
  { id: "p2", type: "podcast", title: "Ep. 01 — Welcome back", blurb: "The new semester, the new team, and what's coming.", date: "2026-10-08", href: "https://substack.com" },
  { id: "p3", type: "article", title: "Notes on algorithms you'll meet again", blurb: "Five ideas that keep reappearing, in disguise.", date: "2026-10-10", href: "https://substack.com", author: "CS Society" },
];

export type Publication = {
  id: string;
  type: "article" | "podcast";
  title: string;
  blurb: string;
  /** ISO date, YYYY-MM-DD */
  date: string;
  href: string;
  author?: string;
  /** When set, the entry renders as a live Substack embed instead of a card. */
  embed?: { title: string; subtitle: string };
};

// Placeholder entries: replace with real Substack posts and podcast episodes.
export const publications: Publication[] = [
  { id: "p1", type: "article", title: "October: what we're reading", blurb: "Papers, posts and one very long thread.", date: "2026-10-05", href: "https://substack.com", author: "CS Society" },
  { id: "p2", type: "podcast", title: "Ep. 01 — Welcome back", blurb: "The new semester, the new team, and what's coming.", date: "2026-10-08", href: "https://substack.com" },
  { id: "p3", type: "article", title: "Notes on algorithms you'll meet again", blurb: "Five ideas that keep reappearing, in disguise.", date: "2026-10-10", href: "https://substack.com", author: "CS Society" },
  { id: "p4", type: "article", title: "September at CS Society: A Mixer, a Masterclass, and a Strong Start", blurb: "A look back at our first month of the semester, and what's coming next", date: "2026-10-01", href: "https://bytesized01.substack.com/p/september-at-cs-society-a-mixer-a", author: "Byte Sized Newsletter", embed: { title: "September at CS Society: A Mixer, a Masterclass, and a Strong Start by Byte Sized Newsletter", subtitle: "A look back at our first month of the semester, and what’s coming next" } },
];

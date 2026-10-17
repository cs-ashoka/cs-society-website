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

// Hand-written entries (podcasts, anything not on Substack); Substack posts come from the feed.
export const publications: Publication[] = [
  { id: "p4", type: "article", title: "September at CS Society: A Mixer, a Masterclass, and a Strong Start", blurb: "A look back at our first month of the semester, and what's coming next", date: "2026-10-01", href: "https://bytesized01.substack.com/p/september-at-cs-society-a-mixer-a", author: "Byte Sized Newsletter", embed: { title: "September at CS Society: A Mixer, a Masterclass, and a Strong Start by Byte Sized Newsletter", subtitle: "A look back at our first month of the semester, and what’s coming next" } },
];

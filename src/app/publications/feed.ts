import { publications, type Publication } from "./data";

// Set SUBSTACK_FEED_URL to point at a different publication.
const FEED_URL = process.env.SUBSTACK_FEED_URL || "https://bytesized01.substack.com/feed";

const decode = (s: string) =>
  s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'").replace(/&amp;/g, "&").trim();

const tag = (xml: string, name: string) => {
  const m = xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`));
  return m ? decode(m[1]) : "";
};

async function fetchSubstack(): Promise<Publication[]> {
  const res = await fetch(FEED_URL, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`Substack feed returned ${res.status}`);
  const xml = await res.text();
  return (xml.match(/<item>[\s\S]*?<\/item>/g) ?? []).flatMap((item): Publication[] => {
    const title = tag(item, "title");
    const href = tag(item, "link");
    const when = new Date(tag(item, "pubDate"));
    if (!title || !href || isNaN(when.getTime())) return [];
    const subtitle = tag(item, "description");
    return [{
      id: `substack-${href}`,
      type: "article",
      title,
      blurb: subtitle,
      date: when.toISOString().slice(0, 10),
      href,
      author: tag(item, "dc:creator") || undefined,
      embed: { title, subtitle },
    }];
  });
}

/** Live Substack posts, plus any hand-written entries in data.ts (podcasts, placeholders). */
export async function getPublications(): Promise<Publication[]> {
  try {
    const posts = await fetchSubstack();
    const seen = new Set(posts.map((p) => p.href));
    return [...posts, ...publications.filter((p) => !seen.has(p.href))];
  } catch {
    return publications;
  }
}

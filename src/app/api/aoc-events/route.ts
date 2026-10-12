// Feeds the Autumn of Code calendar (public/autumn-of-code/index.html) from the Notion calendar.
// Needs NOTION_TOKEN (an internal integration that has the calendar database shared with it).
// NOTION_AOC_DATABASE_ID overrides the default database below.

export const dynamic = "force-dynamic";

const DEFAULT_DATABASE_ID = "3e305d23cbe380e5844cd5012df9d4e2";
const NOTION_VERSION = "2022-06-28";

type NotionPage = {
  properties: {
    Name?: { title?: { plain_text: string }[] };
    Date?: { date?: { start: string; end: string | null } | null };
    Tags?: { multi_select?: { name: string }[] };
  };
};

export async function GET() {
  const token = process.env.NOTION_TOKEN;
  if (!token) {
    return Response.json({ error: "NOTION_TOKEN is not set" }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
  const databaseId = process.env.NOTION_AOC_DATABASE_ID || DEFAULT_DATABASE_ID;

  try {
    const pages: NotionPage[] = [];
    let cursor: string | undefined;
    do {
      const res = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Notion-Version": NOTION_VERSION,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          page_size: 100,
          start_cursor: cursor,
          sorts: [{ property: "Date", direction: "ascending" }],
        }),
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`Notion responded ${res.status}`);
      const data = await res.json();
      pages.push(...data.results);
      cursor = data.has_more ? data.next_cursor : undefined;
    } while (cursor);

    const events = pages
      .map((p) => {
        const date = p.properties.Date?.date;
        return {
          name: (p.properties.Name?.title ?? []).map((t) => t.plain_text).join("").trim(),
          // date-only (the calendar has no times); a datetime keeps just its day
          start: date?.start?.slice(0, 10),
          end: date?.end?.slice(0, 10),
          tag: p.properties.Tags?.multi_select?.[0]?.name,
        };
      })
      .filter((e) => e.name && e.start);

    return Response.json(
      { events },
      // edits in Notion show up within a few minutes, without hitting Notion on every visit
      { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } }
    );
  } catch {
    return Response.json({ error: "Could not load events" }, { status: 502, headers: { "Cache-Control": "no-store" } });
  }
}

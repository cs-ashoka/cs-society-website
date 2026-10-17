import { PageHeader } from "@/components/page-header";
import { Shelf } from "./shelf";
import { getPublications } from "./feed";

export const revalidate = 3600;

export const metadata = { title: "Publications" };

export default async function Page() {
  const items = await getPublications();
  return (
    <main className="min-h-screen">
      <PageHeader eyebrow="Publications" title="The Shelf">
        Essays from our Substack and episodes from the podcast. Pick a month to pull its book off the shelf.
      </PageHeader>
      <Shelf items={items} />
    </main>
  );
}

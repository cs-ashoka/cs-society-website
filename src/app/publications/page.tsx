import { PageHeader } from "@/components/page-header";
import { Shelf } from "./shelf";

export const metadata = { title: "Publications" };

export default function Page() {
  return (
    <main className="min-h-screen">
      <PageHeader eyebrow="Publications" title="The Shelf">
        Essays from our Substack and episodes from the podcast. Pick a month to pull its book off the shelf.
      </PageHeader>
      <Shelf />
    </main>
  );
}

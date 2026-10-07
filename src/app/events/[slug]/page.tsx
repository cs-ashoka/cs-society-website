import Link from "next/link";
import { notFound } from "next/navigation";
import { jetbrainsMono } from "@/utils/fonts";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { getSortedPostsData, getPostData } from "@/lib/event-posts";

export function generateStaticParams() {
  return getSortedPostsData().map((e) => ({ slug: e.slug }));
}

export default async function EventsPost({ params }: { params: { slug: string } }) {
  if (!getSortedPostsData().some((e) => e.slug === params.slug)) notFound();

  const { title, date, contentHtml, imgList, type } = await getPostData(params.slug);

  return (
    <main className="min-h-screen bg-background">
      <PageHeader eyebrow={`Event // ${date}`} title={title} />

      <article className="max-w-3xl mx-auto px-6 py-14">
        <Link
          href="/events"
          className={`${jetbrainsMono.className} text-xs uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors`}
        >
          ← All events
        </Link>
        <div
          className="mt-8 text-on-surface-variant leading-relaxed text-base [&_p]:mb-5 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-5 [&_li]:mb-2 [&_a]:text-primary [&_a]:underline [&_a]:break-all"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </article>

      {imgList.length > 0 && (
        <section className="bg-surface-container-low border-t border-border py-14 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-semibold mb-8">Gallery</h2>
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [&>*]:mb-4">
              {imgList.map((src, i) => (
                <Reveal key={src + i} className="break-inside-avoid">
                  {type[i] === "video" ? (
                    <video src={src} controls muted loop playsInline preload="metadata" className="w-full rounded-lg border border-border bg-inverse-surface" />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={src} alt={`${title} photo ${i + 1}`} loading="lazy" className="w-full rounded-lg border border-border" />
                  )}
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

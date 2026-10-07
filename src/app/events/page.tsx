import Image from "next/image";
import Link from "next/link";
import { jetbrainsMono } from "@/utils/fonts";
import { Reveal } from "@/components/reveal";
import { PageHeader } from "@/components/page-header";
import { getSortedPostsData } from "@/lib/event-posts";

export const metadata = { title: "Events | CS Society @ Ashoka" };

const highlights = [
  "/img/events/notion_4.jpeg",
  "/img/events/gather_2.png",
  "/img/events/acadsocsfair_3.jpg",
  "/img/events/aoc_14.jpg",
  "/img/events/blockchain_2.jpg",
  "/img/events/blockchain_1.jpg",
  "/img/events/acadsocsfair_2.jpg",
  "/img/events/pmclub_1.jpg",
  "/img/events/researchshowcase_3.png",
  "/img/events/bash_1.jpg",
  "/img/events/aoc_12.jpg",
];

export default function EventsPage() {
  const events = getSortedPostsData();
  return (
    <main className="min-h-screen bg-background">
      <PageHeader eyebrow="Events // Archive" title="Events">
        Workshops, socials, and the occasional chaos. Here&apos;s what we&apos;ve been up to.
      </PageHeader>

      <section className="max-w-5xl mx-auto px-6 pt-12">
        <Reveal className="flex flex-wrap items-center justify-between gap-4 bg-inverse-surface text-white rounded-xl p-6">
          <div>
            <span className={`${jetbrainsMono.className} text-primary uppercase tracking-widest text-xs block mb-1`}>
              Up next
            </span>
            <p className="text-lg font-semibold">New events are coming next semester.</p>
          </div>
          <a
            href="https://www.instagram.com/cs.ashoka/"
            target="_blank"
            rel="noopener noreferrer"
            className={`${jetbrainsMono.className} bg-primary text-on-primary px-5 py-2 text-sm uppercase tracking-widest rounded hover:opacity-90 transition-opacity`}
          >
            Follow for updates
          </a>
        </Reveal>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16">
        <Reveal className="flex items-center gap-4 mb-8">
          <h2 className="text-3xl font-semibold">Recent events</h2>
          <div className="flex-grow h-px bg-border" />
          <span className={`${jetbrainsMono.className} text-secondary text-sm`}>{events.length} posts</span>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, i) => (
            <Reveal key={event.slug} delayMs={(i % 3) * 100}>
              <Link
                href={`/events/${event.slug}`}
                className="group block h-full bg-surface border border-border p-4 rounded-xl card-glow"
              >
                <div className="relative overflow-hidden aspect-video rounded-lg mb-4 bg-surface-container-low">
                  <Image
                    src={`/img/events/${event.slug}.png`}
                    alt={event.title}
                    fill
                    unoptimized
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors">{event.title}</h3>
                <div className="pt-3 border-t border-border flex justify-between items-center">
                  <span className={`${jetbrainsMono.className} text-xs text-on-surface-variant uppercase`}>{event.date}</span>
                  <span className="text-primary group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-16 px-6 bg-surface-container-low border-t border-border">
        <div className="max-w-5xl mx-auto">
          <Reveal className="mb-8">
            <span className={`${jetbrainsMono.className} text-primary uppercase tracking-widest text-xs block mb-2`}>
              Gallery
            </span>
            <h2 className="text-3xl font-semibold">Highlights</h2>
          </Reveal>
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 [&>*]:mb-4">
            {highlights.map((src) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={src}
                src={src}
                alt=""
                loading="lazy"
                className="w-full rounded-lg border border-border break-inside-avoid grayscale hover:grayscale-0 transition-all duration-500"
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

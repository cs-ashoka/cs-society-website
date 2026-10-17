"use client";

import { useEffect, useMemo, useState } from "react";
import { jetbrainsMono } from "@/utils/fonts";
import { publications, type Publication } from "./data";

// The shelf runs Oct 2026 to May 2027.
const SHELF = [
  { year: 2026, month: 9 }, { year: 2026, month: 10 }, { year: 2026, month: 11 },
  { year: 2027, month: 0 }, { year: 2027, month: 1 }, { year: 2027, month: 2 },
  { year: 2027, month: 3 }, { year: 2027, month: 4 },
];
const SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const FULL_MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Resting heights (px) so the shelf looks like an uneven row of books.
const HEIGHTS = [104, 92, 116, 88, 110, 96, 120, 100];
const EXPANDED_HEIGHT = 190;

// Card spans/heights vary to give a loose, non-symmetric rhythm.
const SIZES = ["h-44", "h-56", "h-64", "h-48", "h-72", "h-52"];

const slotOf = (p: Publication) => {
  const y = Number(p.date.slice(0, 4));
  const m = Number(p.date.slice(5, 7)) - 1;
  return SHELF.findIndex((s) => s.year === y && s.month === m);
};

function shuffle<T>(items: T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function Shelf() {
  const [active, setActive] = useState<number | null>(null);
  // Server render keeps source order; the client reshuffles after mount to avoid hydration mismatch.
  const [order, setOrder] = useState<Publication[]>(publications);
  useEffect(() => setOrder(shuffle(publications)), []);

  const counts = useMemo(() => {
    const c = Array(SHELF.length).fill(0) as number[];
    publications.forEach((p) => { const i = slotOf(p); if (i >= 0) c[i]++; });
    return c;
  }, []);

  const inShelf = order.filter((p) => slotOf(p) >= 0);
  const visible = active === null ? inShelf : inShelf.filter((p) => slotOf(p) === active);

  return (
    <div className="max-w-6xl mx-auto px-6 pb-24">
      {/* Bookshelf */}
      <div className="pt-12">
        <div className="flex items-end justify-center gap-1.5 sm:gap-2 h-[200px] px-2" role="tablist" aria-label="Filter by month">
          {SHELF.map(({ year, month }, i) => {
            const m = SHORT[month];
            const selected = active === i;
            const empty = counts[i] === 0;
            return (
              <button
                key={`${year}-${month}`}
                role="tab"
                aria-selected={selected}
                disabled={empty}
                onClick={() => setActive(selected ? null : i)}
                style={{ height: selected ? EXPANDED_HEIGHT : HEIGHTS[i] }}
                className={`${jetbrainsMono.className} group relative rounded-t-md rounded-b-[3px] text-[11px] tracking-wider uppercase
                  transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden
                  shadow-[inset_3px_0_0_rgba(255,255,255,0.18),2px_2px_6px_rgba(0,0,0,0.18)]
                  ${selected ? "w-14 sm:w-20 bg-primary text-on-primary" : "w-7 sm:w-10 text-on-primary hover:-translate-y-2"}
                  ${selected ? "" : empty ? "bg-neutral-400/50 dark:bg-neutral-600/50 cursor-not-allowed" : "bg-black dark:bg-neutral-950 ring-1 ring-white/10"} ${empty ? "cursor-not-allowed" : "cursor-pointer"}`}
              >
                <span className="absolute inset-x-0 top-3 mx-auto h-px w-3/5 bg-on-primary/40" />
                <span className="absolute inset-x-0 top-5 mx-auto h-px w-3/5 bg-on-primary/25" />
                <span className="absolute inset-0 flex flex-col items-center justify-center gap-3 pt-6">
                  <span className="[writing-mode:vertical-rl] rotate-180 whitespace-nowrap">
                    {selected ? `${FULL_MONTHS[month]} \u2019${String(year).slice(2)}` : `${m} \u2019${String(year).slice(2)}`}
                  </span>
                  {selected && (
                    <span className="text-[10px] opacity-80 transition-opacity duration-500">{counts[i]} {counts[i] === 1 ? "piece" : "pieces"}</span>
                  )}
                </span>
              </button>
            );
          })}
        </div>
        {/* The shelf board */}
        <div className="h-3 rounded-sm bg-surface-container shadow-[0_6px_14px_rgba(0,0,0,0.18)] border-t border-border" />
        <div className="h-1.5 mx-3 rounded-b-sm bg-border/70" />
      </div>

      <p className={`${jetbrainsMono.className} mt-10 mb-6 text-xs uppercase tracking-[0.2em] text-on-surface-variant`}>
        {active === null ? "Everything, shuffled" : `${FULL_MONTHS[SHELF[active].month]} ${SHELF[active].year}`}
      </p>

      {/* Loose, uneven grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
        {visible.map((p, idx) => (
          p.embed ? <SubstackEmbed key={p.id} p={p} /> : <Card key={p.id} p={p} size={SIZES[(idx * 5 + p.id.length) % SIZES.length]} />
        ))}
      </div>
    </div>
  );
}

function SubstackEmbed({ p }: { p: Publication }) {
  // Substack's embed script only scans the page once on load, so re-add it after mount.
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://substack.com/embedjs/embed.js";
    script.async = true;
    script.charset = "utf-8";
    document.body.appendChild(script);
    return () => { script.remove(); };
  }, []);
  return (
    <div className="mb-5 break-inside-avoid">
      <div className="substack-post-embed">
        <p lang="en">{p.embed!.title}</p>
        <p>{p.embed!.subtitle}</p>
        <a data-post-link href={p.href}>Read on Substack</a>
      </div>
    </div>
  );
}

function Card({ p, size }: { p: Publication; size: string }) {
  const isPod = p.type === "podcast";
  const date = new Date(p.date + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  return (
    <a
      href={p.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${size} mb-5 break-inside-avoid flex flex-col justify-between rounded-2xl p-5 shadow-[0_8px_24px_rgba(0,0,0,0.10)]
        transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(0,0,0,0.16)]
        ${isPod ? "bg-primary text-on-primary" : "bg-surface text-on-surface"}`}
    >
      <div className={`${jetbrainsMono.className} text-[10px] uppercase tracking-[0.2em] flex items-center justify-between ${isPod ? "opacity-80" : "text-primary"}`}>
        <span>{isPod ? "Podcast" : "Substack"}</span>
        <span className={isPod ? "" : "text-on-surface-variant"}>{date}</span>
      </div>
      <div>
        <h3 className="text-lg font-bold leading-snug mb-2">{p.title}</h3>
        <p className={`text-sm leading-relaxed line-clamp-3 ${isPod ? "opacity-90" : "text-on-surface-variant"}`}>{p.blurb}</p>
      </div>
    </a>
  );
}

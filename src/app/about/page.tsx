import { jetbrainsMono } from "@/utils/fonts";
import { Reveal } from "@/components/reveal";
import { PageHeader } from "@/components/page-header";
import { FillButton } from "@/components/fill-button";
import { MdAdd, MdArrowForward } from "react-icons/md";

export const metadata = { title: "About | CS Society @ Ashoka" };

const faqs = [
  {
    q: "What is the Computer Science Society, and what does it do?",
    a: (
      <p>
        <span className="text-primary font-semibold">The Computer Science Society</span> is an academic society that
        aims to create opportunities and resources through a host of activities. We were founded in 2016 and we&apos;re
        still a functioning, fulfilling, and fun society.
      </p>
    ),
  },
  {
    q: "What are the benefits of joining?",
    a: (
      <ul className="space-y-3">
        <li><strong className="text-on-surface">Networking.</strong> Engage with fellow enthusiasts, collaborate on projects, share ideas, and connect as part of a community.</li>
        <li><strong className="text-on-surface">Skill development.</strong> Sharpen your coding and technical skills while contributing to workshops, events, and hackathons, and make a tangible impact in CS from the ground up.</li>
        <li><strong className="text-on-surface">Member access.</strong> Member-exclusive workshops and meetings, plus game nights, coding opportunities, and discussions.</li>
        <li><strong className="text-on-surface">External reach.</strong> Interact with CS communities nationwide and gain industry insight through professionals in the field.</li>
      </ul>
    ),
  },
  {
    q: "When do inductions open?",
    a: (
      <p>
        We&apos;re glad you&apos;re interested. Inductions for our verticals, namely{" "}
        <strong className="text-on-surface">Events, Marketing, Outreach &amp; Logistics, Dev, and Finance</strong>, open
        every semester. Details are sent to your Ashoka inbox closer to the cycle.
      </p>
    ),
  },
];

const verticals = [
  { name: "Events", blurb: "Workshops, socials, hackathons, and the CS Mixer." },
  { name: "Development", blurb: "This website, internal tools, and member projects." },
  { name: "Marketing", blurb: "Design, social media, and how the society shows up." },
  { name: "Outreach & Logistics", blurb: "Speakers, partnerships, and making events actually happen." },
  { name: "Finance", blurb: "Budgets, sponsorships, and keeping the society solvent." },
  { name: "Broadcast", blurb: "Photo, video, and the stories we tell about the year." },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <PageHeader eyebrow="About // AUCSS" title="About the Society">
        A student-run community at Ashoka University for anyone into code, computers, and building things together.
      </PageHeader>

      <section className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <span className={`${jetbrainsMono.className} text-primary uppercase tracking-widest text-xs block mb-2`}>
            01 // Questions
          </span>
          <h2 className="text-3xl font-semibold">The basics</h2>
        </div>
        <div className="md:col-span-8 space-y-3">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delayMs={i * 80}>
              <details className="group bg-surface border border-border rounded-xl card-glow open:border-primary/30">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none p-5 font-medium [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <MdAdd className="shrink-0 text-xl text-primary transition-transform duration-300 group-open:rotate-45" />
                </summary>
                <div className="px-5 pb-5 text-on-surface-variant text-sm leading-relaxed">{f.a}</div>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-16 px-6 bg-surface-container-low border-y border-border">
        <div className="max-w-5xl mx-auto">
          <Reveal className="mb-10">
            <span className={`${jetbrainsMono.className} text-primary uppercase tracking-widest text-xs block mb-2`}>
              02 // Verticals
            </span>
            <h2 className="text-3xl font-semibold">How we&apos;re organised</h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {verticals.map((v, i) => (
              <Reveal key={v.name} delayMs={i * 80} className="group bg-surface border border-border rounded-xl p-6 card-glow">
                <span className={`${jetbrainsMono.className} text-xs text-on-surface-variant block mb-3`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{v.name}</h3>
                <p className="text-on-surface-variant text-sm">{v.blurb}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 text-center">
        <Reveal>
          <h2 className="text-3xl font-semibold mb-3">Meet the people behind it</h2>
          <p className="text-on-surface-variant mb-8 max-w-md mx-auto">The core team, faculty advisors, and past presidents.</p>
          <FillButton href="/team" className={`${jetbrainsMono.className} text-on-surface px-6 py-3 uppercase tracking-widest text-sm`}>
            Meet the team <MdArrowForward className="text-lg" />
          </FillButton>
        </Reveal>
      </section>
    </main>
  );
}

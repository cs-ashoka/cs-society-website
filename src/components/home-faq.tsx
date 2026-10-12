import { jetbrainsMono } from "@/utils/fonts";
import { Reveal } from "@/components/reveal";
import { MdAdd } from "react-icons/md";

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

export function HomeFaq() {
  return (
    <section id="basics" className="max-w-5xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-12 gap-10 scroll-mt-24">
      <div className="md:col-span-4">
        <span className={`${jetbrainsMono.className} text-primary uppercase tracking-widest text-xs block mb-2`}>
          The basics
        </span>
        <h2 className="text-3xl font-semibold">Good to know</h2>
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
  );
}

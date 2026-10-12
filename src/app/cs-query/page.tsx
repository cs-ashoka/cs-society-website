import type { Metadata } from "next";
import { MdOutlineCalendarMonth, MdOutlineHelpOutline, MdOutlineMailOutline } from "react-icons/md";
import { jetbrainsMono } from "@/utils/fonts";
import { Reveal } from "@/components/reveal";
import { QueryForm } from "./query-form";

export const metadata: Metadata = {
  title: "CS Query | CS Society @ Ashoka",
  description:
    "Book office hours with CS Society or send us a doubt about courses, code, internships or anything CS at Ashoka.",
};

const steps = [
  {
    icon: MdOutlineCalendarMonth,
    title: "Book office hours",
    body: "Pick a topic and tell us when you're free. Someone from the society sets up a slot with you.",
  },
  {
    icon: MdOutlineHelpOutline,
    title: "Send a doubt",
    body: "Stuck on a concept, a bug, a course choice or an application? Write it out and we'll get back.",
  },
  {
    icon: MdOutlineMailOutline,
    title: "Hear back over email",
    body: "Replies come straight to your inbox, usually within a couple of days.",
  },
];

export default function CsQueryPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="relative overflow-hidden">
        <div className="grid-bg absolute inset-0 opacity-60 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-6 pt-14 md:pt-16 pb-16 md:pb-20">
          <Reveal>
            <span className={`${jetbrainsMono.className} text-primary uppercase tracking-[0.2em] text-xs block mb-4`}>
              Office hours · Doubts
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-on-surface mb-4">CS Query</h1>
            <p className="text-lg text-on-surface-variant max-w-2xl leading-relaxed mb-10 md:mb-12">
              No question is too basic. Book time with us or drop a doubt, and we&apos;ll reply over email.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-start">
            <div className="md:col-span-5 flex flex-col gap-4">
              {steps.map((step, i) => (
                <Reveal
                  key={step.title}
                  delayMs={i * 100}
                  className="group bg-surface border border-border p-5 rounded-xl card-glow flex gap-4"
                >
                  <step.icon className="text-2xl text-primary shrink-0 mt-0.5" aria-hidden />
                  <div>
                    <p className="font-semibold text-on-surface mb-1">{step.title}</p>
                    <p className="text-sm text-on-surface-variant leading-relaxed">{step.body}</p>
                  </div>
                </Reveal>
              ))}
              <p className={`${jetbrainsMono.className} text-[11px] uppercase tracking-[0.18em] text-secondary mt-2`}>
                Prefer email?{" "}
                <a href="mailto:cs.society@ashoka.edu.in" className="text-primary hover:underline normal-case tracking-normal">
                  cs.society@ashoka.edu.in
                </a>
              </p>
            </div>

            <div className="md:col-span-7">
              <QueryForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

"use client";

import { jetbrainsMono } from "@/utils/fonts";
import Link from "next/link";
import { MdArrowForward } from "react-icons/md";

const resources = [
  {
    href: "/under-construction",
    title: "CS Resources",
    description:
      "Useful CS resources to navigate CS academics: from first-year programming to AI/ML, web dev and competitive programming, curated by students who have been through it.",
  },
  {
    href: "/under-construction",
    title: "Project Opportunities",
    description:
      "Find something real to build. Open-source work, research collaborations and student-led projects that turn what you learn in class into things you can show.",
  },
];


export default function Resources() {
  return (
    <main className="min-h-screen bg-background">
      <section className="relative py-16 px-6 overflow-hidden bg-hero-tint border-b border-border">
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(rgb(var(--c-border)) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="max-w-5xl mx-auto relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-on-surface mb-4">Resources</h1>
          
          <span
            className={`${jetbrainsMono.className} text-primary uppercase tracking-[0.2em] text-sm block mb-4`}
          >
            What resources does CS Soc have for you? </span>

        </div>


  
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16 flex flex-col gap-6">
        {resources.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="group block bg-surface border border-primary/30 rounded-xl p-6 md:p-8 card-glow"
          >
            
            <div className="flex items-center justify-between gap-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-on-surface mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h2>
                <p className="text-on-surface-variant text-sm md:text-base max-w-2xl">
                  {item.description}
                </p>
              </div>


              <MdArrowForward className="text-primary text-3xl md:text-4xl flex-shrink-0 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </section>


      
    </main>
  );
}


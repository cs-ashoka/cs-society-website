import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MdArrowForward } from "react-icons/md";
import { jetbrainsMono } from "@/utils/fonts";
import { Reveal } from "@/components/reveal";
import { PitchProjectButton } from "@/components/projects/pitch-dialog";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects | CS Society @ Ashoka",
  description:
    "Projects built by CS Society members at Ashoka University — and an open invite to pitch your own.",
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="relative overflow-hidden bg-hero-tint border-b border-border">
        <div className="grid-bg absolute inset-0 opacity-40 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 py-12 md:py-14 flex flex-col md:flex-row items-center gap-6 md:gap-12">
          <Reveal className="flex-1 text-center">
            <span
              className={`${jetbrainsMono.className} text-primary uppercase tracking-[0.2em] text-xs block mb-3`}
            >
              Projects
            </span>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-on-surface mb-3">
              Built by students, for students.
            </h1>
            <p className="text-on-surface-variant max-w-xl mx-auto leading-relaxed">
              Got something you&apos;re working on? Pitch it to CS Society and we&apos;ll help you find
              collaborators, resources and a place to show it off.
            </p>
          </Reveal>
          <Reveal delayMs={120} className="shrink-0">
            <PitchProjectButton />
          </Reveal>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-14 md:py-16">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delayMs={i * 80} className="mb-6 break-inside-avoid">
              <Link
                href={`/projects/${project.slug}`}
                className="group block cursor-pointer bg-surface border border-border rounded-xl overflow-hidden card-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <Image
                  src={project.image}
                  alt=""
                  width={0}
                  height={0}
                  sizes="(min-width: 1280px) 400px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="w-full h-auto transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />

                <div className="p-5">
                  <span
                    className={`${jetbrainsMono.className} text-primary uppercase tracking-wide text-[11px] block mb-2`}
                  >
                    {project.tag}
                  </span>
                  <h2 className="flex items-center gap-2 text-xl font-semibold text-on-surface mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                    <MdArrowForward
                      className="shrink-0 text-lg opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
                      aria-hidden
                    />
                  </h2>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}

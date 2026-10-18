import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MdArrowOutward } from "react-icons/md";
import { jetbrainsMono } from "@/utils/fonts";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { getProject, projects } from "@/lib/projects";

const metaLabel = `${jetbrainsMono.className} text-[11px] uppercase tracking-wider text-secondary block mb-1`;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProject(params.slug);
  if (!project) return { title: "Project not found | CS Society @ Ashoka" };
  return {
    title: `${project.title} | CS Society @ Ashoka`,
    description: project.description,
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) notFound();

  return (
    <main className="min-h-screen bg-background">
      <PageHeader eyebrow={`Project // ${project.tag}`} title={project.title}>
        {project.description}
      </PageHeader>

      <article className="max-w-3xl mx-auto px-6 pt-14 pb-12">
        <Link
          href="/projects"
          className={`${jetbrainsMono.className} text-xs uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors`}
        >
          ← All projects
        </Link>

        <Reveal delayMs={80} className="mt-8">
          <Image
            src={project.image}
            alt={project.title}
            width={0}
            height={0}
            sizes="(min-width: 768px) 768px, 100vw"
            className="w-full h-auto rounded-xl border border-border"
          />
        </Reveal>

        <Reveal
          delayMs={160}
          className="mt-8 flex flex-col gap-5 text-on-surface-variant leading-relaxed"
        >
          {project.body.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </Reveal>
      </article>

      <div className="max-w-5xl mx-auto px-6" aria-hidden>
        <div className="border-t border-border" />
      </div>

      <section className="max-w-3xl mx-auto px-6 pt-8 pb-16">
        <Reveal>
          <dl className="flex flex-wrap gap-x-16 gap-y-6">
            <div>
              <dt className={metaLabel}>Year</dt>
              <dd className="text-on-surface font-medium">{project.year}</dd>
            </div>

            <div>
              <dt className={metaLabel}>Built with</dt>
              <dd className="text-on-surface">
                {project.stack.map((tech, i) => (
                  <span key={i}>
                    {i > 0 && (
                      <span className="text-secondary mx-1" aria-hidden>
                        ·
                      </span>
                    )}
                    {tech}
                  </span>
                ))}
              </dd>
            </div>

            {project.links.length > 0 && (
              <div>
                <dt className={metaLabel}>Links</dt>
                <dd className="flex flex-col gap-1">
                  {project.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 w-fit text-on-surface font-medium underline decoration-border underline-offset-4 hover:text-primary hover:decoration-primary transition-colors"
                    >
                      {link.label}
                      <MdArrowOutward
                        className="text-sm transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </a>
                  ))}
                </dd>
              </div>
            )}
          </dl>
        </Reveal>
      </section>
    </main>
  );
}

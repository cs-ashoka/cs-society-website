import Link from "next/link";
import { jetbrainsMono } from "@/utils/fonts";
import { Reveal } from "@/components/reveal";
import { PageHeader } from "@/components/page-header";
import { MdSchool, MdWork, MdDescription, MdArrowForward } from "react-icons/md";

export const metadata = { title: "Resources | CS Society @ Ashoka" };

const resources = [
  { title: "Learning CS", desc: "Guides and notes from programming basics to ML, web dev, and competitive programming.", href: "/learningcs", Icon: MdSchool },
  { title: "Internships", desc: "Where to look, how to apply, and what past students did.", href: "/internships", Icon: MdWork },
  { title: "Ashoka starter pack", desc: "Everything a new CS student should know, in one PDF.", href: "/ashoka-starter-pack.pdf", Icon: MdDescription },
];

export default function Resources() {
  return (
    <main className="min-h-screen bg-background">
      <PageHeader eyebrow="Resources // Toolkit" title="Resources">
        What does the Computer Science Society have for you? Start here.
      </PageHeader>
      <section className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        {resources.map(({ title, desc, href, Icon }, i) => (
          <Reveal key={title} delayMs={i * 100} className="h-full">
            <Link href={href} className="group flex flex-col h-full bg-surface border border-border rounded-xl p-6 card-glow">
              <Icon className="text-3xl text-primary mb-6" />
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{title}</h3>
              <p className="text-on-surface-variant text-sm mb-6 flex-grow">{desc}</p>
              <span className={`${jetbrainsMono.className} text-xs uppercase tracking-widest flex items-center gap-2 text-on-surface group-hover:text-primary transition-colors`}>
                Explore <MdArrowForward className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </Reveal>
        ))}
      </section>
    </main>
  );
}

import { jetbrainsMono } from "@/utils/fonts";
import { Reveal } from "@/components/reveal";

export function PageHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden px-6 bg-hero-tint border-b border-border">
      <div className="absolute inset-0 opacity-40 pointer-events-none grid-bg" />
      <div className="max-w-5xl mx-auto relative z-10 pt-16 pb-12">
        <Reveal>
          <span className={`${jetbrainsMono.className} text-primary uppercase tracking-[0.2em] text-xs block mb-4`}>
            {eyebrow}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-on-surface mb-4">{title}</h1>
          {children && <p className="text-lg text-on-surface-variant max-w-2xl leading-relaxed">{children}</p>}
        </Reveal>
      </div>
    </section>
  );
}

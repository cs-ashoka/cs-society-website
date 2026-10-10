"use client";

import { jetbrainsMono } from "@/utils/fonts";

export default function Resources() {
  return (
    <main className="min-h-screen bg-background">

      <section className="relative py-24 px-6 overflow-hidden bg-hero-tint border-b border-border">
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
    </main>
  );
}
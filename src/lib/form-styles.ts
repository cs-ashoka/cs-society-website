import { jetbrainsMono } from "@/utils/fonts";

export const labelClass = `${jetbrainsMono.className} block text-[11px] uppercase tracking-[0.18em] text-secondary mb-2`;

export const fieldClass =
  "w-full rounded-lg border border-border bg-background px-4 py-3 text-on-surface placeholder:text-on-surface-variant/60 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20";

export const submitClass = `${jetbrainsMono.className} self-start bg-primary text-on-primary px-6 py-3 text-sm uppercase tracking-wide rounded transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30 disabled:opacity-60 disabled:hover:scale-100`;

export const textButtonClass = `${jetbrainsMono.className} text-sm uppercase tracking-wide text-primary hover:underline`;

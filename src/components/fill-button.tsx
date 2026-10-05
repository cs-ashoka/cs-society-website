"use client";
import { useRef } from "react";
import type { ReactNode } from "react";
import cn from "@/utils/cn";

type FillButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
  target?: string;
};

// Link whose red fill spreads out from the point where the pointer enters (and retreats to where it leaves).
export function FillButton({ href, children, className, target }: FillButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const setOrigin = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--fx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--fy", `${e.clientY - rect.top}px`);
  };

  return (
    <a
      ref={ref}
      href={href}
      target={target}
      onPointerEnter={setOrigin}
      onPointerLeave={setOrigin}
      className={cn(
        "group relative inline-flex items-center gap-2 overflow-hidden border border-on-surface hover:border-primary hover:text-on-primary transition-colors duration-500",
        className
      )}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-primary pointer-events-none transition-[clip-path] duration-500 ease-out [clip-path:circle(0px_at_var(--fx,50%)_var(--fy,50%))] group-hover:[clip-path:circle(150%_at_var(--fx,50%)_var(--fy,50%))]"
      />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </a>
  );
}

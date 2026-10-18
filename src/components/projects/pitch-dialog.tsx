"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MdArrowForward, MdClose } from "react-icons/md";
import { jetbrainsMono } from "@/utils/fonts";
import { PitchForm } from "@/components/projects/pitch-form";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function PitchProjectButton() {
  const [open, setOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const overlay = overlayRef.current;
    const dialog = dialogRef.current;
    const trigger = triggerRef.current;
    if (!overlay || !dialog) return;

    const background = Array.from(document.body.children).filter(
      (child): child is HTMLElement => child !== overlay && !child.hasAttribute("inert")
    );
    background.forEach((child) => child.setAttribute("inert", ""));

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      const paddingRight = parseFloat(getComputedStyle(document.body).paddingRight) || 0;
      document.body.style.paddingRight = `${paddingRight + scrollbarWidth}px`;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (element) => element.offsetParent !== null
      );
      if (focusable.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || active === dialog)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    dialog.focus({ preventScroll: true });

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      background.forEach((child) => child.removeAttribute("inert"));
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={`${jetbrainsMono.className} group inline-flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded uppercase tracking-widest text-sm hover:opacity-90 transition-opacity whitespace-nowrap`}
      >
        Pitch Project
        <MdArrowForward className="text-lg transition-transform group-hover:translate-x-1" aria-hidden />
      </button>

      {open &&
        createPortal(
          <div
            ref={overlayRef}
            className="fixed inset-0 z-50 overflow-y-auto overscroll-contain [scrollbar-gutter:stable]"
          >
            <div
              className="dialog-fade-in fixed inset-0 bg-inverse-surface/70"
              onClick={() => setOpen(false)}
              aria-hidden
            />

            <div className="relative flex min-h-full items-center justify-center p-4 sm:p-6 pointer-events-none">
              <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="pitch-dialog-title"
                tabIndex={-1}
                className="dialog-slide-up relative w-full max-w-xl bg-surface border border-border rounded-2xl shadow-xl p-6 md:p-8 focus:outline-none pointer-events-auto"
              >
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <span
                      className={`${jetbrainsMono.className} text-primary uppercase tracking-[0.2em] text-xs block mb-2`}
                    >
                      Pitch a project
                    </span>
                    <h2 id="pitch-dialog-title" className="text-2xl font-semibold text-on-surface">
                      Tell us what you&apos;re building
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close dialog"
                    className="shrink-0 text-on-surface-variant hover:text-primary transition-colors"
                  >
                    <MdClose className="text-2xl" />
                  </button>
                </div>

                <PitchForm />
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

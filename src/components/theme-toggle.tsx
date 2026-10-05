"use client";
import { useEffect, useState } from "react";

const rays = [0, 45, 90, 135, 180, 225, 270, 315];

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={dark}
      className="p-2 rounded-full text-on-surface hover:text-primary hover:bg-surface-container transition-colors"
    >
      <svg
        viewBox="0 0 24 24"
        width="22"
        height="22"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <mask id="theme-moon-mask">
          <rect x="0" y="0" width="24" height="24" fill="white" />
          <circle
            cx="12"
            cy="12"
            r="8"
            fill="black"
            stroke="none"
            style={{
              transform: dark ? "translate(6px, -6px)" : "translate(26px, -26px)",
              transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
        </mask>
        <circle
          cx="12"
          cy="12"
          r="9"
          mask="url(#theme-moon-mask)"
          vectorEffect="non-scaling-stroke"
          style={{
            transform: dark ? "scale(1) rotate(-20deg)" : "scale(0.56)",
            transformOrigin: "12px 12px",
            fill: dark ? "currentColor" : "transparent",
            transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), fill 0.5s ease",
          }}
        />
        <g
          style={{
            opacity: dark ? 0 : 1,
            transform: dark ? "rotate(90deg) scale(0.3)" : "rotate(0deg) scale(1)",
            transformOrigin: "12px 12px",
            transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease",
          }}
        >
          {rays.map((a) => (
            <line key={a} x1="12" y1="2.5" x2="12" y2="4.5" transform={`rotate(${a} 12 12)`} />
          ))}
        </g>
      </svg>
    </button>
  );
}

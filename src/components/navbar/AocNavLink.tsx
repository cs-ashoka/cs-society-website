import type { CSSProperties } from "react";
import cn from "@/utils/cn";

// The Autumn of Code page is a standalone page in public/autumn-of-code/
export const AOC_HREF = "/autumn-of-code/index.html";

const LEAF_PATH =
  "M50 74L60 76L66 86L69 73L82 75L78 66L95 52L84 49L88 39L76 41L73 32L66 43L67 22L60 28L57 16L53 19L50 4L47 19L43 16L40 28L33 22L34 43L27 32L24 41L12 39L16 49L5 52L22 66L18 75L31 73L34 86L40 76ZM49 74h2v22h-2z";

export function MapleLeaf({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={className} style={style}>
      <path d={LEAF_PATH} fill="currentColor" />
    </svg>
  );
}

// Leaves that fall across the label on hover.
// x: start position across the label (%), sway: sideways drift (px), delay/dur: seconds, size: px
const FALLING = [
  { x: 4, sway: 8, delay: 0, dur: 1.7, size: 10, color: "#CA8A04" },
  { x: 20, sway: -6, delay: 0.55, dur: 2.0, size: 8, color: "#F6DDBA" },
  { x: 36, sway: 7, delay: 0.25, dur: 1.8, size: 11, color: "#D4A373" },
  { x: 52, sway: -8, delay: 0.85, dur: 1.6, size: 9, color: "#CA8A04" },
  { x: 68, sway: 6, delay: 0.4, dur: 2.1, size: 10, color: "#F6DDBA" },
  { x: 84, sway: -7, delay: 0.7, dur: 1.9, size: 8, color: "#D4A373" },
];

// Desktop nav button: shows "AOC", unfolds to "Autumn of Code" on hover with leaves falling over it
export function AocNavLink({ active = false }: { active?: boolean }) {
  return (
    <a href={AOC_HREF} className={cn("aoc-link", active && "is-active")} aria-label="Autumn of Code">
      {/* holds the collapsed size in the nav so the unfolding label never shifts the other links */}
      <span className="aoc-pill aoc-ghost" aria-hidden="true">
        <MapleLeaf className="aoc-icon" />
        AOC
      </span>

      <span className="aoc-pill aoc-live" aria-hidden="true">
        <MapleLeaf className="aoc-icon" />
        <span className="aoc-word">
          A<span className="aoc-more"><span>utumn </span></span>
          O<span className="aoc-more"><span>f </span></span>
          C<span className="aoc-more"><span>ode</span></span>
        </span>
        <span className="aoc-fall">
          {FALLING.map((leaf, i) => (
            <MapleLeaf
              key={i}
              className="aoc-leaf"
              style={
                {
                  "--x": `${leaf.x}%`,
                  "--sway": `${leaf.sway}px`,
                  "--delay": `${leaf.delay}s`,
                  "--dur": `${leaf.dur}s`,
                  "--size": `${leaf.size}px`,
                  color: leaf.color,
                } as CSSProperties
              }
            />
          ))}
        </span>
      </span>
    </a>
  );
}

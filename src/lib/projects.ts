export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  slug: string;
  title: string;
  tag: string;
  description: string;
  image: string;
  year: string;
  stack: string[];
  links: ProjectLink[];
  body: string[];
};

// TODO: placeholder projects with borrowed event photos — swap in the real roster.
export const projects: Project[] = [
  {
    slug: "autumn-of-code-judge",
    title: "Autumn of Code Judge",
    tag: "Community",
    description:
      "Our online judge for the society's flagship coding challenge, with per-problem scoring and a live leaderboard for the November run.",
    image: "/img/events/autumn-of-code.png",
    year: "2025",
    stack: ["Next.js", "PostgreSQL", "Docker"],
    links: [{ label: "aoc.cssoc.dev", href: "https://aoc.cssoc.dev" }],
    body: [
      "Autumn of Code is our flagship coding challenge, and the judge is the piece of software that makes it run. Contestants submit a solution, it gets compiled and run against a hidden set of test cases, and a verdict goes back within seconds.",
      "We built it after running the first edition on a spreadsheet and a stopwatch. The current version scores each problem out of 100, tracks penalties for wrong submissions, and pushes every accepted verdict to a leaderboard that refreshes live through the evening.",
      "It runs on a small Docker swarm hosted by the society, so a sudden spike of submissions near the deadline doesn't take the site down with it.",
    ],
  },
  {
    slug: "turtle-graphics-playground",
    title: "Turtle Graphics Playground",
    tag: "Learning",
    description:
      "A browser sandbox that gets first-years drawing with Python on day one, built after our intro workshop.",
    image: "/img/events/turtle-workshop.png",
    year: "2025",
    stack: ["React", "Pyodide", "Web Workers"],
    links: [{ label: "Playground", href: "https://playground.cssoc.dev" }],
    body: [
      "The hardest part of teaching programming is the wait: install Python, install an editor, discover your PATH is broken. We wanted a first session where nobody installs anything.",
      "The playground runs CPython in the browser through Pyodide, so students type turtle.forward(100) and immediately see a line appear. No sign-up, no setup, and a shareable link for whatever they draw.",
      "It's now the default first hour of our intro workshops, and we hand it out to anyone who asks.",
    ],
  },
  {
    slug: "course-review-wiki",
    title: "Course Review Wiki",
    tag: "Academics",
    description:
      "Crowd-sourced notes on CS electives at Ashoka: what the workload is actually like and who to take them with.",
    image: "/img/events/intro-to-notion.png",
    year: "2024",
    stack: ["Next.js", "MDX", "GitHub PRs"],
    links: [{ label: "Reviews", href: "https://reviews.cssoc.dev" }],
    body: [
      "Course descriptions tell you what a class covers. They don't tell you whether the problem sets take four hours or forty, or whether the exam is open-book.",
      "The wiki collects short, honest reviews from students who've taken the course, submitted as pull requests so the discussion stays public and every claim has a name behind it.",
      "Reviews are read-only once merged, but we re-open them each semester so students can add what changed.",
    ],
  },
  {
    slug: "soc-stack-cli",
    title: "Soc-stack CLI",
    tag: "Tooling",
    description:
      "A small command-line tool that scaffolds workshop repos, slides and event pages so organisers stop copy-pasting from last term.",
    image: "/img/events/github-workshop.png",
    year: "2026",
    stack: ["Node", "TypeScript", "Ink"],
    links: [{ label: "Source", href: "https://github.com/cssoc-ashoka/soc-stack" }],
    body: [
      "Every workshop used to start the same way: find last semester's repo, rename it, delete the bits that don't apply, and hope nobody committed an API key.",
      "Soc-stack turns that into a single command. It scaffolds the repo with our linting and CI already configured, opens a slide deck in the society's theme, and creates the matching event page stub.",
      "It also refuses to commit until secrets are moved into environment variables, which has already saved us twice.",
    ],
  },
  {
    slug: "cs-mixer-photo-wall",
    title: "CS Mixer Photo Wall",
    tag: "Events",
    description:
      "The live photo wall we ran at the mixer, pulling everyone's uploads onto one screen through the evening.",
    image: "/img/events/acadsocsfair_1.jpg",
    year: "2026",
    stack: ["Next.js", "Sharp", "WebSockets"],
    links: [],
    body: [
      "A projector, a QR code and a shared screen. Guests scanned the code, uploaded a photo from their phone, and watched it appear on the wall a few seconds later.",
      "The server resizes every upload and strips the metadata before it's shown, so nobody's home address ends up on a projector in a lecture hall.",
      "It ran for four hours without falling over, which is more than we expected for a first attempt.",
    ],
  },
  {
    slug: "hackathon-starter-kit",
    title: "Hackathon Starter Kit",
    tag: "Open Source",
    description:
      "Opinionated templates for hackathon weekends — auth, database and deploy wired up so teams spend their time on the idea.",
    image: "/img/events/blockchain-workshop.png",
    year: "2025",
    stack: ["Next.js", "Prisma", "Vercel"],
    links: [{ label: "Source", href: "https://github.com/cssoc-ashoka/starter-kit" }],
    body: [
      "Judges don't care that you spent six hours on a login page. The starter kit gives teams authentication, a database and a one-click deploy before the opening ceremony is over.",
      "It's deliberately boring: no fancy state management, no custom design system, just the pieces every hackathon project needs and a README explaining how to rip the rest out.",
      "We hand it to every team at the start of the society's hackathon weekends.",
    ],
  },
  {
    slug: "alumni-connect-portal",
    title: "Alumni Connect Portal",
    tag: "Community",
    description:
      "A directory that lets current students reach CS alumni for internships, mentorship and honest advice about industry.",
    image: "/img/events/researchshowcase_3.png",
    year: "2026",
    stack: ["Next.js", "PostgreSQL", "Resend"],
    links: [],
    body: [
      "Our alumni are the best source of advice about internships and industry, but the introductions used to depend on who happened to know whom.",
      "The portal lets alumni opt in with the areas they're happy to talk about, and students request a conversation without needing anyone's personal email address.",
      "Alumni control exactly what's visible, and can pause their listing at any time.",
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

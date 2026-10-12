import { jetbrainsMono } from "@/utils/fonts";
import { MdEmail } from "react-icons/md";
import { FaInstagram, FaXTwitter, FaGithub, FaLinkedin } from "react-icons/fa6";

const socialLinks = [
  { label: "Email", href: "mailto:cs.society@ashoka.edu.in", Icon: MdEmail },
  { label: "Instagram", href: "https://www.instagram.com/cs.ashoka/", Icon: FaInstagram },
  { label: "Twitter", href: "https://twitter.com/cs_ashoka", Icon: FaXTwitter },
  { label: "GitHub", href: "https://github.com/cs-ashoka", Icon: FaGithub },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/cs-society-ashoka-universtiy/", Icon: FaLinkedin },
];

type CreditPerson = { name: string; href?: string };

const credits: { role: string; names: CreditPerson[] }[] = [
  { role: "Designed by", names: [{ name: "Parth Agarwal", href: "https://parthagarwal.vercel.app/" }] },
  { role: "Website team", names: [{ name: "Savyam" }, { name: "Ananya" }, { name: "Suryansh" }] },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface-container-low">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-row justify-between items-center gap-4">
        <div className="text-left">
          <div className="text-sm md:text-xl font-black tracking-tight mb-1">CS Soc</div>
          <p className="text-on-surface-variant text-[10px] md:text-sm">
            © {new Date().getFullYear()} CS Society. All rights reserved.
          </p>
        </div>
        <div className={`${jetbrainsMono.className} flex flex-col items-end gap-2`}>
          <div className="flex items-center gap-4 text-lg md:text-2xl">
            {socialLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                title={label}
                {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="text-on-surface-variant hover:text-primary transition-colors"
              >
                <Icon />
              </a>
            ))}
          </div>
          <div className="text-[10px] md:text-xs text-on-surface-variant/60">v1.0.0</div>
        </div>
      </div>

      <div className="w-full border-t border-border bg-surface-container-low">
        <div
          className={`${jetbrainsMono.className} max-w-5xl mx-auto px-6 py-3 flex flex-col md:flex-row items-center justify-center gap-1 md:gap-8 text-[10px] md:text-xs uppercase tracking-wide text-center`}
        >
          {credits.map((credit) => (
            <span key={credit.role} className="whitespace-nowrap">
              <span className="text-on-surface-variant/60">{credit.role}:</span>{" "}
              {credit.names.map((person, i) => (
                <span key={person.name} className="text-on-surface font-medium">
                  {person.href ? (
                    <a
                      href={person.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors"
                    >
                      {person.name}
                    </a>
                  ) : (
                    person.name
                  )}
                  {i < credit.names.length - 1 ? ", " : ""}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}

import { ArrowUpRight } from "lucide-react";
import { CREATOR, SOCIALS } from "../content-data/content";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink text-white/70">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 py-10 sm:flex-row">
        <div>
          <p className="font-display text-lg text-paper">{CREATOR.name}</p>
          <p className="text-sm text-white/50">{CREATOR.tagline}</p>
        </div>
        <div className="flex items-center gap-4">
          {SOCIALS.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-white/50 transition hover:text-paper"
            >
              <Icon className="h-5 w-5" fill="currentColor" />
            </a>
          ))}
          <a
            href={CREATOR.etsyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 inline-flex items-center gap-1 rounded-full border border-white/15 px-4 py-1.5 text-sm text-paper transition hover:bg-white/5"
          >
            Etsy <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/40">
        © {new Date().getFullYear()} {CREATOR.name}. All artwork is my own.
      </div>
    </footer>
  );
}

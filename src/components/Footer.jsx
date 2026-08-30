import { ArrowUpRight } from "lucide-react";
import { CREATOR, SOCIALS } from "../content-data/content";
import Eyebrow from "./Eyebrow";

const PILL =
  "inline-flex items-center gap-2 rounded-full bg-panel px-[22px] py-3 font-ui text-[14.5px] font-semibold text-berry transition hover:-translate-y-[3px] hover:shadow-lift";

export default function Footer() {
  return (
    <footer className="mx-auto flex max-w-[1440px] flex-wrap items-end justify-between gap-[30px] border-t border-ink/12 px-[6vw] pt-[42px] pb-[54px]">
      <div>
        <div className="mb-2 font-display text-[22px] font-bold">{CREATOR.name}</div>
        <Eyebrow>
          © {new Date().getFullYear()} · {CREATOR.tagline} · all work my own
        </Eyebrow>
      </div>

      <div className="flex flex-wrap gap-3">
        {SOCIALS.map(({ label, href, Icon }) => (
          <a key={label} className={PILL} href={href} target="_blank" rel="noopener noreferrer">
            <Icon className="h-4 w-4" fill="currentColor" aria-hidden="true" />
            {label}
          </a>
        ))}
        <a className={PILL} href={CREATOR.etsyUrl} target="_blank" rel="noopener noreferrer">
          Etsy <ArrowUpRight size={14} />
        </a>
      </div>
    </footer>
  );
}

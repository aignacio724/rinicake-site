import { ArrowUpRight, Heart } from "lucide-react";
import { CREATOR } from "../content-data/content";
import { scrollToId } from "../lib/scrollTo";
import Tile from "./Tile";


export default function Hero() {
  return (
    <section id="top" className="mx-auto max-w-6xl px-5 pb-16 pt-14 md:pt-20">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-berry">
            <Heart size={13} className="fill-berry" /> {CREATOR.tagline}
          </p>
          <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight text-ink md:text-7xl">
            {CREATOR.name}
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
            {CREATOR.blurb}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => scrollToId("work")}
              className="rounded-full border border-ink/15 px-6 py-2.5 text-sm font-medium text-ink transition hover:border-ink hover:bg-ink hover:text-paper"
            >
              View the work
            </button>
            <a
              href={CREATOR.etsyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-berry px-6 py-2.5 text-sm font-medium text-white transition hover:bg-berry-dark"
            >
              Shop on Etsy <ArrowUpRight size={16} />
            </a>
          </div>
        </div>

        <div className="mx-auto w-full max-w-sm md:max-w-none">
          <Tile title="Featured work" src="" ratio={4 / 5} />
        </div>
      </div>
    </section>
  );
}
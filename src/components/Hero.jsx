import { ArrowUpRight } from "lucide-react";
import { CREATOR } from "../content-data/content";
import { scrollToId } from "../lib/scrollTo";
import { btn } from "../lib/styles";
import Tile from "./Tile";

export default function Hero() {
  return (
    <header
      id="top"
      className="mx-auto grid max-w-[1440px] items-center gap-14 px-[6vw] pt-[92px] pb-[78px] min-[900px]:grid-cols-[1.15fr_0.85fr]"
    >
      <div>
        {CREATOR.commissionsOpen && (
          <div className="mb-[26px] inline-flex items-center gap-[9px] rounded-full bg-panel px-[15px] py-[7px] pl-3 font-ui text-[13px] font-semibold text-berry">
            <span className="h-2 w-2 rounded-full bg-[#7c9a5a]" />
            {CREATOR.commissionsNote}
          </div>
        )}

        <h1 className="mb-6 font-display text-[clamp(44px,6.2vw,84px)] leading-[0.98] font-bold tracking-[-0.03em] text-ink">
          {CREATOR.headline.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>

        <p className="mb-[34px] max-w-[50ch] text-[18.5px] leading-[1.65] text-berry text-pretty">
          {CREATOR.lede}
        </p>

        <div className="flex flex-wrap gap-3">
          <button onClick={() => scrollToId("work")} className={btn()}>
            See the work
          </button>
          <a
            href={CREATOR.etsyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={btn({ variant: "ghost" })}
          >
            Shop on Etsy <ArrowUpRight size={16} />
          </a>
        </div>
      </div>

      <div className="rounded-[30px] bg-panel p-4 shadow-float">
        <Tile
          image={CREATOR.image}
          alt={CREATOR.imageAlt}
          label="portrait / studio photo"
          ratio="4 / 5"
          radius={18}
        />
      </div>
    </header>
  );
}

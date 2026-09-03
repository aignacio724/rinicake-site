import { Link } from "react-router-dom";
import { WORK } from "../content-data/content";
import Section, { SectionHead } from "./Section";
import Eyebrow from "./Eyebrow";
import Tile from "./Tile";
import { TAG } from "../lib/styles";

export default function WorkGrid() {
  return (
    <Section id="work">
      <SectionHead title="Current work">
        <Eyebrow>{String(WORK.length).padStart(2, "0")} pieces</Eyebrow>
        <Link
          to="/portfolio"
          className="rounded-full bg-panel px-[22px] py-3 font-ui text-[14.5px] font-semibold text-berry transition hover:-translate-y-[3px] hover:shadow-lift"
        >
          See full portfolio →
        </Link>
      </SectionHead>

      <div className="mosaic">
        {WORK.map((w) => (
          <article
            key={w.title}
            className="group rounded-card bg-panel px-3.5 pt-3.5 pb-5 shadow-card transition duration-200 hover:-translate-y-1.5 hover:shadow-lift"
            style={{ gridColumn: `span ${w.span}` }}
          >
            <Tile image={w.image} alt={w.alt} label={w.slot} ratio={w.ratio} />

            <div className="mt-[15px] flex items-baseline justify-between gap-3.5 px-1">
              <h3 className="font-display text-lg font-bold">{w.title}</h3>
              <Eyebrow sm>{w.year}</Eyebrow>
            </div>

            {w.note && (
              <p className="mt-[7px] px-1 text-[14.5px] leading-[1.55] text-muted">{w.note}</p>
            )}

            {w.tags?.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-[7px] px-1">
                {w.tags.map((t) => (
                  <span key={t} className={TAG}>
                    {t}
                  </span>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </Section>
  );
}

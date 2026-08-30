import { UPCOMING } from "../content-data/content";
import Section, { SectionHead } from "./Section";
import Eyebrow from "./Eyebrow";
import Tile from "./Tile";

export default function Upcoming() {
  return (
    <Section id="upcoming">
      <SectionHead title="Upcoming">
        <Eyebrow>Works in progress</Eyebrow>
      </SectionHead>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
        {UPCOMING.map((u) => (
          <article
            key={u.title}
            className="group flex flex-col rounded-card bg-panel p-3.5 shadow-card transition duration-200 hover:-translate-y-1.5 hover:shadow-lift"
          >
            <Tile src={u.src} label={u.slot} ratio="16 / 11">
              <span className="absolute top-3.5 left-3.5 inline-flex items-center gap-[7px] rounded-full bg-berry px-3 py-1.5 font-ui text-[11.5px] font-semibold text-white">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: u.dot }}
                />
                {u.status}
              </span>
            </Tile>

            <h3 className="mt-[15px] px-1 font-display text-lg font-bold">{u.title}</h3>

            {u.note && (
              <p className="mt-[7px] px-1 text-[14.5px] leading-[1.55] text-muted">{u.note}</p>
            )}

            <div className="mx-1 mt-auto mb-1.5 flex justify-between border-t border-line pt-3.5">
              <Eyebrow sm>{u.eta}</Eyebrow>
              <Eyebrow sm>{u.medium}</Eyebrow>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

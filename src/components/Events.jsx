import { EVENTS } from "../content-data/content";
import Section, { SectionHead } from "./Section";
import Eyebrow from "./Eyebrow";
import { TAG } from "../lib/styles";

export default function Events() {
  return (
    <Section id="events">
      <SectionHead title="Where to find me">
        <Eyebrow>Events &amp; conventions</Eyebrow>
      </SectionHead>

      <div className="flex flex-col gap-3">
        {EVENTS.map((ev) => (
          <article
            key={ev.name}
            className={[
              "grid items-center gap-6 rounded-[22px] bg-panel px-[26px] py-[22px] shadow-card transition duration-200",
              "min-[900px]:grid-cols-[130px_1fr_auto]",
              ev.past
                ? "opacity-55"
                : "hover:-translate-y-[3px] hover:shadow-[0_20px_36px_-28px_rgb(42_18_24_/_0.45)]",
            ].join(" ")}
          >
            <div>
              <div
                className={`font-display text-xl leading-[1.15] font-bold text-berry ${ev.past ? "line-through" : ""}`}
              >
                {ev.date}
              </div>
              <Eyebrow sm>{ev.year}</Eyebrow>
            </div>

            <div>
              <h3 className={`font-display text-lg font-bold ${ev.past ? "line-through" : ""}`}>
                {ev.name}
              </h3>
              <p className="mt-[7px] text-[14.5px] leading-[1.55] text-muted">
                {[ev.place, ev.detail].filter(Boolean).join(" · ")}
              </p>
            </div>

            <span className={TAG}>{ev.status}</span>
          </article>
        ))}
      </div>
    </Section>
  );
}

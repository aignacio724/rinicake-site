import { ABOUT } from "../content-data/content";
import Section from "./Section";
import Eyebrow from "./Eyebrow";
import Tile from "./Tile";

export default function About() {
  return (
    <Section id="about">
      <div className="grid items-center gap-[clamp(28px,4vw,56px)] rounded-[32px] bg-panel p-[clamp(28px,4vw,56px)] shadow-card min-[900px]:grid-cols-[0.8fr_1.2fr]">
        <Tile label={ABOUT.slot} ratio="1 / 1" radius={24} />

        <div>
          <h2 className="mb-5 font-display text-[clamp(28px,3.4vw,42px)] font-bold tracking-[-0.02em]">
            About
          </h2>

          {ABOUT.paragraphs.map((p) => (
            <p key={p} className="mb-4 max-w-[56ch] text-[17.5px] leading-[1.7] text-muted text-pretty">
              {p}
            </p>
          ))}

          {ABOUT.stats.length > 0 && (
            <div className="mt-[26px] flex flex-wrap gap-[30px]">
              {ABOUT.stats.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-[26px] font-bold text-berry">{s.n}</div>
                  <Eyebrow sm>{s.label}</Eyebrow>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}

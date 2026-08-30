import { useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav.jsx";
import Footer from "../components/Footer.jsx";
import Section from "../components/Section.jsx";
import Eyebrow from "../components/Eyebrow.jsx";
import Tile from "../components/Tile.jsx";
import { PIECES, CATEGORIES } from "../content-data/content.js";
import { btn, chip } from "../lib/styles.js";

export default function FullPortfolio() {
  const [filter, setFilter] = useState("All");
  const shown = filter === "All" ? PIECES : PIECES.filter((p) => p.cat === filter);

  const years = PIECES.map((p) => p.year);
  const span = `${Math.min(...years)}—${Math.max(...years)}`;

  return (
    <>
      <Nav variant="portfolio" />

      <main>
        <header className="mx-auto max-w-[1440px] px-[6vw] pt-[76px] pb-10">
          <Eyebrow className="mb-[18px] block">Full portfolio · {span}</Eyebrow>
          <h1 className="mb-[22px] font-display text-[clamp(40px,5.4vw,72px)] leading-none font-bold tracking-[-0.03em]">
            Everything, in order.
          </h1>
          <p className="max-w-[50ch] text-[18.5px] leading-[1.65] text-berry text-pretty">
            Finished work across every medium — illustration, art toys, prints, stickers and
            commissions. Filter by medium, or scroll the whole thing.
          </p>
        </header>

        <div className="sticky top-[74px] z-15 bg-paper/95 py-4 backdrop-blur-[8px]">
          <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-[18px] px-[6vw]">
            <div className="flex flex-wrap gap-3">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  className={chip(filter === c)}
                  aria-pressed={filter === c}
                  onClick={() => setFilter(c)}
                >
                  {c}
                </button>
              ))}
            </div>
            <Eyebrow className="ml-auto">
              {shown.length} {shown.length === 1 ? "piece" : "pieces"}
            </Eyebrow>
          </div>
        </div>

        <Section>
          <div className="mosaic">
            {shown.map((p) => (
              <article
                key={p.title}
                className="group rounded-card bg-panel px-3.5 pt-3.5 pb-5 shadow-card transition duration-200 hover:-translate-y-1.5 hover:shadow-lift"
                style={{ gridColumn: `span ${p.span}` }}
              >
                <Tile src={p.src} label={p.slot} ratio={p.ratio} radius={15} />

                <div className="mt-[15px] flex items-baseline justify-between gap-3.5 px-1">
                  <h3 className="font-display text-lg font-bold">{p.title}</h3>
                  <Eyebrow sm>{p.year}</Eyebrow>
                </div>

                {p.medium && (
                  <p className="mt-[7px] px-1 text-[14.5px] leading-[1.55] text-muted">
                    {p.medium}
                  </p>
                )}
              </article>
            ))}
          </div>
        </Section>

        <Section>
          <div className="flex flex-wrap items-center justify-between gap-8 rounded-[30px] bg-panel p-[clamp(30px,4vw,54px)] shadow-card">
            <div>
              <h2 className="mb-2.5 font-display text-[clamp(24px,3vw,34px)] font-bold tracking-[-0.02em]">
                Want something like one of these?
              </h2>
              <p className="text-[14.5px] leading-[1.55] text-muted">
                Commissions open a few times a year. Point me at the piece you like and tell me
                what you&apos;re imagining.
              </p>
            </div>
            <Link className={btn()} to="/#contact">
              Start an inquiry
            </Link>
          </div>
        </Section>
      </main>

      <Footer />
    </>
  );
}

import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { CREATOR, NAV } from "../content-data/content";
import { scrollToId } from "../lib/scrollTo";

export default function Nav() {
    const [open, setOpen] = useState(false)
    const goTo = (id) => {
        scrollToId(id);
        setOpen(false)
    }

return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <button
          onClick={() => goTo("top")}
          className="font-display text-2xl tracking-tight text-ink transition hover:text-berry focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-berry focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
        >
          {CREATOR.name}
        </button>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => goTo(item.id)}
              className="text-sm text-muted transition hover:text-berry focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-berry focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
            >
              {item.label}
            </button>
          ))}
          <a
            href={CREATOR.etsyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-full bg-berry px-4 py-1.5 text-sm font-medium text-white transition hover:bg-berry-dark"
          >
            Shop on Etsy <ArrowUpRight size={15} />
          </a>
        </nav>

        <button
          className="text-ink md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-paper md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-5 py-3">
            {NAV.map((item) => (
              <button
                key={item.id}
                onClick={() => goTo(item.id)}
                className="py-2.5 text-left text-ink"
              >
                {item.label}
              </button>
            ))}
            <a
              href={CREATOR.etsyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-1 rounded-full bg-berry px-4 py-2 text-sm font-medium text-white"
            >
              Shop on Etsy <ArrowUpRight size={15} />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
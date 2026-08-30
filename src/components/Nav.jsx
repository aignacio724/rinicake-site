import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { CREATOR, NAV } from "../content-data/content";
import { scrollToId } from "../lib/scrollTo";
import { btn } from "../lib/styles";

export default function Nav({ variant = "home" }) {
  const [open, setOpen] = useState(false);
  const goTo = (id) => {
    scrollToId(id);
    setOpen(false);
  };

  const etsy = (opts) => (
    <a
      href={CREATOR.etsyUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={btn(opts)}
    >
      Shop on Etsy <ArrowUpRight size={15} />
    </a>
  );

  return (
    <header className="sticky top-0 z-20 border-b border-ink/8 bg-panel/95 backdrop-blur-[10px]">
      <div className="flex items-center justify-between gap-6 px-[6vw] py-[18px]">
        <Link
          to="/"
          className="flex items-center gap-[9px] font-display text-xl font-bold tracking-[-0.01em] text-ink"
        >
          <span className="h-3 w-3 rounded-full bg-berry" />
          {CREATOR.name}
        </Link>

        <nav className="hidden items-center gap-[26px] font-ui text-[14.5px] font-semibold md:flex">
          {variant === "home" ? (
            <>
              {NAV.map((item) => (
                <button
                  key={item.id}
                  onClick={() => goTo(item.id)}
                  className="cursor-pointer text-[#5c4750] transition hover:text-berry focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-berry focus-visible:ring-offset-2 focus-visible:ring-offset-panel"
                >
                  {item.label}
                </button>
              ))}
              {etsy({ size: "sm" })}
            </>
          ) : (
            <>
              <Link to="/" className="text-[#5c4750] transition hover:text-berry">
                ← Back home
              </Link>
              <Link className={btn({ size: "sm" })} to="/#contact">
                Get in touch
              </Link>
            </>
          )}
        </nav>

        <button
          className="cursor-pointer text-ink md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-panel md:hidden">
          <nav className="flex flex-col px-[6vw] py-3 font-ui font-semibold">
            {variant === "home" ? (
              <>
                {NAV.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => goTo(item.id)}
                    className="cursor-pointer py-2.5 text-left text-ink"
                  >
                    {item.label}
                  </button>
                ))}
                {etsy({ className: "mt-2 w-full" })}
              </>
            ) : (
              <>
                <Link to="/" className="py-2.5 text-ink" onClick={() => setOpen(false)}>
                  ← Back home
                </Link>
                <Link
                  className={btn({ className: "mt-2 w-full" })}
                  to="/#contact"
                  onClick={() => setOpen(false)}
                >
                  Get in touch
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

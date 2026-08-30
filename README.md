# Rinicake

Portfolio site for **Rinicake**.

A home page that shows the work first — a mosaic gallery, works in progress, a schedule of in-person
events, an about panel and a contact form — plus a separate `/portfolio` page holding everything,
filterable by medium.

## Tech stack

- **React 19** + **Vite 8**
- **react-router-dom** for the two routes
- **Tailwind CSS 4** for styling
- **lucide-react** for UI icons, plus local brand SVGs imported as components via `vite-plugin-svgr`
- **ESLint** (flat config) with the React Hooks and React Refresh plugins

## Design

The theme is defined once in `src/index.css` under `@theme`, using semantic names rather than raw
color values, so the palette can shift without touching component markup:

| Token | Role |
| --- | --- |
| `paper` | blush page background |
| `panel` | cards, forms, nav |
| `line` | hairline borders |
| `ink` | headings and body text |
| `muted` | secondary text |
| `meta` | tertiary text and mono labels |
| `slot` | label on an empty image slot |
| `berry` | raspberry accent (`berry-dark` for hover, `berry-soft` for tints) |

Type is **Playfair Display** for display copy, **Quicksand** (`font-ui`) for buttons and form labels,
and **Nunito** (`font-sans`) for body text, loaded from Google Fonts in `index.html`.

Two custom utilities live in `index.css` because utility classes can't express them:

- `hatch` — the diagonal fill behind an image slot with no artwork yet.
- `mosaic` — the six-column gallery grid. Tiles set their own `grid-column: span N` inline, and an
  inline style can't be overridden by a responsive utility, so the collapse to two columns under
  900px and one under 560px is defined there.

Shared button and pill classes are built by `btn()`, `chip()` and `TAG` in `src/lib/styles.js`, so an
`<a>`, a `<button>` and a router `<Link>` can all look like the same control.

Accessibility is handled as the components are built, not bolted on after: `prefers-reduced-motion`
collapses scroll behavior and transitions, interactive elements carry `focus-visible` rings, the
mobile menu toggle exposes `aria-expanded` and a state-aware `aria-label`, the portfolio filters
expose `aria-pressed`, and the contact form's result message is a `role="status"` live region.

## Getting started

Requires Node 18 or newer.

```bash
npm install
npm run dev      # start the local dev server
npm run build    # production build to dist/
npm run preview  # serve the production build locally
npm run lint     # run eslint
```

## Deploying

`/portfolio` is a client-side route, so the host has to serve `index.html` for any path — otherwise a
direct visit or a refresh on that URL 404s. On Netlify that's a `_redirects` file containing
`/*  /index.html  200`; Vercel and most static hosts have an equivalent SPA rewrite setting.

## Project structure

```
src/
  main.jsx                # React entry point, mounts BrowserRouter
  App.jsx                 # routes: / and /portfolio
  index.css               # Tailwind entry, @theme tokens, hatch + mosaic utilities
  pages/
    Home.jsx              # composes the home sections
    FullPortfolio.jsx     # filterable gallery of everything
  components/
    Nav.jsx               # sticky header with mobile menu; variant="portfolio" for the subpage
    Hero.jsx              # badge, headline, lede, CTAs, featured slot
    WorkGrid.jsx          # home mosaic
    Upcoming.jsx          # works in progress, with status pills
    Events.jsx            # event schedule
    About.jsx             # about panel and optional stats
    Contact.jsx           # Web3Forms-backed form
    Footer.jsx            # socials, Etsy, credits
    Section.jsx           # page-width wrapper + SectionHead
    Tile.jsx              # image slot: artwork, or a labelled placeholder
    Eyebrow.jsx           # small uppercase mono label
    Field.jsx             # labelled text input
  content-data/
    content.js            # ← all site content lives here
  lib/
    scrollTo.js           # smooth scroll helper + cross-route hash scrolling
    styles.js             # shared button / chip / tag classes
  assets/icons/           # brand SVGs, imported with ?react
```

## Editing site content

**`src/content-data/content.js` is the single source of truth.** Bio, links, gallery, prototypes and
event schedule all live there, and the components just render whatever they find. Updating the site
should not require opening a `.jsx` file.

### `CREATOR`

Name, tagline, blurb and Etsy shop URL, plus the hero's `headline` (one array entry per rendered
line), `lede`, and the `commissionsOpen` / `commissionsNote` pill. Also holds the Web3Forms access
key that backs the contact form; it's a public client-side key and is safe to commit.

### `SOCIALS`

An array of `{ label, href, Icon }`. `Icon` is a local SVG imported with `?react` at the top of the
file, so it renders as a component and inherits `currentColor`.

### `NAV`

`{ id, label }` pairs for the header links. The `id` must match the `id` attribute on the
corresponding section — that's what `scrollToId()` in `src/lib/scrollTo.js` looks up.

### `WORK` and `PIECES`

The home mosaic and the `/portfolio` mosaic. Both share a shape:

- `src` — an image URL or a local import. **Leave it empty and the tile renders a labelled hatch
  placeholder instead**, so layout work can happen before the art is ready. Every entry in the file
  right now (`"Piece one"`, `"Piece two"`, …) is exactly that.
- `slot` — what belongs in that image area; used as the placeholder's label.
- `span` — how many of the six mosaic columns the tile occupies.
- `ratio` — width / height of the image area, e.g. `"3 / 4"` for a portrait tile.
- `note` (home) / `medium` (portfolio) — a line of copy under the title. Leave it empty and the line
  isn't rendered.
- `tags` (home only) — medium and availability pills. Leave the array empty for none.
- `cat` (portfolio only) — the filter category. It **must** appear in `CATEGORIES` or the piece
  can't be reached by any filter.

### `UPCOMING`

Works in progress, as `{ title, status, dot, src, slot, note, eta, medium }`. `dot` is the color of
the indicator inside the status pill.

### `EVENTS`

Event schedule, as `{ name, date, year, place, detail, status, past }`. Add one by appending:

```js
{ name: "Fall Art Market", date: "Oct 4", year: "2026", place: "Oakland, CA", detail: "", status: "Confirmed", past: false },
```

Once an event is over set `past: true` rather than deleting it — the entry stays visible but dims and
strikes through. `detail` is optional; leave it empty and only the place is shown.

### `ABOUT`

`slot` for the image, `paragraphs` for the copy, and `stats` for the figure row. **Leave `stats`
empty and the row isn't rendered** — there's a commented-out example in the file showing the shape.

### `CONTACT_TOPICS` and `CONTACT_NOTES`

The options in the contact form's subject dropdown, and the mono lines shown beside the form.

## Status

The page structure is complete; the content is placeholder.

- [x] **Nav** — sticky header, mobile menu, portfolio variant
- [x] **Hero** — badge, headline, CTAs, featured slot
- [x] **Work** — home mosaic
- [x] **Upcoming** — works in progress
- [x] **Events** — schedule, with past events dimmed
- [x] **About** — copy panel, optional stats
- [x] **Contact** — Web3Forms-backed form
- [x] **Footer** — socials, Etsy, credits
- [x] **Full portfolio** — `/portfolio`, filterable by medium
- [ ] Real artwork replacing the placeholders in `WORK`, `PIECES`, `UPCOMING` and `ABOUT`
- [ ] Real copy for the hero headline/lede, the About paragraphs and the piece notes
- [ ] Real event details, and `ABOUT.stats` filled in or left out for good

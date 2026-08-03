# Rinicake

Portfolio site for **Rinicake**.

A single-page site built to show the work first: a gallery of pieces, a link out to the Etsy shop, a schedule of upcoming in-person shows, and a contact form for commissions and wholesale inquiries.

## Tech stack

- **React 19** + **Vite 8**
- **Tailwind CSS 4** for styling
- **lucide-react** for icons
- **ESLint** (flat config) with the React Hooks and React Refresh plugins

## Design

The theme is defined once in `tailwind.config.js` using semantic names rather than raw color values, so the palette can shift without touching component markup:

| Token | Role |
| --- | --- |
| `paper` | warm ivory page background |
| `panel` | cards and alternating sections |
| `ink` | headings and body text |
| `muted` | secondary text |
| `line` | hairline borders |
| `berry` | raspberry accent (`berry-dark` for hover, `berry-soft` for tints) |

Type is a **Fraunces** display face paired with **Hanken Grotesk** for body copy, loaded from Google Fonts in `index.html`.

Accessibility is handled as the components are built, not bolted on after: `prefers-reduced-motion` collapses scroll behavior and transitions in `src/index.css`, interactive elements carry `focus-visible` rings, and the mobile menu toggle exposes `aria-expanded` and a state-aware `aria-label`.

## Getting started

Requires Node 18 or newer.

```bash
npm install
npm run dev      # start the local dev server
npm run build    # production build to dist/
npm run preview  # serve the production build locally
npm run lint     # run eslint
```

## Project structure

```
src/
  main.jsx                # React entry point
  App.jsx                 # composes the page sections
  index.css               # Tailwind entry + base styles
  components/
    Nav.jsx               # sticky header with mobile menu
    Hero.jsx              # name, tagline, primary CTAs
    Tile.jsx              # gallery tile with placeholder fallback
  content-data/
    content.js            # ← all site content lives here
  lib/
    scrollTo.js           # smooth scroll-to-section helper
```

## Editing site content

**`src/content-data/content.js` is the single source of truth.** Bio, links, gallery, and show schedule all live there, and the components just render whatever they find. Updating the site should not require opening a `.jsx` file.

### `CREATOR`

Name, tagline, blurb, and Etsy shop URL — these feed the nav, hero, and shop links. Also holds the Web3Forms access key that backs the contact form; it's a public client-side key and is safe to commit.

### `SOCIALS`

An array of `{ label, href, Icon }`. `Icon` is a lucide-react component, imported at the top of the file.

### `NAV`

`{ id, label }` pairs for the header links. The `id` must match the `id` attribute on the corresponding `<section>` — that's what `scrollToId()` in `src/lib/scrollTo.js` looks up to scroll smoothly to it.

### `WORK`

Gallery pieces, as `{ title, src, ratio }`:

- `src` — an image URL or a local import. **Leave it empty and the tile renders a labeled gradient placeholder instead**, so layout work can happen before the art is ready. The entries currently in the file (`"Piece one"`, `"Piece two"`, …) are exactly that.
- `ratio` — width ÷ height, e.g. `3 / 4` for a portrait tile, `1` for a square.

### `CONTACT_TOPICS`

The options offered in the contact form's subject dropdown.

### `SHOWS`

Event schedule, as `{ name, city, dates, past }`. Add a new one by appending to the array:

```js
{ name: "Fall Art Market", city: "Oakland, CA", dates: "Oct 4, 2026", past: false },
```

Once an event is over, set `past: true` rather than deleting it — the entry stays visible but dims and strikes through. The shows in the file right now are placeholder data.

## Status

The site is in active development. Sections land one at a time in `App.jsx`.

- [x] **Nav** — sticky header, mobile menu
- [x] **Hero** — intro, CTAs, featured tile
- [ ] **Gallery** — work grid
- [ ] **Shop CTA** — Etsy callout
- [ ] **Shows** — event schedule
- [ ] **Contact** — Web3Forms-backed form
- [ ] **Footer** — socials and credits
- [ ] Real artwork replacing the gallery placeholders

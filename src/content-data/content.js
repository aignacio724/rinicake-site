/**
 * Site content loader.
 *
 * The content itself lives as JSON under `content/` at the repo root — one file
 * per piece, prototype and event, plus `content/site.json` for the singletons.
 * That's what the admin UI writes and what you edit by hand.
 *
 * This module is the adapter between those files and the components: it globs
 * them, sorts them, resolves the pieces that can't be expressed in JSON (social
 * icons are React components), derives what shouldn't be typed by hand (event
 * dates), and re-exports the same names it always has. Components import from
 * here and don't know or care where the data came from.
 */

import Instagram from "../assets/icons/instagram.svg?react";
import Facebook from "../assets/icons/facebook.svg?react";
import Threads from "../assets/icons/threads.svg?react";
import TikTok from "../assets/icons/tiktok.svg?react";

import site from "../../content/site.json";
import images from "./images.json";

/** JSON can only hold the icon's name; map it back to the imported component. */
const ICONS = {
  instagram: Instagram,
  facebook: Facebook,
  threads: Threads,
  tiktok: TikTok,
};

/**
 * Resolve a content record's `image` filename against the manifest that
 * scripts/build-images.mjs produces. Returns null when the piece has no
 * artwork yet, which is what makes a tile fall back to its labelled
 * placeholder — so layout work can still happen before the photos exist.
 */
function resolveImage(file, sizes) {
  if (!file) return null;
  // The manifest is keyed by bare filename, but the admin UI writes whatever
  // its `public_folder` is set to ("/images/originals/foo.jpg"). Take the last
  // segment so either form resolves.
  const meta = images[file.split("/").pop()];
  return meta ? { ...meta, sizes } : null;
}

/**
 * How wide a mosaic tile should be, in columns of six. Landscape work earns
 * more room than portrait work. Authored `span` always wins, so a deliberate
 * layout is still possible.
 */
function spanFor(ratio) {
  if (ratio >= 1.5) return 4;
  if (ratio >= 1.0) return 3;
  return 2;
}

/** A mosaic tile is `span/6` of a 88vw content column, one or two up on small screens. */
function sizesFor(span) {
  return `(max-width: 560px) 100vw, (max-width: 900px) 50vw, ${Math.round((span / 6) * 88)}vw`;
}

/**
 * Fill in the layout fields a piece shouldn't have to declare. With artwork
 * present, `ratio` comes from the file's real pixel dimensions and `span` from
 * its shape; without it, both fall back to whatever the JSON authored.
 */
function resolvePiece(item) {
  const meta = item.image ? images[item.image] : null;
  const ratio = item.ratio ?? (meta ? meta.ratio : "4 / 3");
  const span = item.span ?? (meta ? spanFor(meta.ratio) : 3);
  return { ...item, ratio, span, image: resolveImage(item.image, sizesFor(span)) };
}

/**
 * Folder collections are ordered by their `order` field, with the filename as a
 * tie-break so the result is always deterministic. Reordering the mosaic means
 * changing a number, which works from the admin UI as well as an editor.
 */
function collection(modules) {
  return Object.entries(modules)
    .sort(
      ([pathA, a], [pathB, b]) =>
        (a.order ?? 0) - (b.order ?? 0) || pathA.localeCompare(pathB),
    )
    .map(([, item]) => item);
}

// ---------------------------------------------------------------- singletons

export const CREATOR = {
  ...site.creator,
  // The hero sits beside the headline at roughly 40% of the page on desktop.
  image: resolveImage(site.creator.image, "(max-width: 900px) 92vw, 38vw"),
};

export const SOCIALS = site.socials.map(({ label, href, icon }) => ({
  label,
  href,
  Icon: ICONS[icon],
}));

export const NAV = site.nav;
export const CONTACT_TOPICS = site.contactTopics;
export const CONTACT_NOTES = site.contactNotes;
export const CATEGORIES = site.categories;

export const ABOUT = {
  ...site.about,
  image: resolveImage(site.about.image, "(max-width: 900px) 92vw, 32vw"),
};

// --------------------------------------------------------------- collections

export const WORK = collection(
  import.meta.glob("../../content/work/*.json", { eager: true, import: "default" }),
).map(resolvePiece);

export const PIECES = collection(
  import.meta.glob("../../content/pieces/*.json", { eager: true, import: "default" }),
).map(resolvePiece);

// Upcoming cards use a fixed 16/11 crop, so only the image needs resolving.
export const UPCOMING = collection(
  import.meta.glob("../../content/upcoming/*.json", { eager: true, import: "default" }),
).map((item) => ({
  ...item,
  image: resolveImage(item.image, "(max-width: 560px) 100vw, (max-width: 900px) 50vw, 29vw"),
}));

// -------------------------------------------------------------------- events

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/**
 * Today as YYYY-MM-DD in the *viewer's* timezone. Comparing ISO date strings
 * lexicographically gives correct ordering with no timezone arithmetic, and
 * building the string from local parts avoids the UTC skew that
 * `toISOString()` would introduce for anyone west of Greenwich.
 */
function today() {
  const now = new Date();
  return [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("-");
}

/** "2027-04-12" + "2027-04-13" -> "Apr 12—13"; across months -> "Apr 30 — May 2". */
function formatRange(start, end) {
  const [, sm, sd] = start.split("-");
  const month = (m) => MONTHS[Number(m) - 1];
  if (!end) return `${month(sm)} ${Number(sd)}`;
  const [, em, ed] = end.split("-");
  return sm === em
    ? `${month(sm)} ${Number(sd)}—${Number(ed)}`
    : `${month(sm)} ${Number(sd)} — ${month(em)} ${Number(ed)}`;
}

/**
 * `past` is derived here rather than in a build script on purpose: this module
 * is evaluated in the browser on every page load, so an event dims the day
 * after it ends whether or not the site has been rebuilt since.
 */
const events = collection(
  import.meta.glob("../../content/events/*.json", { eager: true, import: "default" }),
).map((ev) => {
  const past = (ev.end ?? ev.start) < today();
  return {
    ...ev,
    past,
    year: ev.start.slice(0, 4),
    date: ev.displayDate || formatRange(ev.start, ev.end),
    status: past ? "Past" : ev.status,
  };
});

// Soonest first, with finished events collected at the end, most recent first.
export const EVENTS = [
  ...events.filter((e) => !e.past).sort((a, b) => a.start.localeCompare(b.start)),
  ...events.filter((e) => e.past).sort((a, b) => b.start.localeCompare(a.start)),
];

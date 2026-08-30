import Instagram from "../assets/icons/instagram.svg?react"
import Facebook  from "../assets/icons/facebook.svg?react"
import Threads   from "../assets/icons/threads.svg?react"
import TikTok    from "../assets/icons/tiktok.svg?react"

export const CREATOR = {
    name: "Rinicake",
    tagline: "Illustrator & art toy designer",
    blurb: "Creator of Dollypaca the Strawberry Alpaca",
    etsyUrl: "https://www.etsy.com/shop/rinicakeart",
    web3formsKey: "22d571d3-f05b-4f5e-ae54-c3a3c2ed8875",

    // Hero headline — one array entry per rendered line.
    headline: ["Illustrator &", "art toy", "designer."],
    lede: "Creator of Dollypaca the Strawberry Alpaca. Everything below is either finished, in the shop, or on its way there.",

    // The pill above the headline. Set commissionsOpen: false to hide it.
    commissionsOpen: true,
    commissionsNote: "Taking commissions",
};

export const SOCIALS = [
    { label: "Instagram", href: "https://www.instagram.com/rinicakez", Icon: Instagram },
    { label: "Facebook", href: "https://www.facebook.com/rinicakez", Icon: Facebook },
    { label: "Threads", href: "https://www.threads.com/@rinicakez", Icon: Threads },
    { label: "TikTok", href: "https://www.tiktok.com/@rinicakez", Icon: TikTok}
]

export const CONTACT_TOPICS = [
  "Commission inquiry",
  "Order question",
  "Business / wholesale",
  "Just saying hi",
  "Something else",
];

// Shown beside the contact form. Placeholder copy — edit or empty the array.
export const CONTACT_NOTES = [
  "Replies within 2—3 days",
  "Commission slots: 2 open",
];

export const NAV = [
  { id: "work", label: "Work" },
  { id: "upcoming", label: "Upcoming" },
  { id: "events", label: "Events" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

// Home-page gallery, laid out on a six-column mosaic.
//   src   — image URL or local import. Leave it empty and the tile renders a
//           labelled placeholder instead, so layout work can happen first.
//   slot  — what belongs in that image area; the placeholder's label.
//   span  — how many of the six columns the tile occupies.
//   ratio — width / height of the image area.
//   note  — a sentence about the piece. Omit and the line isn't rendered.
//   tags  — medium / availability pills. Omit for none.
export const WORK = [
  { title: "Piece one",   year: "2026", src: "", slot: "wide hero piece",   span: 4, ratio: "16 / 10", note: "", tags: ["Illustration"] },
  { title: "Piece two",   year: "2026", src: "", slot: "portrait detail",   span: 2, ratio: "3 / 4",   note: "", tags: ["Art toy"] },
  { title: "Piece three", year: "2026", src: "", slot: "portrait detail",   span: 2, ratio: "3 / 4",   note: "", tags: ["Illustration"] },
  { title: "Piece four",  year: "2026", src: "", slot: "wide flatlay",      span: 4, ratio: "16 / 10", note: "", tags: ["Art toy", "In shop"] },
  { title: "Piece five",  year: "2025", src: "", slot: "product photo",     span: 3, ratio: "4 / 3",   note: "", tags: ["Print"] },
  { title: "Piece six",   year: "2025", src: "", slot: "product photo",     span: 3, ratio: "4 / 3",   note: "", tags: ["Sticker"] },
  { title: "Piece seven", year: "2025", src: "", slot: "series photo",      span: 3, ratio: "4 / 3",   note: "", tags: ["Illustration", "In shop"] },
  { title: "Piece eight", year: "2025", src: "", slot: "character sheet",   span: 3, ratio: "4 / 3",   note: "", tags: ["Commission"] },
];

// Work in progress. `dot` is the color of the status pill's indicator.
export const UPCOMING = [
  { title: "Prototype one",   status: "In progress",  dot: "#e0a35a", src: "", slot: "wip photo",     note: "", eta: "TBA", medium: "MIXED" },
  { title: "Prototype two",   status: "Prototyping",  dot: "#7c9a5a", src: "", slot: "sketch / mock", note: "", eta: "TBA", medium: "DIGITAL" },
  { title: "Prototype three", status: "Coming soon",  dot: "#bf2b58", src: "", slot: "concept art",   note: "", eta: "TBA", medium: "PRINT" },
];

// Where to find you in person. Once an event is over set past: true rather than
// deleting it — the entry stays but dims and strikes through.
export const EVENTS = [
  { name: "Spring Art Market",  date: "Apr 12—13", year: "2026", place: "San Jose, CA",    detail: "", status: "Confirmed", past: false },
  { name: "Maker's Fair",       date: "May 24",    year: "2026", place: "Portland, OR",    detail: "", status: "Confirmed", past: false },
  { name: "Summer Con",         date: "Jul 2—5",   year: "2026", place: "Los Angeles, CA", detail: "", status: "Confirmed", past: false },
  { name: "Winter Craft Show",  date: "Jan 18",    year: "2026", place: "Seattle, WA",     detail: "", status: "Past",      past: true },
];

// The About section. Leave `stats` empty and the row isn't rendered.
export const ABOUT = {
  slot: "studio / desk photo",
  paragraphs: [
    "Rinicake is an illustrator and art toy designer, and the creator of Dollypaca the Strawberry Alpaca.",
    "Replace this paragraph with the longer version — how you work, what you make, and what you are after. Commissions and wholesale inquiries both go through the form below.",
  ],
  stats: [
    // { n: "2018", label: "making since" },
  ],
};

// The /portfolio page. Same mosaic as WORK, plus a `cat` used by the filter.
// Every `cat` must appear in CATEGORIES below or its pieces can't be reached.
export const CATEGORIES = ["All", "Illustration", "Art toys", "Prints", "Stickers", "Commissions"];

export const PIECES = [
  { title: "Piece one",      year: "2026", cat: "Illustration", medium: "Digital illustration",   src: "", slot: "series photo",    span: 3, ratio: "4 / 3" },
  { title: "Piece two",      year: "2026", cat: "Art toys",     medium: "Resin, hand-painted",    src: "", slot: "figure photo",    span: 2, ratio: "3 / 4" },
  { title: "Piece three",    year: "2026", cat: "Prints",       medium: "Giclée, A4",             src: "", slot: "print detail",    span: 1, ratio: "3 / 4" },
  { title: "Piece four",     year: "2026", cat: "Art toys",     medium: "Soft vinyl prototype",   src: "", slot: "wide flatlay",    span: 4, ratio: "16 / 9" },
  { title: "Piece five",     year: "2025", cat: "Stickers",     medium: "Die-cut vinyl sheet",    src: "", slot: "sticker flatlay", span: 2, ratio: "4 / 5" },
  { title: "Piece six",      year: "2025", cat: "Illustration", medium: "Ink and digital colour", src: "", slot: "illustration",    span: 2, ratio: "4 / 3" },
  { title: "Piece seven",    year: "2025", cat: "Commissions",  medium: "Character commission",   src: "", slot: "character sheet", span: 2, ratio: "4 / 3" },
  { title: "Piece eight",    year: "2025", cat: "Prints",       medium: "Risograph, 2 colours",   src: "", slot: "print detail",    span: 2, ratio: "4 / 3" },
  { title: "Piece nine",     year: "2024", cat: "Art toys",     medium: "Resin, limited run",     src: "", slot: "figure lineup",   span: 3, ratio: "16 / 10" },
  { title: "Piece ten",      year: "2024", cat: "Illustration", medium: "Gouache on paper",       src: "", slot: "painting scan",   span: 3, ratio: "16 / 10" },
  { title: "Piece eleven",   year: "2024", cat: "Stickers",     medium: "Holographic die-cut",    src: "", slot: "sticker photo",   span: 2, ratio: "1 / 1" },
  { title: "Piece twelve",   year: "2023", cat: "Commissions",  medium: "Full-body illustration", src: "", slot: "commission scan", span: 2, ratio: "4 / 3" },
];

import { Instagram, Facebook, Threads, TikTok, Icon } from "lucide-react"

export const CREATOR = {
    name: "Rini",
    tagline: "Illustrator & art toy designer",
    blurb: "Creator of Dollypaca the Strawberry Alpaca",
    etsyUrl: "https://www.etsy.com/shop/rinicakeart",
    web3formsKey: "9fc44995-7c5e-431a-b1cf-7573ddb19119",
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

export const NAV = [
  { id: "work", label: "Work" },
  { id: "shop", label: "Shop" },
  { id: "shows", label: "Shows" },
  { id: "contact", label: "Contact" },
];


// Your gallery. Put an image URL in src (local import or an image-CDN link).
// Leave src empty to show a placeholder tile. ratio = width / height.
export const WORK = [
  { title: "Piece one", src: "", ratio: 3 / 4 },
  { title: "Piece two", src: "", ratio: 1 },
  { title: "Piece three", src: "", ratio: 3 / 4 },
  { title: "Piece four", src: "", ratio: 1 },
  { title: "Piece five", src: "", ratio: 3 / 4 },
  { title: "Piece six", src: "", ratio: 1 },
  { title: "Piece seven", src: "", ratio: 3 / 4 },
  { title: "Piece eight", src: "", ratio: 3 / 4 },
];

// Your show schedule. Set past: true once an event is over (it dims + strikes through).
export const SHOWS = [
  { name: "Spring Art Market", city: "San Jose, CA", dates: "Apr 12-13, 2026", past: false },
  { name: "Maker's Fair", city: "Portland, OR", dates: "May 24, 2026", past: false },
  { name: "Summer Con", city: "Los Angeles, CA", dates: "Jul 2-5, 2026", past: false },
  { name: "Winter Craft Show", city: "Seattle, WA", dates: "Jan 18, 2026", past: true },
];
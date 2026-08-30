/**
 * Button classes, shared by the <a>, <button> and react-router <Link> elements
 * that all need to look like the same control.
 */

const BASE =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full font-ui font-semibold " +
  "transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-berry " +
  "focus-visible:ring-offset-2 focus-visible:ring-offset-paper";

const SIZES = {
  md: "px-7 py-[15px] text-[15.5px]",
  sm: "px-[18px] py-[9px] text-[14.5px]",
};

const VARIANTS = {
  primary: "border-[1.5px] border-berry bg-berry text-white hover:bg-berry-dark hover:border-berry-dark disabled:opacity-60 disabled:cursor-default",
  ghost: "border-[1.5px] border-line bg-panel text-ink hover:border-berry hover:text-berry",
};

export function btn({ variant = "primary", size = "md", className = "" } = {}) {
  return [BASE, SIZES[size], VARIANTS[variant], className].filter(Boolean).join(" ");
}

/** Pill used for a filter or an inquiry type — the selected one fills in. */
export function chip(active) {
  return [
    "cursor-pointer rounded-full border-[1.5px] px-5 py-[11px] font-ui text-sm font-semibold transition",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-berry focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
    active
      ? "border-berry bg-berry text-white"
      : "border-ink/15 bg-transparent text-ink hover:border-berry hover:text-berry",
  ].join(" ");
}

/** Small rounded label — a medium, a status, an event tag. */
export const TAG =
  "whitespace-nowrap rounded-full bg-paper px-3 py-1.5 font-ui text-xs font-semibold text-berry";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scroll to a section by its id smoothly
 */
export function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

/**
 * Arriving from another route on a URL like "/#contact" lands on the page but
 * not the section — the target doesn't exist yet when the router changes the
 * URL, so the browser has nothing to jump to. Scroll once the route has
 * rendered instead.
 */
export function useHashScroll() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    scrollToId(hash.slice(1));
  }, [hash]);
}

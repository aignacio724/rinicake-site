/**
 * Scroll to a section by its id smoothly
 */
export function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
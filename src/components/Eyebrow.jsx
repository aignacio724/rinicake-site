/**
 * Small uppercase mono label. Marks a section at full size; annotates a value
 * (a year, a medium, a count) at `sm`.
 */
export default function Eyebrow({ children, sm = false, className = "" }) {
  return (
    <span
      className={[
        "font-mono uppercase tracking-[0.04em]",
        sm ? "text-[11px] text-meta" : "text-xs text-berry",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </span>
  );
}

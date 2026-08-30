/**
 * One image area. Renders the artwork when `src` is set and a labelled hatch
 * placeholder when it isn't, so layout work can happen before the art is ready.
 * `children` overlays the area — used for the status pill on upcoming work.
 */
export default function Tile({ src, alt, label, ratio = "4 / 3", radius = 16, children }) {
  return (
    <div
      className="group/tile relative overflow-hidden"
      style={{ aspectRatio: ratio, borderRadius: radius }}
    >
      {src ? (
        <img
          src={src}
          alt={alt ?? label}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover/tile:scale-105"
        />
      ) : (
        <div className="hatch flex h-full w-full items-end p-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.04em] text-slot">
            {label}
          </span>
        </div>
      )}
      {children}
    </div>
  );
}

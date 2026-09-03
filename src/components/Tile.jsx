/**
 * One image area.
 *
 * `image` is a resolved entry from the manifest that scripts/build-images.mjs
 * writes — dimensions, avif/webp srcsets and an inline blur placeholder. When
 * a piece has no artwork yet the tile falls back to a labelled hatch instead,
 * so layout work can happen before the photos exist.
 *
 * `children` overlays the area — used for the status pill on upcoming work.
 */
export default function Tile({ image, label, alt, ratio = "4 / 3", radius = 16, children }) {
  return (
    <div
      className="group/tile relative overflow-hidden"
      style={{ aspectRatio: ratio, borderRadius: radius }}
    >
      {image ? (
        <picture>
          <source type="image/avif" srcSet={image.avif} sizes={image.sizes} />
          <source type="image/webp" srcSet={image.webp} sizes={image.sizes} />
          <img
            src={image.src}
            width={image.width}
            height={image.height}
            alt={alt || label || ""}
            loading="lazy"
            decoding="async"
            // The placeholder is ~300 bytes of base64 and paints the artwork's
            // colours behind the real file while it downloads.
            style={{ backgroundImage: `url("${image.lqip}")`, backgroundSize: "cover" }}
            className="h-full w-full object-cover transition duration-500 group-hover/tile:scale-105"
          />
        </picture>
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

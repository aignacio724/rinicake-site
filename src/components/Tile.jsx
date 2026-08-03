export default function Tile({ title, src, ratio }) {
  return (
    <div
      className="group relative overflow-hidden rounded-xl ring-1 ring-line"
      style={{ aspectRatio: ratio }}
    >
      {src ? (
        <img
          src={src}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-berry-soft via-paper to-berry-soft">
          <span className="text-[11px] uppercase tracking-[0.2em] text-muted">
            {title}
          </span>
        </div>
      )}
    </div>
  );
}

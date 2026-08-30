/**
 * Page-width wrapper shared by every section, including the scroll offset that
 * keeps a jump target clear of the sticky nav.
 */
export default function Section({ id, as: Tag = "section", className = "", children }) {
  return (
    <Tag
      id={id}
      className={`mx-auto max-w-[1440px] scroll-mt-[94px] px-[6vw] pt-5 pb-[90px] ${className}`}
    >
      {children}
    </Tag>
  );
}

/** Heading row: title on the left, metadata and links trailing right. */
export function SectionHead({ title, children }) {
  return (
    <div className="mb-[30px] flex flex-wrap items-end justify-between gap-6">
      <h2 className="font-display text-[clamp(28px,3.4vw,42px)] font-bold tracking-[-0.02em]">
        {title}
      </h2>
      {children && <div className="flex flex-wrap items-center gap-[18px]">{children}</div>}
    </div>
  );
}

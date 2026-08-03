// Small section label with a short rule. Marks a real section, not decoration.
export default function Eyebrow({ children }) {
  return (
    <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-berry">
      <span className="h-px w-6 bg-berry" />
      {children}
    </p>
  );
}

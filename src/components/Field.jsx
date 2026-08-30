// Labelled text input used by the contact form.
export default function Field({ label, name, type = "text", placeholder, required, autoComplete }) {
  return (
    <label className="flex flex-col gap-2.5">
      <span className="font-ui text-[12.5px] font-bold uppercase tracking-[0.06em] text-berry">
        {label}
      </span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        className="w-full rounded-[14px] border-[1.5px] border-line bg-panel px-4 py-3.5 text-[15.5px] text-ink outline-none transition placeholder:text-meta focus:border-berry"
      />
    </label>
  );
}

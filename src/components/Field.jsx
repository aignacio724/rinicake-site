// Labelled text input used by the contact form.
export default function Field({ label, name, type = "text", placeholder, required }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-lg border border-line bg-panel px-3.5 py-2.5 text-ink placeholder:text-muted focus:border-berry focus:outline-none focus:ring-2 focus:ring-berry/20"
      />
    </label>
  );
}

import { useState } from "react";
import { Mail } from "lucide-react";
import { CREATOR, SOCIALS, CONTACT_TOPICS } from "../content-data/content";
import Eyebrow from "./Eyebrow";
import Field from "./Field";

export default function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | ok | error

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    const data = new FormData(e.target);
    data.append("access_key", CREATOR.web3formsKey);
    data.append("subject", `New message from ${data.get("name") || "your site"}`);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        setStatus("ok");
        e.target.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" style={{ scrollMarginTop: "72px" }} className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-2 md:py-20">
        <div>
          <Eyebrow>Contact</Eyebrow>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            Let&apos;s talk
          </h2>
          <p className="mt-4 max-w-sm text-muted">
            Questions about an order or working together? Send a note
            and I&apos;ll get back to you as soon as I can.
          </p>
          <div className="mt-8 flex gap-3">
            {SOCIALS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="rounded-full border border-line p-2.5 text-muted transition hover:border-berry hover:text-berry"
              >
                <Icon className="h-4.5 w-4.5" fill="currentColor" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name" name="name" placeholder="Your name" required />
            <Field label="Email" name="email" type="email" placeholder="you@email.com" required />
          </div>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink">
              What&apos;s this about?
            </span>
            <select
              name="topic"
              className="w-full rounded-lg border border-line bg-panel px-3.5 py-2.5 text-ink focus:border-berry focus:outline-none focus:ring-2 focus:ring-berry/20"
            >
              {CONTACT_TOPICS.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink">Message</span>
            <textarea
              name="message"
              rows={5}
              required
              placeholder="Tell me a little about what you're after…"
              className="w-full rounded-lg border border-line bg-panel px-3.5 py-2.5 text-ink placeholder:text-muted focus:border-berry focus:outline-none focus:ring-2 focus:ring-berry/20"
            />
          </label>

          {/* Honeypot: hidden from people, tempting to bots */}
          <input
            type="checkbox"
            name="botcheck"
            tabIndex={-1}
            autoComplete="off"
            style={{ display: "none" }}
          />

          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex items-center gap-2 rounded-full bg-berry px-7 py-3 text-sm font-semibold text-white transition hover:bg-berry-dark disabled:opacity-60"
          >
            <Mail size={16} />
            {status === "sending" ? "Sending…" : "Send message"}
          </button>

          {status === "ok" && (
            <p className="text-sm font-medium text-emerald-700">
              Thanks — your message is on its way. I&apos;ll be in touch soon.
            </p>
          )}
          {status === "error" && (
            <p className="text-sm font-medium text-berry">
              Something went wrong sending that. Please email me directly instead.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
import { useState } from "react";
import { Mail } from "lucide-react";
import { CREATOR, SOCIALS, CONTACT_TOPICS, CONTACT_NOTES } from "../content-data/content";
import Section from "./Section";
import Field from "./Field";
import { btn } from "../lib/styles";

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
    <Section
      id="contact"
      className="grid items-start gap-[clamp(28px,4vw,60px)] min-[900px]:grid-cols-[0.85fr_1.15fr]"
    >
      <div className="pt-2">
        <h2 className="mb-[18px] font-display text-[clamp(28px,3.4vw,42px)] font-bold tracking-[-0.02em]">
          Let&apos;s talk
        </h2>
        <p className="mb-6 max-w-[34ch] text-[17.5px] leading-[1.7] text-berry text-pretty">
          Questions about an order or working together? Send a note and I&apos;ll get back to you
          as soon as I can.
        </p>

        {CONTACT_NOTES.length > 0 && (
          <p className="font-mono text-[12.5px] leading-[1.9] uppercase tracking-[0.04em] text-berry">
            {CONTACT_NOTES.map((note) => (
              <span key={note} className="block">
                {note}
              </span>
            ))}
          </p>
        )}

        <div className="mt-8 flex gap-3">
          {SOCIALS.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="rounded-full bg-panel p-3 text-berry transition hover:-translate-y-[3px] hover:shadow-lift"
            >
              <Icon className="h-[18px] w-[18px]" fill="currentColor" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-[30px] bg-panel p-[clamp(24px,3vw,40px)] shadow-[0_18px_40px_-30px_rgb(42_18_24_/_0.45)]"
      >
        <div className="grid gap-[18px] min-[560px]:grid-cols-2">
          <Field label="Name" name="name" placeholder="Your name" autoComplete="name" required />
          <Field
            label="Email"
            name="email"
            type="email"
            placeholder="you@email.com"
            autoComplete="email"
            required
          />
        </div>

        <label className="mt-[18px] flex flex-col gap-2.5">
          <span className="font-ui text-[12.5px] font-bold uppercase tracking-[0.06em] text-berry">
            What&apos;s this about?
          </span>
          <select
            name="topic"
            className="w-full rounded-[14px] border-[1.5px] border-line bg-panel px-4 py-3.5 text-[15.5px] text-ink outline-none transition focus:border-berry"
          >
            {CONTACT_TOPICS.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>

        <label className="mt-[18px] flex flex-col gap-2.5">
          <span className="font-ui text-[12.5px] font-bold uppercase tracking-[0.06em] text-berry">
            Message
          </span>
          <textarea
            name="message"
            rows={5}
            required
            placeholder="Tell me a little about what you're after…"
            className="w-full resize-y rounded-[14px] border-[1.5px] border-line bg-panel px-4 py-3.5 text-[15.5px] leading-[1.6] text-ink outline-none transition placeholder:text-meta focus:border-berry"
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

        <div className="mt-6 flex flex-wrap items-center gap-[18px]">
          <button type="submit" disabled={status === "sending"} className={btn()}>
            <Mail size={16} />
            {status === "sending" ? "Sending…" : "Send message"}
          </button>

          <span className="text-[14.5px]" role="status">
            {status === "ok" && (
              <span className="text-[#4d7a35]">
                Thanks — your message is on its way. I&apos;ll be in touch soon.
              </span>
            )}
            {status === "error" && (
              <span className="text-[#b1453f]">
                Something went wrong sending that. Please email me directly instead.
              </span>
            )}
          </span>
        </div>
      </form>
    </Section>
  );
}

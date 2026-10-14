"use client";

import { useRef, useState, type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const pending = useRef(false);
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pending.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.get("botcheck")) return;
    pending.current = true;
    setStatus("sending");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(Object.fromEntries(data)),
        signal: AbortSignal.timeout(20000),
      });
      const result = await response.json();
      if (!response.ok || result.success !== true) throw new Error("Submission failed");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      pending.current = false;
    }
  };
  return <form className="contact-form" onSubmit={submit} aria-busy={status === "sending"}>
    <input type="hidden" name="access_key" value="64479a4f-c00a-470e-9173-b5c55ae34e55" />
    <input type="hidden" name="subject" value="New portfolio contact" />
    <input type="hidden" name="from_name" value="Nurhayat Yurtaslan Portfolio" />
    <input type="checkbox" name="botcheck" className="contact-honeypot" tabIndex={-1} aria-hidden="true" autoComplete="off" />
    <div className="contact-identity-fields">
      <label>Name<input name="name" placeholder="Your name" autoComplete="name" required maxLength={120} /></label>
      <label>Your email<input name="email" placeholder="you@example.com" type="email" autoComplete="email" required maxLength={254} /></label>
    </div>
    <label className="contact-message-label">Message<textarea name="message" placeholder="Tell me a little about what you have in mind…" required minLength={10} maxLength={5000} rows={5} /></label>
    <div className="contact-form-footer">
      <button type="submit" disabled={status === "sending"}><span>{status === "sending" ? "Sending…" : "Send message"}</span><ArrowUpRight size={16} aria-hidden="true" /></button>
    </div>
    <p className="contact-feedback" data-state={status} role="status" aria-live="polite">{status === "success" ? "Thank you. Your message has been sent." : status === "error" ? "Your message could not be sent. Please try again; your text has been kept." : ""}</p>
  </form>;
}

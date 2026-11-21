"use client";

import { useState } from "react";
import { profile } from "@/lib/data";

const FORMSPREE_ID = "xwlezyop";

const contactLinks = [
  { key: "email", icon: "✉️", label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { key: "github", icon: "🐙", label: "GitHub", value: "github.com/mdsakib-hossen", href: profile.github },
  { key: "linkedin", icon: "💼", label: "LinkedIn", value: "linkedin.com/in/mdsakib-hossen", href: profile.linkedin },
  { key: "facebook", icon: "📘", label: "Facebook", value: "Facebook Profile", href: profile.facebook },
];

const socials = [
  { label: "GH", href: profile.github },
  { label: "in", href: profile.linkedin },
  { label: "fb", href: profile.facebook },
  { label: "@", href: `mailto:${profile.email}` },
];

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      // Save to Supabase
      const { createClient } = await import("@supabase/supabase-js");
      const sb = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      await sb.from("messages").insert({
        name: form.name,
        email: form.email,
        message: form.message,
      });

      // Send via Formspree
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const copyEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(profile.email).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      });
    }
  };

  return (
    <section id="contact">
      <div className="wrap">
        <div className="contact">
          <div className="contact-grid">
            <div className="rv">
              <span className="tag">Contact</span>
              <h2>
                Let&apos;s build <em>something</em> together
              </h2>
              <p>
                Have a project idea, want to collaborate, or just want to say hi? My inbox is
                always open.
              </p>
              <div className="info">
                {contactLinks.map((c) => (
                  <a key={c.key} href={c.href} target={c.key === "email" ? undefined : "_blank"} rel="noopener noreferrer">
                    <span className="ic">{c.icon}</span>
                    {c.key === "email" ? (
                      <>
                        <span>{c.value}</span>
                        <button className="copybtn" onClick={(e) => { e.preventDefault(); copyEmail(); }} type="button">
                          {copied ? "Copied ✓" : "Copy"}
                        </button>
                      </>
                    ) : (
                      <span>{c.value}</span>
                    )}
                  </a>
                ))}
              </div>
              <div className="socials">
                {socials.map((s) => (
                  <a key={s.label} href={s.href} target={s.label === "@" ? undefined : "_blank"} rel="noopener noreferrer">
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="rv">
              {status === "success" ? (
                <div className="form" style={{ textAlign: "center", display: "grid", placeItems: "center", minHeight: "300px" }}>
                  <div style={{ fontSize: "48px", marginBottom: "12px" }}>🎉</div>
                  <h3 style={{ fontFamily: "var(--d)", fontSize: "22px", color: "#fff", marginBottom: "8px" }}>Message Sent!</h3>
                  <p style={{ color: "#b9b9b3", fontSize: "14px" }}>I&apos;ll get back to you soon.</p>
                  <button className="btn" onClick={() => setStatus("idle")} style={{ marginTop: "20px" }}>
                    Send another message
                  </button>
                </div>
              ) : (
                <form className="form" onSubmit={handleSubmit}>
                  {status === "error" && (
                    <div style={{ color: "#fca5a5", fontSize: "13px", marginBottom: "12px" }}>
                      Something went wrong. Please try again.
                    </div>
                  )}
                  <div className="f">
                    <label>Your name</label>
                    <input
                      type="text"
                      placeholder="Your full name"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div className="f">
                    <label>Email address</label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                  <div className="f">
                    <label>Message</label>
                    <textarea
                      placeholder="Tell me about your project…"
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                    />
                  </div>
                  <button className="btn" type="submit" disabled={status === "loading"}>
                    {status === "loading" ? "Sending…" : <>Send message <span className="ar">↗</span></>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, FacebookIcon } from "./icons";
import { profile } from "@/lib/data";

const FORMSPREE_ID = "xwlezyop";

const contactLinks = [
  {
    key: "email",
    Icon: Mail,
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    color: "#ef4444",
  },
  {
    key: "github",
    Icon: GithubIcon,
    label: "GitHub",
    value: "github.com/mdsakib-hossen",
    href: profile.github,
    color: "#0f172a",
  },
  {
    key: "linkedin",
    Icon: LinkedinIcon,
    label: "LinkedIn",
    value: "linkedin.com/in/mdsakib-hossen",
    href: profile.linkedin,
    color: "#0a66c2",
  },
  {
    key: "facebook",
    Icon: FacebookIcon,
    label: "Facebook",
    value: "Facebook Profile",
    href: profile.facebook,
    color: "#1877f2",
  },
];

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

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

  return (
    <section id="contact" className="py-20 md:py-28" style={{ background: "#f8fafc" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="section-label">Get In Touch</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Contact Me</h2>
          <p className="text-slate-500 mt-3 text-sm md:text-base max-w-xl mx-auto">
            Have a project idea, want to collaborate, or just want to say hi? My inbox is always open.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: contact info */}
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Let&apos;s work together!</h3>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-8">
              Whether it&apos;s a freelance project, open source collaboration, or just a technical
              discussion — feel free to reach out.
            </p>

            <div className="flex flex-col gap-3">
              {contactLinks.map(({ key, Icon, label, value, href, color }) => (
                <a
                  key={key}
                  href={href}
                  target={key === "email" ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-200 hover:border-cyan-200 hover:shadow-sm transition-all group"
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: color + "15" }}
                  >
                    <Icon size={17} style={{ color }} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-slate-400 font-medium">{label}</div>
                    <div className="text-slate-700 text-sm font-medium truncate">{value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div>
            {status === "success" ? (
              <div className="card md:p-8 text-center h-full flex flex-col items-center justify-center min-h-[380px]">
                <CheckCircle size={52} className="text-green-500 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">Message Sent! 🎉</h3>
                <p className="text-slate-500 text-sm mb-6">I&apos;ll get back to you soon.</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="text-cyan-500 text-sm hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card md:p-8 flex flex-col gap-5">
                {status === "error" && (
                  <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-200 p-3 rounded-xl">
                    <AlertCircle size={16} className="flex-shrink-0" />
                    Something went wrong. Please try again.
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-300 focus:outline-none focus:border-cyan-400 transition-colors text-sm"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-300 focus:outline-none focus:border-cyan-400 transition-colors text-sm"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-300 focus:outline-none focus:border-cyan-400 transition-colors resize-none text-sm"
                    placeholder="Your message here..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-primary flex items-center justify-center gap-2 w-full disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? (
                    <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

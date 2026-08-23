"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { GithubIcon, LinkedinIcon, FacebookIcon } from "./icons";
import { profile } from "@/lib/data";

const MailIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const FORMSPREE_ID = "xwlezyop";

export default function ContactSection() {
  const { language } = useTheme();
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
      await sb.from("messages").insert({ name: form.name, email: form.email, message: form.message });

      // Also send email via Formspree
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
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
    <section id="contact" className="section-padding w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-8 md:mb-16">
          <p className="text-purple-400 font-mono text-sm tracking-widest mb-2">
            {language === "en" ? "// GET IN TOUCH" : "// যোগাযোগ করো"}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold gradient-text">
            {language === "en" ? "Contact Me" : "যোগাযোগ"}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Left */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
              {language === "en" ? "Let's work together!" : "একসাথে কাজ করি!"}
            </h3>
            <p className="text-gray-400 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
              {language === "en"
                ? "Have a project idea, want to collaborate, or just want to say hi — my inbox is always open!"
                : "প্রজেক্ট আইডিয়া থাকলে, collaborate করতে চাইলে, বা শুধু হ্যালো বলতে চাইলে — সবসময় available!"}
            </p>

            <div className="space-y-3">
              {[
                { icon: MailIcon, label: profile.email, href: `mailto:${profile.email}`, color: "text-red-400" },
                { icon: GithubIcon, label: profile.github.replace("https://", ""), href: profile.github, color: "text-white" },
                { icon: LinkedinIcon, label: profile.linkedin.replace("https://", ""), href: profile.linkedin, color: "text-blue-400" },
                { icon: FacebookIcon, label: "Facebook", href: profile.facebook, color: "text-blue-500" },
              ].map(({ icon: Icon, label, href, color }) => (
                <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 sm:gap-4 glass p-3 sm:p-4 rounded-xl group min-w-0 overflow-hidden"
                >
                  <Icon size={18} className={`${color} group-hover:scale-110 transition-transform flex-shrink-0`} />
                  <span className="text-gray-300 text-xs sm:text-sm truncate min-w-0 flex-1">{label}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right - Form */}
          <div className="w-full">
            {status === "success" ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="glass p-6 sm:p-8 rounded-2xl text-center h-full flex flex-col items-center justify-center min-h-[300px] sm:min-h-[400px]"
              >
                <CheckCircle size={52} className="text-green-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">
                  {language === "en" ? "Message Sent! 🎉" : "বার্তা পাঠানো হয়েছে! 🎉"}
                </h3>
                <p className="text-gray-400 mb-6">
                  {language === "en" ? "I'll get back to you soon." : "শীঘ্রই reply করব।"}
                </p>
                <button onClick={() => setStatus("idle")}
                  className="text-purple-400 text-sm hover:underline">
                  {language === "en" ? "Send another message" : "আরেকটি বার্তা পাঠাও"}
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="glass p-5 sm:p-8 rounded-2xl space-y-4 sm:space-y-5 w-full">
                {status === "error" && (
                  <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-xl">
                    <AlertCircle size={16} className="flex-shrink-0" />
                    {language === "en" ? "Something went wrong. Try again." : "কিছু একটা ভুল হয়েছে। আবার চেষ্টা করো।"}
                  </div>
                )}

                <div>
                  <label className="text-purple-400 text-sm font-mono mb-2 block">
                    {language === "en" ? "Your Name" : "তোমার নাম"} *
                  </label>
                  <input type="text" required value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-white/5 border border-purple-500/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-colors text-sm sm:text-base"
                    placeholder={language === "en" ? "John Doe" : "তোমার নাম"}
                  />
                </div>

                <div>
                  <label className="text-purple-400 text-sm font-mono mb-2 block">
                    {language === "en" ? "Email Address" : "ইমেইল ঠিকানা"} *
                  </label>
                  <input type="email" required value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-white/5 border border-purple-500/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-colors text-sm sm:text-base"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="text-purple-400 text-sm font-mono mb-2 block">
                    {language === "en" ? "Message" : "বার্তা"} *
                  </label>
                  <textarea required rows={4} value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-white/5 border border-purple-500/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-colors resize-none text-sm sm:text-base"
                    placeholder={language === "en" ? "Your message here..." : "তোমার বার্তা লিখো..."}
                  />
                </div>

                <motion.button type="submit" disabled={status === "loading"}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-50 transition-opacity text-sm sm:text-base"
                >
                  {status === "loading" ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send size={18} />
                      {language === "en" ? "Send Message" : "বার্তা পাঠাও"}
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </div>
        </div>
      </motion.div>
      </div>
    </section>
  );
}



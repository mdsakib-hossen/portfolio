"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Download, ChevronDown } from "lucide-react";
import { GithubIcon, LinkedinIcon, FacebookIcon } from "./icons";
import { profile } from "@/lib/data";
import Image from "next/image";

const MailIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const typingTexts = [
  "Competitive Programmer",
  "Software Developer",
  "AI/ML Learner",
  "CST Student @ Bangladesh Polytechnic Institute",
  "Shohoj Coding Ambassador",
];

// Floating tech badges around photo
const floatingBadges = [
  { label: "C++", x: "-80px", y: "20px", delay: 0 },
  { label: "Python", x: "-90px", y: "120px", delay: 0.1 },
  { label: "React Native", x: "230px", y: "10px", delay: 0.2 },
  { label: "Flask", x: "240px", y: "110px", delay: 0.3 },
  { label: "Firebase", x: "-75px", y: "210px", delay: 0.4 },
  { label: "DSA", x: "230px", y: "200px", delay: 0.5 },
];

export default function HeroSection() {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string>("");

  useEffect(() => {
    import("@/lib/supabase").then(({ supabase }) => {
      supabase.from("profile").select("photo_url").single().then(({ data }) => {
        if (data?.photo_url) setPhotoUrl(data.photo_url);
      });
    });
  }, []);

  useEffect(() => {
    const current = typingTexts[textIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(current.substring(0, charIndex + 1));
        setCharIndex(p => p + 1);
        if (charIndex === current.length) setTimeout(() => setIsDeleting(true), 1800);
      } else {
        setDisplayText(current.substring(0, charIndex - 1));
        setCharIndex(p => p - 1);
        if (charIndex === 0) {
          setIsDeleting(false);
          setTextIndex(p => (p + 1) % typingTexts.length);
        }
      }
    }, isDeleting ? 40 : 80);
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex]);

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden flex items-center justify-center"
      style={{ minHeight: "100svh" }}
    >
      {/* Subtle bg glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #06b6d4, transparent)", filter: "blur(60px)" }} />
      </div>

      <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center py-20">

        {/* === PHOTO SECTION === */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative mb-8"
          style={{ width: "200px", height: "200px" }}
        >
          {/* Floating badges — hidden on mobile */}
          {floatingBadges.map(({ label, x, y, delay }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: delay + 0.8, duration: 0.4 }}
              className="absolute hidden md:flex items-center px-3 py-1.5 rounded-full text-xs font-semibold z-20 whitespace-nowrap"
              style={{
                left: x, top: y,
                background: "#111827",
                border: "1px solid rgba(6,182,212,0.3)",
                color: "#06b6d4",
                boxShadow: "0 2px 12px rgba(6,182,212,0.15)",
              }}
            >
              {label}
            </motion.div>
          ))}

          {/* Glow ring */}
          <div className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(6,182,212,0.25), transparent 70%)",
              filter: "blur(20px)",
              transform: "scale(1.4)",
            }}
          />

          {/* Photo circle */}
          <div className="relative w-full h-full rounded-full overflow-hidden"
            style={{ border: "3px solid rgba(6,182,212,0.5)", boxShadow: "0 0 30px rgba(6,182,212,0.25)" }}
          >
            {photoUrl ? (
              <Image src={photoUrl} alt={profile.name} fill className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-6xl"
                style={{ background: "linear-gradient(135deg, #0d1829, #0a2033)" }}>
                👨‍💻
              </div>
            )}
          </div>

          {/* Experience badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 whitespace-nowrap z-10"
            style={{ background: "#0d1829", border: "1px solid rgba(6,182,212,0.4)", color: "#06b6d4", boxShadow: "0 4px 16px rgba(6,182,212,0.2)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Open to Collaborate
          </motion.div>
        </motion.div>

        {/* Spacer for badge */}
        <div className="h-5" />

        {/* === NAME === */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="font-extrabold mb-3 gradient-text"
          style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)", lineHeight: 1.1 }}
        >
          Hi, I&apos;m Sakib 👋
        </motion.h1>

        {/* === TYPING === */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="h-8 flex items-center justify-center mb-5"
        >
          <span className="text-base md:text-lg font-mono font-semibold text-cyan-400">
            {displayText}
            <span className="animate-pulse">|</span>
          </span>
        </motion.div>

        {/* === DESCRIPTION === */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-sm md:text-base leading-relaxed max-w-2xl mb-8"
          style={{ color: "#94a3b8" }}
        >
          Passionate about Competitive Programming &amp; building real-world software that solves actual problems.
          Currently training with <span className="text-cyan-400 font-semibold">XPSC @ Phitron</span> and
          building <span className="text-cyan-400 font-semibold">Karigori Result</span> for all BD Polytechnic students.
        </motion.p>

        {/* === BUTTONS === */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap gap-3 justify-center mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            className="px-7 py-2.5 rounded-lg text-sm font-semibold text-white"
            style={{ background: "linear-gradient(135deg, #06b6d4, #0ea5e9)", boxShadow: "0 4px 20px rgba(6,182,212,0.3)" }}
          >
            View Projects
          </motion.button>
          <motion.a
            href="/resume" target="_blank"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="px-7 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2"
            style={{ border: "1px solid rgba(6,182,212,0.4)", color: "#06b6d4", background: "rgba(6,182,212,0.05)" }}
          >
            <Download size={14} /> Download CV
          </motion.a>
        </motion.div>

        {/* === SOCIAL === */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center gap-3"
        >
          {[
            { icon: GithubIcon, href: profile.github, label: "GitHub" },
            { icon: LinkedinIcon, href: profile.linkedin, label: "LinkedIn" },
            { icon: FacebookIcon, href: profile.facebook, label: "Facebook" },
            { icon: MailIcon, href: `mailto:${profile.email}`, label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label} href={href} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.15, y: -3 }}
              title={label}
              className="p-2.5 rounded-xl transition-all"
              style={{ border: "1px solid rgba(6,182,212,0.2)", background: "rgba(6,182,212,0.05)", color: "#64748b" }}
            >
              <Icon size={18} />
            </motion.a>
          ))}
        </motion.div>

        {/* Mobile tech badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-wrap gap-2 justify-center mt-8 md:hidden"
        >
          {["C++", "Python", "React Native", "Flask", "Firebase", "DSA"].map((tech) => (
            <span key={tech} className="px-3 py-1 rounded-full text-xs font-semibold"
              style={{ background: "rgba(6,182,212,0.08)", border: "1px solid rgba(6,182,212,0.2)", color: "#06b6d4" }}>
              {tech}
            </span>
          ))}
        </motion.div>

      </div>

      {/* Scroll arrow */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 cursor-pointer z-10"
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
      >
        <ChevronDown size={22} className="text-cyan-400 opacity-50" />
      </motion.div>
    </section>
  );
}

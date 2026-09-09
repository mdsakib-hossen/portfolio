"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Download, ChevronDown, MapPin, GraduationCap } from "lucide-react";
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

const techBadges = ["C++", "Python", "React Native", "Flask", "Firebase", "DSA"];

export default function HeroSection() {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string>("/profile.jpg");

  // Load profile photo from Supabase
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
      className="relative w-full overflow-hidden"
      style={{ minHeight: "100svh", display: "flex", alignItems: "center" }}
    >
      {/* Subtle background grid */}
      <div className="absolute inset-0 z-0" style={{
        backgroundImage: "radial-gradient(circle at 20% 50%, rgba(6,182,212,0.06) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(14,165,233,0.04) 0%, transparent 50%)",
      }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-0">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-16">

          {/* LEFT — Text content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex-1 text-center md:text-left"
          >
            {/* Greeting */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-cyan-400 font-mono text-sm tracking-widest mb-3"
            >
              👋 Hello World! I&apos;m
            </motion.p>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-extrabold mb-3 leading-tight gradient-text"
              style={{ fontSize: "clamp(2rem, 5vw, 3.8rem)" }}
            >
              {profile.name}
            </motion.h1>

            {/* Typing */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="h-8 flex items-center mb-4 justify-center md:justify-start"
            >
              <span className="text-base md:text-lg font-mono" style={{ color: "#94a3b8" }}>
                {displayText}
                <span className="animate-pulse text-cyan-400 ml-0.5">|</span>
              </span>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-sm md:text-base mb-3 leading-relaxed max-w-lg mx-auto md:mx-0"
              style={{ color: "#94a3b8" }}
            >
              Passionate about Competitive Programming &amp; building real-world software.
              Currently training with <span className="text-cyan-400 font-semibold">XPSC @ Phitron</span> and
              building <span className="text-cyan-400 font-semibold">Karigori Result</span> for all BD Polytechnic students.
            </motion.p>

            {/* Location + Institute */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="flex flex-wrap items-center gap-3 mb-6 justify-center md:justify-start"
            >
              <span className="flex items-center gap-1 text-xs" style={{ color: "#64748b" }}>
                <MapPin size={12} className="text-cyan-400" />
                Rajshahi, Bangladesh
              </span>
              <span className="flex items-center gap-1 text-xs" style={{ color: "#64748b" }}>
                <GraduationCap size={12} className="text-cyan-400" />
                Bangladesh Polytechnic Institute
              </span>
            </motion.div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-3 mb-7 justify-center md:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="px-6 py-2.5 rounded-lg text-sm font-semibold text-white transition-all"
                style={{ background: "linear-gradient(135deg, #06b6d4, #0ea5e9)", boxShadow: "0 0 20px rgba(6,182,212,0.3)" }}
              >
                View Projects
              </motion.button>
              <motion.a
                href="/resume" target="_blank"
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all"
                style={{ border: "1px solid rgba(6,182,212,0.4)", color: "#06b6d4", background: "rgba(6,182,212,0.05)" }}
              >
                <Download size={14} /> Download CV
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-3 justify-center md:justify-start"
            >
              {[
                { icon: GithubIcon, href: profile.github, label: "GitHub" },
                { icon: LinkedinIcon, href: profile.linkedin, label: "LinkedIn" },
                { icon: FacebookIcon, href: profile.facebook, label: "Facebook" },
                { icon: MailIcon, href: `mailto:${profile.email}`, label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label} href={href} target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -2 }}
                  title={label}
                  className="p-2.5 rounded-lg transition-all"
                  style={{ border: "1px solid rgba(6,182,212,0.2)", background: "rgba(6,182,212,0.05)", color: "#64748b" }}
                >
                  <Icon size={17} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT — Profile photo */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex-shrink-0 flex flex-col items-center gap-5"
          >
            {/* Photo */}
            <div className="relative">
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-full blur-2xl opacity-30"
                style={{ background: "radial-gradient(circle, #06b6d4, transparent)", transform: "scale(1.3)" }} />

              <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden"
                style={{ border: "2px solid rgba(6,182,212,0.4)", boxShadow: "0 0 40px rgba(6,182,212,0.2)" }}>
                <Image
                  src={photoUrl}
                  alt={profile.name}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                {/* Fallback avatar */}
                <div className="w-full h-full flex items-center justify-center text-7xl"
                  style={{ background: "linear-gradient(135deg, #0d1829, #0a2033)" }}>
                  👨‍💻
                </div>
              </div>

              {/* Status badge */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap"
                style={{ background: "#0d1829", border: "1px solid rgba(6,182,212,0.3)", color: "#06b6d4" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Open to Collaborate
              </div>
            </div>

            {/* Tech badges */}
            <div className="flex flex-wrap gap-2 justify-center max-w-xs">
              {techBadges.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.08 }}
                  className="px-3 py-1 rounded-full text-xs font-semibold"
                  style={{ background: "rgba(6,182,212,0.08)", border: "1px solid rgba(6,182,212,0.2)", color: "#06b6d4" }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 cursor-pointer z-10"
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
      >
        <ChevronDown size={22} className="text-cyan-400 opacity-60" />
      </motion.div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Download, ChevronDown } from "lucide-react";
import { GithubIcon, LinkedinIcon, FacebookIcon } from "./icons";
import { useTheme } from "./ThemeProvider";
import { profile } from "@/lib/data";

const MailIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const typingTexts = {
  en: [
    "Competitive Programmer",
    "Software Developer",
    "AI/ML Learner",
    "CST Student @ BPI Rajshahi",
    "Shohoj Coding Ambassador",
  ],
  bn: [
    "কম্পিটিটিভ প্রোগ্রামার",
    "সফটওয়্যার ডেভেলপার",
    "AI/ML শিক্ষার্থী",
    "BPI রাজশাহী CST ছাত্র",
  ],
};

export default function HeroSection() {
  const { language } = useTheme();
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [ParticlesComponent, setParticlesComponent] = useState<React.ComponentType<any> | null>(null);

  useEffect(() => {
    const loadParticles = async () => {
      try {
        const particlesModule = await import("@tsparticles/react");
        const { loadSlim } = await import("@tsparticles/slim");
        const Particles = particlesModule.default;
        const initEngine = (particlesModule as any).initParticlesEngine;
        if (initEngine) {
          await initEngine(async (engine: any) => { await loadSlim(engine); });
        }
        setParticlesComponent(() => Particles);
      } catch (e) { console.error("Particles error", e); }
    };
    loadParticles();
  }, []);

  const texts = typingTexts[language];

  useEffect(() => {
    const current = texts[textIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(current.substring(0, charIndex + 1));
        setCharIndex(p => p + 1);
        if (charIndex === current.length) setTimeout(() => setIsDeleting(true), 1500);
      } else {
        setDisplayText(current.substring(0, charIndex - 1));
        setCharIndex(p => p - 1);
        if (charIndex === 0) { setIsDeleting(false); setTextIndex(p => (p + 1) % texts.length); }
      }
    }, isDeleting ? 50 : 100);
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, texts]);

  const particlesOptions = {
    background: { color: { value: "transparent" } },
    fpsLimit: 60,
    particles: {
      color: { value: ["#a78bfa", "#f472b6", "#60a5fa"] },
      links: { color: "#a78bfa", distance: 150, enable: true, opacity: 0.15, width: 1 },
      move: { enable: true, speed: 0.8, direction: "none" as const, random: true, outModes: { default: "bounce" as const } },
      number: { density: { enable: true }, value: 60 },
      opacity: { value: 0.4 },
      size: { value: { min: 1, max: 3 } },
    },
    detectRetina: true,
  };

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden"
      style={{ minHeight: "100svh", display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      {/* Particles */}
      {ParticlesComponent && (
        <ParticlesComponent id="tsparticles" options={particlesOptions} className="absolute inset-0 z-0" />
      )}

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-purple-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-pink-600/10 rounded-full blur-3xl" />

      {/* Content — perfectly centered */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center text-center px-4 sm:px-6 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-3xl mx-auto flex flex-col items-center"
        >
          {/* Greeting */}
          <p className="text-purple-400 font-mono text-xs sm:text-sm md:text-base mb-3 tracking-widest">
            {language === "en" ? "👋 Hello World! I'm" : "👋 হ্যালো ওয়ার্ল্ড! আমি"}
          </p>

          {/* Name */}
          <h1 className="font-bold mb-3 leading-tight w-full" style={{
            fontSize: "clamp(1.8rem, 6vw, 4.5rem)",
            background: "linear-gradient(135deg, #a78bfa, #f472b6, #60a5fa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            {profile.name}
          </h1>

          {/* Typing */}
          <div className="h-7 sm:h-8 md:h-10 flex items-center justify-center mb-4 sm:mb-5 w-full overflow-hidden">
            <span className="text-sm sm:text-base md:text-xl text-gray-200 font-mono truncate max-w-full px-2">
              {displayText}
              <span className="animate-pulse text-purple-400">|</span>
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-300 text-xs sm:text-sm md:text-base max-w-xl mx-auto mb-6 sm:mb-8 leading-relaxed px-2">
            {language === "en"
              ? "CST Student at BPI Rajshahi • Solving problems, building products, and aiming for CP Grandmaster 🏆"
              : "BPI রাজশাহীর CST ছাত্র • সমস্যা সমাধান করি, পণ্য বানাই, CP গ্র্যান্ডমাস্টার লক্ষ্যে আছি 🏆"}
          </p>

          {/* Buttons — stack vertically on very small screens */}
          <div className="flex flex-col min-[400px]:flex-row flex-wrap items-center justify-center gap-3 mb-6 sm:mb-8 w-full px-4">
            <motion.button
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="w-full min-[400px]:w-auto px-6 py-2.5 rounded-full text-white font-semibold text-sm"
              style={{ background: "linear-gradient(135deg, #7c3aed, #db2777)", boxShadow: "0 0 20px rgba(167,139,250,0.4)" }}
            >
              {language === "en" ? "View Projects" : "প্রজেক্ট দেখো"}
            </motion.button>
            <motion.a
              href="/resume" target="_blank"
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="w-full min-[400px]:w-auto px-6 py-2.5 rounded-full border border-purple-400/50 text-purple-300 font-semibold text-sm flex items-center justify-center gap-2 hover:border-purple-400 transition-all"
              style={{ background: "rgba(167,139,250,0.08)" }}
            >
              <Download size={15} />
              {language === "en" ? "Download CV" : "CV ডাউনলোড"}
            </motion.a>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-2 sm:gap-4">
            {[
              { icon: GithubIcon, href: profile.github, label: "GitHub" },
              { icon: LinkedinIcon, href: profile.linkedin, label: "LinkedIn" },
              { icon: FacebookIcon, href: profile.facebook, label: "Facebook" },
              { icon: MailIcon, href: `mailto:${profile.email}`, label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label} href={href} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -3 }}
                className="p-2 sm:p-2.5 rounded-xl border border-purple-500/20 hover:border-purple-400/60 transition-all"
                style={{ background: "rgba(167,139,250,0.08)" }}
                title={label}
              >
                <Icon size={16} className="sm:w-[18px] sm:h-[18px] text-gray-300 hover:text-purple-400 transition-colors" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-3 md:bottom-6 left-1/2 -translate-x-1/2 cursor-pointer z-10"
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
      >
        <ChevronDown size={22} className="text-purple-400" />
      </motion.div>
    </section>
  );
}

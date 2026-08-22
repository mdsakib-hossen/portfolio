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

  const texts = profile.typingTexts[language];

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
      number: { density: { enable: true }, value: 80 },
      opacity: { value: 0.4 },
      size: { value: { min: 1, max: 3 } },
    },
    detectRetina: true,
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {ParticlesComponent && (
        <ParticlesComponent id="tsparticles" options={particlesOptions} className="absolute inset-0 z-0" />
      )}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="text-purple-400 font-mono text-sm md:text-lg mb-4 tracking-widest">
            {language === "en" ? "👋 Hello World! I'm" : "👋 হ্যালো ওয়ার্ল্ড! আমি"}
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 glow-text">
            <span className="gradient-text">{profile.name}</span>
          </h1>
          <div className="h-10 md:h-12 flex items-center justify-center mb-8">
            <span className="text-lg md:text-2xl text-gray-300 font-mono">
              {displayText}<span className="animate-pulse text-purple-400">|</span>
            </span>
          </div>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed px-2">
            {language === "en"
              ? `CST Student at BPI Rajshahi • Solving problems, building products, and aiming for CP Grandmaster 🏆`
              : `BPI রাজশাহীর CST ছাত্র • সমস্যা সমাধান করি, পণ্য বানাই, CP গ্র্যান্ডমাস্টার হওয়ার লক্ষ্যে আছি 🏆`}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-10 md:mb-12">
            <motion.button
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="px-6 md:px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:opacity-90 transition-opacity text-sm md:text-base"
              style={{ boxShadow: "0 0 20px rgba(167,139,250,0.3)" }}
            >
              {language === "en" ? "View Projects" : "প্রজেক্ট দেখো"}
            </motion.button>
            <motion.a
              href="/resume" target="_blank"
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="px-6 md:px-8 py-3 rounded-full glass border border-purple-400/30 text-purple-400 font-semibold hover:border-purple-400 transition-all flex items-center gap-2 text-sm md:text-base"
            >
              <Download size={16} />
              {language === "en" ? "Download CV" : "CV ডাউনলোড"}
            </motion.a>
          </div>
          <div className="flex items-center justify-center gap-4 md:gap-5">
            {[
              { icon: GithubIcon, href: profile.github, label: "GitHub" },
              { icon: LinkedinIcon, href: profile.linkedin, label: "LinkedIn" },
              { icon: FacebookIcon, href: profile.facebook, label: "Facebook" },
              { icon: MailIcon, href: `mailto:${profile.email}`, label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -3 }}
                className="glass p-2.5 md:p-3 rounded-xl hover:border-purple-400/50 transition-all group" title={label}
              >
                <Icon size={18} className="text-gray-400 group-hover:text-purple-400 transition-colors" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
      >
        <ChevronDown size={28} className="text-purple-400" />
      </motion.div>
    </section>
  );
}

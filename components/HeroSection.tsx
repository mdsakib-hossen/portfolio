"use client";

import { useEffect, useState } from "react";
import { Download, ChevronDown } from "lucide-react";
import { GithubIcon, LinkedinIcon, FacebookIcon } from "./icons";
import { profile } from "@/lib/data";
import Image from "next/image";

const MailIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const typingTexts = profile.typingTexts.en;

const floatingBadges = [
  { label: "C++", style: { left: "-100px", top: "10px" } },
  { label: "Python", style: { left: "-108px", top: "100px" } },
  { label: "React Native", style: { right: "-120px", top: "10px" } },
  { label: "Flask", style: { right: "-95px", top: "100px" } },
  { label: "Firebase", style: { left: "-100px", top: "190px" } },
  { label: "DSA", style: { right: "-85px", top: "190px" } },
];

export default function HeroSection() {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string>("");

  useEffect(() => {
    import("@/lib/supabase").then(({ supabase }) => {
      supabase
        .from("profile")
        .select("photo_url")
        .single()
        .then(({ data }) => {
          if (data?.photo_url) setPhotoUrl(data.photo_url);
        });
    });
  }, []);

  useEffect(() => {
    const current = typingTexts[textIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(current.substring(0, charIndex + 1));
        setCharIndex((p) => p + 1);
        if (charIndex === current.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayText(current.substring(0, charIndex - 1));
        setCharIndex((p) => p - 1);
        if (charIndex === 0) {
          setIsDeleting(false);
          setTextIndex((p) => (p + 1) % typingTexts.length);
        }
      }
    }, isDeleting ? 40 : 80);
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex]);

  return (
    <section
      id="home"
      className="relative w-full flex items-center justify-center bg-white"
      style={{ minHeight: "100svh" }}
    >
      {/* Subtle bg gradient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5"
          style={{ background: "radial-gradient(circle, #06b6d4, transparent)", filter: "blur(80px)" }}
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center pt-32 pb-28">
        {/* Photo */}
        <div
          className="relative mb-12"
          style={{ width: "200px", height: "200px" }}
        >
          {/* Floating badges — md+ only */}
          {floatingBadges.map(({ label, style }) => (
            <div
              key={label}
              className="absolute hidden md:flex items-center px-3 py-1.5 rounded-full text-xs font-semibold z-20 whitespace-nowrap"
              style={{
                ...style,
                background: "#f0fdfe",
                border: "1px solid #a5f3fc",
                color: "#06b6d4",
              }}
            >
              {label}
            </div>
          ))}

          {/* Glow ring */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(6,182,212,0.2), transparent 70%)",
              filter: "blur(20px)",
              transform: "scale(1.5)",
            }}
          />

          {/* Photo circle */}
          <div
            className="relative w-full h-full rounded-full overflow-hidden"
            style={{
              border: "3px solid rgba(6,182,212,0.4)",
              boxShadow: "0 0 30px rgba(6,182,212,0.15)",
            }}
          >
            {photoUrl ? (
              <Image src={photoUrl} alt={profile.name} fill className="object-cover" />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center text-6xl"
                style={{ background: "linear-gradient(135deg, #f0fdfe, #e0f2fe)" }}
              >
                👨‍💻
              </div>
            )}
          </div>

          {/* Open to Collaborate badge */}
          <div
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 whitespace-nowrap z-10"
            style={{
              background: "white",
              border: "1px solid #a5f3fc",
              color: "#06b6d4",
              boxShadow: "0 2px 10px rgba(6,182,212,0.15)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Open to Collaborate
          </div>
        </div>

        {/* Spacer for badge */}
        <div className="h-8" />

        {/* Name */}
        <h1
          className="font-extrabold text-slate-900 mb-3 px-2 w-full"
          style={{ fontSize: "clamp(1.6rem, 7vw, 3.2rem)", lineHeight: 1.2, wordBreak: "break-word" }}
        >
          Hi, I&apos;m Md. Sakib Hossen 👋
        </h1>

        {/* Typing text */}
        <div className="h-8 flex items-center justify-center mb-5">
          <span className="text-sm md:text-base font-semibold text-cyan-500">
            {displayText}
            <span className="animate-pulse">|</span>
          </span>
        </div>

        {/* Description */}
        <p className="text-slate-500 text-sm leading-relaxed max-w-lg mx-auto mb-8 px-2">
          Passionate about Competitive Programming &amp; building real-world software that solves actual
          problems. Currently training with{" "}
          <span className="text-cyan-500 font-semibold">XPSC @ Phitron</span> and building{" "}
          <span className="text-cyan-500 font-semibold">Karigori Result</span> for all BD Polytechnic
          students.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          <button
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-primary"
          >
            View Projects
          </button>
          <a href="/resume" target="_blank" className="btn-outline flex items-center gap-2">
            <Download size={15} /> Download CV
          </a>
        </div>

        {/* Social icons */}
        <div className="flex items-center justify-center gap-4 mt-2">
          {[
            { Icon: GithubIcon, href: profile.github, label: "GitHub" },
            { Icon: LinkedinIcon, href: profile.linkedin, label: "LinkedIn" },
            { Icon: FacebookIcon, href: profile.facebook, label: "Facebook" },
            { Icon: MailIcon, href: `mailto:${profile.email}`, label: "Email" },
          ].map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={label === "Email" ? undefined : "_blank"}
              rel="noopener noreferrer"
              title={label}
              className="p-3 rounded-xl border border-slate-200 text-slate-500 hover:border-cyan-300 hover:text-cyan-500 transition-all"
            >
              <Icon size={20} />
            </a>
          ))}
        </div>

        {/* Mobile tech badges */}
        <div className="flex flex-wrap gap-2 justify-center mt-10 md:hidden px-4">
          {["C++", "Python", "React Native", "Flask", "Firebase", "DSA"].map((tech) => (
            <span key={tech} className="badge">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 cursor-pointer"
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
      >
        <ChevronDown size={22} className="text-cyan-400 opacity-60 animate-bounce" />
      </div>
    </section>
  );
}

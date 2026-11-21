"use client";

import { useEffect, useRef, useState } from "react";
// useRef kept for CountUp observer
import { profile, stats } from "@/lib/data";

const typingTexts = profile.typingTexts.en;

const socials = [
  { label: "GH", href: profile.github, title: "GitHub" },
  { label: "in", href: profile.linkedin, title: "LinkedIn" },
  { label: "fb", href: profile.facebook, title: "Facebook" },
  { label: "@", href: `mailto:${profile.email}`, title: "Email" },
];

function CountUp({ end, suffix }: { end: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 1500;
          const step = (end / duration) * 16;
          const interval = setInterval(() => {
            start += step;
            if (start >= end) {
              setCount(end);
              clearInterval(interval);
            } else setCount(Math.floor(start));
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <span ref={ref}>
      {count}
      {suffix && <i>{suffix}</i>}
    </span>
  );
}

export default function HeroSection() {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string>("");

  // Load photo from Supabase only
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

  // Typing effect
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
    <section className="hero" id="top">
      <div className="wrap hero-grid">
        <div>
          <span className="avail">
            <span className="dot" /> Available for work · {profile.location}
          </span>
          <h1>
            Hi, I&apos;m {profile.name} <span className="wave">👋</span>
            <br />
            I build <em>software</em> that solves real problems.
          </h1>
          <div className="typing">
            <span>{displayText}</span>
            <span className="cur">|</span>
          </div>
          <p className="lead">
            Passionate about <b>Competitive Programming</b> &amp; building real-world software.
            Currently training with <b>XPSC @ Phitron</b> and building <b>Karigori Result</b> for
            all BD Polytechnic students.
          </p>
          <div className="hero-cta">
            <button className="btn btn-accent" onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
              View Projects <span className="ar">↘</span>
            </button>
            <a className="btn btn-out" href="/resume" target="_blank" rel="noopener noreferrer">
              Download CV <span className="ar">↓</span>
            </a>
          </div>
          <div className="socials">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target={s.label === "@" ? undefined : "_blank"} rel="noopener noreferrer" title={s.title}>
                {s.label}
              </a>
            ))}
          </div>
          <div className="trust">
            {stats.map((stat) => (
              <div key={stat.label.en}>
                <span className="n">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </span>
                <span className="l">{stat.label.en}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pcard">
          <div className="main">
            <div className="top" />
            <div className="ava-wrap">
              <div className={`ava ${photoUrl ? "hasimg" : ""}`} id="avatar">
                {photoUrl && <img src={photoUrl} alt={profile.name} />}
                <span className="init">SH</span>
              </div>
            </div>
            <div className="info">
              <h3>{profile.name}</h3>
              <div className="role">Software Developer &amp; Problem Solver</div>
              <div className="rows">
                <div className="r">
                  <span className="ic">🎓</span> Diploma in CST — <b>{profile.institute}</b>
                </div>
                <div className="r">
                  <span className="ic">📍</span> Based in <b>{profile.location}</b>
                </div>
                <div className="r">
                  <span className="ic">💼</span> Open to <b>SDE roles &amp; freelance</b>
                </div>
              </div>
              <div className="mini-chips">
                <span>C++</span>
                <span>Python</span>
                <span>React Native</span>
                <span>Flask</span>
                <span>Firebase</span>
                <span>DSA</span>
              </div>
            </div>
          </div>
          <div className="fc fc1">
            <div className="b" style={{ background: "rgba(251,191,36,.18)", color: "#b45309" }}>
              🥈
            </div>
            <div>
              <div className="t">Hobby Fair</div>
              <div className="s">2nd place</div>
            </div>
          </div>
          <div className="fc fc2">
            <div className="b" style={{ background: "var(--accent-soft)", color: "var(--accent)" }}>
              ✦
            </div>
            <div>
              <div className="t">Campus Ambassador</div>
              <div className="s">Shohoj Coding</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

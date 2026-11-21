"use client";

import { useEffect, useRef, useState } from "react";
import { profile, stats } from "@/lib/data";

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
      {suffix}
    </span>
  );
}

const facts = [
  { ic: "🏛️", k: "Institute", v: profile.institute },
  { ic: "💻", k: "Department", v: profile.department },
  { ic: "📍", k: "Location", v: profile.location },
  { ic: "✉️", k: "Email", v: profile.email },
];

const timeline = [
  { y: "2025 – 2028", h: "Diploma in CST", p: profile.institute, now: true },
  { y: "2026 – 2027", h: "CSE Fundamentals", p: "Phitron (Programming Hero) — DSA, OOP, Backend, AI/ML" },
  { y: "2026", h: "Shohoj Coding Campus Ambassador", p: "Leadership & community building" },
];

export default function AboutSection() {
  return (
    <section id="about">
      <div className="wrap">
        <div className="shead">
          <span className="tag">About</span>
          <h2>
            Turning ideas into <em>real software</em>
          </h2>
        </div>
        <div className="about-grid">
          <div className="rv">
            <p className="big">
              I&apos;m a <em>Computer Science &amp; Technology</em> student who loves building
              things that actually get used — from campus systems to national result platforms.
            </p>
            <p className="txt">{profile.about.en}</p>
            <div className="statrow">
              {stats.map((stat) => (
                <div className="s" key={stat.label.en}>
                  <div className="n">
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="l">{stat.label.en}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="rv">
            <div className="facts">
              {facts.map((f) => (
                <div key={f.k}>
                  <span className="ic">{f.ic}</span>
                  <div className="k">{f.k}</div>
                  <div className="v">{f.v}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "26px" }}>
              <div className="subh">📅 Journey</div>
              <div className="tl">
                {timeline.map((t, i) => (
                  <div className="it" key={i}>
                    <div className="y">{t.y}</div>
                    <h4>
                      {t.h} {t.now && <span className="now">Current</span>}
                    </h4>
                    <p>{t.p}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

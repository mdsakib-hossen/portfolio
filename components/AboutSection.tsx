"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, Mail, BookOpen, Building2 } from "lucide-react";
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
            if (start >= end) { setCount(end); clearInterval(interval); }
            else setCount(Math.floor(start));
          }, 16);
        }
      }, { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return <div ref={ref}>{count}{suffix}</div>;
}

const infoCards = [
  { Icon: Building2, label: "Institute", value: "Bangladesh Polytechnic Institute, Rajshahi" },
  { Icon: BookOpen, label: "Department", value: "Computer Science & Technology (CST)" },
  { Icon: MapPin, label: "Location", value: "Rajshahi, Bangladesh" },
  { Icon: Mail, label: "Email", value: "mdsakibhassan632@gmail.com" },
];

export default function AboutSection() {
  return (
    <section id="about" style={{ background: "#f8fafc", padding: "80px 0 100px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 24px" }}>

        {/* Section label */}
        <p style={{ textAlign: "center", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "#06b6d4", fontWeight: 700, marginBottom: "12px" }}>
          ABOUT ME
        </p>

        {/* Title */}
        <h2 style={{ textAlign: "center", fontSize: "clamp(2rem, 5vw, 2.8rem)", fontWeight: 800, color: "#0f172a", marginBottom: "16px" }}>
          Who I Am
        </h2>

        {/* Subtitle */}
        <p style={{ textAlign: "center", fontSize: "16px", fontWeight: 600, color: "#334155", marginBottom: "20px" }}>
          Passionate Developer &amp; Competitive Programmer
        </p>

        {/* Description */}
        <p style={{ textAlign: "center", fontSize: "15px", color: "#475569", lineHeight: "1.85", maxWidth: "680px", margin: "0 auto 14px", fontWeight: 400 }}>
          {profile.about.en}
        </p>
        <p style={{ textAlign: "center", fontSize: "14px", color: "#64748b", lineHeight: "1.8", maxWidth: "600px", margin: "0 auto 60px" }}>
          I believe in learning by building — from campus management systems to national-level result platforms, I love creating software that makes a difference.
        </p>

        {/* Info cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px", maxWidth: "700px", margin: "0 auto 60px" }}>
          {infoCards.map(({ Icon, label, value }) => (
            <div key={label} style={{ background: "white", borderRadius: "14px", padding: "20px 24px", border: "1px solid #e2e8f0", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                <div style={{ background: "#f0fdfe", padding: "8px", borderRadius: "8px" }}>
                  <Icon size={15} color="#06b6d4" />
                </div>
                <span style={{ fontSize: "10px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1px" }}>{label}</span>
              </div>
              <p style={{ fontSize: "13px", color: "#334155", fontWeight: 600, lineHeight: "1.5" }}>{value}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "16px" }}>
          {stats.map((stat) => (
            <div key={stat.label.en} style={{ background: "white", borderRadius: "14px", padding: "28px 20px", textAlign: "center", border: "1px solid #e2e8f0", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <div style={{ fontSize: "2.2rem", fontWeight: 900, color: "#06b6d4", marginBottom: "8px" }}>
                <CountUp end={stat.value} suffix={stat.suffix} />
              </div>
              <div style={{ fontSize: "13px", color: "#64748b", fontWeight: 500 }}>{stat.label.en}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

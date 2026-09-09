"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, Mail, BookOpen, Building2 } from "lucide-react";
import { profile, stats } from "@/lib/data";

function CountUp({ end, suffix }: { end: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
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
            } else {
              setCount(Math.floor(start));
            }
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

const infoCards = [
  {
    Icon: Building2,
    label: "Institute",
    value: "Bangladesh Polytechnic Institute, Rajshahi",
  },
  {
    Icon: BookOpen,
    label: "Department",
    value: "Computer Science & Technology (CST)",
  },
  {
    Icon: MapPin,
    label: "Location",
    value: profile.location,
  },
  {
    Icon: Mail,
    label: "Email",
    value: profile.email,
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-28" style={{ background: "#f8fafc" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="section-label">About Me</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Who I Am
          </h2>
        </div>

        {/* About text */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h3 className="text-lg font-bold text-slate-900 mb-4 text-center">
            Passionate Developer &amp; Competitive Programmer
          </h3>
          <p className="text-slate-600 leading-relaxed mb-4 text-sm md:text-base text-center">
            {profile.about.en}
          </p>
          <p className="text-slate-500 leading-relaxed text-sm text-center">
            I believe in learning by building — from campus management systems to
            national-level result platforms, I love creating software that makes a difference.
          </p>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-16">
          {infoCards.map(({ Icon, label, value }) => (
            <div
              key={label}
              className="card"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-cyan-50">
                  <Icon size={16} className="text-cyan-500" />
                </div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                  {label}
                </span>
              </div>
              <p className="text-slate-700 text-sm font-medium leading-snug">{value}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat) => (
            <div
              key={stat.label.en}
              className="text-center p-6 md:p-8 rounded-2xl bg-white border border-slate-100 shadow-sm"
            >
              <div className="text-3xl md:text-4xl font-extrabold text-cyan-500 mb-3">
                <CountUp end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-slate-500 text-sm font-medium leading-snug">{stat.label.en}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { achievements } from "@/lib/data";

export default function AchievementsSection() {
  return (
    <section id="achievements" className="py-20 md:py-28" style={{ background: "#f8fafc" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-label">Honors &amp; Awards</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Achievements</h2>
          <div style={{ textAlign: "center", color: "#64748b", fontSize: "15px", marginTop: "12px", lineHeight: "1.7" }}>
            Milestones that mark the journey so far
          </div>
        </div>

        {/* Achievement cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8" style={{ maxWidth: "820px", margin: "0 auto" }}>
          {achievements.map((item) => (
            <div key={item.title.en} className="card flex flex-col items-center gap-4 md:gap-5" style={{ textAlign: "center" }}>
              {/* Emoji */}
              <div className="text-4xl leading-none">{item.icon}</div>

              <div className="min-w-0">
                <h3 className="font-bold text-slate-900 leading-snug mb-2" style={{ textAlign: "center" }}>
                  {item.title.en}
                </h3>
                <p className="text-slate-500 text-sm mb-3 leading-relaxed" style={{ textAlign: "center" }}>{item.org}</p>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ background: "#f0fdfe", color: "#06b6d4", border: "1px solid #a5f3fc" }}
                  >
                    {item.year}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


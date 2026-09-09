"use client";

import { achievements } from "@/lib/data";

export default function AchievementsSection() {
  return (
    <section id="achievements" className="py-20 md:py-28" style={{ background: "#f8fafc" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="section-label">Honors &amp; Awards</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Achievements</h2>
          <p className="text-slate-500 mt-3 text-sm md:text-base max-w-xl mx-auto">
            Milestones that mark the journey so far
          </p>
        </div>

        {/* Achievement cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {achievements.map((item) => (
            <div key={item.title.en} className="card flex items-start gap-5">
              {/* Emoji */}
              <div className="text-4xl flex-shrink-0 leading-none mt-0.5">{item.icon}</div>

              <div className="min-w-0">
                <h3 className="font-bold text-slate-900 leading-snug mb-1">
                  {item.title.en}
                </h3>
                <p className="text-slate-500 text-sm mb-2 leading-relaxed">{item.org}</p>
                <span
                  className="inline-block px-3 py-0.5 rounded-full text-xs font-semibold"
                  style={{ background: "#f0fdfe", color: "#06b6d4", border: "1px solid #a5f3fc" }}
                >
                  {item.year}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

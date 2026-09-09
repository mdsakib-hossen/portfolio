"use client";

import { skills } from "@/lib/data";

const categoryIcons: Record<string, string> = {
  Languages: "💻",
  Frameworks: "⚛️",
  "Database & Tools": "🗄️",
  Concepts: "🧠",
};

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-label">Technical Skills</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">What I Work With</h2>
          <p className="text-slate-500 mt-4 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        {/* Skill categories grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
          {skills.map((skillGroup) => {
            const categoryName = skillGroup.category.en;
            const icon = categoryIcons[categoryName] ?? "🔧";

            return (
              <div key={categoryName} style={{ background: "white", borderRadius: "16px", padding: "28px", border: "1px solid #e2e8f0", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", height: "100%" }}>
                {/* Card header */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-2xl">{icon}</span>
                  <h3 className="text-lg font-bold text-slate-900">{categoryName}</h3>
                </div>

                {/* Skill badges */}
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill) => (
                    <span key={skill.name} style={{ display: "inline-flex", padding: "5px 14px", borderRadius: "20px", fontSize: "13px", fontWeight: 600, background: "#f0fdfe", color: "#06b6d4", border: "1px solid #a5f3fc" }}>
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

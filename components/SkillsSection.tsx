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
    <section id="skills" style={{ background: "#ffffff", padding: "80px 0 100px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <p style={{ textAlign: "center", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "#06b6d4", fontWeight: 700, marginBottom: "12px" }}>
          TECHNICAL SKILLS
        </p>
        <h2 style={{ textAlign: "center", fontSize: "clamp(2rem, 5vw, 2.8rem)", fontWeight: 800, color: "#0f172a", marginBottom: "12px" }}>
          What I Work With
        </h2>
        <p style={{ textAlign: "center", fontSize: "15px", color: "#64748b", marginBottom: "56px", lineHeight: "1.7" }}>
          Technologies and tools I use to bring ideas to life
        </p>

        {/* 2x2 Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))", gap: "20px" }}>
          {skills.map((skillGroup) => {
            const categoryName = skillGroup.category.en;
            const icon = categoryIcons[categoryName] ?? "🔧";
            return (
              <div key={categoryName} style={{
                background: "white",
                borderRadius: "16px",
                padding: "28px 24px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                textAlign: "center",
              }}>
                {/* Card header */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "18px" }}>
                  <span style={{ fontSize: "24px" }}>{icon}</span>
                  <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#0f172a" }}>{categoryName}</h3>
                </div>
                {/* Badges */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center" }}>
                  {skillGroup.items.map((skill) => (
                    <span key={skill.name} style={{
                      padding: "5px 14px",
                      borderRadius: "20px",
                      fontSize: "13px",
                      fontWeight: 600,
                      background: "#f0fdfe",
                      color: "#06b6d4",
                      border: "1px solid #a5f3fc",
                    }}>
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

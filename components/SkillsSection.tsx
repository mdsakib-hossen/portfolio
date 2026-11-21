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
    <section id="skills">
      <div className="wrap">
        <div className="shead">
          <span className="tag">Skills</span>
          <h2>
            Tech I <em>work with</em>
          </h2>
          <p className="sdesc">
            Technologies and tools I use to bring ideas to life — from competitive programming to
            full-stack development.
          </p>
        </div>
        <div className="skillgrid">
          {skills.map((group) => {
            const name = group.category.en;
            const icon = categoryIcons[name] ?? "🔧";
            return (
              <div className="skillbox rv" key={name}>
                <div className="h">
                  <div className="ic">{icon}</div>
                  <h3>{name}</h3>
                </div>
                <div className="chips">
                  {group.items.map((item) => (
                    <span className="chip" key={item.name}>
                      {item.name}
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

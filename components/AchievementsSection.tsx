"use client";

import { achievements } from "@/lib/data";

export default function AchievementsSection() {
  return (
    <section id="achievements" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="shead center">
          <span className="tag">Honors &amp; awards</span>
          <h2>
            Milestones that <em>matter</em>
          </h2>
          <p className="sdesc">Recognition and milestones along the journey.</p>
        </div>
        <div className="achgrid">
          {achievements.map((item) => (
            <div className="achcard rv" key={item.title.en}>
              <div className="em">{item.icon}</div>
              <div>
                <h4>{item.title.en}</h4>
                <p>{item.org}</p>
                <span className="yr">{item.year}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { profile, education, skills, cpProfiles, projects, achievements } from "@/lib/data";

export default function ResumePage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', 'Segoe UI', sans-serif; background: #f1f5f9; color: #0f172a; }
        
        /* Print button — fixed on desktop, static on mobile */
        .print-btn { position: fixed; top: 24px; right: 24px; background: linear-gradient(135deg, #7c3aed, #db2777); color: white; border: none; padding: 12px 24px; border-radius: 10px; font-size: 14px; font-weight: 600; cursor: pointer; z-index: 999; box-shadow: 0 4px 20px rgba(124,58,237,0.4); display: flex; align-items: center; gap: 8px; }
        
        .page { max-width: 820px; margin: 40px auto; background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.12); }
        .banner { background: linear-gradient(135deg, #1e1b4b 0%, #4c1d95 50%, #831843 100%); padding: 28px 24px; display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; flex-wrap: wrap; }
        .banner-left .name { font-size: 26px; font-weight: 800; color: #fff; letter-spacing: -0.5px; }
        .banner-left .title { font-size: 12px; color: #c4b5fd; margin-top: 6px; font-weight: 500; }
        .banner-right { text-align: right; font-size: 11px; color: #e2d9f3; line-height: 2; }
        .banner-right a { color: #c4b5fd; text-decoration: none; }
        
        /* Two-column layout — desktop */
        .body { display: grid; grid-template-columns: 1fr 2fr; }
        .left-col { background: #faf5ff; padding: 28px 20px; border-right: 1px solid #e9d5ff; }
        .right-col { padding: 28px 28px; }
        
        .section { margin-bottom: 22px; }
        .section:last-child { margin-bottom: 0; }
        .section-title { font-size: 10px; font-weight: 800; color: #7c3aed; text-transform: uppercase; letter-spacing: 2.5px; margin-bottom: 12px; padding-bottom: 6px; border-bottom: 2px solid #ede9fe; }
        .about-text { font-size: 12px; color: #475569; line-height: 1.8; }
        .edu-item { margin-bottom: 12px; }
        .edu-inst { font-size: 13px; font-weight: 700; color: #1e1b4b; }
        .edu-dept { font-size: 11px; color: #64748b; margin-top: 2px; }
        .edu-year { font-size: 11px; color: #a78bfa; font-weight: 600; margin-top: 3px; }
        .skill-group { margin-bottom: 12px; }
        .skill-label { font-size: 10px; font-weight: 700; color: #1e1b4b; margin-bottom: 5px; text-transform: uppercase; letter-spacing: 0.5px; }
        .skill-tags { display: flex; flex-wrap: wrap; gap: 4px; }
        .skill-tag { background: #ede9fe; color: #5b21b6; font-size: 10px; padding: 2px 8px; border-radius: 20px; font-weight: 600; }
        .cp-item { background: white; border: 1px solid #e9d5ff; border-radius: 7px; padding: 7px 10px; margin-bottom: 6px; display: flex; justify-content: space-between; align-items: center; }
        .cp-platform { font-size: 11px; font-weight: 700; color: #4c1d95; }
        .cp-handle { font-size: 10px; color: #94a3b8; font-family: monospace; }
        .ach-item { display: flex; gap: 8px; margin-bottom: 8px; background: white; border: 1px solid #e9d5ff; border-radius: 7px; padding: 9px 10px; }
        .ach-icon { font-size: 16px; flex-shrink: 0; }
        .ach-title { font-size: 11px; font-weight: 700; color: #1e1b4b; }
        .ach-org { font-size: 10px; color: #94a3b8; margin-top: 1px; }
        .project-item { margin-bottom: 14px; padding-bottom: 14px; border-bottom: 1px solid #f1f5f9; }
        .project-item:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
        .project-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; margin-bottom: 4px; }
        .project-name { font-size: 12.5px; font-weight: 700; color: #1e1b4b; }
        .project-badge { font-size: 9px; font-weight: 700; padding: 2px 8px; border-radius: 20px; white-space: nowrap; flex-shrink: 0; }
        .badge-live { background: #dcfce7; color: #16a34a; }
        .badge-dev { background: #fef3c7; color: #d97706; }
        .badge-private { background: #ede9fe; color: #7c3aed; }
        .project-desc { font-size: 11px; color: #64748b; line-height: 1.7; margin-bottom: 6px; }
        .tech-tags { display: flex; flex-wrap: wrap; gap: 4px; }
        .tech-tag { background: #f8fafc; border: 1px solid #e2e8f0; color: #475569; font-size: 10px; padding: 1px 6px; border-radius: 4px; font-weight: 500; }
        .footer { background: linear-gradient(135deg, #1e1b4b, #4c1d95); padding: 14px 24px; text-align: center; font-size: 11px; color: #c4b5fd; font-style: italic; }

        /* ── MOBILE RESPONSIVE ── */
        @media (max-width: 640px) {
          /* Print button — static, not fixed */
          .print-btn {
            position: static;
            width: calc(100% - 32px);
            margin: 16px;
            justify-content: center;
            border-radius: 10px;
          }

          .page {
            margin: 0;
            border-radius: 0;
            box-shadow: none;
          }

          /* Banner — stack vertically */
          .banner {
            padding: 20px 16px;
            flex-direction: column;
            gap: 12px;
          }
          .banner-left .name { font-size: 22px; }
          .banner-right { text-align: left; font-size: 11px; }

          /* Single column on mobile */
          .body {
            display: flex;
            flex-direction: column;
          }
          .left-col {
            padding: 20px 16px;
            border-right: none;
            border-bottom: 1px solid #e9d5ff;
          }
          .right-col {
            padding: 20px 16px;
          }
        }

        /* Print styles */
        @media print {
          .print-btn { display: none !important; }
          body { background: white; }
          .page { margin: 0; border-radius: 0; box-shadow: none; max-width: 100%; }
          .body { display: grid; grid-template-columns: 1fr 2fr; }
        }
      `}</style>

      <button className="print-btn" onClick={() => window.print()}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        Download PDF
      </button>

      <div className="page">
        {/* Banner — data from profile */}
        <div className="banner">
          <div className="banner-left">
            <div className="name">{profile.name}</div>
            <div className="title">{profile.title}</div>
          </div>
          <div className="banner-right">
            <div>📧 {profile.email}</div>
            <div>📍 {profile.location}</div>
            <div>🐙 <a href={profile.github}>{profile.github.replace("https://", "")}</a></div>
            <div>💼 <a href={profile.linkedin}>{profile.linkedin.replace("https://", "")}</a></div>
          </div>
        </div>

        <div className="body">
          {/* LEFT COLUMN */}
          <div className="left-col">

            {/* Education — from data */}
            <div className="section">
              <div className="section-title">🎓 Education</div>
              {education.map((edu, i) => (
                <div key={i} className="edu-item">
                  <div className="edu-inst">{edu.institute}</div>
                  <div className="edu-dept">{edu.degree} — {edu.field}</div>
                  <div className="edu-year">{edu.start} — {edu.end} · {edu.location}</div>
                </div>
              ))}
            </div>

            {/* Skills — from data */}
            <div className="section">
              <div className="section-title">🛠️ Skills</div>
              {skills.map(({ category, items }, i) => (
                <div key={i} className="skill-group">
                  <div className="skill-label">{category.en}</div>
                  <div className="skill-tags">
                    {items.map(({ name }) => (
                      <span key={name} className="skill-tag">{name}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* CP Profiles — from data */}
            <div className="section">
              <div className="section-title">⚔️ Competitive Programming</div>
              {cpProfiles.map(({ platform, handle }) => (
                <div key={platform} className="cp-item">
                  <span className="cp-platform">{platform}</span>
                  <span className="cp-handle">@{handle}</span>
                </div>
              ))}
            </div>

            {/* Achievements — from data */}
            <div className="section">
              <div className="section-title">🏆 Achievements</div>
              {achievements.map(({ icon, title, org, year }, i) => (
                <div key={i} className="ach-item">
                  <div className="ach-icon">{icon}</div>
                  <div>
                    <div className="ach-title">{title.en}</div>
                    <div className="ach-org">{org} · {year}</div>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div className="right-col">

            {/* About — from data */}
            <div className="section">
              <div className="section-title">👨‍💻 About</div>
              <div className="about-text">{profile.about.en}</div>
            </div>

            {/* Projects — from data */}
            <div className="section">
              <div className="section-title">🚀 Projects</div>
              {projects.map(({ title, description, tags, liveUrl, statusType, award }) => (
                <div key={title} className="project-item">
                  <div className="project-header">
                    <div className="project-name">{award ? `${award.split(" ")[0]} ` : ""}{title}</div>
                    <span className={`project-badge ${
                      statusType === "live" ? "badge-live" :
                      statusType === "dev" ? "badge-dev" : "badge-private"
                    }`}>
                      {statusType === "live" ? "Live" : statusType === "dev" ? "In Dev" : "Private"}
                    </span>
                  </div>
                  <div className="project-desc">
                    {description.en}
                    {liveUrl && <><br/><span style={{color:"#7c3aed", fontSize:"10.5px"}}>🔗 {liveUrl.replace("https://","")}</span></>}
                  </div>
                  <div className="tech-tags">
                    {tags.map(t => <span key={t} className="tech-tag">{t}</span>)}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Footer — quote from data */}
        <div className="footer">"{profile.quote}" 🚀</div>
      </div>
    </>
  );
}

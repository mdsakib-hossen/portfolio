"use client";

import { motion } from "framer-motion";
import { ExternalLink, Star, GitFork, GitBranch } from "lucide-react";
import { profile, projects } from "@/lib/data";

// Top pinned repos — manually listed (GitHub API needs token for pinned)
const pinnedRepos = [
  {
    name: "college-canteen",
    description: "Pre-order canteen food with QR Token system — no queue! Built with Flask + PostgreSQL.",
    url: "https://github.com/mdsakib-hossen/college-canteen",
    language: "Python",
    languageColor: "#3572A5",
    stars: 0,
    forks: 0,
    live: "https://college-canteen-mdhg.onrender.com",
  },
  {
    name: "portfolio",
    description: "Personal portfolio website built with Next.js, Tailwind CSS and Supabase.",
    url: "https://github.com/mdsakib-hossen/portfolio",
    language: "TypeScript",
    languageColor: "#3178c6",
    stars: 0,
    forks: 0,
    live: "https://mdsakib-hossen.vercel.app",
  },
  {
    name: "BPI-EduManage",
    description: "Full-stack digital campus management system. Won 2nd Place at BPI Hobby Fair.",
    url: "https://github.com/mdsakib-hossen",
    language: "JavaScript",
    languageColor: "#f1e05a",
    stars: 0,
    forks: 0,
    live: null,
  },
];

// Top project from data.ts
const topProject = projects[0];

export default function GitHubSection() {
  return (
    <section id="github" style={{ background: "#f8fafc", padding: "80px 0 100px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <p className="section-label">Open Source</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 800, color: "#0f172a", marginBottom: "12px" }}>
            GitHub Activity
          </h2>
          <p style={{ fontSize: "15px", color: "#64748b", lineHeight: "1.7" }}>
            My open source contributions and projects
          </p>
        </div>

        {/* GitHub Profile Link */}
        <motion.a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "linear-gradient(135deg, #0f172a, #1e293b)",
            borderRadius: "16px",
            padding: "20px 28px",
            marginBottom: "32px",
            textDecoration: "none",
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{
              width: "44px", height: "44px", borderRadius: "50%",
              background: "white", display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <GitBranch size={24} color="#0f172a" />
            </div>
            <div>
              <div style={{ color: "white", fontWeight: 700, fontSize: "16px" }}>
                github.com/mdsakib-hossen
              </div>
              <div style={{ color: "#94a3b8", fontSize: "13px", marginTop: "2px" }}>
                View full profile & all repositories
              </div>
            </div>
          </div>
          <ExternalLink size={18} color="#94a3b8" />
        </motion.a>

        {/* Contribution Graph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card"
          style={{ marginBottom: "32px", overflow: "hidden", padding: "24px" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e", animation: "pulse 2s infinite" }} />
            <span style={{ fontSize: "13px", fontWeight: 600, color: "#0f172a" }}>Contribution Graph</span>
            <span style={{ fontSize: "12px", color: "#94a3b8" }}>— Last 12 months</span>
          </div>
          <div style={{ overflowX: "auto" }}>
            <img
              src="https://ghchart.rshah.org/06b6d4/mdsakib-hossen"
              alt="GitHub Contribution Graph"
              style={{ width: "100%", minWidth: "600px", borderRadius: "8px" }}
            />
          </div>
        </motion.div>

        {/* GitHub Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px", marginBottom: "32px" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <img
              src="https://github-readme-stats.vercel.app/api?username=mdsakib-hossen&show_icons=true&theme=default&hide_border=true&bg_color=ffffff&title_color=06b6d4&icon_color=06b6d4&text_color=0f172a&count_private=true"
              alt="GitHub Stats"
              style={{ width: "100%", borderRadius: "12px", border: "1px solid #e2e8f0" }}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <img
              src="https://github-readme-stats.vercel.app/api/top-langs/?username=mdsakib-hossen&layout=compact&hide_border=true&bg_color=ffffff&title_color=06b6d4&text_color=0f172a&langs_count=6"
              alt="Top Languages"
              style={{ width: "100%", borderRadius: "12px", border: "1px solid #e2e8f0" }}
            />
          </motion.div>
        </div>

        {/* Pinned Repositories */}
        <div style={{ marginBottom: "32px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#0f172a", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
            📌 Pinned Repositories
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 270px), 1fr))", gap: "16px" }}>
            {pinnedRepos.map((repo, i) => (
              <motion.div
                key={repo.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card"
                style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "10px" }}
              >
                {/* Repo name + links */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <GitBranch size={16} color="#64748b" />
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: "14px", fontWeight: 700, color: "#06b6d4", textDecoration: "none" }}
                    >
                      {repo.name}
                    </a>
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    {repo.live && (
                      <a href={repo.live} target="_blank" rel="noopener noreferrer"
                        style={{ fontSize: "11px", padding: "2px 8px", borderRadius: "20px", background: "#dcfce7", color: "#16a34a", fontWeight: 600, textDecoration: "none" }}>
                        Live
                      </a>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p style={{ fontSize: "12px", color: "#64748b", lineHeight: "1.6", flex: 1 }}>
                  {repo.description}
                </p>

                {/* Language + stars + forks */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: repo.languageColor, display: "inline-block" }} />
                    <span style={{ fontSize: "11px", color: "#64748b" }}>{repo.language}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                    <Star size={12} color="#f59e0b" />
                    <span style={{ fontSize: "11px", color: "#64748b" }}>{repo.stars}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                    <GitFork size={12} color="#94a3b8" />
                    <span style={{ fontSize: "11px", color: "#64748b" }}>{repo.forks}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Top Project highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            background: "linear-gradient(135deg, #f0fdfe, #e0f2fe)",
            border: "1px solid #a5f3fc",
            borderRadius: "16px",
            padding: "28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div>
            <div style={{ fontSize: "11px", fontWeight: 700, color: "#06b6d4", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "6px" }}>
              🏆 Top Project
            </div>
            <div style={{ fontSize: "18px", fontWeight: 800, color: "#0f172a", marginBottom: "6px" }}>
              {topProject.title}
            </div>
            <div style={{ fontSize: "13px", color: "#64748b", maxWidth: "480px", lineHeight: "1.6" }}>
              {topProject.description.en}
            </div>
            {topProject.award && (
              <div style={{ marginTop: "10px", display: "inline-flex", alignItems: "center", gap: "6px", padding: "4px 12px", borderRadius: "20px", background: "white", border: "1px solid #a5f3fc", fontSize: "12px", fontWeight: 600, color: "#0891b2" }}>
                {topProject.award}
              </div>
            )}
          </div>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ textDecoration: "none", whiteSpace: "nowrap" }}
          >
            View on GitHub →
          </a>
        </motion.div>

      </div>
    </section>
  );
}

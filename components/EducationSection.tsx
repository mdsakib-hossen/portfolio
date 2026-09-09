"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

// Academic Education data
const academics = [
  {
    icon: "🏫",
    school: "Majgram Modhupur Govt. Primary School",
    degree: "Primary School Certificate (PSC)",
    year: "2018",
    duration: "5 Years",
    location: "Raninagar, Naogaon",
    color: "#10b981",
  },
  {
    icon: "🏛️",
    school: "Modhupur High School",
    degree: "JSC & SSC",
    year: "2021 – 2024",
    duration: "6 Years",
    location: "Naogaon",
    color: "#f59e0b",
  },
  {
    icon: "🎓",
    school: "Bangladesh Polytechnic Institute, Rajshahi",
    degree: "Diploma in Engineering — CST",
    year: "2025 – 2028",
    duration: "4 Years",
    location: "Rajshahi, Bangladesh",
    color: "#06b6d4",
    current: true,
  },
];

// Courses & Certifications
const courses = [
  {
    icon: "🏅",
    title: "Certificate of Leadership",
    subtitle: "Campus Ambassador",
    org: "Shohoj Coding",
    year: "August 2026",
    duration: "",
    color: "#8b5cf6",
    certificateUrl: null,
    status: "Completed",
  },
  {
    icon: "💻",
    title: "Office Management for Information & Technology",
    subtitle: "Computer Course",
    org: "Bashundhara Computer Training Center",
    year: "2024",
    duration: "",
    color: "#f97316",
    certificateUrl: null,
    status: "Completed",
  },
  {
    icon: "⚡",
    title: "CSE Fundamentals",
    subtitle: "DSA, OOP, Database, Backend, AI/ML",
    org: "Phitron (Programming Hero)",
    year: "2026 – 2027",
    duration: "1 Year",
    color: "#06b6d4",
    certificateUrl: null,
    status: "Ongoing",
  },
];

export default function EducationSection() {
  return (
    <section id="education" style={{ background: "#ffffff", padding: "80px 0 100px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 24px" }}>

        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <p style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "#06b6d4", fontWeight: 700, marginBottom: "12px" }}>
            BACKGROUND
          </p>
          <h2 style={{ fontSize: "clamp(2rem, 5vw, 2.8rem)", fontWeight: 800, color: "#0f172a", marginBottom: "12px" }}>
            Education
          </h2>
          <div style={{ fontSize: "15px", color: "#64748b", lineHeight: "1.7" }}>
            My academic journey and ongoing learning
          </div>
        </div>

        {/* ── SUBSECTION 1: Academic Education ── */}
        <div style={{ marginBottom: "64px" }}>
          <h3 style={{ textAlign: "center", fontSize: "20px", fontWeight: 700, color: "#0f172a", marginBottom: "32px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
            🎓 Academic Education
          </h3>

          {/* Timeline */}
          <div style={{ position: "relative" }}>
            {/* Center vertical line */}
            <div style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: "2px",
              background: "linear-gradient(to bottom, #06b6d4, #a5f3fc)",
              transform: "translateX(-50%)",
            }} />

            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
              {academics.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  style={{
                    display: "flex",
                    justifyContent: i % 2 === 0 ? "flex-start" : "flex-end",
                    paddingLeft: i % 2 === 0 ? "0" : "calc(50% + 24px)",
                    paddingRight: i % 2 === 0 ? "calc(50% + 24px)" : "0",
                    position: "relative",
                  }}
                >
                  {/* Timeline dot */}
                  <div style={{
                    position: "absolute",
                    left: "50%",
                    top: "20px",
                    transform: "translateX(-50%)",
                    width: "14px",
                    height: "14px",
                    borderRadius: "50%",
                    background: item.color,
                    border: "3px solid white",
                    boxShadow: `0 0 0 3px ${item.color}40`,
                    zIndex: 10,
                  }} />

                  {/* Card */}
                  <div style={{
                    background: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "14px",
                    padding: "20px 24px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                    width: "100%",
                    maxWidth: "380px",
                    borderLeft: `4px solid ${item.color}`,
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                      <span style={{ fontSize: "24px" }}>{item.icon}</span>
                      <div>
                        <div style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a" }}>{item.school}</div>
                        <div style={{ fontSize: "12px", color: "#64748b" }}>{item.degree}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "8px" }}>
                      <span style={{ fontSize: "11px", padding: "3px 10px", borderRadius: "20px", background: `${item.color}15`, color: item.color, fontWeight: 600 }}>
                        {item.year}
                      </span>
                      <span style={{ fontSize: "11px", padding: "3px 10px", borderRadius: "20px", background: "#f1f5f9", color: "#64748b", fontWeight: 500 }}>
                        📍 {item.location}
                      </span>
                      {item.current && (
                        <span style={{ fontSize: "11px", padding: "3px 10px", borderRadius: "20px", background: "#dcfce7", color: "#16a34a", fontWeight: 600 }}>
                          ● Current
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ── SUBSECTION 2: Courses & Certifications ── */}
        <div>
          <h3 style={{ textAlign: "center", fontSize: "20px", fontWeight: 700, color: "#0f172a", marginBottom: "32px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
            📜 Courses &amp; Certifications
          </h3>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: "20px", maxWidth: "860px", margin: "0 auto" }}>
            {courses.map((course, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{
                  background: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "16px",
                  padding: "24px 20px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  textAlign: "center",
                  position: "relative",
                  borderTop: `4px solid ${course.color}`,
                }}
              >
                {/* Status badge */}
                <span style={{
                  position: "absolute",
                  top: "12px",
                  right: "12px",
                  fontSize: "10px",
                  padding: "2px 8px",
                  borderRadius: "20px",
                  fontWeight: 600,
                  background: course.status === "Ongoing" ? "#fef3c7" : "#dcfce7",
                  color: course.status === "Ongoing" ? "#d97706" : "#16a34a",
                }}>
                  {course.status}
                </span>

                <div style={{ fontSize: "36px", marginBottom: "12px" }}>{course.icon}</div>
                <h4 style={{ fontSize: "14px", fontWeight: 700, color: "#0f172a", marginBottom: "4px", lineHeight: "1.4" }}>{course.title}</h4>
                <p style={{ fontSize: "12px", color: "#64748b", marginBottom: "8px" }}>{course.subtitle}</p>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "4px", padding: "3px 10px", borderRadius: "20px", background: `${course.color}15`, marginBottom: "8px" }}>
                  <span style={{ fontSize: "11px", fontWeight: 700, color: course.color }}>{course.org}</span>
                </div>
                <div style={{ fontSize: "11px", color: "#94a3b8", marginBottom: "12px" }}>{course.year}</div>
                {course.certificateUrl && (
                  <a href={course.certificateUrl} target="_blank" rel="noopener noreferrer"
                    style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "12px", color: course.color, fontWeight: 600, textDecoration: "none" }}>
                    View Certificate <ExternalLink size={12} />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

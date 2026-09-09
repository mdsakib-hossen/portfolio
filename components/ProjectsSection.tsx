"use client";

import { ExternalLink } from "lucide-react";
import { GithubIcon } from "./icons";
import { projects } from "@/lib/data";

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  live: { label: "Live", color: "#16a34a", bg: "#f0fdf4" },
  dev: { label: "In Development", color: "#d97706", bg: "#fffbeb" },
  private: { label: "Private", color: "#64748b", bg: "#f8fafc" },
};

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-label">My Work</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Featured Projects</h2>
          <div style={{ textAlign: "center", color: "#64748b", fontSize: "15px", marginTop: "12px", lineHeight: "1.7" }}>
            Real-world software built to solve real problems
          </div>
        </div>

        {/* Project cards — full width stack */}
        <div className="flex flex-col gap-8" style={{ maxWidth: "900px", margin: "0 auto" }}>
          {projects.map((project) => {
            const status = statusConfig[project.statusType] ?? statusConfig.private;

            return (
              <div key={project.title} className="card md:p-8">
                <div className="flex flex-col md:flex-row md:items-start gap-5">
                  {/* Gradient accent bar */}
                  <div
                    className="hidden md:block w-1.5 rounded-full flex-shrink-0 self-stretch"
                    style={{
                      background: `linear-gradient(${project.color.replace("from-", "").replace(" to-", ", ")})`,
                      minHeight: "60px",
                    }}
                  />

                  <div className="flex-1 min-w-0">
                    {/* Title row */}
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-slate-900">{project.title}</h3>

                      {/* Award badge */}
                      {project.award && (
                        <span className="badge text-amber-600 bg-amber-50 border-amber-200">
                          {project.award}
                        </span>
                      )}

                      {/* Status badge */}
                      <span
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border"
                        style={{
                          color: status.color,
                          background: status.bg,
                          borderColor: status.color + "40",
                        }}
                      >
                        {project.statusType === "live" && (
                          <span
                            className="w-1.5 h-1.5 rounded-full mr-1.5 animate-pulse"
                            style={{ background: status.color }}
                          />
                        )}
                        {status.label}
                      </span>
                    </div>

                    {/* Subtitle */}
                    <p className="text-slate-500 text-sm mb-3" style={{ textAlign: "center" }}>{project.subtitle.en}</p>

                    {/* Description */}
                    <p className="text-slate-600 leading-relaxed text-sm md:text-base mb-5">
                      {project.description.en}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span key={tag} className="badge text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-3 flex-wrap">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary flex items-center gap-2 text-sm py-2.5 px-5"
                        >
                          <ExternalLink size={14} />
                          Live Demo
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-outline flex items-center gap-2 text-sm py-2 px-5"
                        >
                          <GithubIcon size={14} />
                          GitHub
                        </a>
                      )}
                      {!project.liveUrl && !project.githubUrl && (
                        <span className="text-slate-400 text-sm italic flex items-center gap-1.5">
                          🔒 Source code private
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


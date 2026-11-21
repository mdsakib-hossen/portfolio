"use client";

import { useEffect, useRef } from "react";
import { projects } from "@/lib/data";

const statusConfig: Record<string, { label: string; cls: string }> = {
  live: { label: "● Live", cls: "live" },
  dev: { label: "◐ In Development", cls: "dev" },
  private: { label: "🔒 Private", cls: "private" },
};

// Domain/url to show in the chrome bar
const shotUrl: Record<string, string> = {
  "BPI EduManage": "bpi-edumanage.app",
  "College Canteen Pre-Order System": "college-canteen.onrender.com",
  "Karigori Result": "karigori-result.app",
};

// Live projects get a real screenshot; others use CSS mockups
const liveShot: Record<string, string | null> = {
  "College Canteen Pre-Order System":
    "https://image.thum.io/get/width/1200/crop/560/noanimate/https://college-canteen-mdhg.onrender.com",
};

function Mockup({ type }: { type: string }) {
  if (type === "BPI EduManage") {
    return (
      <div className="mock">
        <div className="side">
          <i className="on" />
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className="main">
          <div className="hd">
            <b />
            <s />
          </div>
          <div className="tiles">
            <span />
            <span />
            <span />
          </div>
          <div className="ln" />
          <div className="ln s" />
        </div>
      </div>
    );
  }
  if (type === "Karigori Result") {
    return (
      <div className="mock">
        <div className="main">
          <div className="hd">
            <b />
            <s />
          </div>
          <div className="tr">
            <span className="c" />
            <span className="l" />
            <span className="p" />
          </div>
          <div className="tr">
            <span className="c" />
            <span className="l" />
            <span className="p" style={{ background: "#12a150" }} />
          </div>
          <div className="tr">
            <span className="c" />
            <span className="l" />
            <span className="p" style={{ background: "#d97706" }} />
          </div>
          <div className="ln s" />
        </div>
      </div>
    );
  }
  // College Canteen (QR style) — used as fallback
  return (
    <div className="mock">
      <div className="main">
        <div className="hd">
          <b />
          <s />
        </div>
        <div className="rowq">
          <div className="qr" />
          <div className="col">
            <div className="ln a" />
            <div className="ln s" />
          </div>
        </div>
        <div className="ln" />
        <div className="ln s" />
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects">
      <div className="wrap">
        <div className="shead center">
          <span className="tag">Projects</span>
          <h2>
            Things I&apos;ve <em>built</em>
          </h2>
          <p className="sdesc">
            Real-world software built to solve real problems — designed, built and shipped end to
            end.
          </p>
        </div>
        <div className="pgrid">
          {projects.map((project) => {
            const status = statusConfig[project.statusType] ?? statusConfig.private;
            const shot = liveShot[project.title] ?? null;
            return (
              <article className="proj rv" key={project.title}>
                <ProjectShot
                  title={project.title}
                  colorFrom={project.color}
                  statusLabel={status.label}
                  statusCls={status.cls}
                  award={project.award}
                  shotUrl={shotUrl[project.title]}
                  liveShot={shot}
                />
                <div className="body">
                  <h3>{project.title.replace(" Pre-Order System", "")}</h3>
                  <div className="sub">{project.subtitle.en}</div>
                  <p>{project.description.en}</p>
                  <div className="tech">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <div className="links">
                    {project.liveUrl ? (
                      <a className="plink primary" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        Live demo <span className="ar">↗</span>
                      </a>
                    ) : null}
                    {project.githubUrl ? (
                      <a className="plink ghost" href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        GitHub
                      </a>
                    ) : (
                      <span className="priv">🔒 Source code private</span>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProjectShot({
  title,
  colorFrom,
  statusLabel,
  statusCls,
  award,
  shotUrl,
  liveShot,
}: {
  title: string;
  colorFrom: string;
  statusLabel: string;
  statusCls: string;
  award: string | null;
  shotUrl: string;
  liveShot: string | null;
}) {
  const shotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!liveShot || !shotRef.current) return;
    const img = document.createElement("img");
    img.className = "shotimg";
    img.alt = `${title} preview`;
    img.loading = "lazy";
    img.decoding = "async";
    img.addEventListener("load", () => {
      img.classList.add("loaded");
      shotRef.current?.classList.add("hasimg");
    });
    img.addEventListener("error", () => img.remove());
    img.src = liveShot;
    shotRef.current.appendChild(img);
  }, [liveShot, title]);

  // parse gradient from data.ts color like "from-green-600 to-cyan-600"
  const grad = colorFrom.replace("from-", "").replace(" to-", ", ");

  return (
    <div
      className="shot"
      ref={shotRef}
      style={{ background: `linear-gradient(135deg, ${grad})` }}
    >
      <div className="chrome">
        <i style={{ background: "#ff5f57" }} />
        <i style={{ background: "#febc2e" }} />
        <i style={{ background: "#28c840" }} />
        <span className="url">{shotUrl}</span>
      </div>
      <Mockup type={title} />
      {award && <span className="badge">{award}</span>}
      <span className={`st ${statusCls}`}>{statusLabel}</span>
    </div>
  );
}

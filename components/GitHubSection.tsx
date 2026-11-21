"use client";

import { profile, projects } from "@/lib/data";

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

const topLanguages = [
  { name: "Python", color: "#3572A5" },
  { name: "TypeScript", color: "#3178c6" },
  { name: "JavaScript", color: "#f1e05a" },
  { name: "C++", color: "#f34b7d" },
  { name: "Java", color: "#b07219" },
];

const topProject = projects[0];

export default function GitHubSection() {
  return (
    <section id="github">
      <div className="wrap">
        <div className="shead">
          <span className="tag">Open source</span>
          <h2>
            GitHub <em>activity</em>
          </h2>
          <p className="sdesc">My open source contributions and projects.</p>
        </div>

        {/* Profile hero */}
        <a className="gh-hero rv" href={profile.github} target="_blank" rel="noopener noreferrer">
          <div className="l">
            <div className="ic">{"</>"}</div>
            <div>
              <div className="u">github.com/mdsakib-hossen</div>
              <div className="s">View full profile &amp; all repositories</div>
            </div>
          </div>
          <span className="arrow">↗</span>
        </a>

        {/* Graph + side */}
        <div className="gh-top">
          <div className="gh-graph rv">
            <div className="cap">
              <span className="d" />
              Contribution Graph
              <span className="sub">— last 12 months</span>
            </div>
            <div className="scroll">
              <img
                src="https://ghchart.rshah.org/2340f0/mdsakib-hossen"
                alt="GitHub Contribution Graph"
              />
            </div>
          </div>
          <div className="gh-side rv">
            <div>
              <div className="k">Quick facts</div>
              <div className="gh-kv">
                <span>Repositories</span>
                <span className="v">3+</span>
              </div>
              <div className="gh-kv">
                <span>Followers</span>
                <span className="v">—</span>
              </div>
              <div className="gh-kv">
                <span>Following</span>
                <span className="v">—</span>
              </div>
            </div>
            <div>
              <div className="k">Top languages</div>
              <div className="langsegs">
                {topLanguages.map((l) => (
                  <span className="lg" key={l.name}>
                    <span className="dot" style={{ background: l.color }} />
                    {l.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Pinned repos */}
        <div className="repos">
          {pinnedRepos.map((repo) => (
            <div className="repo rv" key={repo.name}>
              <div className="top">
                <a className="nm" href={repo.url} target="_blank" rel="noopener noreferrer">
                  {repo.name}
                </a>
                {repo.live && (
                  <a className="live" href={repo.live} target="_blank" rel="noopener noreferrer">
                    Live
                  </a>
                )}
              </div>
              <p>{repo.description}</p>
              <div className="meta">
                <span className="lang">
                  <span className="dot" style={{ background: repo.languageColor }} />
                  {repo.language}
                </span>
                <span>★ {repo.stars}</span>
                <span>⑂ {repo.forks}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Top project */}
        <div className="top-project rv">
          <div>
            <div className="k">🏆 Top project</div>
            <h3>{topProject.title}</h3>
            <p>{topProject.description.en}</p>
            {topProject.award && <span className="aw">{topProject.award}</span>}
          </div>
          <a className="btn btn-dark" href={profile.github} target="_blank" rel="noopener noreferrer">
            View on GitHub <span className="ar">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}

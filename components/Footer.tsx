"use client";

import { profile } from "@/lib/data";

const navLinks = [
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "CP", id: "cp" },
  { label: "Projects", id: "projects" },
  { label: "Achievements", id: "achievements" },
  { label: "GitHub", id: "github" },
  { label: "Education", id: "education" },
  { label: "Contact", id: "contact" },
];

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="fgrid">
          <div className="l">
            <span className="wordmark">
              <span className="sq">{"</>"}</span> Sakib Hossen
            </span>
            <p>&ldquo;{profile.quote}&rdquo;</p>
          </div>
          <div className="flinks">
            {navLinks.map((l) => (
              <a key={l.id} href={`#${l.id}`}>
                {l.label}
              </a>
            ))}
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: "32px", paddingTop: "24px", borderTop: "1px solid var(--line)", fontSize: "12.5px", color: "var(--muted)" }}>
          © {new Date().getFullYear()} Md. Sakib Hossen · Designed &amp; Built with ❤️
        </div>
      </div>
    </footer>
  );
}

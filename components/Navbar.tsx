"use client";

import { useState, useEffect } from "react";

const navItems = [
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "CP", id: "cp" },
  { label: "Projects", id: "projects" },
  { label: "Achievements", id: "achievements" },
  { label: "GitHub", id: "github" },
  { label: "Education", id: "education" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const prog = document.getElementById("prog");
      if (prog) {
        const h = document.documentElement;
        const scrolledPct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
        prog.style.width = scrolledPct + "%";
      }
      const totop = document.getElementById("totop");
      if (totop) totop.classList.toggle("on", window.scrollY > 600);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // scrollspy
    const secs = navItems.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    secs.forEach((s) => spy.observe(s));

    // reveal on scroll
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".rv").forEach((el) => io.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      spy.disconnect();
      io.disconnect();
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <div id="prog" />
      <div className="bgfx">
        <div className="blob b1" />
        <div className="blob b2" />
        <div className="blob b3" />
      </div>

      <header className={`nav ${scrolled ? "solid" : ""}`}>
        <div className="navbar">
          <button className="wordmark" onClick={() => scrollTo("top")}>
            <span className="sq">{"</>"}</span> Sakib Hossen
          </button>
          <nav className="menu">
            {navItems.map((item) => (
              <a
                key={item.id}
                className={active === item.id ? "active" : ""}
                onClick={() => scrollTo(item.id)}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="navcta">
            <button className="btn btn-dark" onClick={() => scrollTo("contact")}>
              Hire me <span className="ar">↗</span>
            </button>
            <button
              className={`burger ${menuOpen ? "open" : ""}`}
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Menu"
            >
              <i />
              <i />
              <i />
            </button>
          </div>
        </div>
      </header>

      <div className={`mmenu ${menuOpen ? "open" : ""}`}>
        {navItems.map((item) => (
          <a key={item.id} onClick={() => scrollTo(item.id)}>
            {item.label}
          </a>
        ))}
        <div className="mfoot">
          <a className="btn btn-accent" onClick={() => scrollTo("contact")}>
            Hire me <span className="ar">↗</span>
          </a>
        </div>
      </div>

      <button
        id="totop"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >
        ↑
      </button>
    </>
  );
}

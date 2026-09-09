"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = ["Home", "About", "Skills", "CP", "Projects", "Achievements", "Blog", "Contact"];
const navLinks = ["home", "about", "skills", "cp-stats", "projects", "achievements", "blog", "contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-xl bg-[#050b14]/80 border-b border-cyan-500/10 py-3"
            : "py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-2">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-base md:text-xl font-bold gradient-text cursor-pointer select-none flex-shrink-0"
            onClick={() => scrollTo("home")}
          >
            {"<Sakib />"}
          </motion.div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navItems.map((item, i) => (
              <button
                key={i}
                onClick={() => scrollTo(navLinks[i])}
                className="nav-link text-sm text-gray-400 hover:text-cyan-400 transition-colors duration-200 font-medium"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg glass hover:border-cyan-400/50 transition-all"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen
                ? <X size={18} className="text-cyan-400" />
                : <Menu size={18} className="text-cyan-400" />
              }
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-7"
            style={{
              background: "rgba(5,11,20,0.97)",
              backdropFilter: "blur(20px)",
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-lg glass"
            >
              <X size={22} className="text-cyan-400" />
            </button>

            {/* Logo */}
            <div className="text-2xl font-bold gradient-text mb-4">{"<Sakib />"}</div>

            {navItems.map((item, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => scrollTo(navLinks[i])}
                className="text-xl font-semibold text-gray-300 hover:text-cyan-400 transition-colors tracking-wide"
              >
                {item}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

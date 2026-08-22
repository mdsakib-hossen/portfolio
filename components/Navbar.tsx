"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const navItems = {
  en: ["Home", "About", "Skills", "CP", "Projects", "Achievements", "Blog", "Contact"],
  bn: ["হোম", "পরিচয়", "দক্ষতা", "CP", "প্রজেক্ট", "অর্জন", "ব্লগ", "যোগাযোগ"],
};

const navLinks = ["home", "about", "skills", "cp-stats", "projects", "achievements", "blog", "contact"];

export default function Navbar() {
  const { theme, language, toggleTheme, toggleLanguage } = useTheme();
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
            ? "backdrop-blur-xl bg-black/60 border-b border-purple-500/10 py-3"
            : "py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-lg md:text-xl font-bold gradient-text cursor-pointer select-none"
            onClick={() => scrollTo("home")}
          >
            {"<Sakib />"}
          </motion.div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navItems[language].map((item, i) => (
              <button
                key={i}
                onClick={() => scrollTo(navLinks[i])}
                className="nav-link text-sm text-gray-400 hover:text-purple-400 transition-colors duration-200 font-medium"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg glass hover:border-purple-400/50 transition-all"
              title="Toggle Language"
            >
              <span className="text-xs font-bold text-purple-400">
                {language === "en" ? "বাং" : "EN"}
              </span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg glass hover:border-purple-400/50 transition-all"
              title="Toggle Theme"
            >
              {theme === "dark" ? (
                <Sun size={16} className="text-yellow-400" />
              ) : (
                <Moon size={16} className="text-purple-400" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg glass hover:border-purple-400/50 transition-all"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen
                ? <X size={18} className="text-purple-400" />
                : <Menu size={18} className="text-purple-400" />
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
              background: "rgba(10,10,15,0.97)",
              backdropFilter: "blur(20px)",
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-lg glass"
            >
              <X size={22} className="text-purple-400" />
            </button>

            {/* Logo */}
            <div className="text-2xl font-bold gradient-text mb-4">{"<Sakib />"}</div>

            {navItems[language].map((item, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => scrollTo(navLinks[i])}
                className="text-xl font-semibold text-gray-300 hover:text-purple-400 transition-colors tracking-wide"
              >
                {item}
              </motion.button>
            ))}

            {/* Bottom controls in mobile menu */}
            <div className="flex items-center gap-4 mt-4">
              <button
                onClick={toggleLanguage}
                className="px-4 py-2 rounded-lg glass text-sm font-bold text-purple-400"
              >
                {language === "en" ? "বাংলা" : "English"}
              </button>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg glass"
              >
                {theme === "dark"
                  ? <Sun size={18} className="text-yellow-400" />
                  : <Moon size={18} className="text-purple-400" />
                }
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { achievements } from "@/lib/data";

export default function AchievementsSection() {
  const { language } = useTheme();

  return (
    <section id="achievements" className="section-padding max-w-5xl mx-auto px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-8 md:mb-16">
          <p className="text-purple-400 font-mono text-sm tracking-widest mb-2">
            {language === "en" ? "// MY JOURNEY" : "// আমার যাত্রা"}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold gradient-text">
            {language === "en" ? "Achievements & Timeline" : "অর্জন ও সময়রেখা"}
          </h2>
        </div>

        {/* Mobile layout: single column with left-side line */}
        <div className="md:hidden relative">
          {/* Left vertical line for mobile */}
          <div
            className="absolute left-4 top-0 bottom-0 w-px"
            style={{ background: "linear-gradient(to bottom, #7c3aed, #ec4899, transparent)" }}
          />

          <div className="space-y-6 pl-10">
            {achievements.map(({ icon, title, org, year, color }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="relative"
              >
                {/* Dot on the left line */}
                <div
                  className="absolute -left-[26px] top-4 w-4 h-4 rounded-full border-2 border-gray-900 z-10 flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #7c3aed, #ec4899)", boxShadow: "0 0 10px rgba(124,58,237,0.5)" }}
                />

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="glass rounded-xl p-4 border border-white/5 w-full"
                >
                  <span className="text-2xl block mb-2">{icon}</span>
                  <h3 className={`font-bold text-sm sm:text-base bg-gradient-to-r ${color} bg-clip-text text-transparent leading-snug mb-1 break-words`}>
                    {title[language]}
                  </h3>
                  <p className="text-gray-400 text-xs break-words">{org}</p>
                  <p className="text-purple-400 text-xs font-mono mt-1">{year}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Desktop layout: alternating timeline */}
        <div className="hidden md:block relative">
          {/* Center vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{ background: "linear-gradient(to bottom, #7c3aed, #ec4899, transparent)" }}
          />

          <div className="space-y-8">
            {achievements.map(({ icon, title, org, year, color }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className={`relative flex items-center ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
              >
                {/* Card — half width */}
                <div className={`w-[calc(50%-20px)] ${i % 2 === 0 ? "pr-4 text-right" : "pl-4 text-left"} min-w-0`}>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="glass rounded-xl p-4 md:p-6 border border-white/5 inline-block w-full"
                  >
                    <span className="text-2xl md:text-4xl block mb-2">{icon}</span>
                    <h3 className={`font-bold text-sm md:text-lg bg-gradient-to-r ${color} bg-clip-text text-transparent leading-snug mb-1 break-words`}>
                      {title[language]}
                    </h3>
                    <p className="text-gray-400 text-xs md:text-sm break-words">{org}</p>
                    <p className="text-purple-400 text-xs font-mono mt-1">{year}</p>
                  </motion.div>
                </div>

                {/* Center dot — 40px wide space */}
                <div className="w-10 flex justify-center flex-shrink-0 relative z-10">
                  <div className="w-4 h-4 rounded-full border-2 border-gray-900"
                    style={{ background: "linear-gradient(135deg, #7c3aed, #ec4899)", boxShadow: "0 0 10px rgba(124,58,237,0.5)" }}
                  />
                </div>

                {/* Empty side */}
                <div className="w-[calc(50%-20px)]" />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}


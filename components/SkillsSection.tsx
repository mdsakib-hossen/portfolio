"use client";

import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";

const skillCategories = [
  {
    title: { en: "Languages", bn: "প্রোগ্রামিং ভাষা" },
    icon: "💻",
    color: "from-purple-600 to-violet-400",
    border: "border-purple-500/30",
    glow: "hover:shadow-purple-500/20",
    skills: ["C", "C++", "Python", "Java", "JavaScript", "HTML", "CSS"],
  },
  {
    title: { en: "Frameworks & Libraries", bn: "ফ্রেমওয়ার্ক" },
    icon: "⚡",
    color: "from-pink-600 to-rose-400",
    border: "border-pink-500/30",
    glow: "hover:shadow-pink-500/20",
    skills: ["React Native", "React", "Flask", "FastAPI", "Expo", "Next.js"],
  },
  {
    title: { en: "Database & Cloud", bn: "ডেটাবেস ও ক্লাউড" },
    icon: "🗄️",
    color: "from-blue-600 to-cyan-400",
    border: "border-blue-500/30",
    glow: "hover:shadow-blue-500/20",
    skills: ["Firebase", "PostgreSQL", "MySQL", "Neon", "Supabase"],
  },
  {
    title: { en: "Concepts", bn: "কনসেপ্ট" },
    icon: "🧠",
    color: "from-cyan-600 to-teal-400",
    border: "border-cyan-500/30",
    glow: "hover:shadow-cyan-500/20",
    skills: ["DSA", "OOP", "REST API", "JWT Auth", "Database Design"],
  },
  {
    title: { en: "Tools", bn: "টুলস" },
    icon: "🛠️",
    color: "from-orange-600 to-amber-400",
    border: "border-orange-500/30",
    glow: "hover:shadow-orange-500/20",
    skills: ["Git", "VS Code", "Linux", "GitHub", "Postman"],
  },
  {
    title: { en: "Currently Learning", bn: "এখন শিখছি" },
    icon: "🚀",
    color: "from-green-600 to-emerald-400",
    border: "border-green-500/30",
    glow: "hover:shadow-green-500/20",
    skills: ["Machine Learning", "Deep Learning", "FastAPI Advanced", "Next.js"],
  },
];

export default function SkillsSection() {
  const { language } = useTheme();

  return (
    <section id="skills" className="section-padding w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Title */}
        <div className="text-center mb-8 md:mb-16">
          <p className="text-purple-400 font-mono text-sm tracking-widest mb-2">
            {language === "en" ? "// WHAT I KNOW" : "// আমি যা জানি"}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold gradient-text">
            {language === "en" ? "Skills & Technologies" : "দক্ষতা ও প্রযুক্তি"}
          </h2>
        </div>

        {/* Grid — 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {skillCategories.map(({ title, icon, color, border, glow, skills }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className={`glass rounded-2xl p-4 sm:p-6 border ${border} hover:shadow-xl ${glow} transition-all duration-300`}
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-4 sm:mb-5">
                <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-base sm:text-lg shadow-lg flex-shrink-0`}>
                  {icon}
                </div>
                <h3 className={`font-bold text-sm bg-gradient-to-r ${color} bg-clip-text text-transparent truncate min-w-0`}>
                  {title[language]}
                </h3>
              </div>

              {/* Skill badges */}
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, j) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 + j * 0.04 }}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold text-gray-300 border border-white/10 hover:border-purple-400/50 hover:text-purple-300 transition-all"
                    style={{ background: "rgba(255,255,255,0.04)" }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Current Focus - separate beautiful section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 md:mt-16"
        >
          <div className="text-center mb-6 md:mb-8">
            <p className="text-purple-400 font-mono text-sm tracking-widest mb-2">
              {language === "en" ? "// RIGHT NOW" : "// এই মুহূর্তে"}
            </p>
            <h3 className="text-xl sm:text-2xl font-bold gradient-text">
              {language === "en" ? "Current Focus" : "বর্তমান মনোযোগ"}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: "⚔️", title: "Competitive Programming", desc: { en: "Aiming for Grandmaster", bn: "গ্র্যান্ডমাস্টার লক্ষ্যে" }, color: "from-purple-600 to-violet-400", border: "border-purple-500/30" },
              { icon: "🤖", title: "AI/ML Engineering", desc: { en: "Deep Learning & Neural Networks", bn: "ডিপ লার্নিং শিখছি" }, color: "from-pink-600 to-rose-400", border: "border-pink-500/30" },
              { icon: "📊", title: "Karigori Result", desc: { en: "Building for BD Polytechnic students", bn: "সব Polytechnic ছাত্রদের জন্য" }, color: "from-orange-600 to-amber-400", border: "border-orange-500/30" },
            ].map(({ icon, title, desc, color, border }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`glass rounded-2xl p-4 sm:p-5 border ${border} transition-all duration-300`}
              >
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-xl sm:text-2xl mb-3 sm:mb-4 shadow-lg`}>
                  {icon}
                </div>
                <h4 className={`font-bold text-sm bg-gradient-to-r ${color} bg-clip-text text-transparent mb-1`}>
                  {title}
                </h4>
                <p className="text-gray-500 text-xs leading-relaxed">{desc[language]}</p>
                <div className="flex items-center gap-1.5 mt-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-green-400 text-xs font-semibold">
                    {language === "en" ? "Active" : "সক্রিয়"}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </motion.div>
      </div>
    </section>
  );
}

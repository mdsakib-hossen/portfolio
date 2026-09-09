"use client";

import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Languages",
    icon: "💻",
    color: "from-cyan-600 to-sky-400",
    border: "border-cyan-500/30",
    glow: "hover:shadow-cyan-500/20",
    skills: ["C", "C++", "Python", "Java", "JavaScript", "HTML", "CSS"],
  },
  {
    title: "Frameworks & Libraries",
    icon: "⚡",
    color: "from-sky-600 to-blue-400",
    border: "border-sky-500/30",
    glow: "hover:shadow-sky-500/20",
    skills: ["React Native", "React", "Flask", "FastAPI", "Expo", "Next.js"],
  },
  {
    title: "Database & Cloud",
    icon: "🗄️",
    color: "from-blue-600 to-cyan-400",
    border: "border-blue-500/30",
    glow: "hover:shadow-blue-500/20",
    skills: ["Firebase", "PostgreSQL", "MySQL", "Neon", "Supabase"],
  },
  {
    title: "Concepts",
    icon: "🧠",
    color: "from-cyan-600 to-teal-400",
    border: "border-cyan-500/30",
    glow: "hover:shadow-cyan-500/20",
    skills: ["DSA", "OOP", "REST API", "JWT Auth", "Database Design"],
  },
  {
    title: "Tools",
    icon: "🛠️",
    color: "from-orange-600 to-amber-400",
    border: "border-orange-500/30",
    glow: "hover:shadow-orange-500/20",
    skills: ["Git", "VS Code", "Linux", "GitHub", "Postman"],
  },
  {
    title: "Currently Learning",
    icon: "🚀",
    color: "from-green-600 to-emerald-400",
    border: "border-green-500/30",
    glow: "hover:shadow-green-500/20",
    skills: ["Machine Learning", "Deep Learning", "FastAPI Advanced", "Next.js"],
  },
];

export default function SkillsSection() {
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
          <p className="text-cyan-400 font-mono text-sm tracking-widest mb-2">// WHAT I KNOW</p>
          <h2 className="text-3xl md:text-4xl font-bold gradient-text">Skills &amp; Technologies</h2>
        </div>

        {/* Grid */}
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
              <div className="flex items-center gap-3 mb-4 sm:mb-5">
                <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-base sm:text-lg shadow-lg flex-shrink-0`}>
                  {icon}
                </div>
                <h3 className={`font-bold text-sm bg-gradient-to-r ${color} bg-clip-text text-transparent truncate min-w-0`}>
                  {title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {skills.map((skill, j) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 + j * 0.04 }}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold text-gray-300 border border-white/10 hover:border-cyan-400/50 hover:text-cyan-300 transition-all"
                    style={{ background: "rgba(255,255,255,0.04)" }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Current Focus */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 md:mt-16"
        >
          <div className="text-center mb-6 md:mb-8">
            <p className="text-cyan-400 font-mono text-sm tracking-widest mb-2">// RIGHT NOW</p>
            <h3 className="text-xl sm:text-2xl font-bold gradient-text">Current Focus</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: "⚔️", title: "Competitive Programming", desc: "Aiming for Grandmaster", color: "from-cyan-600 to-sky-400", border: "border-cyan-500/30" },
              { icon: "🤖", title: "AI/ML Engineering", desc: "Deep Learning & Neural Networks", color: "from-sky-600 to-blue-400", border: "border-sky-500/30" },
              { icon: "📊", title: "Karigori Result", desc: "Building for BD Polytechnic students", color: "from-orange-600 to-amber-400", border: "border-orange-500/30" },
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
                <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
                <div className="flex items-center gap-1.5 mt-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-green-400 text-xs font-semibold">Active</span>
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

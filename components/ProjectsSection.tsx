"use client";

import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { ExternalLink, Trophy } from "lucide-react";
import { GithubIcon } from "./icons";
import { projects, profile } from "@/lib/data";

export default function ProjectsSection() {
  const { language } = useTheme();

  return (
    <section id="projects" className="section-padding max-w-7xl mx-auto px-6">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <div className="text-center mb-8 md:mb-16">
          <p className="text-purple-400 font-mono text-sm tracking-widest mb-2">
            {language === "en" ? "// WHAT I'VE BUILT" : "// আমি যা বানিয়েছি"}
          </p>
          <h2 className="text-4xl font-bold gradient-text">
            {language === "en" ? "Featured Projects" : "প্রধান প্রজেক্টসমূহ"}
          </h2>
        </div>

        <div className="space-y-8">
          {projects.map(({ title, subtitle, description, tags, liveUrl, githubUrl, award, status, statusType, color }, i) => (
            <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl overflow-hidden group">
              <div className="p-8">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    {award && (
                      <div className="flex items-center gap-2 mb-2">
                        <Trophy size={16} className="text-yellow-400" />
                        <span className="text-yellow-400 text-sm font-semibold">{award}</span>
                      </div>
                    )}
                    <h3 className="text-2xl font-bold text-white mb-1">{title}</h3>
                    <p className={`text-sm bg-gradient-to-r ${color} bg-clip-text text-transparent font-medium`}>
                      {subtitle[language]}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold glass border ${
                    statusType === "live" ? "border-green-500/30 text-green-400" :
                    statusType === "dev" ? "border-orange-500/30 text-orange-400" :
                    "border-gray-500/30 text-gray-400"
                  }`}>
                    {status[language]}
                  </span>
                </div>
                <p className="text-gray-400 leading-relaxed mb-6">{description[language]}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full text-xs glass border border-purple-500/20 text-purple-300">{tag}</span>
                  ))}
                </div>
                <div className="flex gap-4">
                  {liveUrl && (
                    <motion.a href={liveUrl} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-600 to-cyan-600 text-white text-sm font-semibold">
                      <ExternalLink size={14} />
                      {language === "en" ? "Live Demo" : "লাইভ দেখো"}
                    </motion.a>
                  )}
                  {githubUrl && (
                    <motion.a href={githubUrl} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-purple-500/30 text-purple-400 text-sm font-semibold">
                      <GithubIcon size={14} />
                      {language === "en" ? "Source Code" : "সোর্স কোড"}
                    </motion.a>
                  )}
                </div>
              </div>
              <div className={`h-1 bg-gradient-to-r ${color} opacity-60`} />
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-12">
          <a href={profile.github} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors">
            <GithubIcon size={18} />
            {language === "en" ? "View all projects on GitHub" : "GitHub এ সব প্রজেক্ট দেখো"}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}


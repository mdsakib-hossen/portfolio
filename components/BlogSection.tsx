"use client";

import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { Clock, ArrowRight, Tag } from "lucide-react";
import Link from "next/link";

const blogs = [
  {
    slug: "getting-started-cp",
    title: { en: "How I Started Competitive Programming", bn: "কম্পিটিটিভ প্রোগ্রামিং কীভাবে শুরু করলাম" },
    excerpt: {
      en: "My journey from writing my first C program to solving Codeforces problems. Tips, resources, and the mindset you need to start CP effectively.",
      bn: "প্রথম C প্রোগ্রাম লেখা থেকে Codeforces সমস্যা সমাধান পর্যন্ত আমার যাত্রা। শুরু করার টিপস।",
    },
    date: "August 2026",
    readTime: "5",
    tags: ["CP", "Beginner", "C++"],
    color: "from-purple-600 to-violet-400",
    topColor: "bg-gradient-to-r from-purple-600 to-violet-400",
  },
  {
    slug: "edumanage-hobby-fair",
    title: { en: "How EduManage Won BPI Hobby Fair 2nd Place", bn: "EduManage কীভাবে BPI Hobby Fair এ 2nd Place পেল" },
    excerpt: {
      en: "The story behind building a full campus management system — React Native, Firebase, and 5 different user roles. What I learned building EduManage.",
      bn: "সম্পূর্ণ campus management system বানানোর গল্প — React Native, Firebase, আর ৫টি ভিন্ন user role।",
    },
    date: "August 2026",
    readTime: "7",
    tags: ["React Native", "Firebase", "Project"],
    color: "from-pink-600 to-rose-400",
    topColor: "bg-gradient-to-r from-pink-600 to-rose-400",
  },
  {
    slug: "karigori-result-journey",
    title: { en: "Building Karigori Result — A Platform for 500K+ Students", bn: "Karigori Result — ৫ লাখ+ ছাত্রের জন্য প্ল্যাটফর্ম বানানোর গল্প" },
    excerpt: {
      en: "How I'm building a BTEB result platform serving all Polytechnic students of Bangladesh — BTEB API, Leaderboard, CGPA Calculator and more.",
      bn: "বাংলাদেশের সব Polytechnic ছাত্রদের জন্য BTEB result platform বানানোর গল্প — API, Leaderboard, Calculator।",
    },
    date: "Coming Soon",
    readTime: "8",
    tags: ["Flask", "PostgreSQL", "BTEB API"],
    color: "from-orange-600 to-amber-400",
    topColor: "bg-gradient-to-r from-orange-600 to-amber-400",
  },
];

export default function BlogSection() {
  const { language } = useTheme();

  return (
    <section id="blog" className="section-padding max-w-7xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-8 md:mb-16">
          <p className="text-purple-400 font-mono text-sm tracking-widest mb-2">
            {language === "en" ? "// MY THOUGHTS" : "// আমার চিন্তাভাবনা"}
          </p>
          <h2 className="text-4xl font-bold gradient-text">
            {language === "en" ? "Blog & Articles" : "ব্লগ ও লেখা"}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {blogs.map(({ slug, title, excerpt, date, readTime, tags, color, topColor }, i) => (
            <motion.div
              key={slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="glass rounded-2xl overflow-hidden group flex flex-col"
            >
              {/* Top color bar */}
              <div className={`h-1.5 ${topColor}`} />

              <div className="p-6 flex flex-col flex-1">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {tags.map((tag) => (
                    <span key={tag}
                      className={`text-xs px-2.5 py-1 rounded-full font-semibold bg-gradient-to-r ${color} bg-clip-text text-transparent border border-purple-500/20`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3 className={`font-bold text-base md:text-lg text-white group-hover:bg-gradient-to-r group-hover:${color} group-hover:bg-clip-text group-hover:text-transparent transition-all leading-snug mb-3`}>
                  {title[language]}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                  {excerpt[language]}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-3 text-gray-500 text-xs">
                    <div className="flex items-center gap-1">
                      <Clock size={11} />
                      <span>{readTime} min</span>
                    </div>
                    <span>·</span>
                    <span>{date}</span>
                  </div>
                  <motion.div
                    whileHover={{ x: 4 }}
                    className={`flex items-center gap-1 text-xs font-semibold bg-gradient-to-r ${color} bg-clip-text text-transparent`}
                  >
                    {language === "en" ? "Read" : "পড়ো"}
                    <ArrowRight size={12} className="text-purple-400" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <p className="text-gray-500 text-sm">
            {language === "en"
              ? "More articles coming soon — stay tuned! 🚀"
              : "আরো লেখা শীঘ্রই আসছে — সাথে থাকো! 🚀"}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}


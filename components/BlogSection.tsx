"use client";

import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { Clock, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

// Fallback static blogs if no Supabase data
const staticBlogs = [
  {
    slug: "getting-started-cp",
    title: { en: "How I Started Competitive Programming", bn: "কম্পিটিটিভ প্রোগ্রামিং কীভাবে শুরু করলাম" },
    excerpt_en: "My journey from writing my first C program to solving Codeforces problems. Tips, resources, and the mindset you need to start CP effectively.",
    excerpt_bn: "প্রথম C প্রোগ্রাম লেখা থেকে Codeforces সমস্যা সমাধান পর্যন্ত আমার যাত্রা।",
    tags: ["CP", "Beginner", "C++"],
    read_time: "5",
    created_at: "2026-08-01",
    is_published: false,
    color: "from-purple-600 to-violet-400",
    topColor: "bg-gradient-to-r from-purple-600 to-violet-400",
  },
  {
    slug: "edumanage-hobby-fair",
    title: { en: "How EduManage Won BPI Hobby Fair 2nd Place", bn: "EduManage কীভাবে BPI Hobby Fair এ 2nd Place পেল" },
    excerpt_en: "The story behind building a full campus management system — React Native, Firebase, and 5 different user roles.",
    excerpt_bn: "সম্পূর্ণ campus management system বানানোর গল্প।",
    tags: ["React Native", "Firebase", "Project"],
    read_time: "7",
    created_at: "2026-08-10",
    is_published: false,
    color: "from-pink-600 to-rose-400",
    topColor: "bg-gradient-to-r from-pink-600 to-rose-400",
  },
  {
    slug: "karigori-result-journey",
    title: { en: "Building Karigori Result — A Platform for 500K+ Students", bn: "Karigori Result — ৫ লাখ+ ছাত্রের জন্য প্ল্যাটফর্ম" },
    excerpt_en: "How I'm building a BTEB result platform serving all Polytechnic students of Bangladesh.",
    excerpt_bn: "বাংলাদেশের সব Polytechnic ছাত্রদের জন্য BTEB result platform বানানোর গল্প।",
    tags: ["Flask", "PostgreSQL", "BTEB API"],
    read_time: "8",
    created_at: "2026-08-15",
    is_published: false,
    color: "from-orange-600 to-amber-400",
    topColor: "bg-gradient-to-r from-orange-600 to-amber-400",
  },
];

const blogColors = [
  { color: "from-purple-600 to-violet-400", topColor: "bg-gradient-to-r from-purple-600 to-violet-400" },
  { color: "from-pink-600 to-rose-400", topColor: "bg-gradient-to-r from-pink-600 to-rose-400" },
  { color: "from-orange-600 to-amber-400", topColor: "bg-gradient-to-r from-orange-600 to-amber-400" },
  { color: "from-blue-600 to-cyan-400", topColor: "bg-gradient-to-r from-blue-600 to-cyan-400" },
  { color: "from-green-600 to-emerald-400", topColor: "bg-gradient-to-r from-green-600 to-emerald-400" },
];

export default function BlogSection() {
  const { language } = useTheme();
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("blog_posts")
      .select("*")
      .eq("is_published", true)
      .order("created_at", { ascending: false })
      .limit(6)
      .then(({ data }) => {
        if (data && data.length > 0) {
          // Add colors to Supabase posts
          const withColors = data.map((post, i) => ({
            ...post,
            ...blogColors[i % blogColors.length],
          }));
          setBlogs(withColors);
        } else {
          setBlogs(staticBlogs);
        }
        setLoading(false);
      });
  }, []);

  return (
    <section id="blog" className="section-padding w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <h2 className="text-3xl md:text-4xl font-bold gradient-text">
            {language === "en" ? "Blog & Articles" : "ব্লগ ও লেখা"}
          </h2>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[1,2,3].map(i => <div key={i} className="h-64 glass rounded-2xl animate-pulse" />)}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {blogs.map((blog, i) => {
              const title = language === "en"
                ? (blog.title_en || blog.title?.en || blog.title)
                : (blog.title_bn || blog.title?.bn || blog.title);
              const excerpt = language === "en"
                ? (blog.excerpt_en || blog.excerpt?.en || "")
                : (blog.excerpt_bn || blog.excerpt?.bn || "");
              const tags = Array.isArray(blog.tags) ? blog.tags : [];
              const date = new Date(blog.created_at).toLocaleDateString("en-US", { month: "short", year: "numeric" });
              const isComingSoon = !blog.is_published;

              return (
                <motion.div
                  key={blog.slug || i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="glass rounded-2xl overflow-hidden group flex flex-col"
                >
                  {/* Top color bar */}
                  <div className={`h-1.5 ${blog.topColor}`} />

                  <div className="p-5 sm:p-6 flex flex-col flex-1">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {isComingSoon && (
                        <span className="text-xs px-2.5 py-1 rounded-full font-semibold bg-purple-500/10 text-purple-400">
                          {language === "en" ? "Coming Soon" : "শীঘ্রই"}
                        </span>
                      )}
                      {tags.slice(0, 3).map((tag: string) => (
                        <span key={tag} className={`text-xs px-2.5 py-1 rounded-full font-semibold bg-gradient-to-r ${blog.color} bg-clip-text text-transparent border border-purple-500/20`}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-purple-300 transition-colors leading-snug mb-3">
                      {title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-5 flex-1 line-clamp-3">
                      {excerpt}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-2 text-gray-500 text-xs">
                        <Clock size={11} />
                        <span>{blog.read_time || "5"} min</span>
                        <span>·</span>
                        <span>{date}</span>
                      </div>
                      {!isComingSoon && (
                        <motion.div whileHover={{ x: 4 }}
                          className={`flex items-center gap-1 text-xs font-semibold bg-gradient-to-r ${blog.color} bg-clip-text text-transparent`}>
                          {language === "en" ? "Read" : "পড়ো"}
                          <ArrowRight size={12} className="text-purple-400" />
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-8 md:mt-10">
          <p className="text-gray-500 text-sm">
            {language === "en" ? "More articles coming soon! 🚀" : "আরো লেখা শীঘ্রই আসছে! 🚀"}
          </p>
        </motion.div>
      </motion.div>
      </div>
    </section>
  );
}

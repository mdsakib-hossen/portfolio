"use client";

import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const staticBlogs = [
  {
    slug: "getting-started-cp",
    title_en: "How I Started Competitive Programming",
    excerpt_en: "My journey from writing my first C program to solving Codeforces problems. Tips, resources, and the mindset you need to start CP effectively.",
    tags: ["CP", "Beginner", "C++"],
    read_time: "5",
    created_at: "2026-08-01",
    is_published: false,
    color: "from-cyan-600 to-sky-400",
    topColor: "bg-gradient-to-r from-cyan-600 to-sky-400",
  },
  {
    slug: "edumanage-hobby-fair",
    title_en: "How EduManage Won BPI Hobby Fair 2nd Place",
    excerpt_en: "The story behind building a full campus management system — React Native, Firebase, and 5 different user roles.",
    tags: ["React Native", "Firebase", "Project"],
    read_time: "7",
    created_at: "2026-08-10",
    is_published: false,
    color: "from-sky-600 to-blue-400",
    topColor: "bg-gradient-to-r from-sky-600 to-blue-400",
  },
  {
    slug: "karigori-result-journey",
    title_en: "Building Karigori Result — A Platform for 500K+ Students",
    excerpt_en: "How I'm building a BTEB result platform serving all Polytechnic students of Bangladesh.",
    tags: ["Flask", "PostgreSQL", "BTEB API"],
    read_time: "8",
    created_at: "2026-08-15",
    is_published: false,
    color: "from-orange-600 to-amber-400",
    topColor: "bg-gradient-to-r from-orange-600 to-amber-400",
  },
];

const blogColors = [
  { color: "from-cyan-600 to-sky-400", topColor: "bg-gradient-to-r from-cyan-600 to-sky-400" },
  { color: "from-sky-600 to-blue-400", topColor: "bg-gradient-to-r from-sky-600 to-blue-400" },
  { color: "from-orange-600 to-amber-400", topColor: "bg-gradient-to-r from-orange-600 to-amber-400" },
  { color: "from-blue-600 to-cyan-400", topColor: "bg-gradient-to-r from-blue-600 to-cyan-400" },
  { color: "from-green-600 to-emerald-400", topColor: "bg-gradient-to-r from-green-600 to-emerald-400" },
];

export default function BlogSection() {
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
          <p className="text-cyan-400 font-mono text-sm tracking-widest mb-2">// MY THOUGHTS</p>
          <h2 className="text-3xl md:text-4xl font-bold gradient-text">Blog &amp; Articles</h2>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[1,2,3].map(i => <div key={i} className="h-64 glass rounded-2xl animate-pulse" />)}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {blogs.map((blog, i) => {
              const title = blog.title_en || (blog.title && blog.title.en) || blog.title;
              const excerpt = blog.excerpt_en || (blog.excerpt && blog.excerpt.en) || "";
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
                  <div className={`h-1.5 ${blog.topColor}`} />

                  <div className="p-5 sm:p-6 flex flex-col flex-1">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {isComingSoon && (
                        <span className="text-xs px-2.5 py-1 rounded-full font-semibold bg-cyan-500/10 text-cyan-400">
                          Coming Soon
                        </span>
                      )}
                      {tags.slice(0, 3).map((tag: string) => (
                        <span key={tag} className={`text-xs px-2.5 py-1 rounded-full font-semibold bg-gradient-to-r ${blog.color} bg-clip-text text-transparent border border-cyan-500/20`}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-cyan-300 transition-colors leading-snug mb-3">
                      {title}
                    </h3>

                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-5 flex-1 line-clamp-3">
                      {excerpt}
                    </p>

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
                          Read
                          <ArrowRight size={12} className="text-cyan-400" />
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
          <p className="text-gray-500 text-sm">More articles coming soon! 🚀</p>
        </motion.div>
      </motion.div>
      </div>
    </section>
  );
}

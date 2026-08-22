"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { FolderOpen, Trophy, MessageSquare, FileText, Eye } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const [counts, setCounts] = useState({ projects: 0, achievements: 0, messages: 0, blogs: 0, unread: 0 });
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [p, a, m, b] = await Promise.all([
        supabase.from("projects").select("id", { count: "exact" }),
        supabase.from("achievements").select("id", { count: "exact" }),
        supabase.from("messages").select("*").order("created_at", { ascending: false }).limit(5),
        supabase.from("blog_posts").select("id", { count: "exact" }),
      ]);
      const unread = await supabase.from("messages").select("id", { count: "exact" }).eq("is_read", false);
      setCounts({
        projects: p.count || 0,
        achievements: a.count || 0,
        messages: m.data?.length || 0,
        blogs: b.count || 0,
        unread: unread.count || 0,
      });
      setMessages(m.data || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  const stats = [
    { label: "Projects", value: counts.projects, icon: FolderOpen, color: "from-purple-600 to-violet-400", href: "/sakib-cp-2035/dashboard/projects" },
    { label: "Achievements", value: counts.achievements, icon: Trophy, color: "from-yellow-600 to-amber-400", href: "/sakib-cp-2035/dashboard/achievements" },
    { label: "Blog Posts", value: counts.blogs, icon: FileText, color: "from-blue-600 to-cyan-400", href: "/sakib-cp-2035/dashboard/blog" },
    { label: "New Messages", value: counts.unread, icon: MessageSquare, color: "from-pink-600 to-rose-400", href: "/sakib-cp-2035/dashboard/messages" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">Welcome back, Sakib! 👋</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, color, href }, i) => (
          <motion.div key={label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Link href={href} className="glass rounded-2xl p-5 block hover:border-purple-400/30 transition-all border border-white/5">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-3`}>
                <Icon size={18} className="text-white" />
              </div>
              <div className="text-2xl font-bold text-white">{loading ? "..." : value}</div>
              <div className="text-gray-400 text-sm mt-1">{label}</div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Recent Messages */}
      <div className="glass rounded-2xl p-6 border border-white/5">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-white">Recent Messages</h2>
          <Link href="/sakib-cp-2035/dashboard/messages" className="text-purple-400 text-sm hover:underline">View all</Link>
        </div>
        {loading ? (
          <div className="space-y-3">
            {[1,2,3].map(i => <div key={i} className="h-14 bg-white/5 rounded-xl animate-pulse" />)}
          </div>
        ) : messages.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No messages yet</p>
        ) : (
          <div className="space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className={`p-4 rounded-xl border transition-all ${!msg.is_read ? "border-purple-500/30 bg-purple-500/5" : "border-white/5"}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-semibold text-sm">{msg.name}</span>
                      {!msg.is_read && <span className="w-2 h-2 rounded-full bg-purple-400" />}
                    </div>
                    <p className="text-gray-400 text-xs mt-0.5">{msg.email}</p>
                    <p className="text-gray-300 text-sm mt-1 truncate">{msg.message}</p>
                  </div>
                  <span className="text-gray-600 text-xs whitespace-nowrap">
                    {new Date(msg.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {[
          { label: "Edit Profile", href: "/sakib-cp-2035/dashboard/profile", emoji: "👤" },
          { label: "Add Project", href: "/sakib-cp-2035/dashboard/projects", emoji: "🚀" },
          { label: "Write Blog Post", href: "/sakib-cp-2035/dashboard/blog", emoji: "✍️" },
        ].map(({ label, href, emoji }) => (
          <Link key={label} href={href}
            className="glass p-4 rounded-xl border border-white/5 hover:border-purple-400/30 transition-all text-center group">
            <div className="text-2xl mb-2">{emoji}</div>
            <div className="text-gray-300 text-sm font-medium group-hover:text-purple-400 transition-colors">{label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}


"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Plus, Pencil, Trash2, Save, X, Eye, EyeOff } from "lucide-react";

const empty = {
  slug: "", title_en: "", title_bn: "", excerpt_en: "", excerpt_bn: "",
  content_en: "", content_bn: "", tags: [], read_time: "5", is_published: false,
};

export default function BlogAdmin() {
  const [posts, setPosts] = useState<any[]>([]);
  const [editing, setEditing] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  const fetch_ = async () => {
    const { data } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
    setPosts(data || []);
  };
  useEffect(() => { fetch_(); }, []);

  const save = async () => {
    setSaving(true);
    const method = editing.id ? "PUT" : "POST";
    await fetch("/api/admin/blog", {
      method, headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...editing,
        tags: typeof editing.tags === "string" ? editing.tags.split(",").map((t: string) => t.trim()) : editing.tags,
        slug: editing.slug || editing.title_en.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
      }),
    });
    setSaving(false);
    setEditing(null);
    fetch_();
  };

  const delete_ = async (id: string) => {
    if (!confirm("Delete post?")) return;
    await fetch(`/api/admin/blog?id=${id}`, { method: "DELETE" });
    fetch_();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Blog Posts</h1>
          <p className="text-gray-400 text-sm mt-1">{posts.length} posts · {posts.filter(p => p.is_published).length} published</p>
        </div>
        <button onClick={() => setEditing({ ...empty })}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-semibold"
          style={{ background: "linear-gradient(135deg, #7c3aed, #db2777)" }}>
          <Plus size={16} /> New Post
        </button>
      </div>

      <div className="space-y-3">
        {posts.map((post) => (
          <div key={post.id} className="glass rounded-xl p-4 border border-white/5 flex items-center gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-white font-semibold text-sm">{post.title_en}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full ${post.is_published ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"}`}>
                  {post.is_published ? "Published" : "Draft"}
                </span>
              </div>
              <p className="text-gray-500 text-xs mt-1">{post.tags?.join(", ")} · {post.read_time} min read</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setEditing(post)} className="p-2 rounded-lg hover:bg-purple-500/20 text-purple-400"><Pencil size={14} /></button>
              <button onClick={() => delete_(post.id)} className="p-2 rounded-lg hover:bg-red-500/20 text-red-400"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
        {posts.length === 0 && (
          <div className="glass rounded-2xl p-12 text-center text-gray-500">No blog posts yet. Create your first post!</div>
        )}
      </div>

      <AnimatePresence>
        {editing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-start justify-center p-4 overflow-y-auto">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
              className="w-full max-w-2xl glass rounded-2xl p-6 border border-purple-500/20 my-4">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-white">{editing.id ? "Edit Post" : "New Post"}</h2>
                <button onClick={() => setEditing(null)}><X size={20} className="text-gray-400" /></button>
              </div>
              <div className="space-y-3">
                {[
                  { key: "title_en", label: "Title (EN)" },
                  { key: "title_bn", label: "Title (BN)" },
                  { key: "excerpt_en", label: "Excerpt (EN)" },
                  { key: "excerpt_bn", label: "Excerpt (BN)" },
                  { key: "read_time", label: "Read Time (minutes)" },
                ].map(({ key, label }) => (
                  <div key={key}>
                    <label className="text-purple-400 text-xs font-mono mb-1 block">{label}</label>
                    <input value={editing[key] || ""} onChange={e => setEditing({ ...editing, [key]: e.target.value })}
                      className="w-full bg-white/5 border border-purple-500/20 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-400" />
                  </div>
                ))}
                <div>
                  <label className="text-purple-400 text-xs font-mono mb-1 block">Tags (comma separated)</label>
                  <input value={Array.isArray(editing.tags) ? editing.tags.join(", ") : editing.tags}
                    onChange={e => setEditing({ ...editing, tags: e.target.value })}
                    className="w-full bg-white/5 border border-purple-500/20 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-400" />
                </div>
                <div>
                  <label className="text-purple-400 text-xs font-mono mb-1 block">Content (EN)</label>
                  <textarea rows={5} value={editing.content_en || ""}
                    onChange={e => setEditing({ ...editing, content_en: e.target.value })}
                    className="w-full bg-white/5 border border-purple-500/20 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-400 resize-none" />
                </div>
                <div>
                  <label className="text-purple-400 text-xs font-mono mb-1 block">Content (BN)</label>
                  <textarea rows={5} value={editing.content_bn || ""}
                    onChange={e => setEditing({ ...editing, content_bn: e.target.value })}
                    className="w-full bg-white/5 border border-purple-500/20 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-400 resize-none" />
                </div>
                <div className="flex items-center gap-3">
                  <label className="text-purple-400 text-sm font-mono">Published:</label>
                  <button onClick={() => setEditing({ ...editing, is_published: !editing.is_published })}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${editing.is_published ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"}`}>
                    {editing.is_published ? <><Eye size={14} /> Published</> : <><EyeOff size={14} /> Draft</>}
                  </button>
                </div>
              </div>
              <div className="flex gap-3 mt-5">
                <button onClick={() => setEditing(null)} className="flex-1 py-2.5 rounded-xl glass border border-white/10 text-gray-400 text-sm">Cancel</button>
                <button onClick={save} disabled={saving}
                  className="flex-1 py-2.5 rounded-xl text-white text-sm font-semibold"
                  style={{ background: "linear-gradient(135deg, #7c3aed, #db2777)" }}>
                  {saving ? "Saving..." : "Save Post"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Plus, Pencil, Trash2, Save, X, ExternalLink } from "lucide-react";

const emptyProject = {
  title: "", subtitle_en: "", subtitle_bn: "", description_en: "", description_bn: "",
  tags: [], live_url: "", github_url: "", image_url: "", award: "",
  status_en: "In Development", status_bn: "নির্মাণাধীন", status_type: "dev",
  color: "from-purple-600 to-pink-600", sort_order: 0, is_visible: true,
};

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<any[]>([]);
  const [editing, setEditing] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetch_ = async () => {
    const { data } = await supabase.from("projects").select("*").order("sort_order");
    setProjects(data || []);
    setLoading(false);
  };
  useEffect(() => { fetch_(); }, []);

  const save = async () => {
    setSaving(true);
    const method = editing.id ? "PUT" : "POST";
    await fetch("/api/admin/projects", {
      method, headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...editing, tags: typeof editing.tags === "string" ? editing.tags.split(",").map((t: string) => t.trim()) : editing.tags }),
    });
    setSaving(false);
    setEditing(null);
    fetch_();
  };

  const delete_ = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    await fetch(`/api/admin/projects?id=${id}`, { method: "DELETE" });
    fetch_();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Projects</h1>
          <p className="text-gray-400 text-sm mt-1">{projects.length} projects</p>
        </div>
        <button onClick={() => setEditing({ ...emptyProject })}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-semibold"
          style={{ background: "linear-gradient(135deg, #7c3aed, #db2777)" }}>
          <Plus size={16} /> Add Project
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-20 glass rounded-xl animate-pulse" />)}</div>
      ) : (
        <div className="space-y-3">
          {projects.map((p) => (
            <div key={p.id} className="glass rounded-xl p-4 border border-white/5 flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-white font-semibold text-sm">{p.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${p.status_type === "live" ? "bg-green-500/20 text-green-400" : p.status_type === "dev" ? "bg-orange-500/20 text-orange-400" : "bg-gray-500/20 text-gray-400"}`}>
                    {p.status_en}
                  </span>
                </div>
                <p className="text-gray-500 text-xs mt-1 truncate">{p.tags?.join(", ")}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {p.live_url && <a href={p.live_url} target="_blank" rel="noopener noreferrer"><ExternalLink size={14} className="text-green-400" /></a>}
                <button onClick={() => setEditing(p)} className="p-2 rounded-lg hover:bg-purple-500/20 text-purple-400"><Pencil size={14} /></button>
                <button onClick={() => delete_(p.id)} className="p-2 rounded-lg hover:bg-red-500/20 text-red-400"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      <AnimatePresence>
        {editing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-start justify-center p-4 overflow-y-auto">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9 }}
              className="w-full max-w-2xl glass rounded-2xl p-6 border border-purple-500/20 my-4">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-white">{editing.id ? "Edit Project" : "New Project"}</h2>
                <button onClick={() => setEditing(null)} className="text-gray-400 hover:text-white"><X size={20} /></button>
              </div>
              <div className="space-y-3">
                {[
                  { key: "title", label: "Title" },
                  { key: "subtitle_en", label: "Subtitle (EN)" },
                  { key: "subtitle_bn", label: "Subtitle (BN)" },
                  { key: "live_url", label: "Live URL" },
                  { key: "github_url", label: "GitHub URL" },
                  { key: "award", label: "Award (optional)" },
                  { key: "color", label: "Gradient Color" },
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
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-purple-400 text-xs font-mono mb-1 block">Status (EN)</label>
                    <select value={editing.status_en} onChange={e => {
                      const v = e.target.value;
                      setEditing({ ...editing, status_en: v, status_type: v === "Live" ? "live" : v === "Private" ? "private" : "dev" });
                    }} className="w-full bg-[#0a0a0f] border border-purple-500/20 rounded-xl px-3 py-2 text-white text-sm focus:outline-none">
                      <option>Live</option>
                      <option>In Development</option>
                      <option>Private</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-purple-400 text-xs font-mono mb-1 block">Visible</label>
                    <select value={editing.is_visible ? "true" : "false"} onChange={e => setEditing({ ...editing, is_visible: e.target.value === "true" })}
                      className="w-full bg-[#0a0a0f] border border-purple-500/20 rounded-xl px-3 py-2 text-white text-sm focus:outline-none">
                      <option value="true">Visible</option>
                      <option value="false">Hidden</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-purple-400 text-xs font-mono mb-1 block">Description (EN)</label>
                  <textarea rows={3} value={editing.description_en || ""}
                    onChange={e => setEditing({ ...editing, description_en: e.target.value })}
                    className="w-full bg-white/5 border border-purple-500/20 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-400 resize-none" />
                </div>
                <div>
                  <label className="text-purple-400 text-xs font-mono mb-1 block">Description (BN)</label>
                  <textarea rows={3} value={editing.description_bn || ""}
                    onChange={e => setEditing({ ...editing, description_bn: e.target.value })}
                    className="w-full bg-white/5 border border-purple-500/20 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-400 resize-none" />
                </div>
              </div>
              <div className="flex gap-3 mt-5">
                <button onClick={() => setEditing(null)} className="flex-1 py-2.5 rounded-xl glass border border-white/10 text-gray-400 text-sm">Cancel</button>
                <button onClick={save} disabled={saving}
                  className="flex-1 py-2.5 rounded-xl text-white text-sm font-semibold flex items-center justify-center gap-2"
                  style={{ background: "linear-gradient(135deg, #7c3aed, #db2777)" }}>
                  <Save size={15} /> {saving ? "Saving..." : "Save Project"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


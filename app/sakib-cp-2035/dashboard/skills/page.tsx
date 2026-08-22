"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Plus, Pencil, Trash2, X } from "lucide-react";

const empty = { category_en: "", category_bn: "", icon: "💻", color: "from-purple-600 to-purple-400", border: "border-purple-500/30", items: [], sort_order: 0 };

export default function SkillsAdmin() {
  const [skills, setSkills] = useState<any[]>([]);
  const [editing, setEditing] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  const fetch_ = async () => {
    const { data } = await supabase.from("skills").select("*").order("sort_order");
    setSkills(data || []);
  };
  useEffect(() => { fetch_(); }, []);

  const save = async () => {
    setSaving(true);
    const method = editing.id ? "PUT" : "POST";
    await fetch("/api/admin/skills", {
      method, headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...editing,
        items: typeof editing.items === "string" ? editing.items.split(",").map((s: string) => s.trim()) : editing.items,
      }),
    });
    setSaving(false);
    setEditing(null);
    fetch_();
  };

  const delete_ = async (id: string) => {
    if (!confirm("Delete?")) return;
    await fetch(`/api/admin/skills?id=${id}`, { method: "DELETE" });
    fetch_();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Skills</h1>
          <p className="text-gray-400 text-sm mt-1">{skills.length} categories</p>
        </div>
        <button onClick={() => setEditing({ ...empty })}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-semibold"
          style={{ background: "linear-gradient(135deg, #7c3aed, #db2777)" }}>
          <Plus size={16} /> Add Category
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {skills.map((s) => (
          <div key={s.id} className="glass rounded-xl p-4 border border-white/5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">{s.icon}</span>
                <span className="text-white font-semibold text-sm">{s.category_en}</span>
              </div>
              <div className="flex gap-1">
                <button onClick={() => setEditing(s)} className="p-1.5 rounded-lg hover:bg-purple-500/20 text-purple-400"><Pencil size={13} /></button>
                <button onClick={() => delete_(s.id)} className="p-1.5 rounded-lg hover:bg-red-500/20 text-red-400"><Trash2 size={13} /></button>
              </div>
            </div>
            <div className="flex flex-wrap gap-1">
              {s.items?.map((item: string) => (
                <span key={item} className="text-xs px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300">{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {editing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="w-full max-w-lg glass rounded-2xl p-6 border border-purple-500/20">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-white">{editing.id ? "Edit" : "New"} Skill Category</h2>
                <button onClick={() => setEditing(null)}><X size={20} className="text-gray-400" /></button>
              </div>
              <div className="space-y-3">
                {[
                  { key: "category_en", label: "Category Name (EN)" },
                  { key: "category_bn", label: "Category Name (BN)" },
                  { key: "icon", label: "Icon (emoji)" },
                  { key: "color", label: "Gradient (e.g. from-purple-600 to-purple-400)" },
                ].map(({ key, label }) => (
                  <div key={key}>
                    <label className="text-purple-400 text-xs font-mono mb-1 block">{label}</label>
                    <input value={editing[key] || ""} onChange={e => setEditing({ ...editing, [key]: e.target.value })}
                      className="w-full bg-white/5 border border-purple-500/20 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-400" />
                  </div>
                ))}
                <div>
                  <label className="text-purple-400 text-xs font-mono mb-1 block">Skills (comma separated)</label>
                  <textarea rows={3} value={Array.isArray(editing.items) ? editing.items.join(", ") : editing.items}
                    onChange={e => setEditing({ ...editing, items: e.target.value })}
                    className="w-full bg-white/5 border border-purple-500/20 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-400 resize-none"
                    placeholder="C++, Python, React, ..." />
                </div>
              </div>
              <div className="flex gap-3 mt-5">
                <button onClick={() => setEditing(null)} className="flex-1 py-2.5 rounded-xl glass border border-white/10 text-gray-400 text-sm">Cancel</button>
                <button onClick={save} disabled={saving}
                  className="flex-1 py-2.5 rounded-xl text-white text-sm font-semibold"
                  style={{ background: "linear-gradient(135deg, #7c3aed, #db2777)" }}>
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


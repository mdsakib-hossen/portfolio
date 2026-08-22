"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Plus, Pencil, Trash2, Save, X } from "lucide-react";

const empty = { icon: "🏆", title_en: "", title_bn: "", org: "", year: "", color: "from-purple-600 to-purple-400", sort_order: 0, is_visible: true };

export default function AchievementsAdmin() {
  const [items, setItems] = useState<any[]>([]);
  const [editing, setEditing] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  const fetch_ = async () => {
    const { data } = await supabase.from("achievements").select("*").order("sort_order");
    setItems(data || []);
  };
  useEffect(() => { fetch_(); }, []);

  const save = async () => {
    setSaving(true);
    const method = editing.id ? "PUT" : "POST";
    await fetch("/api/admin/achievements", {
      method, headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });
    setSaving(false);
    setEditing(null);
    fetch_();
  };

  const delete_ = async (id: string) => {
    if (!confirm("Delete?")) return;
    await fetch(`/api/admin/achievements?id=${id}`, { method: "DELETE" });
    fetch_();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Achievements</h1>
          <p className="text-gray-400 text-sm mt-1">{items.length} achievements</p>
        </div>
        <button onClick={() => setEditing({ ...empty })}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-semibold"
          style={{ background: "linear-gradient(135deg, #7c3aed, #db2777)" }}>
          <Plus size={16} /> Add Achievement
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="glass rounded-xl p-4 border border-white/5 flex items-center gap-4">
            <span className="text-3xl">{item.icon}</span>
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-semibold text-sm">{item.title_en}</h3>
              <p className="text-gray-500 text-xs">{item.org} · {item.year}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setEditing(item)} className="p-2 rounded-lg hover:bg-purple-500/20 text-purple-400"><Pencil size={14} /></button>
              <button onClick={() => delete_(item.id)} className="p-2 rounded-lg hover:bg-red-500/20 text-red-400"><Trash2 size={14} /></button>
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
                <h2 className="text-lg font-bold text-white">{editing.id ? "Edit" : "New"} Achievement</h2>
                <button onClick={() => setEditing(null)}><X size={20} className="text-gray-400" /></button>
              </div>
              <div className="space-y-3">
                {[
                  { key: "icon", label: "Icon (emoji)" },
                  { key: "title_en", label: "Title (EN)" },
                  { key: "title_bn", label: "Title (BN)" },
                  { key: "org", label: "Organization" },
                  { key: "year", label: "Year" },
                  { key: "color", label: "Gradient Color" },
                ].map(({ key, label }) => (
                  <div key={key}>
                    <label className="text-purple-400 text-xs font-mono mb-1 block">{label}</label>
                    <input value={editing[key] || ""} onChange={e => setEditing({ ...editing, [key]: e.target.value })}
                      className="w-full bg-white/5 border border-purple-500/20 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-400" />
                  </div>
                ))}
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


"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Mail, MailOpen, Trash2 } from "lucide-react";

export default function MessagesAdmin() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<any>(null);

  const fetch_ = async () => {
    const { data } = await supabase.from("messages").select("*").order("created_at", { ascending: false });
    setMessages(data || []);
    setLoading(false);
  };
  useEffect(() => { fetch_(); }, []);

  const markRead = async (id: string) => {
    await fetch(`/api/admin/messages?id=${id}`, { method: "PUT" });
    setMessages(messages.map(m => m.id === id ? { ...m, is_read: true } : m));
  };

  const delete_ = async (id: string) => {
    if (!confirm("Delete message?")) return;
    await fetch(`/api/admin/messages?id=${id}`, { method: "DELETE" });
    setMessages(messages.filter(m => m.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  const unreadCount = messages.filter(m => !m.is_read).length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Messages</h1>
        <p className="text-gray-400 text-sm mt-1">
          {messages.length} total · <span className="text-purple-400">{unreadCount} unread</span>
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* List */}
        <div className="space-y-2">
          {loading ? (
            [1,2,3,4].map(i => <div key={i} className="h-20 glass rounded-xl animate-pulse" />)
          ) : messages.length === 0 ? (
            <div className="glass rounded-2xl p-12 text-center">
              <Mail size={40} className="text-gray-600 mx-auto mb-3" />
              <p className="text-gray-500">No messages yet</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id}
                onClick={() => { setSelected(msg); if (!msg.is_read) markRead(msg.id); }}
                className={`glass rounded-xl p-4 border cursor-pointer transition-all ${selected?.id === msg.id ? "border-purple-500/50" : "border-white/5 hover:border-purple-500/20"} ${!msg.is_read ? "bg-purple-500/5" : ""}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {!msg.is_read ? <Mail size={14} className="text-purple-400 flex-shrink-0" /> : <MailOpen size={14} className="text-gray-600 flex-shrink-0" />}
                      <span className={`font-semibold text-sm ${!msg.is_read ? "text-white" : "text-gray-300"}`}>{msg.name}</span>
                    </div>
                    <p className="text-gray-500 text-xs mt-0.5">{msg.email}</p>
                    <p className="text-gray-400 text-xs mt-1 truncate">{msg.message}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-gray-600 text-xs">{new Date(msg.created_at).toLocaleDateString()}</span>
                    <button onClick={e => { e.stopPropagation(); delete_(msg.id); }}
                      className="text-red-400 hover:text-red-300 p-1"><Trash2 size={12} /></button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Detail */}
        <div>
          {selected ? (
            <div className="glass rounded-2xl p-6 border border-purple-500/20 sticky top-4">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-white font-bold text-lg">{selected.name}</h3>
                  <a href={`mailto:${selected.email}`} className="text-purple-400 text-sm hover:underline">{selected.email}</a>
                </div>
                <span className="text-gray-500 text-xs">{new Date(selected.created_at).toLocaleString()}</span>
              </div>
              <div className="bg-white/5 rounded-xl p-4 text-gray-300 text-sm leading-relaxed">
                {selected.message}
              </div>
              <div className="flex gap-3 mt-4">
                <a href={`mailto:${selected.email}`}
                  className="flex-1 py-2.5 rounded-xl text-white text-sm font-semibold text-center"
                  style={{ background: "linear-gradient(135deg, #7c3aed, #db2777)" }}>
                  Reply via Email
                </a>
                <button onClick={() => delete_(selected.id)}
                  className="px-4 py-2.5 rounded-xl glass border border-red-500/30 text-red-400 text-sm">
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <div className="glass rounded-2xl p-12 text-center border border-white/5">
              <MailOpen size={40} className="text-gray-600 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">Select a message to read</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


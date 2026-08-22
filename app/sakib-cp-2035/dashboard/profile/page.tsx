"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Save, Upload, CheckCircle } from "lucide-react";
import Image from "next/image";

export default function ProfileAdmin() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    supabase.from("profile").select("*").single().then(({ data }) => {
      setData(data);
      setLoading(false);
    });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await fetch("/api/admin/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);

    const fileName = `profile/photo_${Date.now()}.${file.name.split(".").pop()}`;
    const { data: uploadData, error } = await supabase.storage
      .from("portfolio")
      .upload(fileName, file, { upsert: true });

    if (!error && uploadData) {
      const { data: urlData } = supabase.storage.from("portfolio").getPublicUrl(fileName);
      setData({ ...data, photo_url: urlData.publicUrl });
    }
    setUploading(false);
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);

    const { data: uploadData, error } = await supabase.storage
      .from("portfolio")
      .upload("resume/resume.pdf", file, { upsert: true });

    if (!error && uploadData) {
      const { data: urlData } = supabase.storage.from("portfolio").getPublicUrl("resume/resume.pdf");
      setData({ ...data, resume_url: urlData.publicUrl });
    }
    setUploading(false);
  };

  if (loading) return <div className="text-gray-400">Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Edit Profile</h1>
          <p className="text-gray-400 text-sm mt-1">Update your personal information</p>
        </div>
        <motion.button onClick={handleSave} disabled={saving}
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-semibold text-sm disabled:opacity-50"
          style={{ background: "linear-gradient(135deg, #7c3aed, #db2777)" }}>
          {saved ? <><CheckCircle size={16} /> Saved!</> : saving ? "Saving..." : <><Save size={16} /> Save Changes</>}
        </motion.button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Photo & Resume */}
        <div className="space-y-4">
          {/* Profile Photo */}
          <div className="glass rounded-2xl p-6 border border-white/5">
            <h3 className="text-white font-semibold mb-4">Profile Photo</h3>
            <div className="relative w-32 h-32 mx-auto mb-4 rounded-2xl overflow-hidden border-2 border-purple-500/30">
              {data?.photo_url ? (
                <Image src={data.photo_url} alt="Profile" fill className="object-cover" />
              ) : (
                <div className="w-full h-full bg-purple-500/20 flex items-center justify-center text-4xl">👤</div>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
            <button onClick={() => fileRef.current?.click()} disabled={uploading}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl glass border border-purple-500/30 text-purple-400 text-sm font-semibold hover:border-purple-400 transition-all">
              <Upload size={16} />
              {uploading ? "Uploading..." : "Upload Photo"}
            </button>
          </div>

          {/* Resume Upload */}
          <div className="glass rounded-2xl p-6 border border-white/5">
            <h3 className="text-white font-semibold mb-4">Resume PDF</h3>
            {data?.resume_url && (
              <a href={data.resume_url} target="_blank" rel="noopener noreferrer"
                className="block text-center text-xs text-green-400 mb-3 hover:underline">✅ Resume uploaded</a>
            )}
            <input type="file" accept=".pdf" className="hidden" id="resume-upload"
              onChange={handleResumeUpload} />
            <label htmlFor="resume-upload"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl glass border border-purple-500/30 text-purple-400 text-sm font-semibold hover:border-purple-400 transition-all cursor-pointer">
              <Upload size={16} />
              {uploading ? "Uploading..." : "Upload Resume PDF"}
            </label>
          </div>
        </div>

        {/* Form fields */}
        <div className="lg:col-span-2 glass rounded-2xl p-6 border border-white/5">
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { key: "name", label: "Full Name", type: "text" },
              { key: "title", label: "Title/Tagline", type: "text" },
              { key: "email", label: "Email", type: "email" },
              { key: "location", label: "Location", type: "text" },
              { key: "github", label: "GitHub URL", type: "url" },
              { key: "linkedin", label: "LinkedIn URL", type: "url" },
              { key: "facebook", label: "Facebook URL", type: "url" },
            ].map(({ key, label, type }) => (
              <div key={key}>
                <label className="text-purple-400 text-xs font-mono mb-1.5 block">{label}</label>
                <input type={type} value={data?.[key] || ""}
                  onChange={e => setData({ ...data, [key]: e.target.value })}
                  className="w-full bg-white/5 border border-purple-500/20 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-purple-400 transition-colors"
                />
              </div>
            ))}
          </div>

          <div className="mt-4 grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-purple-400 text-xs font-mono mb-1.5 block">About (English)</label>
              <textarea rows={4} value={data?.about_en || ""}
                onChange={e => setData({ ...data, about_en: e.target.value })}
                className="w-full bg-white/5 border border-purple-500/20 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-purple-400 transition-colors resize-none"
              />
            </div>
            <div>
              <label className="text-purple-400 text-xs font-mono mb-1.5 block">About (বাংলা)</label>
              <textarea rows={4} value={data?.about_bn || ""}
                onChange={e => setData({ ...data, about_bn: e.target.value })}
                className="w-full bg-white/5 border border-purple-500/20 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-purple-400 transition-colors resize-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


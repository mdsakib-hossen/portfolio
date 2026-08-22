"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle, AlertCircle, Lock, User, Shield,
  Bell, Trash2, RefreshCw, Globe, Eye, EyeOff,
  Database, Download, AlertTriangle
} from "lucide-react";

export default function SettingsPage() {
  const [credForm, setCredForm] = useState({ currentPassword: "", newEmail: "", newPassword: "", confirmPassword: "" });
  const [credStatus, setCredStatus] = useState<"idle"|"loading"|"success"|"error">("idle");
  const [credMessage, setCredMessage] = useState("");

  const [notifSettings, setNotifSettings] = useState({
    newMessage: true,
    weeklyReport: false,
    browserNotif: false,
  });

  const [siteSettings, setSiteSettings] = useState({
    maintenanceMode: false,
    showOpenToWork: true,
    enableBlog: true,
    enableContact: true,
    enableAnalytics: true,
  });

  const [clearStatus, setClearStatus] = useState<"idle"|"loading"|"success">("idle");
  const [showPassword, setShowPassword] = useState(false);

  // Load settings from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("siteSettings");
    if (saved) setSiteSettings(JSON.parse(saved));
    const savedNotif = localStorage.getItem("notifSettings");
    if (savedNotif) setNotifSettings(JSON.parse(savedNotif));
  }, []);

  const saveSiteSettings = () => {
    localStorage.setItem("siteSettings", JSON.stringify(siteSettings));
    alert("Site settings saved!");
  };

  const saveNotifSettings = () => {
    localStorage.setItem("notifSettings", JSON.stringify(notifSettings));
    if (notifSettings.browserNotif && "Notification" in window) {
      Notification.requestPermission();
    }
    alert("Notification settings saved!");
  };

  const handleCredUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCredStatus("loading");
    setCredMessage("");

    if (credForm.newPassword && credForm.newPassword !== credForm.confirmPassword) {
      setCredStatus("error"); setCredMessage("Passwords do not match!"); return;
    }
    if (credForm.newPassword && credForm.newPassword.length < 8) {
      setCredStatus("error"); setCredMessage("Password must be at least 8 characters!"); return;
    }

    const res = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        currentPassword: credForm.currentPassword,
        newEmail: credForm.newEmail || undefined,
        newPassword: credForm.newPassword || undefined,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      setCredStatus("success");
      setCredMessage(data.message || "Updated! Please login again.");
      setCredForm({ currentPassword: "", newEmail: "", newPassword: "", confirmPassword: "" });
    } else {
      setCredStatus("error");
      setCredMessage(data.error || "Something went wrong!");
    }
  };

  const clearCache = async () => {
    setClearStatus("loading");
    // Clear localStorage cache
    const keysToKeep = ["siteSettings", "notifSettings", "theme", "language"];
    Object.keys(localStorage).forEach(key => {
      if (!keysToKeep.includes(key)) localStorage.removeItem(key);
    });
    // Clear session storage
    sessionStorage.clear();
    await new Promise(r => setTimeout(r, 1000));
    setClearStatus("success");
    setTimeout(() => setClearStatus("idle"), 3000);
  };

  const clearAnalytics = async () => {
    if (!confirm("This will delete ALL analytics data permanently. Are you sure?")) return;
    const res = await fetch("/api/admin/clear-analytics", { method: "DELETE" });
    if (res.ok) alert("Analytics data cleared!");
    else alert("Failed to clear analytics data.");
  };

  const exportData = async () => {
    const res = await fetch("/api/admin/export");
    const data = await res.json();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `portfolio-backup-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-gray-400 text-sm mt-1">Manage admin credentials, notifications & site settings</p>
      </div>

      <div className="max-w-2xl space-y-6">

        {/* Security Info */}
        <div className="glass rounded-2xl p-5 border border-purple-500/20 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-violet-400 flex items-center justify-center flex-shrink-0">
            <Shield size={18} className="text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">Security Info</h3>
            <p className="text-gray-400 text-xs mt-1 leading-relaxed">
              Admin URL: <span className="text-purple-400 font-mono">/sakib-cp-2035</span><br/>
              Keep this URL secret — don't share it publicly.
            </p>
          </div>
        </div>

        {/* ── 1. Change Credentials ── */}
        <div className="glass rounded-2xl p-6 border border-white/5">
          <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
            <Lock size={18} className="text-purple-400" /> Change Email / Password
          </h2>

          {credStatus === "success" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 text-sm px-4 py-3 rounded-xl mb-4">
              <CheckCircle size={15} /> {credMessage}
            </motion.div>
          )}
          {credStatus === "error" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-4">
              <AlertCircle size={15} /> {credMessage}
            </motion.div>
          )}

          <form onSubmit={handleCredUpdate} className="space-y-4">
            <div>
              <label className="text-purple-400 text-xs font-mono mb-1.5 block">Current Password *</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} required
                  value={credForm.currentPassword}
                  onChange={e => setCredForm({ ...credForm, currentPassword: e.target.value })}
                  placeholder="Current password"
                  className="w-full bg-white/5 border border-purple-500/20 rounded-xl px-4 py-3 pr-10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-colors" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-500">
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <div className="border-t border-white/5 pt-4 space-y-4">
              <p className="text-gray-500 text-xs">Leave blank if you don't want to change that field</p>
              <div>
                <label className="text-purple-400 text-xs font-mono mb-1.5 block">New Email (optional)</label>
                <input type="email" value={credForm.newEmail}
                  onChange={e => setCredForm({ ...credForm, newEmail: e.target.value })}
                  placeholder="new@email.com"
                  className="w-full bg-white/5 border border-purple-500/20 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-colors" />
              </div>
              <div>
                <label className="text-purple-400 text-xs font-mono mb-1.5 block">New Password (optional)</label>
                <input type="password" value={credForm.newPassword}
                  onChange={e => setCredForm({ ...credForm, newPassword: e.target.value })}
                  placeholder="Min 8 characters"
                  className="w-full bg-white/5 border border-purple-500/20 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-colors" />
              </div>
              {credForm.newPassword && (
                <div>
                  <label className="text-purple-400 text-xs font-mono mb-1.5 block">Confirm New Password *</label>
                  <input type="password" value={credForm.confirmPassword}
                    onChange={e => setCredForm({ ...credForm, confirmPassword: e.target.value })}
                    placeholder="Repeat new password"
                    className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none transition-colors ${
                      credForm.confirmPassword && credForm.newPassword !== credForm.confirmPassword
                        ? "border-red-500/50" : "border-purple-500/20 focus:border-purple-400"
                    }`} />
                </div>
              )}
            </div>

            <motion.button type="submit" disabled={credStatus === "loading" || !credForm.currentPassword}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="w-full py-3 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-50"
              style={{ background: "linear-gradient(135deg, #7c3aed, #db2777)" }}>
              {credStatus === "loading"
                ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : <><Lock size={15} /> Update Credentials</>}
            </motion.button>
          </form>
        </div>

        {/* ── 2. Notifications ── */}
        <div className="glass rounded-2xl p-6 border border-white/5">
          <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
            <Bell size={18} className="text-yellow-400" /> Notifications
          </h2>
          <div className="space-y-4">
            {[
              { key: "newMessage", label: "New Contact Messages", desc: "Alert when someone sends a message" },
              { key: "weeklyReport", label: "Weekly Analytics Report", desc: "Summary of weekly visitors" },
              { key: "browserNotif", label: "Browser Notifications", desc: "Push notifications in browser" },
            ].map(({ key, label, desc }) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <p className="text-white text-sm font-medium">{label}</p>
                  <p className="text-gray-500 text-xs">{desc}</p>
                </div>
                <button onClick={() => setNotifSettings({ ...notifSettings, [key]: !notifSettings[key as keyof typeof notifSettings] })}
                  className={`relative w-11 h-6 rounded-full transition-colors ${notifSettings[key as keyof typeof notifSettings] ? "bg-purple-600" : "bg-gray-700"}`}>
                  <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${notifSettings[key as keyof typeof notifSettings] ? "translate-x-5" : "translate-x-0.5"}`} />
                </button>
              </div>
            ))}
          </div>
          <button onClick={saveNotifSettings}
            className="mt-5 px-4 py-2 rounded-xl text-white text-sm font-semibold"
            style={{ background: "linear-gradient(135deg, #7c3aed, #db2777)" }}>
            Save Notifications
          </button>
        </div>

        {/* ── 3. Site Settings ── */}
        <div className="glass rounded-2xl p-6 border border-white/5">
          <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
            <Globe size={18} className="text-blue-400" /> Site Settings
          </h2>
          <div className="space-y-4">
            {[
              { key: "maintenanceMode", label: "Maintenance Mode", desc: "Show maintenance page to visitors" },
              { key: "showOpenToWork", label: "Show Open to Work", desc: "Display 'Open to Work' badge on profile" },
              { key: "enableBlog", label: "Enable Blog Section", desc: "Show/hide blog on portfolio" },
              { key: "enableContact", label: "Enable Contact Form", desc: "Allow visitors to send messages" },
              { key: "enableAnalytics", label: "Enable Analytics Tracking", desc: "Track visitor data" },
            ].map(({ key, label, desc }) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <p className="text-white text-sm font-medium">{label}</p>
                  <p className="text-gray-500 text-xs">{desc}</p>
                </div>
                <button onClick={() => setSiteSettings({ ...siteSettings, [key]: !siteSettings[key as keyof typeof siteSettings] })}
                  className={`relative w-11 h-6 rounded-full transition-colors ${siteSettings[key as keyof typeof siteSettings] ? "bg-purple-600" : "bg-gray-700"}`}>
                  <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${siteSettings[key as keyof typeof siteSettings] ? "translate-x-5" : "translate-x-0.5"}`} />
                </button>
              </div>
            ))}
          </div>
          <button onClick={saveSiteSettings}
            className="mt-5 px-4 py-2 rounded-xl text-white text-sm font-semibold"
            style={{ background: "linear-gradient(135deg, #7c3aed, #db2777)" }}>
            Save Site Settings
          </button>
        </div>

        {/* ── 4. Data Management ── */}
        <div className="glass rounded-2xl p-6 border border-white/5">
          <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
            <Database size={18} className="text-green-400" /> Data Management
          </h2>
          <div className="space-y-3">

            {/* Clear Cache */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/3 border border-white/5">
              <div>
                <p className="text-white text-sm font-medium">Clear Cache</p>
                <p className="text-gray-500 text-xs">Clear browser cache & temp data</p>
              </div>
              <button onClick={clearCache} disabled={clearStatus === "loading"}
                className="flex items-center gap-2 px-4 py-2 rounded-xl glass border border-purple-500/30 text-purple-400 text-sm font-semibold hover:border-purple-400 transition-all">
                {clearStatus === "loading" ? <RefreshCw size={14} className="animate-spin" /> :
                 clearStatus === "success" ? <CheckCircle size={14} className="text-green-400" /> :
                 <RefreshCw size={14} />}
                {clearStatus === "success" ? "Cleared!" : "Clear Cache"}
              </button>
            </div>

            {/* Export Data */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/3 border border-white/5">
              <div>
                <p className="text-white text-sm font-medium">Export Data</p>
                <p className="text-gray-500 text-xs">Download all portfolio data as JSON backup</p>
              </div>
              <button onClick={exportData}
                className="flex items-center gap-2 px-4 py-2 rounded-xl glass border border-green-500/30 text-green-400 text-sm font-semibold hover:border-green-400 transition-all">
                <Download size={14} /> Export
              </button>
            </div>

            {/* Clear Analytics */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-red-500/5 border border-red-500/20">
              <div>
                <p className="text-white text-sm font-medium flex items-center gap-1">
                  <AlertTriangle size={13} className="text-red-400" /> Clear Analytics Data
                </p>
                <p className="text-gray-500 text-xs">Permanently delete all visitor data</p>
              </div>
              <button onClick={clearAnalytics}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-red-500/30 text-red-400 text-sm font-semibold hover:bg-red-500/10 transition-all">
                <Trash2 size={14} /> Clear
              </button>
            </div>
          </div>
        </div>

        {/* ── 5. Current Info ── */}
        <div className="glass rounded-2xl p-5 border border-white/5">
          <h3 className="text-white font-semibold text-sm mb-3">Current Credentials</h3>
          <div className="space-y-2 text-sm">
            {[
              { label: "Admin URL", value: "/sakib-cp-2035", color: "text-purple-400 font-mono" },
              { label: "Email", value: "mdsakibhassan632@gmail.com", color: "text-gray-300" },
              { label: "Password", value: "••••••••••••", color: "text-gray-500" },
            ].map(({ label, value, color }) => (
              <div key={label} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                <span className="text-gray-400">{label}</span>
                <span className={color}>{value}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

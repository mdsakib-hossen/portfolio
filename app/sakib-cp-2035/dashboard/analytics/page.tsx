"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend
} from "recharts";
import { TrendingUp, Users, Monitor, Globe, RefreshCw, Download, Share2 } from "lucide-react";

type Period = "daily" | "monthly" | "yearly";
const COLORS = ["#a78bfa", "#f472b6", "#60a5fa", "#34d399", "#fbbf24"];

export default function AnalyticsDashboard() {
  const [period, setPeriod] = useState<Period>("daily");
  const [views, setViews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalViews, setTotalViews] = useState(0);
  const [todayViews, setTodayViews] = useState(0);
  const [monthViews, setMonthViews] = useState(0);
  const [deviceData, setDeviceData] = useState<any[]>([]);
  const [pageData, setPageData] = useState<any[]>([]);
  const [referrerData, setReferrerData] = useState<any[]>([]);
  const [lastUpdated, setLastUpdated] = useState("");
  const printRef = useRef<HTMLDivElement>(null);

  const fetchAnalytics = async () => {
    setLoading(true);
    const { data: allViews } = await supabase
      .from("page_views").select("*").order("created_at", { ascending: true });

    if (!allViews) { setLoading(false); return; }

    setTotalViews(allViews.length);
    const today = new Date().toDateString();
    setTodayViews(allViews.filter(v => new Date(v.created_at).toDateString() === today).length);
    const now = new Date();
    setMonthViews(allViews.filter(v => {
      const d = new Date(v.created_at);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length);

    if (period === "daily") {
      const last30 = Array.from({ length: 30 }, (_, i) => {
        const d = new Date(); d.setDate(d.getDate() - (29 - i));
        return d.toISOString().split("T")[0];
      });
      setViews(last30.map(date => ({
        date: date.slice(5),
        views: allViews.filter(v => v.created_at.startsWith(date)).length,
      })));
    } else if (period === "monthly") {
      const months = Array.from({ length: 12 }, (_, i) => {
        const d = new Date(); d.setMonth(d.getMonth() - (11 - i));
        return { year: d.getFullYear(), month: d.getMonth() };
      });
      const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
      setViews(months.map(({ year, month }) => ({
        date: `${monthNames[month]} ${year}`,
        views: allViews.filter(v => {
          const d = new Date(v.created_at);
          return d.getMonth() === month && d.getFullYear() === year;
        }).length,
      })));
    } else {
      const years = [...new Set(allViews.map(v => new Date(v.created_at).getFullYear()))].sort();
      setViews(years.map(year => ({
        date: String(year),
        views: allViews.filter(v => new Date(v.created_at).getFullYear() === year).length,
      })));
    }

    const devices: Record<string, number> = {};
    allViews.forEach(v => { devices[v.device || "desktop"] = (devices[v.device || "desktop"] || 0) + 1; });
    setDeviceData(Object.entries(devices).map(([name, value]) => ({ name: name.charAt(0).toUpperCase() + name.slice(1), value })));

    const pages: Record<string, number> = {};
    allViews.forEach(v => { pages[v.page || "/"] = (pages[v.page || "/"] || 0) + 1; });
    setPageData(Object.entries(pages).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([name, value]) => ({ name, value })));

    const refs: Record<string, number> = {};
    allViews.forEach(v => { const r = v.referrer || "direct"; refs[r] = (refs[r] || 0) + 1; });
    setReferrerData(Object.entries(refs).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([name, value]) => ({ name, value })));

    setLastUpdated(new Date().toLocaleTimeString());
    setLoading(false);
  };

  useEffect(() => { fetchAnalytics(); }, [period]);

  const handlePrint = async () => {
    try {
      const { default: html2canvas } = await import("html2canvas");
      const { default: jsPDF } = await import("jspdf");

      const element = printRef.current;
      if (!element) return;

      // Show loading
      const btn = document.getElementById("pdf-btn");
      if (btn) btn.textContent = "⏳ Generating...";

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#0a0a0f",
        logging: false,
        windowWidth: 1200,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      const pageHeight = pdf.internal.pageSize.getHeight();

      let heightLeft = pdfHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
      heightLeft -= pageHeight;

      // Multi-page support
      while (heightLeft >= 0) {
        position = heightLeft - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
        heightLeft -= pageHeight;
      }

      const date = new Date().toISOString().split("T")[0];
      pdf.save(`portfolio-analytics-${date}.pdf`);

      if (btn) btn.textContent = "✅ Downloaded!";
      setTimeout(() => { if (btn) btn.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Download PDF'; }, 3000);
    } catch (err) {
      console.error(err);
      // Fallback to print
      window.print();
    }
  };

  const handleShare = async () => {
    const text = `📊 Portfolio Analytics — ${new Date().toLocaleDateString()}\n\n🌐 Total Visits: ${totalViews}\n📅 Today: ${todayViews}\n📆 This Month: ${monthViews}\n\n🔗 mdsakib-hossen.vercel.app`;
    if (navigator.share) {
      await navigator.share({ title: "Portfolio Analytics", text });
    } else {
      await navigator.clipboard.writeText(text);
      alert("Stats copied to clipboard!");
    }
  };

  const statCards = [
    { label: "Total Visits", value: totalViews, icon: Globe, color: "from-purple-600 to-violet-400", sub: "All time", trend: "+100%" },
    { label: "Today", value: todayViews, icon: TrendingUp, color: "from-green-600 to-emerald-400", sub: "Last 24 hours", trend: "↑" },
    { label: "This Month", value: monthViews, icon: Users, color: "from-blue-600 to-cyan-400", sub: new Date().toLocaleString("default", { month: "long", year: "numeric" }), trend: "↑" },
    { label: "Device Types", value: deviceData.length, icon: Monitor, color: "from-pink-600 to-rose-400", sub: "Tracked categories", trend: "" },
  ];

  return (
    <>
      {/* Print styles */}
      <style>{`
        @media print {
          body { background: white !important; color: black !important; }
          .no-print { display: none !important; }
          .print-page { padding: 20px !important; }
          .glass { background: white !important; border: 1px solid #e5e7eb !important; }
        }
      `}</style>

      <div className="print-page" ref={printRef}>
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Analytics</h1>
            <p className="text-gray-400 text-sm mt-1">
              Visitor statistics for{" "}
              <span className="text-purple-400">mdsakib-hossen.vercel.app</span>
            </p>
            {lastUpdated && (
              <div className="flex items-center gap-2 mt-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-gray-500 text-xs">Updated {lastUpdated}</span>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 no-print">
            <motion.button onClick={handleShare} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl glass border border-blue-500/30 text-blue-400 text-sm font-semibold hover:border-blue-400 transition-all">
              <Share2 size={15} /> Share
            </motion.button>
            <motion.a href="/sakib-cp-2035/dashboard/analytics/print" target="_blank"
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-semibold"
              style={{ background: "linear-gradient(135deg, #7c3aed, #db2777)" }}>
              <Download size={15} /> Download PDF
            </motion.a>
            <button onClick={fetchAnalytics} className="p-2 rounded-xl glass border border-purple-500/30 text-purple-400">
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            </button>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          {statCards.map(({ label, value, icon: Icon, color, sub }, i) => (
            <motion.div key={label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-4 sm:p-5 border border-white/5">
              <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-3`}>
                <Icon size={16} className="text-white" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-white">{loading ? "..." : value.toLocaleString()}</div>
              <div className="text-white text-xs sm:text-sm font-medium mt-0.5">{label}</div>
              <div className="text-gray-500 text-xs mt-0.5 truncate">{sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Period Toggle */}
        <div className="flex gap-2 mb-5 no-print">
          {(["daily", "monthly", "yearly"] as Period[]).map(p => (
            <button key={p} onClick={() => setPeriod(p)}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all capitalize ${period === p ? "text-white" : "glass text-gray-400 hover:text-white"}`}
              style={period === p ? { background: "linear-gradient(135deg, #7c3aed, #db2777)" } : {}}>
              {p === "daily" ? "Daily" : p === "monthly" ? "Monthly" : "Yearly"}
            </button>
          ))}
        </div>

        {/* Main Area Chart */}
        <div className="glass rounded-2xl p-4 sm:p-6 border border-white/5 mb-5">
          <h3 className="text-white font-semibold mb-4 text-sm sm:text-base">
            {period === "daily" ? "Last 30 Days" : period === "monthly" ? "Last 12 Months" : "Yearly"} — Page Views
          </h3>
          {loading ? <div className="h-48 sm:h-64 bg-white/5 rounded-xl animate-pulse" /> : (
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={views}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#a78bfa" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="date" tick={{ fill: "#6b7280", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#6b7280", fontSize: 10 }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip contentStyle={{ background: "#13111e", border: "1px solid rgba(167,139,250,0.3)", borderRadius: "12px", color: "#fff", fontSize: "12px" }}
                  labelStyle={{ color: "#a78bfa" }} />
                <Area type="monotone" dataKey="views" stroke="#a78bfa" strokeWidth={2} fill="url(#colorViews)" />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Bottom 3 charts */}
        <div className="grid md:grid-cols-3 gap-4">
          {/* Devices Pie */}
          <div className="glass rounded-2xl p-4 sm:p-6 border border-white/5">
            <h3 className="text-white font-semibold mb-4 text-sm flex items-center gap-2">
              <Monitor size={15} className="text-purple-400" /> Devices
            </h3>
            {loading ? <div className="h-36 bg-white/5 rounded-xl animate-pulse" /> : deviceData.length > 0 ? (
              <ResponsiveContainer width="100%" height={150}>
                <PieChart>
                  <Pie data={deviceData} cx="50%" cy="50%" innerRadius={35} outerRadius={55} paddingAngle={3} dataKey="value">
                    {deviceData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: "#13111e", border: "1px solid rgba(167,139,250,0.3)", borderRadius: "8px", color: "#fff", fontSize: "11px" }} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: "11px", color: "#9ca3af" }} />
                </PieChart>
              </ResponsiveContainer>
            ) : <p className="text-gray-500 text-xs text-center py-8">No data yet</p>}
          </div>

          {/* Top Pages */}
          <div className="glass rounded-2xl p-4 sm:p-6 border border-white/5">
            <h3 className="text-white font-semibold mb-4 text-sm flex items-center gap-2">
              <Globe size={15} className="text-blue-400" /> Top Pages
            </h3>
            {loading ? <div className="h-36 bg-white/5 rounded-xl animate-pulse" /> : (
              <div className="space-y-2.5">
                {pageData.map(({ name, value }, i) => (
                  <div key={name} className="flex items-center gap-2">
                    <span className="text-gray-500 text-xs w-3 flex-shrink-0">{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-gray-300 text-xs truncate">{name}</span>
                        <span className="text-purple-400 text-xs ml-1 flex-shrink-0 font-bold">{value}</span>
                      </div>
                      <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-purple-600 to-pink-600"
                          style={{ width: `${(value / (pageData[0]?.value || 1)) * 100}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
                {pageData.length === 0 && <p className="text-gray-500 text-xs text-center py-4">No data yet</p>}
              </div>
            )}
          </div>

          {/* Traffic Sources */}
          <div className="glass rounded-2xl p-4 sm:p-6 border border-white/5">
            <h3 className="text-white font-semibold mb-4 text-sm flex items-center gap-2">
              <TrendingUp size={15} className="text-green-400" /> Traffic Sources
            </h3>
            {loading ? <div className="h-36 bg-white/5 rounded-xl animate-pulse" /> : (
              <div className="space-y-2.5">
                {referrerData.map(({ name, value }, i) => (
                  <div key={name} className="flex items-center gap-2">
                    <span className="text-gray-500 text-xs w-3 flex-shrink-0">{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-gray-300 text-xs truncate">{name}</span>
                        <span className="text-green-400 text-xs ml-1 flex-shrink-0 font-bold">{value}</span>
                      </div>
                      <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-green-600 to-emerald-400"
                          style={{ width: `${(value / (referrerData[0]?.value || 1)) * 100}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
                {referrerData.length === 0 && <p className="text-gray-500 text-xs text-center py-4">No data yet</p>}
              </div>
            )}
          </div>
        </div>

        {/* Print footer */}
        <div className="mt-6 text-center text-gray-500 text-xs hidden print:block">
          Generated from mdsakib-hossen.vercel.app/sakib-cp-2035 · {new Date().toLocaleString()}
        </div>
      </div>
    </>
  );
}

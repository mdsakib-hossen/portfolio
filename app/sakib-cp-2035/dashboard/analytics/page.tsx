"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend
} from "recharts";
import { TrendingUp, Users, Monitor, Smartphone, Globe, RefreshCw } from "lucide-react";

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

  const fetchAnalytics = async () => {
    setLoading(true);
    const { data: allViews } = await supabase
      .from("page_views")
      .select("*")
      .order("created_at", { ascending: true });

    if (!allViews) { setLoading(false); return; }

    // Total
    setTotalViews(allViews.length);

    // Today
    const today = new Date().toDateString();
    setTodayViews(allViews.filter(v => new Date(v.created_at).toDateString() === today).length);

    // This month
    const now = new Date();
    setMonthViews(allViews.filter(v => {
      const d = new Date(v.created_at);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length);

    // Chart data
    if (period === "daily") {
      // Last 30 days
      const last30 = Array.from({ length: 30 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (29 - i));
        return d.toISOString().split("T")[0];
      });
      const dailyCounts = last30.map(date => ({
        date: date.slice(5), // MM-DD
        views: allViews.filter(v => v.created_at.startsWith(date)).length,
      }));
      setViews(dailyCounts);
    } else if (period === "monthly") {
      // Last 12 months
      const months = Array.from({ length: 12 }, (_, i) => {
        const d = new Date();
        d.setMonth(d.getMonth() - (11 - i));
        return { year: d.getFullYear(), month: d.getMonth() };
      });
      const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
      const monthlyCounts = months.map(({ year, month }) => ({
        date: `${monthNames[month]} ${year}`,
        views: allViews.filter(v => {
          const d = new Date(v.created_at);
          return d.getMonth() === month && d.getFullYear() === year;
        }).length,
      }));
      setViews(monthlyCounts);
    } else {
      // Yearly
      const years = [...new Set(allViews.map(v => new Date(v.created_at).getFullYear()))].sort();
      const yearlyCounts = years.map(year => ({
        date: String(year),
        views: allViews.filter(v => new Date(v.created_at).getFullYear() === year).length,
      }));
      setViews(yearlyCounts);
    }

    // Device breakdown
    const devices: Record<string, number> = {};
    allViews.forEach(v => { devices[v.device || "desktop"] = (devices[v.device || "desktop"] || 0) + 1; });
    setDeviceData(Object.entries(devices).map(([name, value]) => ({ name, value })));

    // Top pages
    const pages: Record<string, number> = {};
    allViews.forEach(v => { pages[v.page || "/"] = (pages[v.page || "/"] || 0) + 1; });
    setPageData(Object.entries(pages).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([name, value]) => ({ name, value })));

    // Referrers
    const refs: Record<string, number> = {};
    allViews.forEach(v => { const r = v.referrer || "direct"; refs[r] = (refs[r] || 0) + 1; });
    setReferrerData(Object.entries(refs).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([name, value]) => ({ name, value })));

    setLoading(false);
  };

  useEffect(() => { fetchAnalytics(); }, [period]);

  const statCards = [
    { label: "Total Visits", value: totalViews, icon: Globe, color: "from-purple-600 to-violet-400", sub: "All time" },
    { label: "Today", value: todayViews, icon: TrendingUp, color: "from-green-600 to-emerald-400", sub: "Last 24 hours" },
    { label: "This Month", value: monthViews, icon: Users, color: "from-blue-600 to-cyan-400", sub: new Date().toLocaleString("default", { month: "long" }) },
    { label: "Devices", value: deviceData.length, icon: Monitor, color: "from-pink-600 to-rose-400", sub: "Types tracked" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Analytics</h1>
          <p className="text-gray-400 text-sm mt-1">Visitor statistics & insights</p>
        </div>
        <button onClick={fetchAnalytics} className="flex items-center gap-2 px-4 py-2 rounded-xl glass border border-purple-500/30 text-purple-400 text-sm">
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map(({ label, value, icon: Icon, color, sub }, i) => (
          <motion.div key={label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="glass rounded-2xl p-5 border border-white/5">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-3`}>
              <Icon size={18} className="text-white" />
            </div>
            <div className="text-2xl font-bold text-white">{loading ? "..." : value.toLocaleString()}</div>
            <div className="text-white text-sm font-medium mt-0.5">{label}</div>
            <div className="text-gray-500 text-xs mt-0.5">{sub}</div>
          </motion.div>
        ))}
      </div>

      {/* Period Toggle */}
      <div className="flex gap-2 mb-6">
        {(["daily", "monthly", "yearly"] as Period[]).map(p => (
          <button key={p} onClick={() => setPeriod(p)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all capitalize ${period === p ? "text-white" : "glass text-gray-400 hover:text-white"}`}
            style={period === p ? { background: "linear-gradient(135deg, #7c3aed, #db2777)" } : {}}>
            {p === "daily" ? "Daily (30 days)" : p === "monthly" ? "Monthly (12 months)" : "Yearly"}
          </button>
        ))}
      </div>

      {/* Main Chart */}
      <div className="glass rounded-2xl p-6 border border-white/5 mb-6">
        <h3 className="text-white font-semibold mb-4">
          {period === "daily" ? "Last 30 Days" : period === "monthly" ? "Last 12 Months" : "Yearly"} — Page Views
        </h3>
        {loading ? (
          <div className="h-64 bg-white/5 rounded-xl animate-pulse" />
        ) : (
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={views}>
              <defs>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#a78bfa" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="date" tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip
                contentStyle={{ background: "#13111e", border: "1px solid rgba(167,139,250,0.3)", borderRadius: "12px", color: "#fff" }}
                labelStyle={{ color: "#a78bfa" }}
              />
              <Area type="monotone" dataKey="views" stroke="#a78bfa" strokeWidth={2} fill="url(#colorViews)" />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Bottom Charts */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Device Breakdown */}
        <div className="glass rounded-2xl p-6 border border-white/5">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Monitor size={16} className="text-purple-400" /> Devices
          </h3>
          {loading ? <div className="h-40 bg-white/5 rounded-xl animate-pulse" /> : (
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={deviceData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={3} dataKey="value">
                  {deviceData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "#13111e", border: "1px solid rgba(167,139,250,0.3)", borderRadius: "8px", color: "#fff" }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: "12px", color: "#9ca3af" }} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Top Pages */}
        <div className="glass rounded-2xl p-6 border border-white/5">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Globe size={16} className="text-blue-400" /> Top Pages
          </h3>
          {loading ? <div className="h-40 bg-white/5 rounded-xl animate-pulse" /> : (
            <div className="space-y-3">
              {pageData.map(({ name, value }, i) => (
                <div key={name} className="flex items-center gap-3">
                  <span className="text-gray-500 text-xs w-4">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-gray-300 text-xs truncate">{name}</span>
                      <span className="text-purple-400 text-xs ml-2 flex-shrink-0">{value}</span>
                    </div>
                    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-purple-600 to-pink-600"
                        style={{ width: `${(value / (pageData[0]?.value || 1)) * 100}%` }} />
                    </div>
                  </div>
                </div>
              ))}
              {pageData.length === 0 && <p className="text-gray-500 text-sm text-center py-4">No data yet</p>}
            </div>
          )}
        </div>

        {/* Referrers */}
        <div className="glass rounded-2xl p-6 border border-white/5">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <TrendingUp size={16} className="text-green-400" /> Traffic Sources
          </h3>
          {loading ? <div className="h-40 bg-white/5 rounded-xl animate-pulse" /> : (
            <div className="space-y-3">
              {referrerData.map(({ name, value }, i) => (
                <div key={name} className="flex items-center gap-3">
                  <span className="text-gray-500 text-xs w-4">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-gray-300 text-xs truncate">{name}</span>
                      <span className="text-green-400 text-xs ml-2 flex-shrink-0">{value}</span>
                    </div>
                    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-green-600 to-emerald-400"
                        style={{ width: `${(value / (referrerData[0]?.value || 1)) * 100}%` }} />
                    </div>
                  </div>
                </div>
              ))}
              {referrerData.length === 0 && <p className="text-gray-500 text-sm text-center py-4">No data yet</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

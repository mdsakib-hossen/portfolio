"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";

const COLORS = ["#7c3aed", "#db2777", "#2563eb", "#059669", "#d97706"];

export default function AnalyticsPrintPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data: views } = await supabase.from("page_views").select("*").order("created_at", { ascending: true });
      if (!views) return;

      const now = new Date();
      const total = views.length;
      const today = views.filter(v => new Date(v.created_at).toDateString() === now.toDateString()).length;
      const thisMonth = views.filter(v => {
        const d = new Date(v.created_at);
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      }).length;

      // Last 14 days chart
      const last14 = Array.from({ length: 14 }, (_, i) => {
        const d = new Date(); d.setDate(d.getDate() - (13 - i));
        const date = d.toISOString().split("T")[0];
        return { date: date.slice(5), views: views.filter(v => v.created_at.startsWith(date)).length };
      });

      // Devices
      const devices: Record<string, number> = {};
      views.forEach(v => { devices[v.device || "desktop"] = (devices[v.device || "desktop"] || 0) + 1; });
      const deviceData = Object.entries(devices).map(([name, value]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1), value
      }));

      // Top pages
      const pages: Record<string, number> = {};
      views.forEach(v => { pages[v.page || "/"] = (pages[v.page || "/"] || 0) + 1; });
      const topPages = Object.entries(pages).sort((a, b) => b[1] - a[1]).slice(0, 5);

      // Top sources
      const refs: Record<string, number> = {};
      views.forEach(v => { const r = v.referrer || "direct"; refs[r] = (refs[r] || 0) + 1; });
      const topSources = Object.entries(refs).sort((a, b) => b[1] - a[1]).slice(0, 5);

      setData({ total, today, thisMonth, last14, deviceData, topPages, topSources, generatedAt: new Date().toLocaleString() });
      setLoading(false);
    };
    fetch();
  }, []);

  const handleDownload = async () => {
    const btn = document.getElementById("dl-btn") as HTMLButtonElement;
    if (btn) { btn.disabled = true; btn.textContent = "⏳ Generating PDF..."; }

    try {
      const { default: html2canvas } = await import("html2canvas");
      const { default: jsPDF } = await import("jspdf");

      const el = document.getElementById("report-page")!;
      const canvas = await html2canvas(el, {
        scale: 2, useCORS: true,
        backgroundColor: "#ffffff",
        width: 794, // A4 width px at 96dpi
        windowWidth: 794,
      });

      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const w = pdf.internal.pageSize.getWidth();
      const h = pdf.internal.pageSize.getHeight();
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, w, h);
      pdf.save(`analytics-report-${new Date().toISOString().split("T")[0]}.pdf`);
    } catch {
      window.print();
    }

    if (btn) { btn.disabled = false; btn.textContent = "✅ Downloaded!"; }
    setTimeout(() => { if (btn) btn.textContent = "⬇ Download PDF"; }, 3000);
  };

  if (loading) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-gray-500 text-sm">Loading analytics...</div>
    </div>
  );

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Arial, sans-serif; background: #f5f5f5; }
        .btn { position: fixed; top: 16px; right: 16px; background: linear-gradient(135deg, #7c3aed, #db2777); color: white; border: none; padding: 10px 20px; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; z-index: 999; box-shadow: 0 4px 16px rgba(124,58,237,0.4); }
        @media print { .btn { display: none !important; } body { background: white; } }
      `}</style>

      <button id="dl-btn" className="btn" onClick={handleDownload}>⬇ Download PDF</button>

      {/* A4 Report Page */}
      <div id="report-page" style={{
        width: "794px", minHeight: "1123px", margin: "20px auto",
        background: "white", padding: "32px 36px",
        fontFamily: "'Segoe UI', Arial, sans-serif",
        boxShadow: "0 4px 32px rgba(0,0,0,0.12)",
      }}>

        {/* Header Banner */}
        <div style={{ background: "linear-gradient(135deg, #1e1b4b, #4c1d95, #831843)", borderRadius: "12px", padding: "20px 28px", marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ color: "#c4b5fd", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "4px" }}>Portfolio Analytics Report</div>
            <div style={{ color: "white", fontSize: "22px", fontWeight: "800" }}>Md. Sakib Hossen</div>
            <div style={{ color: "#c4b5fd", fontSize: "12px", marginTop: "3px" }}>mdsakib-hossen.vercel.app</div>
          </div>
          <div style={{ textAlign: "right", color: "#e2d9f3", fontSize: "11px", lineHeight: "1.8" }}>
            <div>📅 {data.generatedAt}</div>
            <div>📊 Analytics Dashboard</div>
          </div>
        </div>

        {/* Stat Cards Row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px", marginBottom: "24px" }}>
          {[
            { label: "Total Visits", value: data.total, color: "#7c3aed", bg: "#f5f3ff", icon: "🌐" },
            { label: "Today's Visits", value: data.today, color: "#059669", bg: "#f0fdf4", icon: "📅" },
            { label: "This Month", value: data.thisMonth, color: "#2563eb", bg: "#eff6ff", icon: "📆" },
          ].map(({ label, value, color, bg, icon }) => (
            <div key={label} style={{ background: bg, border: `1px solid ${color}20`, borderRadius: "10px", padding: "16px 20px" }}>
              <div style={{ fontSize: "20px", marginBottom: "6px" }}>{icon}</div>
              <div style={{ fontSize: "28px", fontWeight: "800", color }}>{value.toLocaleString()}</div>
              <div style={{ fontSize: "11px", color: "#64748b", marginTop: "2px", fontWeight: "600" }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Chart + Devices Row */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "16px", marginBottom: "20px" }}>
          {/* Line Chart */}
          <div style={{ background: "#fafafa", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "16px" }}>
            <div style={{ fontSize: "11px", fontWeight: "700", color: "#7c3aed", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "12px" }}>Last 14 Days — Page Views</div>
            <ResponsiveContainer width="100%" height={140}>
              <AreaChart data={data.last14}>
                <defs>
                  <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="date" tick={{ fill: "#94a3b8", fontSize: 9 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#94a3b8", fontSize: 9 }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip contentStyle={{ fontSize: "11px", borderRadius: "6px", border: "1px solid #e2e8f0" }} />
                <Area type="monotone" dataKey="views" stroke="#7c3aed" strokeWidth={2} fill="url(#g)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div style={{ background: "#fafafa", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "16px" }}>
            <div style={{ fontSize: "11px", fontWeight: "700", color: "#7c3aed", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "12px" }}>Device Breakdown</div>
            <ResponsiveContainer width="100%" height={100}>
              <PieChart>
                <Pie data={data.deviceData} cx="50%" cy="50%" outerRadius={45} dataKey="value" label={(props: any) => `${props.name || ""} ${((props.percent || 0) * 100).toFixed(0)}%`} labelLine={false}
                  style={{ fontSize: "9px" }}>
                  {data.deviceData.map((_: any, i: number) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ fontSize: "10px" }} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ marginTop: "8px" }}>
              {data.deviceData.map(({ name, value }: any, i: number) => (
                <div key={name} style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "3px" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: COLORS[i % COLORS.length], flexShrink: 0 }} />
                  <span style={{ fontSize: "10px", color: "#475569" }}>{name}: <strong>{value}</strong></span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Pages + Sources */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
          {/* Top Pages */}
          <div style={{ background: "#fafafa", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "16px" }}>
            <div style={{ fontSize: "11px", fontWeight: "700", color: "#2563eb", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "12px" }}>🌐 Top Pages</div>
            {data.topPages.map(([page, count]: [string, number], i: number) => (
              <div key={page} style={{ marginBottom: "8px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px" }}>
                  <span style={{ fontSize: "11px", color: "#374151", maxWidth: "70%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{i + 1}. {page}</span>
                  <span style={{ fontSize: "11px", fontWeight: "700", color: "#7c3aed" }}>{count}</span>
                </div>
                <div style={{ height: "4px", background: "#e2e8f0", borderRadius: "2px", overflow: "hidden" }}>
                  <div style={{ height: "100%", background: "linear-gradient(90deg, #7c3aed, #db2777)", width: `${(count / data.topPages[0][1]) * 100}%`, borderRadius: "2px" }} />
                </div>
              </div>
            ))}
          </div>

          {/* Traffic Sources */}
          <div style={{ background: "#fafafa", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "16px" }}>
            <div style={{ fontSize: "11px", fontWeight: "700", color: "#059669", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "12px" }}>🔗 Traffic Sources</div>
            {data.topSources.map(([source, count]: [string, number], i: number) => (
              <div key={source} style={{ marginBottom: "8px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px" }}>
                  <span style={{ fontSize: "11px", color: "#374151", maxWidth: "70%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{i + 1}. {source}</span>
                  <span style={{ fontSize: "11px", fontWeight: "700", color: "#059669" }}>{count}</span>
                </div>
                <div style={{ height: "4px", background: "#e2e8f0", borderRadius: "2px", overflow: "hidden" }}>
                  <div style={{ height: "100%", background: "linear-gradient(90deg, #059669, #34d399)", width: `${(count / data.topSources[0][1]) * 100}%`, borderRadius: "2px" }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ borderTop: "2px solid #ede9fe", paddingTop: "14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: "10px", color: "#94a3b8" }}>
            Generated by <strong style={{ color: "#7c3aed" }}>Md. Sakib Hossen</strong> · Portfolio Analytics System
          </div>
          <div style={{ fontSize: "10px", color: "#94a3b8" }}>
            "Coding is not just my skill — it's how I turn ideas into reality." 🚀
          </div>
        </div>
      </div>
    </>
  );
}

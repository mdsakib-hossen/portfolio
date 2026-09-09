"use client";

import { useEffect, useState } from "react";
import { ExternalLink, TrendingUp, TrendingDown, Minus, RefreshCw } from "lucide-react";
import { cpProfiles } from "@/lib/data";

interface CFData {
  handle: string;
  rating: number;
  maxRating: number;
  rank: string;
  maxRank: string;
  solved: number;
  recentContests: {
    contestName: string;
    rank: number;
    ratingChange: number;
    newRating: number;
  }[];
}

interface LCData {
  handle: string;
  ranking: number;
  total: number;
  easy: number;
  medium: number;
  hard: number;
}

const rankColor: Record<string, string> = {
  newbie: "#64748b",
  pupil: "#22c55e",
  specialist: "#06b6d4",
  expert: "#3b82f6",
  "candidate master": "#a855f7",
  master: "#f97316",
  "international master": "#f97316",
  grandmaster: "#ef4444",
  "international grandmaster": "#ef4444",
  "legendary grandmaster": "#ef4444",
  unrated: "#94a3b8",
};

const smallPlatforms = cpProfiles.filter(
  (p) => p.platform !== "Codeforces" && p.platform !== "LeetCode"
);

export default function CPSection() {
  const [cf, setCf] = useState<CFData | null>(null);
  const [lc, setLc] = useState<LCData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const [cfRes, lcRes] = await Promise.all([
        fetch("/api/codeforces"),
        fetch("/api/leetcode"),
      ]);
      const cfData = await cfRes.json();
      const lcData = await lcRes.json();
      if (!cfData.error) setCf(cfData);
      if (!lcData.error) setLc(lcData);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch {
      // silently fail
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const Skeleton = () => (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-6 bg-slate-100 rounded-lg animate-pulse" />
      ))}
    </div>
  );

  return (
    <section id="cp" className="py-20 md:py-28" style={{ background: "#f8fafc" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-label">Competitive Programming</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Where I Compete</h2>
          <p style={{ textAlign: "center", display: "block" }} className="text-slate-500 mt-4 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Live stats from competitive programming platforms
          </p>
          {lastUpdated && (
            <div className="flex items-center justify-center gap-2 mt-3">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-slate-400 text-xs">Live · Updated {lastUpdated}</span>
              <button
                onClick={fetchData}
                className="text-cyan-500 hover:text-cyan-600 transition-colors"
                aria-label="Refresh data"
              >
                <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
              </button>
            </div>
          )}
        </div>

        {/* Main cards: CF + LC */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-10">
          {/* Codeforces */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center font-bold text-white text-sm flex-shrink-0">
                  CF
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Codeforces</h3>
                  <p className="text-slate-400 text-xs font-mono">@mdsakibhossen</p>
                </div>
              </div>
              <a
                href="https://codeforces.com/profile/mdsakibhossen"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink size={15} className="text-slate-400 hover:text-blue-500 transition-colors" />
              </a>
            </div>

            {loading ? (
              <Skeleton />
            ) : cf ? (
              <>
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
                    { label: "Rating", value: cf.rating, color: rankColor[cf.rank] || "#06b6d4" },
                    { label: "Max", value: cf.maxRating, color: "#f59e0b" },
                    { label: "Solved", value: cf.solved, color: "#22c55e" },
                  ].map(({ label, value, color }) => (
                    <div
                      key={label}
                      className="rounded-xl p-3 text-center"
                      style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
                    >
                      <div className="text-xl font-bold" style={{ color }}>
                        {value}
                      </div>
                      <div className="text-slate-400 text-xs mt-1">{label}</div>
                    </div>
                  ))}
                </div>

                <div className="mb-5">
                  <span
                    className="text-xs font-semibold px-3 py-1 rounded-full capitalize"
                    style={{
                      background: `${rankColor[cf.rank] ?? "#06b6d4"}18`,
                      color: rankColor[cf.rank] ?? "#06b6d4",
                    }}
                  >
                    {cf.rank}
                  </span>
                </div>

                {cf.recentContests.length > 0 && (
                  <div>
                    <p className="text-slate-400 text-xs font-semibold uppercase tracking-wide mb-3">
                      Recent Contests
                    </p>
                    <div className="space-y-2">
                      {cf.recentContests.slice(0, 3).map((c, i) => (
                        <div key={i} className="flex items-center justify-between text-xs gap-2">
                          <span className="text-slate-600 truncate flex-1 max-w-[55%]">
                            {c.contestName}
                          </span>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="text-slate-400">#{c.rank}</span>
                            <span
                              className={`flex items-center gap-0.5 font-bold ${
                                c.ratingChange > 0
                                  ? "text-green-500"
                                  : c.ratingChange < 0
                                  ? "text-red-500"
                                  : "text-slate-400"
                              }`}
                            >
                              {c.ratingChange > 0 ? (
                                <TrendingUp size={10} />
                              ) : c.ratingChange < 0 ? (
                                <TrendingDown size={10} />
                              ) : (
                                <Minus size={10} />
                              )}
                              {c.ratingChange > 0 ? "+" : ""}
                              {c.ratingChange}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <p className="text-slate-400 text-sm text-center py-6">Could not load data</p>
            )}
          </div>

          {/* LeetCode */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-yellow-400 flex items-center justify-center font-bold text-white text-sm flex-shrink-0">
                  LC
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">LeetCode</h3>
                  <p className="text-slate-400 text-xs font-mono">@mdsakib-dev</p>
                </div>
              </div>
              <a
                href="https://leetcode.com/u/mdsakib-dev/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink size={15} className="text-slate-400 hover:text-yellow-500 transition-colors" />
              </a>
            </div>

            {loading ? (
              <Skeleton />
            ) : lc ? (
              <>
                <div
                  className="rounded-xl p-4 text-center mb-5"
                  style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
                >
                  <div className="text-3xl font-extrabold text-yellow-500">{lc.total}</div>
                  <div className="text-slate-400 text-xs mt-1">Total Solved</div>
                </div>

                <div className="space-y-3 mb-5">
                  {[
                    { label: "Easy", count: lc.easy, color: "#22c55e", bg: "#f0fdf4" },
                    { label: "Medium", count: lc.medium, color: "#f59e0b", bg: "#fffbeb" },
                    { label: "Hard", count: lc.hard, color: "#ef4444", bg: "#fef2f2" },
                  ].map(({ label, count, color, bg }) => (
                    <div key={label}>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="font-medium" style={{ color }}>
                          {label}
                        </span>
                        <span className="text-slate-500">{count}</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{
                            width: `${lc.total ? (count / lc.total) * 100 : 0}%`,
                            background: color,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {lc.ranking > 0 && (
                  <div
                    className="rounded-xl p-3 text-center"
                    style={{ background: "#f0fdfe", border: "1px solid #a5f3fc" }}
                  >
                    <div className="text-lg font-bold text-cyan-500">
                      #{lc.ranking.toLocaleString()}
                    </div>
                    <div className="text-slate-400 text-xs">Global Ranking</div>
                  </div>
                )}
              </>
            ) : (
              <p className="text-slate-400 text-sm text-center py-6">Could not load data</p>
            )}
          </div>
        </div>

        {/* Other platforms */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
          {smallPlatforms.map(({ platform, handle, url, icon }) => (
            <a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="card group flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-lg bg-cyan-50 border border-cyan-100 flex items-center justify-center font-bold text-cyan-600 text-sm flex-shrink-0">
                  {icon}
                </div>
                <ExternalLink
                  size={13}
                  className="text-slate-300 group-hover:text-cyan-500 transition-colors"
                />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">{platform}</h3>
              <p className="text-cyan-500 text-xs font-mono truncate">@{handle}</p>
            </a>
          ))}
        </div>

        {/* Goal banner */}
        <div
          className="rounded-2xl p-8 text-center"
          style={{
            background: "linear-gradient(135deg, #f0fdfe, #e0f2fe)",
            border: "1px solid #a5f3fc",
          }}
        >
          <div className="text-4xl mb-3">🏆</div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Aiming for Grandmaster</h3>
          <p className="text-slate-500 text-sm max-w-lg mx-auto">
            My ultimate goal is to achieve Codeforces Grandmaster rating and represent Bangladesh in
            ICPC World Finals
          </p>
        </div>
      </div>
    </section>
  );
}


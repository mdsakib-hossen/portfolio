"use client";

import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { ExternalLink, TrendingUp, TrendingDown, Minus, RefreshCw } from "lucide-react";
import { cpProfiles } from "@/lib/data";
import { useEffect, useState } from "react";

interface CFData {
  handle: string;
  rating: number;
  maxRating: number;
  rank: string;
  maxRank: string;
  solved: number;
  recentContests: { contestName: string; rank: number; ratingChange: number; newRating: number }[];
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
  "newbie": "#808080",
  "pupil": "#008000",
  "specialist": "#03a89e",
  "expert": "#0000ff",
  "candidate master": "#aa00aa",
  "master": "#ff8c00",
  "international master": "#ff8c00",
  "grandmaster": "#ff0000",
  "international grandmaster": "#ff0000",
  "legendary grandmaster": "#ff0000",
  "unrated": "#808080",
};

export default function CPStatsSection() {
  const { language } = useTheme();
  const [cf, setCf] = useState<CFData | null>(null);
  const [lc, setLc] = useState<LCData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>("");

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
    } catch { }
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <section id="cp-stats" className="section-padding max-w-7xl mx-auto px-6">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>

        {/* Title */}
        <div className="text-center mb-8 md:mb-16">
          <p className="text-purple-400 font-mono text-sm tracking-widest mb-2">
            {language === "en" ? "// WHERE I COMPETE" : "// যেখানে প্রতিযোগিতা করি"}
          </p>
          <h2 className="text-4xl font-bold gradient-text">
            {language === "en" ? "Competitive Programming" : "কম্পিটিটিভ প্রোগ্রামিং"}
          </h2>
          {lastUpdated && (
            <div className="flex items-center justify-center gap-2 mt-3">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-gray-500 text-xs">
                {language === "en" ? `Live data · Updated ${lastUpdated}` : `লাইভ ডেটা · আপডেট ${lastUpdated}`}
              </span>
              <button onClick={fetchData} className="text-purple-400 hover:text-purple-300 transition-colors">
                <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
              </button>
            </div>
          )}
        </div>

        {/* Live Stats Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">

          {/* Codeforces Card */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="glass rounded-2xl p-6 border border-blue-500/20">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center font-bold text-white">CF</div>
                <div>
                  <h3 className="font-bold text-white">Codeforces</h3>
                  <p className="text-gray-500 text-xs font-mono">@mdsakibhossen</p>
                </div>
              </div>
              <a href="https://codeforces.com/profile/mdsakibhossen" target="_blank" rel="noopener noreferrer">
                <ExternalLink size={16} className="text-gray-500 hover:text-blue-400 transition-colors" />
              </a>
            </div>

            {loading ? (
              <div className="space-y-3">
                {[1,2,3].map(i => <div key={i} className="h-6 bg-white/5 rounded-lg animate-pulse" />)}
              </div>
            ) : cf ? (
              <>
                <div className="grid grid-cols-3 gap-3 mb-5">
                  <div className="glass rounded-xl p-3 text-center">
                    <div className="text-2xl font-bold" style={{ color: rankColor[cf.rank] || "#a78bfa" }}>{cf.rating}</div>
                    <div className="text-gray-500 text-xs mt-1">{language === "en" ? "Rating" : "রেটিং"}</div>
                  </div>
                  <div className="glass rounded-xl p-3 text-center">
                    <div className="text-2xl font-bold text-yellow-400">{cf.maxRating}</div>
                    <div className="text-gray-500 text-xs mt-1">{language === "en" ? "Max" : "সর্বোচ্চ"}</div>
                  </div>
                  <div className="glass rounded-xl p-3 text-center">
                    <div className="text-2xl font-bold text-green-400">{cf.solved}</div>
                    <div className="text-gray-500 text-xs mt-1">{language === "en" ? "Solved" : "সমাধান"}</div>
                  </div>
                </div>

                <div className="mb-4">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: `${rankColor[cf.rank]}20`, color: rankColor[cf.rank] || "#a78bfa" }}>
                    {cf.rank.charAt(0).toUpperCase() + cf.rank.slice(1)}
                  </span>
                </div>

                {/* Recent contests */}
                {cf.recentContests.length > 0 && (
                  <div>
                    <p className="text-gray-500 text-xs font-mono mb-3">{language === "en" ? "Recent Contests" : "সাম্প্রতিক contest"}</p>
                    <div className="space-y-2">
                      {cf.recentContests.slice(0, 3).map((c, i) => (
                        <div key={i} className="flex items-center justify-between text-xs">
                          <span className="text-gray-400 truncate max-w-[60%]">{c.contestName}</span>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="text-gray-500">#{c.rank}</span>
                            <span className={`flex items-center gap-0.5 font-bold ${c.ratingChange > 0 ? "text-green-400" : c.ratingChange < 0 ? "text-red-400" : "text-gray-400"}`}>
                              {c.ratingChange > 0 ? <TrendingUp size={10} /> : c.ratingChange < 0 ? <TrendingDown size={10} /> : <Minus size={10} />}
                              {c.ratingChange > 0 ? "+" : ""}{c.ratingChange}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <p className="text-gray-500 text-sm text-center py-4">{language === "en" ? "Could not load data" : "ডেটা লোড হয়নি"}</p>
            )}
          </motion.div>

          {/* LeetCode Card */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="glass rounded-2xl p-6 border border-yellow-500/20">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-600 to-yellow-400 flex items-center justify-center font-bold text-white">LC</div>
                <div>
                  <h3 className="font-bold text-white">LeetCode</h3>
                  <p className="text-gray-500 text-xs font-mono">@mdsakib-dev</p>
                </div>
              </div>
              <a href="https://leetcode.com/u/mdsakib-dev/" target="_blank" rel="noopener noreferrer">
                <ExternalLink size={16} className="text-gray-500 hover:text-yellow-400 transition-colors" />
              </a>
            </div>

            {loading ? (
              <div className="space-y-3">
                {[1,2,3].map(i => <div key={i} className="h-6 bg-white/5 rounded-lg animate-pulse" />)}
              </div>
            ) : lc ? (
              <>
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="glass rounded-xl p-3 text-center col-span-2">
                    <div className="text-3xl font-bold text-yellow-400">{lc.total}</div>
                    <div className="text-gray-500 text-xs mt-1">{language === "en" ? "Total Solved" : "মোট সমাধান"}</div>
                  </div>
                </div>

                {/* Difficulty breakdown */}
                <div className="space-y-3 mb-5">
                  {[
                    { label: "Easy", count: lc.easy, color: "bg-green-400", textColor: "text-green-400", max: lc.total || 1 },
                    { label: "Medium", count: lc.medium, color: "bg-yellow-400", textColor: "text-yellow-400", max: lc.total || 1 },
                    { label: "Hard", count: lc.hard, color: "bg-red-400", textColor: "text-red-400", max: lc.total || 1 },
                  ].map(({ label, count, color, textColor, max }) => (
                    <div key={label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className={textColor}>{label}</span>
                        <span className="text-gray-400">{count}</span>
                      </div>
                      <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(count / max) * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1 }}
                          className={`h-full rounded-full ${color}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {lc.ranking > 0 && (
                  <div className="glass rounded-xl p-3 text-center">
                    <div className="text-lg font-bold text-purple-400">#{lc.ranking.toLocaleString()}</div>
                    <div className="text-gray-500 text-xs">{language === "en" ? "Global Ranking" : "গ্লোবাল র‍্যাংক"}</div>
                  </div>
                )}
              </>
            ) : (
              <p className="text-gray-500 text-sm text-center py-4">{language === "en" ? "Could not load data" : "ডেটা লোড হয়নি"}</p>
            )}
          </motion.div>
        </div>

        {/* Other platform cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {cpProfiles.filter(p => p.platform !== "Codeforces" && p.platform !== "LeetCode").map(({ platform, handle, url, color, bgColor, borderColor, icon }, i) => (
            <motion.a key={platform} href={url} target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.03, y: -4 }}
              className={`glass p-4 rounded-xl border ${borderColor} ${bgColor} group`}>
              <div className="flex items-center justify-between mb-3">
                <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center font-bold text-white text-sm`}>{icon}</div>
                <ExternalLink size={13} className="text-gray-500 group-hover:text-purple-400 transition-colors" />
              </div>
              <h3 className="text-white font-bold text-sm mb-0.5">{platform}</h3>
              <p className={`text-xs font-mono bg-gradient-to-r ${color} bg-clip-text text-transparent`}>@{handle}</p>
            </motion.a>
          ))}
        </div>

        {/* Goal */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          className="glass p-8 rounded-2xl text-center border border-purple-500/20">
          <div className="text-5xl mb-4">🏆</div>
          <h3 className="text-2xl font-bold gradient-text mb-2">{language === "en" ? "Ultimate Goal" : "চূড়ান্ত লক্ষ্য"}</h3>
          <p className="text-gray-400">
            {language === "en"
              ? "Achieve Codeforces Grandmaster rating and represent Bangladesh in ICPC World Finals"
              : "Codeforces গ্র্যান্ডমাস্টার রেটিং অর্জন করা এবং ICPC World Finals-এ বাংলাদেশকে প্রতিনিধিত্ব করা"}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

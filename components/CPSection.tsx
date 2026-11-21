"use client";

import { useEffect, useState } from "react";
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

const cpColors: Record<string, string> = {
  Codeforces: "#1f6feb",
  LeetCode: "#e5a00d",
  CodeChef: "#d97706",
  AtCoder: "#64748b",
  HackerRank: "#16a34a",
  VJudge: "#0891b2",
};

export default function CPSection() {
  const [cf, setCf] = useState<CFData | null>(null);
  const [lc, setLc] = useState<LCData | null>(null);
  const [loading, setLoading] = useState(true);

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
    } catch {
      /* silently fail */
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section id="cp">
      <div className="wrap">
        <div className="shead">
          <span className="tag">Competitive Programming</span>
          <h2>
            Where I <em>compete</em>
          </h2>
          <p className="sdesc">Live stats from competitive programming platforms.</p>
          <span className="livepill">
            <span className="d" /> Live · {loading ? "loading…" : "updated"}
          </span>
        </div>

        <div className="cpgrid">
          {/* Codeforces */}
          <div className="cpcard rv">
            <div className="h">
              <div className="l">
                <div className="logo" style={{ background: cpColors.Codeforces }}>CF</div>
                <div>
                  <h3>Codeforces</h3>
                  <div className="handle">@mdsakibhossen</div>
                </div>
              </div>
              <a className="ex" href="https://codeforces.com/profile/mdsakibhossen" target="_blank" rel="noopener noreferrer">↗</a>
            </div>
            {loading ? (
              <div className="skeleton" style={{ height: "120px" }} />
            ) : cf ? (
              <>
                <div className="stat3">
                  <div>
                    <div className="n" style={{ color: rankColor[cf.rank] || "#06b6d4" }}>{cf.rating}</div>
                    <div className="l">Rating</div>
                  </div>
                  <div>
                    <div className="n">{cf.maxRating}</div>
                    <div className="l">Max</div>
                  </div>
                  <div>
                    <div className="n" style={{ color: "#22c55e" }}>{cf.solved}</div>
                    <div className="l">Solved</div>
                  </div>
                </div>
                <div className="rankpill">
                  <span style={{ background: `${rankColor[cf.rank] ?? "#06b6d4"}1a`, color: rankColor[cf.rank] ?? "#06b6d4" }}>
                    {cf.rank}
                  </span>
                </div>
                {cf.recentContests.length > 0 && (
                  <div>
                    <div className="cpnote" style={{ textAlign: "center", marginBottom: "8px" }}>
                      RECENT CONTESTS
                    </div>
                    {cf.recentContests.slice(0, 3).map((c, i) => (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "4px" }}>
                        <span style={{ color: "var(--muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "60%" }}>
                          {c.contestName}
                        </span>
                        <span style={{ color: c.ratingChange > 0 ? "#22c55e" : c.ratingChange < 0 ? "#ef4444" : "var(--muted)" }}>
                          {c.ratingChange > 0 ? "+" : ""}{c.ratingChange}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <p className="cpnote">Could not load data</p>
            )}
          </div>

          {/* LeetCode */}
          <div className="cpcard rv">
            <div className="h">
              <div className="l">
                <div className="logo" style={{ background: cpColors.LeetCode }}>LC</div>
                <div>
                  <h3>LeetCode</h3>
                  <div className="handle">@mdsakib-dev</div>
                </div>
              </div>
              <a className="ex" href="https://leetcode.com/u/mdsakib-dev/" target="_blank" rel="noopener noreferrer">↗</a>
            </div>
            {loading ? (
              <div className="skeleton" style={{ height: "120px" }} />
            ) : lc ? (
              <>
                <div className="cpbig">
                  <div className="n" style={{ color: cpColors.LeetCode }}>{lc.total}</div>
                  <div className="l">Total Solved</div>
                </div>
                {(["Easy", "Medium", "Hard"] as const).map((label) => {
                  const count = label === "Easy" ? lc.easy : label === "Medium" ? lc.medium : lc.hard;
                  const color = label === "Easy" ? "#22c55e" : label === "Medium" ? "#f59e0b" : "#ef4444";
                  return (
                    <div className="cpbar" key={label}>
                      <div className="t">
                        <span style={{ color, fontWeight: 600 }}>{label}</span>
                        <span style={{ color: "var(--muted)" }}>{count}</span>
                      </div>
                      <div className="track">
                        <div className="fill" style={{ width: `${lc.total ? (count / lc.total) * 100 : 0}%`, background: color }} />
                      </div>
                    </div>
                  );
                })}
                {lc.ranking > 0 && (
                  <div className="cpbig" style={{ marginBottom: 0 }}>
                    <div className="n" style={{ color: "#06b6d4", fontSize: "1.3rem" }}>#{lc.ranking.toLocaleString()}</div>
                    <div className="l">Global Ranking</div>
                  </div>
                )}
              </>
            ) : (
              <p className="cpnote">Could not load data</p>
            )}
          </div>

          {/* CodeChef */}
          <div className="cpcard rv">
            <div className="h">
              <div className="l">
                <div className="logo" style={{ background: cpColors.CodeChef }}>CC</div>
                <div>
                  <h3>CodeChef</h3>
                  <div className="handle">@mdsakib_dev</div>
                </div>
              </div>
              <a className="ex" href="https://www.codechef.com/users/mdsakib_dev" target="_blank" rel="noopener noreferrer">↗</a>
            </div>
            <div className="cpbig">
              <div className="n" style={{ color: cpColors.CodeChef }}>1424</div>
              <div className="l">Current Rating</div>
            </div>
            <div className="stat2">
              <div>
                <div className="n" style={{ color: cpColors.CodeChef }}>Div 3</div>
                <div className="l">Division</div>
              </div>
              <div>
                <div className="n" style={{ color: cpColors.CodeChef }}>⭐⭐</div>
                <div className="l">Stars</div>
              </div>
              <div>
                <div className="n" style={{ color: "#06b6d4" }}>38,883</div>
                <div className="l">Global Rank</div>
              </div>
              <div>
                <div className="n" style={{ color: "#22c55e" }}>946</div>
                <div className="l">Country Rank</div>
              </div>
            </div>
            <div className="cpbig" style={{ marginBottom: 0 }}>
              <div className="n" style={{ fontSize: "1.2rem", color: cpColors.CodeChef }}>Highest: 1424</div>
              <div className="l">Best Rating</div>
            </div>
          </div>
        </div>

        {/* Other platforms */}
        <div className="smallgrid">
          {smallPlatforms.map(({ platform, handle, url, icon }) => (
            <a key={platform} href={url} target="_blank" rel="noopener noreferrer" className="splatform rv">
              <div className="ic">{icon}</div>
              <h3>{platform}</h3>
              <p>@{handle}</p>
            </a>
          ))}
        </div>

        {/* Goal banner */}
        <div className="goalbanner rv">
          <div className="em">🏆</div>
          <h3>Aiming for Grandmaster</h3>
          <p>
            My ultimate goal is to achieve Codeforces Grandmaster rating and represent Bangladesh
            in ICPC World Finals.
          </p>
        </div>
      </div>
    </section>
  );
}

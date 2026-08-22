import { NextResponse } from "next/server";

export async function GET() {
  try {
    const handle = "mdsakibhossen";

    const [userRes, ratingRes, statsRes] = await Promise.all([
      fetch(`https://codeforces.com/api/user.info?handles=${handle}`, { next: { revalidate: 300 } }),
      fetch(`https://codeforces.com/api/user.rating?handle=${handle}`, { next: { revalidate: 300 } }),
      fetch(`https://codeforces.com/api/user.status?handle=${handle}&count=1000`, { next: { revalidate: 300 } }),
    ]);

    const userData = await userRes.json();
    const ratingData = await ratingRes.json();
    const statsData = await statsRes.json();

    if (userData.status !== "OK") {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const user = userData.result[0];

    // Count solved problems (unique)
    const solvedSet = new Set<string>();
    if (statsData.status === "OK") {
      statsData.result.forEach((sub: any) => {
        if (sub.verdict === "OK") {
          solvedSet.add(`${sub.problem.contestId}-${sub.problem.index}`);
        }
      });
    }

    // Last 5 contests
    const recentContests = ratingData.status === "OK"
      ? ratingData.result.slice(-5).reverse().map((c: any) => ({
          contestName: c.contestName,
          rank: c.rank,
          ratingChange: c.newRating - c.oldRating,
          newRating: c.newRating,
        }))
      : [];

    return NextResponse.json({
      handle: user.handle,
      rating: user.rating || 0,
      maxRating: user.maxRating || 0,
      rank: user.rank || "unrated",
      maxRank: user.maxRank || "unrated",
      solved: solvedSet.size,
      recentContests,
      avatar: user.titlePhoto,
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

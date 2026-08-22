import { NextResponse } from "next/server";

export async function GET() {
  try {
    const handle = "mdsakib-dev";

    const query = `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          username
          profile { ranking }
          submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
            }
          }
        }
      }
    `;

    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables: { username: handle } }),
      next: { revalidate: 300 },
    });

    const data = await res.json();
    const user = data?.data?.matchedUser;

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const stats = user.submitStatsGlobal?.acSubmissionNum || [];
    const total = stats.find((s: any) => s.difficulty === "All")?.count || 0;
    const easy = stats.find((s: any) => s.difficulty === "Easy")?.count || 0;
    const medium = stats.find((s: any) => s.difficulty === "Medium")?.count || 0;
    const hard = stats.find((s: any) => s.difficulty === "Hard")?.count || 0;

    return NextResponse.json({
      handle,
      ranking: user.profile?.ranking || 0,
      total,
      easy,
      medium,
      hard,
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  if (cookieStore.get("admin_auth")?.value !== "true") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sb = getSupabaseAdmin();
  const [profile, projects, achievements, blog, skills] = await Promise.all([
    sb.from("profile").select("*"),
    sb.from("projects").select("*"),
    sb.from("achievements").select("*"),
    sb.from("blog_posts").select("*"),
    sb.from("skills").select("*"),
  ]);

  return NextResponse.json({
    exportDate: new Date().toISOString(),
    profile: profile.data,
    projects: projects.data,
    achievements: achievements.data,
    blogPosts: blog.data,
    skills: skills.data,
  });
}

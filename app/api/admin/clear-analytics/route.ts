import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { cookies } from "next/headers";

export async function DELETE(req: NextRequest) {
  // Check both cookie and Authorization header (for mobile)
  const cookieStore = await cookies();
  const cookieAuth = cookieStore.get("admin_auth")?.value === "true";
  const headerAuth = req.headers.get("x-admin-auth") === "true";

  if (!cookieAuth && !headerAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Delete all page views (keeping last 7 days)
    const { error } = await getSupabaseAdmin()
      .from("page_views")
      .delete()
      .lt("created_at", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

    if (error) {
      // If that fails, delete everything
      const { error: error2 } = await getSupabaseAdmin()
        .from("page_views")
        .delete()
        .neq("id", "00000000-0000-0000-0000-000000000000");

      if (error2) return NextResponse.json({ error: error2.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

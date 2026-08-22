import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

async function checkAuth() {
  const cookieStore = await cookies();
  return cookieStore.get("admin_auth")?.value === "true";
}

export async function PUT(req: NextRequest) {
  if (!await checkAuth()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { currentPassword, newEmail, newPassword } = await req.json();

  // Verify current password
  if (currentPassword !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Current password is incorrect!" }, { status: 401 });
  }

  if (!newEmail && !newPassword) {
    return NextResponse.json({ error: "Please provide new email or password" }, { status: 400 });
  }

  // Read current .env.local
  const envPath = join(process.cwd(), ".env.local");
  let envContent = readFileSync(envPath, "utf-8");

  if (newEmail) {
    envContent = envContent.replace(/ADMIN_EMAIL=.*/g, `ADMIN_EMAIL=${newEmail}`);
  }

  if (newPassword) {
    envContent = envContent.replace(/ADMIN_PASSWORD=.*/g, `ADMIN_PASSWORD=${newPassword}`);
  }

  // Write back
  writeFileSync(envPath, envContent, "utf-8");

  // Clear auth cookie — force re-login
  const cookieStore = await cookies();
  cookieStore.delete("admin_auth");

  return NextResponse.json({
    success: true,
    message: "Credentials updated! Please login again with new credentials.",
  });
}

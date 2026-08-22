import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    hasEmail: !!process.env.ADMIN_EMAIL,
    hasPassword: !!process.env.ADMIN_PASSWORD,
    emailLength: process.env.ADMIN_EMAIL?.length || 0,
    passwordLength: process.env.ADMIN_PASSWORD?.length || 0,
  });
}

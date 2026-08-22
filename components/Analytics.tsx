"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    // Don't track admin pages
    if (pathname.includes("sakib-cp-2035")) return;

    const track = async () => {
      const device = window.innerWidth < 768 ? "mobile" : window.innerWidth < 1024 ? "tablet" : "desktop";
      const referrer = document.referrer ? new URL(document.referrer).hostname : "direct";

      await supabase.from("page_views").insert({
        page: pathname,
        referrer,
        device,
        created_at: new Date().toISOString(),
      });
    };

    // Small delay to avoid tracking bots
    const timer = setTimeout(track, 2000);
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}

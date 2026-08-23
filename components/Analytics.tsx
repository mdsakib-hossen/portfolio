"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.includes("sakib-cp-2035")) return;

    const track = async () => {
      // Detect device using userAgent — more reliable than innerWidth
      const ua = navigator.userAgent.toLowerCase();
      let device = "desktop";
      if (/mobile|android|iphone|ipod|blackberry|windows phone/i.test(ua)) {
        device = "mobile";
      } else if (/ipad|tablet|playbook|silk/i.test(ua)) {
        device = "tablet";
      }

      const referrer = document.referrer
        ? (() => { try { return new URL(document.referrer).hostname; } catch { return "direct"; } })()
        : "direct";

      await supabase.from("page_views").insert({
        page: pathname,
        referrer,
        device,
        created_at: new Date().toISOString(),
      });
    };

    const timer = setTimeout(track, 2000);
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}

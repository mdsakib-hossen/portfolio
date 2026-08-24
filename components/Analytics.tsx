"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.includes("sakib-cp-2035")) return;

    const track = async () => {
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

      // Insert new view
      const { error } = await supabase.from("page_views").insert({
        page: pathname,
        referrer,
        device,
        created_at: new Date().toISOString(),
      });

      // Auto cleanup: ~2% chance per visit, delete data older than 60 days
      if (!error && Math.random() < 0.02) {
        const cutoff = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString();
        await supabase.from("page_views").delete().lt("created_at", cutoff);
      }
    };

    const timer = setTimeout(track, 2000);
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}

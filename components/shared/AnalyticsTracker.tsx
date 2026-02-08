"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Lightweight local analytics: one POST per route change.
    // No third-party scripts. Metadata only.
    const path = `${pathname}${searchParams?.toString() ? `?${searchParams}` : ""}`;
    void fetch("/api/analytics/pageview", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        path,
        referrer: document.referrer || null
      }),
      keepalive: true
    }).catch(() => {
      // Intentionally ignore.
    });
  }, [pathname, searchParams]);

  return null;
}


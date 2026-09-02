import { useState, useEffect, useRef } from "react";
import { useAppStore } from "@/stores/appStore";

interface LiveStats {
  adsBlocked: number;
  trackersKilled: number;
  dataSavedMB: number;
  timeSavedMin: number;
  requestsProcessed: number;
}

const BASE_STATS: LiveStats = {
  adsBlocked: 12847,
  trackersKilled: 7965,
  dataSavedMB: 514,
  timeSavedMin: 103,
  requestsProcessed: 48200,
};

export function useLiveStats() {
  const [stats, setStats] = useState<LiveStats>(BASE_STATS);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const enabled = useAppStore((s) => s.config.protectionEnabled);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    if (!enabled) return;

    intervalRef.current = setInterval(() => {
      setStats((prev) => {
        const newAds = prev.adsBlocked + Math.floor(Math.random() * 4) + 1;
        return {
          adsBlocked: newAds,
          trackersKilled: prev.trackersKilled + Math.floor(Math.random() * 2) + 1,
          dataSavedMB: Math.floor(newAds * 0.04),
          timeSavedMin: Math.floor(newAds * 0.008),
          requestsProcessed: prev.requestsProcessed + Math.floor(Math.random() * 12) + 3,
        };
      });
      setLastUpdated(new Date());
    }, 1200);

    return () => clearInterval(intervalRef.current);
  }, [enabled]);

  return { stats, lastUpdated };
}

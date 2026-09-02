import React, { useState, useEffect } from "react";
import GlassCard from "@/components/features/GlassCard";
import GlowOrb from "@/components/features/GlowOrb";
import { useTranslation } from "@/hooks/useTranslation";
import { INITIAL_ACTIVITY } from "@/constants";
import type { ActivityItem } from "@/types";
import { cn } from "@/lib/utils";
import { Shield, AlertTriangle, Bug, Zap } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const TYPE_CONFIG = {
  Ad: { color: "#3B6EFF", bg: "blue", icon: Shield, variant: "blue" as const },
  Tracker: { color: "#9B5CFF", bg: "violet", icon: Zap, variant: "violet" as const },
  Malware: { color: "#E0152A", bg: "crimson", icon: Bug, variant: "crimson" as const },
  Phishing: { color: "#FF4F8B", bg: "crimson", icon: AlertTriangle, variant: "crimson" as const },
  Cryptominer: { color: "#F59E0B", bg: "gold", icon: AlertTriangle, variant: "gold" as const },
};

const SEVERITY_BADGE: Record<string, string> = {
  low: "bg-blue-50 text-blue-700 border-blue-200",
  medium: "bg-amber-50 text-amber-700 border-amber-200",
  high: "bg-red-50 text-red-700 border-red-200",
};

export default function Activity() {
  const { t, isRTL } = useTranslation();
  const [items, setItems] = useState<ActivityItem[]>(INITIAL_ACTIVITY);
  const [filter, setFilter] = useState<string>("all");

  // Periodically add new activity items
  useEffect(() => {
    const sites = ["content-cdn.net", "tracker.io", "ad-network.com", "stats.js", "pixel.analytics.co"];
    const types: ActivityItem["type"][] = ["Ad", "Tracker", "Malware", "Ad", "Ad", "Tracker", "Phishing"];
    const severities: ActivityItem["severity"][] = ["low", "medium", "high", "low", "low", "medium", "high"];

    const id = setInterval(() => {
      const typeIndex = Math.floor(Math.random() * types.length);
      const newItem: ActivityItem = {
        id: `live-${Date.now()}`,
        type: types[typeIndex],
        site: sites[Math.floor(Math.random() * sites.length)],
        count: Math.floor(Math.random() * 20) + 1,
        timestamp: new Date(),
        severity: severities[typeIndex],
      };
      setItems((prev) => [newItem, ...prev.slice(0, 29)]);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  const filtered = filter === "all" ? items : items.filter((i) => i.type.toLowerCase() === filter);

  const totals = items.reduce(
    (acc, item) => {
      acc[item.type] = (acc[item.type] || 0) + item.count;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <div className={cn("relative min-h-screen bg-milk pb-24 lg:pb-8 overflow-hidden", isRTL && "rtl")}>
      <GlowOrb color="#3B6EFF" size={300} top={-80} right={-60} opacity={0.25} />
      <GlowOrb color="#9B5CFF" size={250} bottom={100} left={-40} opacity={0.22} />

      <div className="relative z-10 px-6 pt-8 max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-black gradient-text">{t.liveActivity}</h1>
          <p className="text-sm text-ink-soft mt-1 live-indicator">Real-time feed of everything PureShield blocked</p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {Object.entries(totals).map(([type, count]) => {
            const cfg = TYPE_CONFIG[type as keyof typeof TYPE_CONFIG];
            if (!cfg) return null;
            return (
              <GlassCard key={type} variant={cfg.variant} className="p-3 text-center">
                <div className="text-2xl font-black" style={{ color: cfg.color }}>
                  {count.toLocaleString()}
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-ink-mute mt-1">{type}s</div>
              </GlassCard>
            );
          })}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-5 overflow-x-auto pb-1 scrollbar-hide">
          {["all", "ad", "tracker", "malware", "phishing", "cryptominer"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide whitespace-nowrap transition-all border",
                filter === f
                  ? "bg-accent-blue text-white border-accent-blue shadow-glow-blue"
                  : "glass-card text-ink-soft border-white/60 hover:border-accent-blue/40"
              )}
            >
              {f === "all" ? "All" : f + "s"}
            </button>
          ))}
        </div>

        {/* Activity list */}
        <div className="flex flex-col gap-3">
          {filtered.map((item, i) => {
            const cfg = TYPE_CONFIG[item.type] || TYPE_CONFIG.Ad;
            const Icon = cfg.icon;
            const isNew = i === 0;
            return (
              <GlassCard
                key={item.id}
                variant={cfg.variant}
                className={cn("p-4 transition-all", isNew && "animate-slide-up")}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: cfg.color + "15", border: `1px solid ${cfg.color}30` }}
                  >
                    <Icon size={16} style={{ color: cfg.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm text-ink truncate">{item.site}</div>
                    <div className="text-xs text-ink-mute mt-0.5">
                      {item.type} • {formatDistanceToNow(item.timestamp, { addSuffix: true })}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                    <span className="text-lg font-black" style={{ color: cfg.color }}>
                      -{item.count}
                    </span>
                    <span className={cn("text-[9px] font-bold uppercase px-1.5 py-0.5 rounded border", SEVERITY_BADGE[item.severity])}>
                      {item.severity}
                    </span>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </div>
  );
}

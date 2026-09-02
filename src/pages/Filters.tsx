import React, { useState } from "react";
import GlassCard from "@/components/features/GlassCard";
import GlowOrb from "@/components/features/GlowOrb";
import { useAppStore } from "@/stores/appStore";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";
import { Shield, Eye, Lock, Users } from "lucide-react";

const CATEGORY_CONFIG = {
  ads: { icon: Shield, label: "Ads & Spam", variant: "blue" as const, accent: "#3B6EFF" },
  privacy: { icon: Eye, label: "Privacy", variant: "violet" as const, accent: "#9B5CFF" },
  security: { icon: Lock, label: "Security", variant: "crimson" as const, accent: "#E0152A" },
  social: { icon: Users, label: "Social", variant: "emerald" as const, accent: "#00B87A" },
};

export default function Filters() {
  const { config, toggleFilter } = useAppStore();
  const { t, isRTL } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filtered =
    activeCategory === "all"
      ? config.filters
      : config.filters.filter((f) => f.category === activeCategory);

  const enabledCount = config.filters.filter((f) => f.enabled).length;

  return (
    <div className={cn("relative min-h-screen bg-milk pb-24 lg:pb-8 overflow-hidden", isRTL && "rtl")}>
      <GlowOrb color="#9B5CFF" size={350} top={-100} right={-80} opacity={0.25} />
      <GlowOrb color="#00B87A" size={280} bottom={100} left={-40} opacity={0.22} />

      <div className="relative z-10 px-6 pt-8 max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-black gradient-text">{t.broadSpectrumFilters}</h1>
          <p className="text-sm text-ink-soft mt-1">
            {enabledCount} of {config.filters.length} filters active
          </p>
        </div>

        {/* Category summary cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {Object.entries(CATEGORY_CONFIG).map(([key, cfg]) => {
            const Icon = cfg.icon;
            const count = config.filters.filter((f) => f.category === key && f.enabled).length;
            const total = config.filters.filter((f) => f.category === key).length;
            return (
              <GlassCard
                key={key}
                variant={cfg.variant}
                hover
                onClick={() => setActiveCategory(activeCategory === key ? "all" : key)}
                className={cn("p-3 cursor-pointer", activeCategory === key && "ring-2", `ring-[${cfg.accent}]`)}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon size={14} style={{ color: cfg.accent }} />
                  <span className="text-xs font-bold text-ink">{cfg.label}</span>
                </div>
                <div className="text-2xl font-black" style={{ color: cfg.accent }}>
                  {count}/{total}
                </div>
              </GlassCard>
            );
          })}
        </div>

        {/* Category filter pills */}
        <div className="flex gap-2 mb-5 overflow-x-auto pb-1 scrollbar-hide">
          {["all", "ads", "privacy", "security", "social"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide whitespace-nowrap transition-all border",
                activeCategory === cat
                  ? "bg-accent-violet text-white border-accent-violet shadow-glow-violet"
                  : "glass-card text-ink-soft border-white/60 hover:border-accent-violet/40"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filter toggles */}
        <div className="flex flex-col gap-3">
          {filtered.map((filter) => {
            const catCfg = CATEGORY_CONFIG[filter.category as keyof typeof CATEGORY_CONFIG];
            return (
              <GlassCard
                key={filter.key}
                variant={filter.enabled ? catCfg?.variant || "default" : "default"}
                className="p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0 transition-all duration-300"
                      style={{
                        background: filter.enabled ? filter.color : "#CBD5E1",
                        boxShadow: filter.enabled ? `0 0 8px ${filter.color}80` : "none",
                      }}
                    />
                    <div className="min-w-0">
                      <div className="font-bold text-sm text-ink">{filter.label}</div>
                      <div className="text-xs text-ink-mute mt-0.5 truncate">{filter.description}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleFilter(filter.key)}
                    className={cn(
                      "relative w-11 h-6 rounded-full transition-all duration-300 flex-shrink-0 focus:outline-none",
                      filter.enabled
                        ? "shadow-sm"
                        : "bg-gray-200"
                    )}
                    style={filter.enabled ? { background: `linear-gradient(135deg, ${filter.color}, ${filter.color}BB)` } : {}}
                  >
                    <span
                      className={cn(
                        "absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300",
                        filter.enabled && "translate-x-5"
                      )}
                    />
                  </button>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </div>
  );
}

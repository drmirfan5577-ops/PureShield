import React from "react";
import GlassCard from "@/components/features/GlassCard";
import GlowOrb from "@/components/features/GlowOrb";
import { useAppStore } from "@/stores/appStore";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";
import { ChevronRight, Zap, Globe, RefreshCw, Shield, Database, Info } from "lucide-react";

export default function Settings() {
  const { config, setAutoSync } = useAppStore();
  const { t, isRTL } = useTranslation();

  const settingRows = [
    { icon: Zap, label: "Auto-start on boot", value: "On", color: "#3B6EFF" },
    { icon: Globe, label: "DNS-over-HTTPS", value: "Cloudflare", color: "#9B5CFF" },
    { icon: Shield, label: "Blocklist version", value: "v2026.09.02", color: "#00B87A" },
    { icon: RefreshCw, label: "Update frequency", value: "Every 6h", color: "#F59E0B" },
    { icon: Database, label: "Privacy mode", value: "Maximum", color: "#E0152A" },
    { icon: Info, label: "About PureShield", value: "v1.0.0", color: "#6366F1" },
  ];

  return (
    <div className={cn("relative min-h-screen bg-milk pb-24 lg:pb-8 overflow-hidden", isRTL && "rtl")}>
      <GlowOrb color="#F59E0B" size={300} top={-80} right={-60} opacity={0.2} />
      <GlowOrb color="#3B6EFF" size={250} bottom={150} left={-40} opacity={0.2} />

      <div className="relative z-10 px-6 pt-8 max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-black gradient-text">{t.settings}</h1>
          <p className="text-sm text-ink-soft mt-1">Fine-tune your shield</p>
        </div>

        {/* Auto-sync toggle */}
        <GlassCard variant="blue" className="p-4 mb-4" glow>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold text-sm text-ink">Auto-Save & Auto-Sync</div>
              <div className="text-xs text-ink-mute mt-0.5">Sync settings across sessions automatically</div>
            </div>
            <button
              onClick={() => setAutoSync(!config.autoSync)}
              className={cn(
                "relative w-11 h-6 rounded-full transition-all duration-300 focus:outline-none",
                config.autoSync
                  ? "bg-gradient-to-r from-accent-blue to-accent-violet shadow-glow-blue"
                  : "bg-gray-200"
              )}
            >
              <span
                className={cn(
                  "absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300",
                  config.autoSync && "translate-x-5"
                )}
              />
            </button>
          </div>
        </GlassCard>

        {/* Settings list */}
        <div className="flex flex-col gap-3 mb-6">
          {settingRows.map((row) => {
            const Icon = row.icon;
            return (
              <button
                key={row.label}
                className="w-full text-left"
              >
                <GlassCard hover className="p-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: row.color + "15", border: `1px solid ${row.color}30` }}
                    >
                      <Icon size={14} style={{ color: row.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm text-ink">{row.label}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold" style={{ color: row.color }}>{row.value}</span>
                      <ChevronRight size={14} className="text-ink-mute" />
                    </div>
                  </div>
                </GlassCard>
              </button>
            );
          })}
        </div>

        {/* Version info */}
        <GlassCard variant="violet" className="p-4 text-center">
          <div className="text-xs font-bold uppercase tracking-widest text-ink-mute mb-1">PureShield</div>
          <div className="text-2xl font-black gradient-text">v1.0.0</div>
          <div className="text-xs text-ink-mute mt-1">Blocklist: v2026.09.02 • Updated 2h ago</div>
          <div className="mt-3 flex justify-center gap-3">
            <span className="px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
              ✓ All systems nominal
            </span>
            <span className="px-2 py-1 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-200">
              ✓ Blocklist current
            </span>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

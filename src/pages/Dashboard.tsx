import React from "react";
import GlassCard from "@/components/features/GlassCard";
import GlowOrb from "@/components/features/GlowOrb";
import LiveStat from "@/components/features/LiveStat";
import ShieldLogo from "@/components/features/ShieldLogo";
import LiveTicker from "@/components/features/LiveTicker";
import { useAppStore } from "@/stores/appStore";
import { useTranslation } from "@/hooks/useTranslation";
import { useLiveStats } from "@/hooks/useLiveStats";
import { LAUNCHERS } from "@/constants";
import { cn } from "@/lib/utils";
import { Zap, Globe, Lock, TrendingUp, ChevronRight } from "lucide-react";

const TICKER_ITEMS = [
  "12,847+ Ads Blocked Today",
  "7,965 Trackers Eliminated",
  "99.97% Performance Index",
  "0.3ms Average Latency",
  "142 Countries Protected",
  "AES-256 Encryption Active",
  "Zero-Log Policy Enforced",
  "Auto-Sync Enabled",
];

export default function Dashboard() {
  const { config, toggleProtection } = useAppStore();
  const { t, isRTL } = useTranslation();
  const { stats } = useLiveStats();
  const launcher = LAUNCHERS.find((l) => l.id === config.launcherId) || LAUNCHERS[0];

  return (
    <div
      className={cn("relative min-h-screen bg-milk overflow-hidden pb-24 lg:pb-8", isRTL && "rtl")}
      style={{ background: `linear-gradient(135deg, ${launcher.primaryGradient[0]}, ${launcher.primaryGradient[1]})` }}
    >
      {/* Ambient orbs */}
      <GlowOrb color="#7C9CFF" size={400} top={-100} left={-100} opacity={0.35} />
      <GlowOrb color="#B794FF" size={300} top={150} right={-80} opacity={0.3} delay={1} />
      <GlowOrb color="#6EE7D9" size={260} bottom={200} left={80} opacity={0.28} delay={2} />
      {config.launcherId === "emerald" && <GlowOrb color="#00D4BE" size={350} top={50} right={50} opacity={0.32} delay={0.5} />}
      {config.launcherId === "crimson" && <GlowOrb color="#FF4F8B" size={350} top={-50} right={-50} opacity={0.28} delay={0.5} />}

      {/* Live Ticker */}
      <LiveTicker items={TICKER_ITEMS} />

      {/* Hero Section */}
      <div className="relative z-10 px-6 pt-8 lg:pt-10 max-w-5xl mx-auto">
        <div className="flex items-start gap-4 mb-6">
          <ShieldLogo size={60} animate />
          <div>
            <h1 className={cn("text-4xl lg:text-5xl font-black tracking-tight leading-none gradient-text")}>
              {config.customTitle}
            </h1>
            <p className="text-ink-mute text-sm mt-1 tracking-wide">{config.customTagline}</p>
          </div>
        </div>

        {/* Status headline */}
        <div className="mb-6">
          <h2 className="text-2xl lg:text-3xl font-black text-ink">
            {t.shieldActive.replace("ACTIVE", "").replace("PAUSED", "").trim()}{" "}
            <span
              className={cn(
                "font-black",
                config.protectionEnabled ? "glow-text-emerald" : "glow-text-crimson"
              )}
            >
              {config.protectionEnabled ? "ACTIVE" : "PAUSED"}
            </span>
          </h2>
          <p className="text-ink-soft text-sm mt-1 max-w-lg">
            Blocking ads, trackers & malware in real-time across every surface.
          </p>
        </div>

        {/* Master Toggle Card */}
        <GlassCard
          variant={config.protectionEnabled ? "emerald" : "crimson"}
          glow
          className="mb-6 p-5"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold text-ink text-base">{t.protectionEngine}</div>
              <div className="live-indicator text-xs text-ink-soft mt-1">
                {config.protectionEnabled ? "24/7 live • 0.3ms latency" : "Protection disabled"}
              </div>
            </div>
            <button
              onClick={toggleProtection}
              className={cn(
                "relative w-14 h-7 rounded-full transition-all duration-300 focus:outline-none",
                config.protectionEnabled
                  ? "bg-gradient-to-r from-accent-emerald to-accent-mint shadow-glow-emerald"
                  : "bg-gradient-to-r from-red-300 to-pink-300"
              )}
            >
              <span
                className={cn(
                  "absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300",
                  config.protectionEnabled && "translate-x-7"
                )}
              />
            </button>
          </div>
        </GlassCard>

        {/* Live Stats Grid */}
        {config.statsVisible && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <GlassCard variant="blue" className="p-4">
              <LiveStat
                label={t.adsBlocked}
                value={stats.adsBlocked}
                accentClass="glow-text-blue"
                glowClass="bg-accent-blue"
              />
            </GlassCard>
            <GlassCard variant="violet" className="p-4">
              <LiveStat
                label={t.trackersKilled}
                value={stats.trackersKilled}
                accentClass="glow-text-violet"
                glowClass="bg-accent-violet"
              />
            </GlassCard>
            <GlassCard variant="emerald" className="p-4">
              <LiveStat
                label={t.dataSaved}
                value={stats.dataSavedMB}
                suffix=" MB"
                accentClass="glow-text-emerald"
                glowClass="bg-accent-emerald"
              />
            </GlassCard>
            <GlassCard variant="gold" className="p-4">
              <LiveStat
                label={t.timeSaved}
                value={stats.timeSavedMin}
                suffix=" min"
                accentClass="text-amber-600"
                glowClass="bg-accent-gold"
              />
            </GlassCard>
          </div>
        )}

        {/* Performance Bar */}
        <GlassCard className="p-5 mb-6" glow>
          <div className="flex items-baseline justify-between mb-3">
            <span className="text-sm font-bold text-ink">{t.performanceIndex}</span>
            <span className="text-3xl font-black glow-text-blue">99.97</span>
          </div>
          <div className="relative h-2.5 bg-milk-deep rounded-full overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: "99.97%",
                background: "linear-gradient(90deg, #3B6EFF, #9B5CFF, #00D4BE)",
                boxShadow: "0 0 12px rgba(59,110,255,0.5)",
              }}
            />
          </div>
          <div className="flex justify-between mt-3 flex-wrap gap-2">
            <span className="flex items-center gap-1.5 text-xs text-ink-soft font-medium">
              <Zap size={11} className="text-accent-gold" /> 0.3ms avg
            </span>
            <span className="flex items-center gap-1.5 text-xs text-ink-soft font-medium">
              <Globe size={11} className="text-accent-blue" /> 142 countries
            </span>
            <span className="flex items-center gap-1.5 text-xs text-ink-soft font-medium">
              <Lock size={11} className="text-accent-emerald" /> AES-256
            </span>
            <span className="flex items-center gap-1.5 text-xs text-ink-soft font-medium">
              <TrendingUp size={11} className="text-accent-violet" /> 99.99% uptime
            </span>
          </div>
        </GlassCard>

        {/* Active Filters Summary */}
        <GlassCard className="p-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-bold text-ink">Active Filters</span>
            <button
              onClick={() => window.location.pathname !== "/filters" && (window.location.href = "/filters")}
              className="flex items-center gap-1 text-xs text-accent-blue font-semibold hover:underline"
            >
              Manage <ChevronRight size={12} />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {config.filters.filter((f) => f.enabled).map((f) => (
              <span
                key={f.key}
                className="px-2.5 py-1 rounded-full text-[11px] font-bold border"
                style={{
                  color: f.color,
                  borderColor: f.color + "44",
                  background: f.color + "12",
                }}
              >
                {f.label}
              </span>
            ))}
          </div>
        </GlassCard>

        {/* Requests processed */}
        <GlassCard variant="violet" className="p-5" glow>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-ink-mute mb-1">Total Requests Processed</div>
              <div className="text-3xl font-black glow-text-violet">
                {stats.requestsProcessed.toLocaleString()}
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-ink-mute mb-1">Session</div>
              <div className="w-16 h-16 rounded-full border-4 border-violet-200 flex items-center justify-center">
                <span className="text-xs font-black text-accent-violet">LIVE</span>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

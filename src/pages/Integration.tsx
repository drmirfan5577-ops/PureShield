import React, { useState } from "react";
import GlassCard from "@/components/features/GlassCard";
import GlowOrb from "@/components/features/GlowOrb";
import { useTranslation } from "@/hooks/useTranslation";
import { INTEGRATION_PLATFORMS } from "@/constants";
import type { IntegrationPlatform } from "@/types";
import { cn } from "@/lib/utils";
import { ExternalLink, CheckCircle2, Plus } from "lucide-react";

const CATEGORIES = ["All", "Hosting & Deploy", "Domain & Hosting", "Backend as a Service", "CDN & Security", "AI Assistant", "AI Search", "AI Agent", "Mobile Dev", "Email Service", "Version Control", "Static Hosting", "AI Platform"];

export default function Integration() {
  const { t, isRTL } = useTranslation();
  const [platforms, setPlatforms] = useState<IntegrationPlatform[]>(INTEGRATION_PLATFORMS);
  const [activeCategory, setActiveCategory] = useState("All");
  const [toast, setToast] = useState<string | null>(null);

  const filtered =
    activeCategory === "All"
      ? platforms
      : platforms.filter((p) => p.category === activeCategory);

  const connectedCount = platforms.filter((p) => p.connected).length;

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleConnect = (platform: IntegrationPlatform) => {
    if (platform.connected) {
      setPlatforms((prev) =>
        prev.map((p) => (p.id === platform.id ? { ...p, connected: false } : p))
      );
      showToast(`${platform.name} disconnected`);
    } else {
      window.open(platform.url, "_blank", "noopener noreferrer");
      setPlatforms((prev) =>
        prev.map((p) => (p.id === platform.id ? { ...p, connected: true } : p))
      );
      showToast(`${platform.name} connected successfully!`);
    }
  };

  const uniqueCategories = ["All", ...Array.from(new Set(INTEGRATION_PLATFORMS.map((p) => p.category)))];

  return (
    <div className={cn("relative min-h-screen bg-milk pb-24 lg:pb-8 overflow-hidden", isRTL && "rtl")}>
      <GlowOrb color="#00D4BE" size={350} top={-100} right={-80} opacity={0.25} />
      <GlowOrb color="#3B6EFF" size={280} bottom={100} left={-40} opacity={0.22} />

      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 glass-card-emerald px-4 py-3 rounded-xl shadow-glow-emerald text-sm font-bold text-emerald-700 animate-slide-up flex items-center gap-2">
          <CheckCircle2 size={14} />
          {toast}
        </div>
      )}

      <div className="relative z-10 px-6 pt-8 max-w-5xl mx-auto">
        <div className="mb-2">
          <h1 className="text-3xl font-black gradient-text">{t.integration}</h1>
          <p className="text-sm text-ink-soft mt-1">
            {connectedCount} platform{connectedCount !== 1 ? "s" : ""} connected • One-click access to all your services
          </p>
        </div>

        {/* Connected summary */}
        <div className="grid grid-cols-3 gap-3 my-5">
          <GlassCard variant="emerald" className="p-3 text-center">
            <div className="text-2xl font-black glow-text-emerald">{connectedCount}</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-ink-mute">Connected</div>
          </GlassCard>
          <GlassCard variant="blue" className="p-3 text-center">
            <div className="text-2xl font-black glow-text-blue">{platforms.length}</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-ink-mute">Total</div>
          </GlassCard>
          <GlassCard variant="violet" className="p-3 text-center">
            <div className="text-2xl font-black glow-text-violet">{uniqueCategories.length - 1}</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-ink-mute">Categories</div>
          </GlassCard>
        </div>

        {/* Category filter */}
        <div className="flex gap-2 mb-5 overflow-x-auto pb-2 scrollbar-hide">
          {uniqueCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border",
                activeCategory === cat
                  ? "bg-accent-mint text-white border-accent-mint shadow-glow-mint"
                  : "glass-card text-ink-soft border-white/60 hover:border-accent-mint/40"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Platform grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((platform) => (
            <GlassCard
              key={platform.id}
              hover
              className={cn("p-4", platform.connected && "ring-1 ring-emerald-300")}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center text-lg",
                      `bg-gradient-to-br ${platform.gradient}`
                    )}
                    style={{ border: `1px solid ${platform.color}22` }}
                  >
                    {platform.icon}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-ink">{platform.name}</div>
                    <div className="text-[10px] font-semibold uppercase tracking-wide text-ink-mute">{platform.category}</div>
                  </div>
                </div>
                {platform.connected && (
                  <CheckCircle2 size={16} className="text-accent-emerald flex-shrink-0 mt-0.5" />
                )}
              </div>

              <p className="text-xs text-ink-mute mb-4 leading-relaxed">{platform.description}</p>

              <div className="flex gap-2">
                <button
                  onClick={() => handleConnect(platform)}
                  className={cn(
                    "flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5",
                    platform.connected
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                      : "text-white shadow-sm hover:shadow-md"
                  )}
                  style={
                    !platform.connected
                      ? { background: `linear-gradient(135deg, ${platform.color}, ${platform.color}BB)` }
                      : {}
                  }
                >
                  {platform.connected ? (
                    <>
                      <CheckCircle2 size={11} />
                      Connected
                    </>
                  ) : (
                    <>
                      <Plus size={11} />
                      Connect
                    </>
                  )}
                </button>
                <a
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-lg glass-card border border-white/60 text-ink-mute hover:text-accent-blue transition-colors"
                >
                  <ExternalLink size={13} />
                </a>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}

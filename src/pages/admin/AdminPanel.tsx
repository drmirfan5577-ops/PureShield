import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GlassCard from "@/components/features/GlassCard";
import GlowOrb from "@/components/features/GlowOrb";
import ShieldLogo from "@/components/features/ShieldLogo";
import { useAdminStore } from "@/stores/adminStore";
import { useAppStore } from "@/stores/appStore";
import { LAUNCHERS, INTEGRATION_PLATFORMS } from "@/constants";
import type { AdminTab, Language, LauncherId } from "@/types";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, Palette, Layers, Filter, Plug, Globe, Lock, LogOut, Save, RotateCcw, CheckCircle2
} from "lucide-react";

const ADMIN_TABS: { id: AdminTab; label: string; icon: React.ElementType }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "launchers", label: "Launchers", icon: Layers },
  { id: "filters", label: "Filters", icon: Filter },
  { id: "integrations", label: "Integrations", icon: Plug },
  { id: "language", label: "Language", icon: Globe },
  { id: "security", label: "Security", icon: Lock },
];

export default function AdminPanel() {
  const navigate = useNavigate();
  const { logout } = useAdminStore();
  const {
    config,
    setLanguage,
    setLauncher,
    setCustomTitle,
    setCustomTagline,
    setAutoSync,
    setStatsVisible,
    setActivityFeedEnabled,
    reset,
  } = useAppStore();

  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [saved, setSaved] = useState(false);
  const [localTitle, setLocalTitle] = useState(config.customTitle);
  const [localTagline, setLocalTagline] = useState(config.customTagline);

  const handleSave = () => {
    setCustomTitle(localTitle);
    setCustomTagline(localTagline);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleLogout = () => {
    logout();
    navigate("/admin");
  };

  return (
    <div className="relative min-h-screen bg-milk overflow-hidden pb-8">
      <GlowOrb color="#9B5CFF" size={350} top={-80} left={-80} opacity={0.22} />
      <GlowOrb color="#3B6EFF" size={280} bottom={100} right={-60} opacity={0.2} />

      {/* Save toast */}
      {saved && (
        <div className="fixed top-4 right-4 z-50 glass-card-emerald px-4 py-3 rounded-xl shadow-glow-emerald text-sm font-bold text-emerald-700 animate-slide-up flex items-center gap-2">
          <CheckCircle2 size={14} /> Saved successfully
        </div>
      )}

      <div className="relative z-10 flex min-h-screen">
        {/* Admin Sidebar */}
        <aside className="w-[200px] min-h-screen flex-shrink-0 glass-card border-r border-white/60 pt-6 pb-8 px-3 flex flex-col">
          <div className="flex items-center gap-2 px-2 mb-6">
            <ShieldLogo size={32} />
            <div>
              <div className="text-xs font-black gradient-text">Admin Panel</div>
              <div className="text-[9px] text-ink-mute">Full Control</div>
            </div>
          </div>

          <nav className="flex flex-col gap-1 flex-1">
            {ADMIN_TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all text-left",
                  activeTab === id
                    ? "bg-violet-50 text-accent-violet border border-violet-200 font-semibold"
                    : "text-ink-soft hover:bg-white/60"
                )}
              >
                <Icon size={13} />
                {label}
              </button>
            ))}
          </nav>

          <div className="flex flex-col gap-2 mt-4">
            <button
              onClick={handleSave}
              className="flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold text-white"
              style={{ background: "linear-gradient(135deg, #3B6EFF, #9B5CFF)" }}
            >
              <Save size={12} /> Save All
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium text-ink-soft glass-card border border-white/60 hover:text-red-600 transition-colors"
            >
              <LogOut size={12} /> Logout
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 px-6 pt-6 overflow-y-auto max-h-screen">
          {/* Overview */}
          {activeTab === "overview" && (
            <div>
              <h2 className="text-2xl font-black gradient-text mb-2">Admin Overview</h2>
              <p className="text-sm text-ink-mute mb-6">Full command & control of PureShield</p>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <GlassCard variant="blue" className="p-4 text-center">
                  <div className="text-3xl font-black glow-text-blue">
                    {config.filters.filter((f) => f.enabled).length}
                  </div>
                  <div className="text-xs text-ink-mute mt-1 font-bold uppercase tracking-widest">Active Filters</div>
                </GlassCard>
                <GlassCard variant="emerald" className="p-4 text-center">
                  <div className="text-3xl font-black glow-text-emerald">
                    {config.protectionEnabled ? "ON" : "OFF"}
                  </div>
                  <div className="text-xs text-ink-mute mt-1 font-bold uppercase tracking-widest">Protection</div>
                </GlassCard>
                <GlassCard variant="violet" className="p-4 text-center">
                  <div className="text-2xl font-black glow-text-violet uppercase">
                    {config.language.toUpperCase()}
                  </div>
                  <div className="text-xs text-ink-mute mt-1 font-bold uppercase tracking-widest">Language</div>
                </GlassCard>
              </div>

              <GlassCard className="p-4 mb-4">
                <div className="font-bold text-sm text-ink mb-3">Quick Toggles</div>
                {[
                  { label: "Stats Visible", value: config.statsVisible, fn: setStatsVisible },
                  { label: "Activity Feed", value: config.activityFeedEnabled, fn: setActivityFeedEnabled },
                  { label: "Auto-Sync", value: config.autoSync, fn: setAutoSync },
                ].map(({ label, value, fn }) => (
                  <div key={label} className="flex items-center justify-between py-2 border-b border-white/40 last:border-0">
                    <span className="text-sm font-medium text-ink-soft">{label}</span>
                    <button
                      onClick={() => fn(!value)}
                      className={cn(
                        "relative w-10 h-5 rounded-full transition-all",
                        value ? "bg-gradient-to-r from-accent-blue to-accent-violet" : "bg-gray-200"
                      )}
                    >
                      <span className={cn("absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform", value && "translate-x-5")} />
                    </button>
                  </div>
                ))}
              </GlassCard>

              <button
                onClick={() => { reset(); setSaved(true); setTimeout(() => setSaved(false), 2500); }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-red-600 glass-card-crimson border border-red-200 hover:shadow-glow-crimson transition-all"
              >
                <RotateCcw size={13} /> Reset to Defaults
              </button>
            </div>
          )}

          {/* Appearance */}
          {activeTab === "appearance" && (
            <div>
              <h2 className="text-2xl font-black gradient-text mb-2">Appearance</h2>
              <p className="text-sm text-ink-mute mb-6">Customize app title, tagline & branding</p>

              <GlassCard className="p-5 mb-4">
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-ink-mute mb-2">
                      App Title
                    </label>
                    <input
                      value={localTitle}
                      onChange={(e) => setLocalTitle(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl text-sm font-medium text-ink bg-white/80 border border-white/80 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-ink-mute mb-2">
                      Tagline
                    </label>
                    <input
                      value={localTagline}
                      onChange={(e) => setLocalTagline(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl text-sm font-medium text-ink bg-white/80 border border-white/80 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                  </div>
                  <button
                    onClick={handleSave}
                    className="py-2.5 rounded-xl text-sm font-bold text-white"
                    style={{ background: "linear-gradient(135deg, #3B6EFF, #9B5CFF)" }}
                  >
                    Save Appearance
                  </button>
                </div>
              </GlassCard>
            </div>
          )}

          {/* Launchers */}
          {activeTab === "launchers" && (
            <div>
              <h2 className="text-2xl font-black gradient-text mb-2">Launcher Themes</h2>
              <p className="text-sm text-ink-mute mb-6">
                5 premium launcher themes. Select to apply instantly.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {LAUNCHERS.map((launcher) => (
                  <GlassCard
                    key={launcher.id}
                    hover
                    onClick={() => setLauncher(launcher.id as LauncherId)}
                    className={cn(
                      "p-4 cursor-pointer transition-all",
                      config.launcherId === launcher.id && "ring-2 ring-accent-blue"
                    )}
                  >
                    {/* Preview gradient bar */}
                    <div
                      className="h-12 rounded-xl mb-3 flex items-center justify-center text-xs font-bold text-white/80"
                      style={{
                        background: `linear-gradient(135deg, ${launcher.primaryGradient[0]}, ${launcher.primaryGradient[1]})`,
                        border: `1px solid ${launcher.accentColor}30`,
                        boxShadow: `0 4px 20px ${launcher.accentColor}25`,
                      }}
                    >
                      <span style={{ color: launcher.accentColor, fontWeight: 900 }}>{launcher.name}</span>
                    </div>
                    <div className="font-bold text-sm text-ink">{launcher.name}</div>
                    <div className="text-xs text-ink-mute mt-0.5">{launcher.description}</div>
                    {config.launcherId === launcher.id && (
                      <div className="flex items-center gap-1 mt-2 text-xs font-bold text-accent-emerald">
                        <CheckCircle2 size={12} /> Active
                      </div>
                    )}
                  </GlassCard>
                ))}
              </div>
            </div>
          )}

          {/* Filters */}
          {activeTab === "filters" && (
            <div>
              <h2 className="text-2xl font-black gradient-text mb-2">Filter Management</h2>
              <p className="text-sm text-ink-mute mb-6">Admin-level control over all protection filters</p>
              <div className="flex flex-col gap-3">
                {config.filters.map((filter) => (
                  <GlassCard key={filter.key} className="p-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ background: filter.enabled ? filter.color : "#CBD5E1" }}
                      />
                      <div className="flex-1">
                        <div className="font-bold text-sm text-ink">{filter.label}</div>
                        <div className="text-xs text-ink-mute">{filter.description}</div>
                      </div>
                      <span
                        className={cn(
                          "text-xs font-bold px-2 py-0.5 rounded-full border",
                          filter.enabled
                            ? "text-emerald-700 bg-emerald-50 border-emerald-200"
                            : "text-gray-500 bg-gray-50 border-gray-200"
                        )}
                      >
                        {filter.enabled ? "Active" : "Off"}
                      </span>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          )}

          {/* Integrations */}
          {activeTab === "integrations" && (
            <div>
              <h2 className="text-2xl font-black gradient-text mb-2">Integration Manager</h2>
              <p className="text-sm text-ink-mute mb-6">Admin control over all platform integrations</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {INTEGRATION_PLATFORMS.map((p) => (
                  <GlassCard key={p.id} className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="text-xl">{p.icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-sm text-ink">{p.name}</div>
                        <div className="text-xs text-ink-mute truncate">{p.category}</div>
                      </div>
                      <span
                        className={cn(
                          "text-[10px] font-bold px-1.5 py-0.5 rounded-full border flex-shrink-0",
                          p.connected
                            ? "text-emerald-700 bg-emerald-50 border-emerald-200"
                            : "text-gray-400 bg-gray-50 border-gray-200"
                        )}
                      >
                        {p.connected ? "ON" : "OFF"}
                      </span>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          )}

          {/* Language */}
          {activeTab === "language" && (
            <div>
              <h2 className="text-2xl font-black gradient-text mb-2">Language & Fonts</h2>
              <p className="text-sm text-ink-mute mb-6">Multi-language support: English, Urdu, Arabic</p>
              <div className="flex flex-col gap-3">
                {[
                  { id: "en" as Language, label: "English", sub: "Latin script, LTR", font: "Inter" },
                  { id: "ur" as Language, label: "اردو — Urdu", sub: "Nastaliq script, RTL", font: "Noto Nastaliq Urdu" },
                  { id: "ar" as Language, label: "العربية — Arabic", sub: "Kufi script, RTL", font: "Noto Kufi Arabic" },
                ].map((lang) => (
                  <GlassCard
                    key={lang.id}
                    hover
                    onClick={() => setLanguage(lang.id)}
                    className={cn(
                      "p-4 cursor-pointer",
                      config.language === lang.id && "ring-2 ring-accent-blue"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-bold text-sm text-ink">{lang.label}</div>
                        <div className="text-xs text-ink-mute mt-0.5">{lang.sub} • {lang.font}</div>
                      </div>
                      {config.language === lang.id && (
                        <CheckCircle2 size={16} className="text-accent-blue" />
                      )}
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          )}

          {/* Security */}
          {activeTab === "security" && (
            <div>
              <h2 className="text-2xl font-black gradient-text mb-2">Security Settings</h2>
              <p className="text-sm text-ink-mute mb-6">Admin password & security configuration</p>
              <GlassCard variant="crimson" className="p-5 mb-4">
                <div className="font-bold text-sm text-ink mb-1">Current Admin Password</div>
                <div className="text-xs text-ink-mute mb-4">Default: 1122 — Change recommended for production</div>
                <div className="flex flex-col gap-3">
                  <input
                    type="password"
                    placeholder="Current password"
                    className="px-4 py-2.5 rounded-xl text-sm bg-white/80 border border-white/80 focus:outline-none focus:ring-2 focus:ring-red-200"
                  />
                  <input
                    type="password"
                    placeholder="New password"
                    className="px-4 py-2.5 rounded-xl text-sm bg-white/80 border border-white/80 focus:outline-none focus:ring-2 focus:ring-red-200"
                  />
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    className="px-4 py-2.5 rounded-xl text-sm bg-white/80 border border-white/80 focus:outline-none focus:ring-2 focus:ring-red-200"
                  />
                  <button
                    className="py-2.5 rounded-xl text-sm font-bold text-white"
                    style={{ background: "linear-gradient(135deg, #E0152A, #FF4F8B)" }}
                  >
                    Update Password
                  </button>
                </div>
              </GlassCard>
              <GlassCard className="p-4">
                <div className="font-bold text-sm text-ink mb-3">Security Status</div>
                {[
                  { label: "Password protection", status: "Active", ok: true },
                  { label: "Session management", status: "Enabled", ok: true },
                  { label: "Admin-only sections locked", status: "Enforced", ok: true },
                  { label: "Public sections", status: "Open Access", ok: true },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-2 border-b border-white/40 last:border-0">
                    <span className="text-sm text-ink-soft">{item.label}</span>
                    <span className={cn("text-xs font-bold", item.ok ? "text-emerald-600" : "text-red-600")}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </GlassCard>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

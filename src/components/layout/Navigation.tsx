import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Shield, Activity, Filter, Settings, Plug, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import ShieldLogo from "@/components/features/ShieldLogo";
import { useTranslation } from "@/hooks/useTranslation";
import { useAppStore } from "@/stores/appStore";

const navItems = [
  { path: "/", icon: Shield, labelKey: "dashboard" },
  { path: "/activity", icon: Activity, labelKey: "activity" },
  { path: "/filters", icon: Filter, labelKey: "filters" },
  { path: "/integration", icon: Plug, labelKey: "integration" },
  { path: "/settings", icon: Settings, labelKey: "settings" },
];

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, isRTL } = useTranslation();
  const config = useAppStore((s) => s.config);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:flex flex-col w-[220px] min-h-screen sticky top-0 z-40",
          "glass-card border-r border-white/60 pt-6 pb-8 px-4"
        )}
        style={{ direction: isRTL ? "rtl" : "ltr" }}
      >
        {/* Brand */}
        <div
          className={cn("flex items-center gap-3 px-3 mb-8 cursor-pointer")}
          onClick={() => navigate("/")}
        >
          <ShieldLogo size={40} animate />
          <div>
            <div className="text-base font-black text-ink leading-tight gradient-text">{config.customTitle}</div>
            <div className="text-[10px] text-ink-mute tracking-wide">{config.customTagline}</div>
          </div>
        </div>

        {/* Protection badge */}
        <div
          className={cn(
            "mx-1 mb-6 px-3 py-2 rounded-xl text-xs font-bold text-center transition-all",
            config.protectionEnabled
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-glow-emerald"
              : "bg-red-50 text-red-600 border border-red-200"
          )}
        >
          <div className="live-indicator justify-center">
            {config.protectionEnabled ? "LIVE PROTECTION" : "SHIELD PAUSED"}
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map(({ path, icon: Icon, labelKey }) => {
            const active = location.pathname === path;
            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left",
                  active
                    ? "nav-item-active text-accent-blue font-semibold"
                    : "text-ink-soft hover:bg-white/60 hover:text-ink"
                )}
              >
                <Icon size={16} className={active ? "text-accent-blue" : "text-ink-mute"} />
                <span>{(t as Record<string, string>)[labelKey]}</span>
              </button>
            );
          })}
        </nav>

        {/* Admin link */}
        <button
          onClick={() => navigate("/admin")}
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all mt-2",
            location.pathname.startsWith("/admin")
              ? "bg-violet-50 text-accent-violet border border-violet-200"
              : "text-ink-mute hover:bg-violet-50/60 hover:text-accent-violet"
          )}
        >
          <Lock size={15} />
          <span>{t.admin}</span>
        </button>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 glass-card border-t border-white/80 flex items-center justify-around px-2 py-2 safe-bottom">
        {navItems.map(({ path, icon: Icon, labelKey }) => {
          const active = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all min-w-[44px] min-h-[44px] justify-center",
                active ? "text-accent-blue bg-blue-50/80" : "text-ink-mute"
              )}
            >
              <Icon size={18} />
              <span className="text-[9px] font-semibold uppercase tracking-wide">
                {(t as Record<string, string>)[labelKey]}
              </span>
            </button>
          );
        })}
        <button
          onClick={() => navigate("/admin")}
          className={cn(
            "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all min-w-[44px] min-h-[44px] justify-center",
            location.pathname.startsWith("/admin") ? "text-accent-violet bg-violet-50" : "text-ink-mute"
          )}
        >
          <Lock size={18} />
          <span className="text-[9px] font-semibold uppercase tracking-wide">Admin</span>
        </button>
      </nav>
    </>
  );
}

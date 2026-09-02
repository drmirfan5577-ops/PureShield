import React from "react";
import { cn } from "@/lib/utils";

type GlassVariant = "default" | "emerald" | "crimson" | "violet" | "blue" | "gold" | "aurora";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: GlassVariant;
  glow?: boolean;
  hover?: boolean;
  onClick?: () => void;
}

const variantClasses: Record<GlassVariant, string> = {
  default: "glass-card",
  emerald: "glass-card-emerald",
  crimson: "glass-card-crimson",
  violet: "glass-card-violet",
  blue: "glass-card-blue",
  gold: "glass-card-gold",
  aurora: "glass-card",
};

const glowClasses: Record<GlassVariant, string> = {
  default: "shadow-glow-blue",
  emerald: "shadow-glow-emerald tube-glow-emerald",
  crimson: "shadow-glow-crimson tube-glow-crimson",
  violet: "shadow-glow-violet",
  blue: "shadow-glow-blue",
  gold: "shadow-[0_0_30px_rgba(245,158,11,0.35)]",
  aurora: "animate-glow-ring",
};

export default function GlassCard({
  children,
  className,
  variant = "default",
  glow = false,
  hover = false,
  onClick,
}: GlassCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative rounded-2xl overflow-hidden",
        variantClasses[variant],
        glow && glowClasses[variant],
        hover && "cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-deep-glass",
        className
      )}
    >
      {/* Shimmer overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
        <div className="absolute inset-y-0 -left-full w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
      </div>
      {children}
    </div>
  );
}

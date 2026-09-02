import React from "react";

interface GlowOrbProps {
  color?: string;
  size?: number;
  top?: string | number;
  left?: string | number;
  right?: string | number;
  bottom?: string | number;
  opacity?: number;
  delay?: number;
}

export default function GlowOrb({
  color = "#7C9CFF",
  size = 320,
  top,
  left,
  right,
  bottom,
  opacity = 0.45,
  delay = 0,
}: GlowOrbProps) {
  const style: React.CSSProperties = {
    position: "absolute",
    width: size,
    height: size,
    borderRadius: "50%",
    background: `radial-gradient(circle at 40% 40%, ${color}88 0%, ${color}22 60%, transparent 100%)`,
    filter: `blur(${Math.floor(size / 5)}px)`,
    opacity,
    top,
    left,
    right,
    bottom,
    animationDelay: `${delay}s`,
    pointerEvents: "none",
  };

  return (
    <div
      style={style}
      className="animate-orb-drift"
    />
  );
}

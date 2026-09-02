import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface LiveStatProps {
  label: string;
  value: number;
  suffix?: string;
  accentClass?: string;
  glowClass?: string;
  size?: "sm" | "md" | "lg";
}

export default function LiveStat({
  label,
  value,
  suffix = "",
  accentClass = "glow-text-blue",
  glowClass = "bg-accent-blue",
  size = "md",
}: LiveStatProps) {
  const [displayValue, setDisplayValue] = useState(value);
  const [popped, setPopped] = useState(false);
  const prevValueRef = useRef(value);

  useEffect(() => {
    if (value !== prevValueRef.current) {
      setDisplayValue(value);
      setPopped(true);
      prevValueRef.current = value;
      const timer = setTimeout(() => setPopped(false), 300);
      return () => clearTimeout(timer);
    }
  }, [value]);

  const sizeClasses = {
    sm: { value: "text-2xl", label: "text-[10px]" },
    md: { value: "text-3xl", label: "text-[11px]" },
    lg: { value: "text-4xl", label: "text-xs" },
  };

  return (
    <div className="flex flex-col items-center gap-2 py-2">
      {/* Live dot */}
      <div className={cn("w-2 h-2 rounded-full animate-pulse-slow", glowClass)} />
      {/* Value */}
      <div
        className={cn(
          "font-black tracking-tight transition-transform",
          sizeClasses[size].value,
          accentClass,
          popped && "scale-110"
        )}
        style={{ transition: "transform 0.2s ease" }}
      >
        {displayValue.toLocaleString()}{suffix}
      </div>
      {/* Label */}
      <span className={cn("font-semibold uppercase tracking-widest text-ink-soft", sizeClasses[size].label)}>
        {label}
      </span>
    </div>
  );
}

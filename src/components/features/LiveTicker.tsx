import React from "react";

interface LiveTickerProps {
  items: string[];
}

export default function LiveTicker({ items }: LiveTickerProps) {
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden bg-gradient-to-r from-blue-50 via-violet-50 to-emerald-50 border-y border-white/80 py-2">
      <div className="flex gap-0 whitespace-nowrap animate-marquee">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 px-6 text-xs font-bold uppercase tracking-widest text-ink-soft"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent-blue/60 inline-block" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

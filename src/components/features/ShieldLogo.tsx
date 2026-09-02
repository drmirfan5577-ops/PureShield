import React from "react";
import shieldImg from "@/assets/shield-logo.png";

interface ShieldLogoProps {
  size?: number;
  animate?: boolean;
}

export default function ShieldLogo({ size = 56, animate = false }: ShieldLogoProps) {
  return (
    <div
      className={`relative inline-flex items-center justify-center ${animate ? "animate-float" : ""}`}
      style={{ width: size, height: size }}
    >
      <img
        src={shieldImg}
        alt="PureShield Logo"
        style={{ width: size, height: size, objectFit: "contain" }}
        className="drop-shadow-lg"
      />
    </div>
  );
}

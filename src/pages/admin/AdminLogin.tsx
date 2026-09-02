import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminStore } from "@/stores/adminStore";
import GlassCard from "@/components/features/GlassCard";
import GlowOrb from "@/components/features/GlowOrb";
import ShieldLogo from "@/components/features/ShieldLogo";
import { Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login } = useAdminStore();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = login(password);
    if (ok) {
      navigate("/admin/panel");
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="relative min-h-screen bg-milk flex items-center justify-center overflow-hidden px-4">
      <GlowOrb color="#9B5CFF" size={400} top={-100} left={-100} opacity={0.35} />
      <GlowOrb color="#3B6EFF" size={350} bottom={-80} right={-80} opacity={0.3} />
      <GlowOrb color="#E0152A" size={200} top="50%" left="50%" opacity={0.12} />

      <div className={cn("w-full max-w-sm z-10", shake && "animate-[shake_0.4s_ease]")}>
        <div className="text-center mb-8">
          <ShieldLogo size={72} animate />
          <h1 className="text-2xl font-black gradient-text mt-4">Admin Panel</h1>
          <p className="text-sm text-ink-mute mt-1">Password-protected access only</p>
        </div>

        <GlassCard variant="violet" glow className="p-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-ink-mute mb-2">
                Admin Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(false);
                  }}
                  placeholder="Enter password"
                  className={cn(
                    "w-full px-4 py-3 pr-10 rounded-xl text-sm font-medium text-ink",
                    "bg-white/80 border focus:outline-none focus:ring-2 transition-all",
                    error
                      ? "border-red-300 focus:ring-red-200"
                      : "border-white/80 focus:ring-violet-200"
                  )}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-mute hover:text-ink transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {error && (
                <div className="flex items-center gap-1.5 mt-2 text-red-600 text-xs font-medium">
                  <AlertCircle size={12} />
                  Incorrect password. Try again.
                </div>
              )}
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white transition-all hover:shadow-glow-violet active:scale-95"
              style={{ background: "linear-gradient(135deg, #9B5CFF, #3B6EFF)" }}
            >
              <Lock size={14} />
              Access Admin Panel
            </button>
          </form>
        </GlassCard>

        <p className="text-center text-xs text-ink-mute mt-4">
          Default password: 1122 &nbsp;•&nbsp; Change in Admin Panel
        </p>
      </div>
    </div>
  );
}

import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import Navigation from "@/components/layout/Navigation";
import Dashboard from "@/pages/Dashboard";
import Activity from "@/pages/Activity";
import Filters from "@/pages/Filters";
import Settings from "@/pages/Settings";
import Integration from "@/pages/Integration";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminPanel from "@/pages/admin/AdminPanel";
import { useAdminStore } from "@/stores/adminStore";
import { useAppStore } from "@/stores/appStore";

function ProtectedAdmin({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAdminStore();
  if (!isAuthenticated) return <Navigate to="/admin" replace />;
  return <>{children}</>;
}

function AppLayout() {
  const config = useAppStore((s) => s.config);
  const lang = config.language;

  return (
    <div
      className="flex min-h-screen"
      lang={lang}
      dir={lang === "ur" || lang === "ar" ? "rtl" : "ltr"}
    >
      <Navigation />
      <main className="flex-1 min-w-0">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/filters" element={<Filters />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/integration" element={<Integration />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.8)",
            color: "#0B1020",
            fontFamily: "Inter, sans-serif",
            fontWeight: 600,
            fontSize: "13px",
          },
        }}
      />
      <Routes>
        <Route path="/admin" element={<AdminLogin />} />
        <Route
          path="/admin/panel/*"
          element={
            <ProtectedAdmin>
              <AdminPanel />
            </ProtectedAdmin>
          }
        />
        <Route path="/*" element={<AppLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

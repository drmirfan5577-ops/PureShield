import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AppConfig, Language, LauncherId, FilterItem } from "@/types";
import { DEFAULT_FILTERS, LAUNCHERS } from "@/constants";

interface AppState {
  config: AppConfig;
  setLanguage: (lang: Language) => void;
  setLauncher: (id: LauncherId) => void;
  toggleProtection: () => void;
  toggleFilter: (key: string) => void;
  setCustomTitle: (title: string) => void;
  setCustomTagline: (tagline: string) => void;
  setAutoSync: (val: boolean) => void;
  setStatsVisible: (val: boolean) => void;
  setActivityFeedEnabled: (val: boolean) => void;
  setFilters: (filters: FilterItem[]) => void;
  reset: () => void;
}

const DEFAULT_CONFIG: AppConfig = {
  language: "en",
  launcherId: "crystal",
  protectionEnabled: true,
  statsVisible: true,
  activityFeedEnabled: true,
  autoSync: true,
  customTitle: "PureShield",
  customTagline: "Broad-spectrum • Beyond limits",
  filters: DEFAULT_FILTERS,
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      config: DEFAULT_CONFIG,
      setLanguage: (lang) =>
        set((s) => ({ config: { ...s.config, language: lang } })),
      setLauncher: (id) =>
        set((s) => ({ config: { ...s.config, launcherId: id } })),
      toggleProtection: () =>
        set((s) => ({ config: { ...s.config, protectionEnabled: !s.config.protectionEnabled } })),
      toggleFilter: (key) =>
        set((s) => ({
          config: {
            ...s.config,
            filters: s.config.filters.map((f) =>
              f.key === key ? { ...f, enabled: !f.enabled } : f
            ),
          },
        })),
      setCustomTitle: (title) =>
        set((s) => ({ config: { ...s.config, customTitle: title } })),
      setCustomTagline: (tagline) =>
        set((s) => ({ config: { ...s.config, customTagline: tagline } })),
      setAutoSync: (val) =>
        set((s) => ({ config: { ...s.config, autoSync: val } })),
      setStatsVisible: (val) =>
        set((s) => ({ config: { ...s.config, statsVisible: val } })),
      setActivityFeedEnabled: (val) =>
        set((s) => ({ config: { ...s.config, activityFeedEnabled: val } })),
      setFilters: (filters) =>
        set((s) => ({ config: { ...s.config, filters } })),
      reset: () => set({ config: DEFAULT_CONFIG }),
    }),
    {
      name: "pureshield-config",
    }
  )
);

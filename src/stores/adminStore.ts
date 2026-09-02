import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AdminState {
  isAuthenticated: boolean;
  lastLogin: string | null;
  login: (password: string) => boolean;
  logout: () => void;
}

const ADMIN_PASS = "1122";

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      lastLogin: null,
      login: (password: string) => {
        if (password === ADMIN_PASS) {
          set({ isAuthenticated: true, lastLogin: new Date().toISOString() });
          return true;
        }
        return false;
      },
      logout: () => set({ isAuthenticated: false }),
    }),
    { name: "pureshield-admin" }
  )
);

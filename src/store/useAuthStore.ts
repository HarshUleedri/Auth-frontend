import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  isAuthenticated: boolean;
  user: any;
  isLoading: boolean;
  error: string | null;
}
interface Actions {
  login: (user: any) => void;
  signup: (user: any) => void;
  logout: () => void;
  setIsLoading: (data: boolean) => void;
  setError: (data: string) => void;
}

type AuthStoreType = State & Actions;

export const useAuthStore = create<AuthStoreType>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      isLoading: false,
      error: null,
      login: (user) => set({ isAuthenticated: true, user }),
      signup: (user) => set({ isAuthenticated: true, user }),
      logout: () => set({ isAuthenticated: false, user: null }),
      setIsLoading: (data) => set({ isLoading: data }),
      setError: (data) => set({ error: data }),
    }),
    {
      name: "auth-store",
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
    }
  )
);

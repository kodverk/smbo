import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PersistSecureStore } from "../store/persist-secure-store";

interface AuthStore {
  token: string | null;
  hydrated: boolean;
  actions: AuthStoreActions;
}

interface AuthStoreActions {
  setToken: (token: string) => void;
}

const authStore = create<AuthStore>()(
  persist(
    (set) => ({
      hydrated: false,
      token: null,
      actions: {
        setToken: (token) => set({ token }),
      },
    }),
    {
      name: "auth",
      storage: new PersistSecureStore(),
      partialize: (state) => ({ token: state.token }),
      onRehydrateStorage: (foo) => {
        return (state, error) => {
          state.hydrated = true;
          return state;
        };
      },
    },
  ),
);

export namespace AuthStore {
  export function useToken() {
    return authStore((state) => state.token);
  }
  export function useActions() {
    return authStore((state) => state.actions);
  }

  export function getToken() {
    return authStore.getState().token ?? null;
  }

  export function useHydrated() {
    return authStore((state) => state.hydrated);
  }
}

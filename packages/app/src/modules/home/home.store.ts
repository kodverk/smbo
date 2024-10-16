import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PersistSecureStore } from "../store/persist-secure-store";

interface HomeStore {
  selectedId: string | null;
  hydrated: boolean;
  actions: HomeStoreActions;
}

interface HomeStoreActions {
  chooseHome: (homeId: string) => void;
}

const authStore = create<HomeStore>()(
  persist(
    (set) => ({
      hydrated: false,
      selectedId: null,
      actions: {
        chooseHome: (selectedId) => set({ selectedId }),
      },
    }),
    {
      name: "auth",
      storage: new PersistSecureStore(),
      partialize: (state) => ({ selectedId: state.selectedId }),
      onRehydrateStorage: (state) => {
        return (state, error) => {
          state.hydrated = true;
        };
      },
    },
  ),
);

export namespace HomeStore {
  export function useSelectedId() {
    return authStore((state) => state.selectedId);
  }

  export function useActions() {
    return authStore((state) => state.actions);
  }

  export function useHydrated() {
    return authStore((state) => state.hydrated);
  }
}

import { create } from "zustand";

interface LoadingStore {
  loading: boolean;
  setLoading: (isLoading: boolean) => void;
}

const useLoadingStore = create<LoadingStore>((set) => ({
  loading: false,
  setLoading: (isLoading) => set(() => ({ loading: isLoading })),
}));

export default useLoadingStore;

import { create } from "zustand";

interface UserStore {
  usersCount: number;
  setUsersCount: (count: number) => void;
}

const useCountData = create<UserStore>((set) => ({
  usersCount: 0,
  setUsersCount: (count) => set({ usersCount: count }),
}));

export default useCountData;

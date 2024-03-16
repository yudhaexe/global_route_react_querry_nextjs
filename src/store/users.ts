import axios from "axios";
import { create } from "zustand";

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserStore {
  users: User[];
  usersCount: number;
  fetchUsers: () => Promise<void>;
}

const usersUrl = "https://jsonplaceholder.typicode.com/users";

const useUsers = create<UserStore>((set) => ({
  users: [],
  usersCount: 0,
  fetchUsers: async () => {
    const response = await axios.get<User[]>(usersUrl);
    set({ users: response.data, usersCount: response.data.length });
  },
}));

export default useUsers;

import create from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

const authStore = (set: any) => ({
  user: null,
  addUser: (user: any) => set({ user: user }),
  removeUser: () => set({ user: null }),
});

const useAuthStore = create(
  persist(authStore, {
    name: "auth",
  })
);

export default useAuthStore;

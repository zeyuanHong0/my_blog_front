import { create } from "zustand";

import { type SignInData, fetchLogin, fetchUserInfo } from "@/api/user";
import {
  setSessionStorage,
  getSessionStorage,
  removeSessionStorage,
} from "@/utils/storage";
import { User } from "#/user.types";

export type UserState = {
  userInfo: User;
  userLogin: (data: SignInData) => Promise<any>;
  getUserInfo: () => Promise<any>;
  userLogout: () => string;
};

const useUserStore = create((set: any): UserState => {
  return {
    userInfo: JSON.parse(getSessionStorage("userInfo") || "{}"),
    userLogin: async (data: SignInData) => {
      const res: any = await fetchLogin(data);
      return res;
    },
    getUserInfo: async () => {
      const res: any = await fetchUserInfo();
      set({ userInfo: res.data.userInfo });
      setSessionStorage("userInfo", JSON.stringify(res.data.userInfo));
      return res;
    },
    userLogout: () => {
      set({ userInfo: {} });
      removeSessionStorage("userInfo");
      return "success";
    },
  };
});

export default useUserStore;

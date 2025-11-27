import { create } from "zustand";

import {
  type SignInData,
  fetchLogin,
  fetchLogout,
  fetchUserInfo,
} from "@/api/user";
import {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
} from "@/utils/storage";
import { User } from "#/user.types";

export type UserState = {
  isLoginExpired: boolean;
  userInfo: User;
  setLoginExpired: (expired: boolean) => void;
  userLogin: (data: SignInData) => Promise<any>;
  getUserInfo: () => Promise<any>;
  userLogout: () => Promise<string>;
};

const useUserStore = create((set: any): UserState => {
  return {
    isLoginExpired: false, // 登录是否过期
    userInfo: JSON.parse(getLocalStorage("userInfo") || "{}"),
    setLoginExpired: (expired: boolean) => {
      set({ isLoginExpired: expired });
    },
    userLogin: async (data: SignInData) => {
      const res: any = await fetchLogin(data);
      return res;
    },
    getUserInfo: async () => {
      const res: any = await fetchUserInfo();
      set({ userInfo: res.data.userInfo });
      setLocalStorage("userInfo", JSON.stringify(res.data.userInfo));
      return res;
    },
    userLogout: async () => {
      await fetchLogout();
      set({ userInfo: {} });
      removeLocalStorage("userInfo");
      return "success";
    },
  };
});

export default useUserStore;

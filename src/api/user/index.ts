import request from "@/utils/axios";
import type { SignUpData, SignInData } from "./types";

export * from "./types";

enum API {
  SIGNUP = "/auth/signup",
  SIGNIN = "/auth/signin",
  LOGOUT = "/auth/logout",
  USER_PROFILE = "/user/profile",
}

// 注册
export const fetchRegister = (data: SignUpData) => {
  return request.post<any>(API.SIGNUP, data);
};

// 登录接口
export const fetchLogin = (data: SignInData) => {
  return request.post<any>(API.SIGNIN, data);
};

// 获取用户信息
export const fetchUserInfo = () => {
  return request.get<any>(API.USER_PROFILE);
};

// 退出登录
export const fetchLogout = () => {
  return request.post<any>(API.LOGOUT);
};

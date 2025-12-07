import request from "@/utils/axios";
import type { SignUpData, SignInData } from "./types";

export * from "./types";

enum API {
  SIGNUP = "/auth/signup",
  SIGNIN = "/auth/signin",
  LOGOUT = "/auth/signout",
  USER_PROFILE = "/user/profile",
  SEND_EMAIL_CODE = "/auth/sendCode",
  GITHUB_URL = "/auth/github/url",
}

/**
 * 注册用户
 * @param data
 * @returns
 */
export const fetchRegister = (data: SignUpData) => {
  return request.post<any>(API.SIGNUP, data);
};

/**
 * 登录用户
 * @param data
 * @returns
 */
export const fetchLogin = (data: SignInData) => {
  return request.post<any>(API.SIGNIN, data);
};

/**
 * 获取用户信息
 * @returns 获取用户信息
 */
export const fetchUserInfo = () => {
  return request.get<any>(API.USER_PROFILE);
};

/**
 * 退出登录
 * @returns 用户登出
 */
export const fetchLogout = () => {
  return request.post<any>(API.LOGOUT);
};

/**
 * 发送邮箱验证码
 * @param email 邮箱地址
 * @returns
 */
export const fetchSendEmailCode = (email: string) => {
  return request.post<any>(API.SEND_EMAIL_CODE, { email });
};

/**
 * 获取 GitHub 授权地址
 * @returns GitHub 授权地址
 */
export const fetchGitHubAuthUrl = () => {
  return request.get<any>(API.GITHUB_URL);
};

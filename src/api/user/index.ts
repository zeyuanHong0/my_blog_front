import request from "@/utils/axios";
import type {
  SignUpData,
  SignInData,
  ListParams,
  UserStatus,
  UpdateProfile,
} from "./types";

export * from "./types";

enum API {
  SIGNUP = "/auth/signup",
  SIGNIN = "/auth/signin",
  LOGOUT = "/auth/signout",
  USER_PROFILE = "/user/profile",
  SEND_EMAIL_CODE = "/auth/sendCode",
  GITHUB_URL = "/auth/github/url",
  CHECK_EMAIL = "/auth/checkEmail",
  UPDATE_PROFILE = "/user/update/profile",

  // 管理端
  USER_LIST = "/admin/user/list",
  USER_STATUS_CHANGE = "/admin/user/changeUserStatus",
  ISUSER_ADMIN = "/user/isAdmin",
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
 * 校验邮箱是否可用
 * @param email 邮箱地址
 * @returns 是否可用
 */
export const fetchCheckEmail = (email: string) => {
  return request.post<any>(API.CHECK_EMAIL, { email });
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

/**
 * 获取用户列表（管理端）
 * @returns 用户列表
 */
export const fetchAdminUserList = (params: ListParams) => {
  return request.get<any>(API.USER_LIST, { params });
};

/**
 * 改变用户状态（启用/禁用）
 */
export const fetchChangeUserStatus = (data: UserStatus) => {
  return request.post<any>(API.USER_STATUS_CHANGE, data);
};

/**
 * 判断当前用户是否是管理员
 */
export const fetchIsAdmin = () => {
  return request.get<any>(API.ISUSER_ADMIN);
};

/**
 * 修改用户信息
 * @param data 用户信息
 */
export const fetchUpdateProfile = (data: UpdateProfile) => {
  return request.put<any>(API.UPDATE_PROFILE, data);
};

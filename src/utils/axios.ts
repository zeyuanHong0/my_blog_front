import axios from "axios";
import { GET_TOKEN, REMOVE_TOKEN } from "@/utils/token";
import { showErrorToast, showInfoToast } from "@/components/toast";

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API as string,
  timeout: 10000 * 3,
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const token = GET_TOKEN();
    // 判断是否存在token，如果存在的话，则每个请求都带上token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // 在发送请求之前做些什么
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // TODO 处理业务状态码
    console.log("response", response);
    const res = response.data;
    if (res.code !== 200) {
      showErrorToast(res.message || "请求出错");
      return Promise.reject(new Error(res.message || "请求出错"));
    }
    return res;
  },
  (error) => {
    // TODO 处理 HTTP 层面的错误
    if (error.response) {
      const status = error.response.status;
      switch (status) {
        case 401:
          showInfoToast("登录已过期，请重新登录");
          REMOVE_TOKEN();
          break;
        case 403:
          showErrorToast("没有权限访问");
          break;
        case 404:
          showErrorToast("请求资源不存在");
          break;
        case 500:
          showErrorToast("服务器内部错误");
          break;
        default:
          showErrorToast(`请求错误：${status}`);
      }
    } else if (error.request) {
      showErrorToast("请求超时或网络错误");
    } else {
      showErrorToast(error.message);
    }
    return Promise.reject(error);
  },
);

export default request;

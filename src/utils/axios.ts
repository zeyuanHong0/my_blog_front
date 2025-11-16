import axios from "axios";
import { GET_TOKEN } from "@/utils/token";

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
    return response.data;
  },
  (error) => {
    // TODO 处理 HTTP 层面的错误
    return Promise.reject(error);
  },
);

export default request;

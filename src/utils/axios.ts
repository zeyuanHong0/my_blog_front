import axios from "axios";
import { showErrorToast, showInfoToast } from "@/components/toast";
import useUserStore from "@/store/userStore";

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API as string,
  timeout: 10000 * 3,
  withCredentials: true, // 允许携带 cookie
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
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
    // 处理业务状态码
    console.log("response", response);
    const res = response.data;
    if (res.code !== 200) {
      showErrorToast(res.message || "请求出错");
      return Promise.reject(new Error(res.message || "请求出错"));
    }
    return res;
  },
  (error) => {
    const { setLoginExpired } = useUserStore.getState();
    // 处理 HTTP 层面的错误
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;

      // 先判断是否登录过期
      if (status === 401) {
        showInfoToast("登录已过期，请重新登录");
        setLoginExpired(true);
        return Promise.reject(error);
      }

      // 优先使用后端返回的错误信息
      if (data && data.message) {
        const message = Array.isArray(data.message)
          ? data.message.join(", ")
          : data.message;
        showErrorToast(message);
        return Promise.reject(error);
      }

      // 如果后端没有返回 message，使用默认提示
      switch (status) {
        case 400:
          showErrorToast("请求参数错误");
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

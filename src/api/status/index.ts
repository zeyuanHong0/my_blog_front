import request from "@/utils/axios";

export * from "./types";

enum API {
  GET_STATUS = "/status/getStatus",
}

// 获取状态
export const fetchStatus = () => {
  return request.get<any>(API.GET_STATUS);
};

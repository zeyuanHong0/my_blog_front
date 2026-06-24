import axios from "@/utils/axios";

import type { DashboardStatsResponse } from "./types";

enum API {
  STATS_DASHBOARD = "/stats/dashboard",
}

/**
 * 获取仪表盘统计数据
 */
export const fetchStatsDashboard = () => {
  return axios.get<DashboardStatsResponse, DashboardStatsResponse>(
    API.STATS_DASHBOARD,
  );
};

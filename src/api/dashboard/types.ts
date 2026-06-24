export interface BaseResponse {
  code: number;
  message: string;
}

/** 分类/标签分布项 */
export interface DistributionItem {
  name: string;
  value: number;
}

/** 文章发布趋势 */
export interface BlogPublishTrend {
  dateList: string[];
  data: number[];
}

/** 周新增文章统计 */
export interface WeeklyAddedBlogCount {
  currentWeekBlogCount: number;
  lastWeekBlogCount: number;
  growthRate: number | null;
}

/** 仪表盘统计数据 */
export interface DashboardStats {
  allBlogCount: number;
  publishedBlogCount: number;
  categoryCount: number;
  tagCount: number;
  weeklyAddedBlogCount: WeeklyAddedBlogCount;
  blogPublishTrend: BlogPublishTrend;
  categoryDistribution: DistributionItem[];
  tagDistribution: DistributionItem[];
}

export interface DashboardStatsResponse extends BaseResponse {
  data: DashboardStats;
}

import { useState, useEffect } from "react";
import {
  FileText,
  CheckCircle2,
  LayoutGrid,
  Tags,
  TrendingUp,
} from "lucide-react";

import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { fetchStatsDashboard } from "@/api/dashboard";
import type { DashboardStats } from "@/api/dashboard/types";

import { LineChart, PieChart, BarChart } from "@/components/Charts";
import CustomCard from "@/components/base/custom-card";

const INIT_DASHBOARD: DashboardStats = {
  allBlogCount: 0,
  publishedBlogCount: 0,
  categoryCount: 0,
  tagCount: 0,
  weeklyAddedBlogCount: {
    currentWeekBlogCount: 0,
    lastWeekBlogCount: 0,
    growthRate: null,
  },
  blogPublishTrend: {
    dateList: [],
    data: [],
  },
  categoryDistribution: [],
  tagDistribution: [],
};

const AdminHome = () => {
  useDocumentTitle("后台首页");

  const [dashboardData, setDashboardData] =
    useState<DashboardStats>(INIT_DASHBOARD);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchStatsDashboard();
        setDashboardData(res.data);
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      }
    };

    fetchData();
  }, []);

  const {
    allBlogCount,
    publishedBlogCount,
    categoryCount,
    tagCount,
    weeklyAddedBlogCount,
    blogPublishTrend,
    categoryDistribution,
    tagDistribution,
  } = dashboardData;

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">仪表盘</h2>
      </div>

      {/* 顶部四卡片 */}
      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <CustomCard title="文章总数" icon={<FileText className="h-4 w-4" />}>
          <div className="text-3xl font-bold">{allBlogCount}</div>
        </CustomCard>

        <CustomCard title="已发布" icon={<CheckCircle2 className="h-4 w-4" />}>
          <div className="text-3xl font-bold">{publishedBlogCount}</div>
        </CustomCard>

        <CustomCard title="分类数" icon={<LayoutGrid className="h-4 w-4" />}>
          <div className="text-3xl font-bold">{categoryCount}</div>
        </CustomCard>

        <CustomCard title="标签数" icon={<Tags className="h-4 w-4" />}>
          <div className="text-3xl font-bold">{tagCount}</div>
        </CustomCard>
      </div>

      {/* 第二排：趋势图 + 本周概览 */}
      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <CustomCard
          title="文章发布趋势"
          className="col-span-4 lg:col-span-5"
          contentClassName="pl-2"
        >
          {blogPublishTrend.dateList.length > 0 ? (
            <LineChart
              key={blogPublishTrend.dateList.join(",")}
              series={[{ name: "发布文章数", data: blogPublishTrend.data }]}
              categories={blogPublishTrend.dateList}
            />
          ) : (
            <div className="flex h-[200px] items-center justify-center text-muted-foreground text-sm">
              暂无数据
            </div>
          )}
        </CustomCard>

        <CustomCard title="本周概览" className="col-span-4 lg:col-span-2">
          <div className="flex flex-col gap-8">
            <div>
              <span className="text-muted-foreground text-sm">新增文章</span>
              <div className="mt-2 flex items-baseline gap-2">
                <h3 className="text-4xl font-bold">
                  {weeklyAddedBlogCount.currentWeekBlogCount}
                  <span className="text-muted-foreground text-lg font-normal">
                    {" "}
                    篇
                  </span>
                </h3>
              </div>
              {weeklyAddedBlogCount.growthRate !== null && (
                <div className="mt-2 flex items-center text-sm font-medium text-green-500">
                  <TrendingUp className="mr-1 h-4 w-4" />
                  环比上周增长 {weeklyAddedBlogCount.growthRate}%
                </div>
              )}
            </div>
            <hr className="border-border" />
            <div>
              <p className="text-muted-foreground text-sm italic">
                "持续的输入带来高频的输出。"
              </p>
            </div>
          </div>
        </CustomCard>
      </div>

      {/* 第三排：分类占比 + 标签分布 */}
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <CustomCard title="文章分类占比">
          {categoryDistribution.length > 0 ? (
            <PieChart
              key={categoryDistribution.map((d) => `${d.name}:${d.value}`).join(",")}
              labels={categoryDistribution.map((d) => d.name)}
              series={categoryDistribution.map((d) => d.value)}
              donut={true}
            />
          ) : (
            <div className="flex h-[300px] items-center justify-center text-muted-foreground text-sm">
              暂无数据
            </div>
          )}
        </CustomCard>

        <CustomCard title="标签分布 Top 5">
          {tagDistribution.length > 0 ? (
            <BarChart
              key={tagDistribution.map((d) => `${d.name}:${d.value}`).join(",")}
              categories={tagDistribution.map((d) => d.name)}
              series={[
                { name: "文章数", data: tagDistribution.map((d) => d.value) },
              ]}
            />
          ) : (
            <div className="flex h-[300px] items-center justify-center text-muted-foreground text-sm">
              暂无数据
            </div>
          )}
        </CustomCard>
      </div>
    </div>
  );
};

export default AdminHome;

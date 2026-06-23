import {
  FileText,
  CheckCircle2,
  LayoutGrid,
  Tags,
  TrendingUp,
} from "lucide-react";

import { useDocumentTitle } from "@/hooks/useDocumentTitle";

import { LineChart, PieChart, BarChart } from "@/components/Charts";
import CustomCard from "@/components/base/custom-card";

const AdminHome = () => {
  useDocumentTitle("后台首页");

  const pieLabels = ["前端开发", "后端开发", "DevOps", "一些工具"];
  const pieSeries = [45, 25, 15, 10];

  const barCategories = ["React", "Vue", "TypeScript", "Node.js", "CSS"];
  const barSeries = [
    {
      name: "文章数",
      data: [32, 24, 18, 15, 12],
    },
  ];

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">仪表盘</h2>
      </div>

      {/* 顶部四卡片*/}
      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <CustomCard title="文章总数" icon={<FileText className="h-4 w-4" />}>
          <div className="text-3xl font-bold">120</div>
        </CustomCard>

        <CustomCard title="已发布" icon={<CheckCircle2 className="h-4 w-4" />}>
          <div className="text-3xl font-bold">95</div>
        </CustomCard>

        <CustomCard title="分类数" icon={<LayoutGrid className="h-4 w-4" />}>
          <div className="text-3xl font-bold">12</div>
        </CustomCard>

        <CustomCard title="标签数" icon={<Tags className="h-4 w-4" />}>
          <div className="text-3xl font-bold">48</div>
        </CustomCard>
      </div>

      {/* 第二排及图表部分 */}
      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <CustomCard
          title="文章发布趋势"
          className="col-span-4 lg:col-span-5"
          contentClassName="pl-2"
        >
          <LineChart />
        </CustomCard>

        <CustomCard title="本周概览" className="col-span-4 lg:col-span-2">
          <div className="flex flex-col gap-8">
            <div>
              <span className="text-muted-foreground text-sm">新增文章</span>
              <div className="mt-2 flex items-baseline gap-2">
                <h3 className="text-4xl font-bold">
                  8
                  <span className="text-muted-foreground text-lg font-normal">
                    {" "}
                    篇
                  </span>
                </h3>
              </div>
              <div className="mt-2 flex items-center text-sm font-medium text-green-500">
                <TrendingUp className="mr-1 h-4 w-4" />
                环比上周增长 15%
              </div>
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

      {/* 第三排 图表部分 */}
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <CustomCard title="文章分类占比">
          <PieChart labels={pieLabels} series={pieSeries} donut={true} />
        </CustomCard>

        <CustomCard title="标签分布 Top 5">
          <BarChart categories={barCategories} series={barSeries} />
        </CustomCard>
      </div>
    </div>
  );
};

export default AdminHome;

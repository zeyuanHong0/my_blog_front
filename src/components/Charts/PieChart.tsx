import useSettingStore from "@/store/settingStore";
import BaseChart from "./BaseChart";
import { ApexOptions } from "apexcharts";

interface PieChartProps {
  series: number[];
  labels: string[];
  height?: number;
  options?: ApexOptions;
  colors?: string[];
  donut?: boolean;
}

export const PieChart = ({
  series,
  labels,
  height = 300,
  options,
  colors,
  donut = false,
}: PieChartProps) => {
  const { isDark } = useSettingStore();
  const defaultOptions: ApexOptions = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    labels,
    colors: colors || [
      "#3b82f6",
      "#10b981",
      "#f59e0b",
      "#ef4444",
      "#8b5cf6",
      "#06b6d4",
    ],
    dataLabels: {
      enabled: true,
      dropShadow: {
        enabled: false,
      },
    },
    stroke: {
      width: 2,
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
    },
    tooltip: {
      theme: isDark ? "dark" : "light",
      fillSeriesColor: false,
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          size: "65%",
        },
      },
    },
    ...options,
  };

  return (
    <BaseChart
      type={donut ? "donut" : "pie"}
      series={series}
      options={defaultOptions}
      height={height}
    />
  );
};

export default PieChart;

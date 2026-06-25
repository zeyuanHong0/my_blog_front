import useSettingStore from "@/store/settingStore";
import BaseChart from "./BaseChart";
import { ApexOptions } from "apexcharts";

interface BarChartProps {
  series: ApexAxisChartSeries;
  categories: string[];
  height?: number;
  options?: ApexOptions;
  colors?: string[];
}

export const BarChart = ({
  series,
  categories,
  height = 300,
  options,
  colors = ["#2563eb"],
}: BarChartProps) => {
  const { isDark } = useSettingStore();
  const defaultOptions: ApexOptions = {
    chart: {
      toolbar: {
        show: false,
      },
      parentHeightOffset: 0,
    },
    colors,
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: "50%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories,
      tooltip: {
        enabled: false,
      },
      labels: {
        style: {
          colors: "#637381",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      tickAmount: 5,
      labels: {
        formatter: (val) => Math.floor(val).toString(),
        style: {
          colors: "#637381",
        },
      },
    },
    grid: {
      borderColor: "#DFE3E8",
      strokeDashArray: 4,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 10,
      },
    },
    tooltip: {
      theme: isDark ? "dark" : "light",
    },
    ...options,
  };

  return (
    <BaseChart
      type="bar"
      series={series}
      options={defaultOptions}
      height={height}
    />
  );
};

export default BarChart;

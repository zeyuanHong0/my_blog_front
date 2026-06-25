import useSettingStore from "@/store/settingStore";
import BaseChart from "./BaseChart";

interface LineChartProps {
  series: { name: string; data: number[] }[];
  categories: string[];
}

export const LineChart = ({ series, categories }: LineChartProps) => {
  const { isDark } = useSettingStore();
  return (
    <BaseChart
      type="line"
      series={series}
      options={{
        chart: {
          toolbar: { show: false },
          zoom: { enabled: false },
        },
        stroke: {
          curve: "straight",
          width: 5,
        },
        colors: [isDark ? "#FFFFFF" : "#000000"],
        xaxis: {
          categories,
          labels: {
            style: { colors: "#637381" },
          },
          axisBorder: { show: false },
          axisTicks: { show: false },
          tooltip: { enabled: false },
        },
        yaxis: {
          min: 0,
          labels: {
            style: { colors: "#637381" },
          },
        },
        tooltip: {
          theme: isDark ? "dark" : "light",
          marker: { show: false },
        },
      }}
    />
  );
};

export default LineChart;

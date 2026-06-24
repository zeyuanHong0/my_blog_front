import BaseChart from "./BaseChart";

interface LineChartProps {
  series: { name: string; data: number[] }[];
  categories: string[];
}

export const LineChart = ({ series, categories }: LineChartProps) => {
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
          curve: "smooth",
          width: 4,
        },
        colors: ["#000000"],
        xaxis: {
          categories,
          labels: {
            style: { colors: "#637381" },
          },
          axisBorder: { show: false },
          axisTicks: { show: false },
        },
        yaxis: {
          min: 0,
          tickAmount: 4,
          labels: {
            style: { colors: "#637381" },
          },
        },
        grid: {
          show: false,
        },
        tooltip: {
          theme: "light",
        },
      }}
    />
  );
};

export default LineChart;

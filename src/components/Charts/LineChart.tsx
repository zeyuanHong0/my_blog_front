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
          curve: "straight",
        },
        colors: ["#000000"],
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
          theme: "light",
          marker: { show: false },
        },
      }}
    />
  );
};

export default LineChart;

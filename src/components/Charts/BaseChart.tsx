import Chart from "react-apexcharts";

interface BaseChartProps {
  type: "line" | "bar" | "pie" | "donut" | "area";
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  options: ApexCharts.ApexOptions;
  height?: number;
}

export const BaseChart = ({
  type,
  series,
  options,
  height = 200,
}: BaseChartProps) => {
  return (
    <Chart type={type} series={series} options={options} height={height} />
  );
};

export default BaseChart;

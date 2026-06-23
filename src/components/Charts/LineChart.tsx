import BaseChart from "./BaseChart";

export const LineChart = () => {
  const series = [
    {
      name: "发布文章数",
      data: [2, 0, 0, 3, 6, 2, 5],
    },
  ];
  const categories = [
    "06-16",
    "06-17",
    "06-18",
    "06-19",
    "06-20",
    "06-21",
    "06-22",
  ];
  return (
    <BaseChart
      type="line"
      series={series}
      options={{
        chart: {
          toolbar: {
            show: false,
          },
        },
        stroke: {
          curve: "straight",
          width: 6,
        },
        colors: ["#000000"],
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
          min: -0.5,
          labels: {
            formatter: (val) => {
              return val < 0 ? "" : Math.round(val).toString(); // 隐藏负数标签
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
        },
        tooltip: {
          theme: "light",
          marker: {
            show: false,
          },
        },
      }}
    />
  );
};

export default LineChart;

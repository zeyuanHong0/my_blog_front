import BaseChart from "./BaseChart";

export const LineChart = () => {
  const series = [
    {
      name: "发布文章数",
      data: [2, 0, 1, 3, 0, 2, 5],
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
          curve: "smooth",
          width: 4,
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
          min: 0,
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

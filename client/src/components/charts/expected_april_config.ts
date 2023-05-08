import { ApexOptions } from "apexcharts";
import { aprilData } from "services/data";
export const aprilTotalClient = [
  {
    name: "This Year",
    data: aprilData.map((item) => parseInt(item.currentYear)),
  },
  {
    name: "Last year",
    data: aprilData.map((item) => parseInt(item.lastYear)),
  },
];

export const aprilTotalClientOptions: ApexOptions = {
  chart: {
    type: "line",
    toolbar: {
      show: true,
    },
  },
  colors: ["#475BE8", "#CFC8FF"],
  markers: {
    size: 4,
  },

  stroke: {
    curve: "smooth",
  },
  xaxis: {
    categories: aprilData.map((item) => item.Date),
  },
  legend: {
    position: "top",
    horizontalAlign: "left",
  },

  tooltip: {
    y: {
      formatter(val: number) {
        return ` ${val} Clients`;
      },
    },
  },
};

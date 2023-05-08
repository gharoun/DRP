import { ApexOptions } from "apexcharts";
import { mayData } from "services/data";
export const mayTotalClient = [
  {
    name: "This Year",
    data: mayData.map((item) => parseInt(item.currentYear)),
  },
  {
    name: "Last year",
    data: mayData.map((item) => parseInt(item.lastYear)),
  },
];

export const mayTotalClientOptions: ApexOptions = {
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
    categories: mayData.map((item) => item.Date),
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

import { ApexOptions } from "apexcharts";
import { juneData } from "services/data";
export const mayTotalClient = [
  {
    name: "This Year",
    data: juneData.map((item) => parseInt(item.currentYear)),
  },
  {
    name: "Last year",
    data: juneData.map((item) => parseInt(item.lastYear)),
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
    categories: juneData.map((item) => item.Date),
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

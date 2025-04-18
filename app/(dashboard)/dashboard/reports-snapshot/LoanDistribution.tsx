"use client";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

import { useThemeStore } from "@/store";
import { useTheme } from "next-themes";
import { themes } from "@/config/thems";

const LoanDistribution = ({ height = 400 }) => {
  const { theme: config, setTheme: setConfig } = useThemeStore();
  const { theme: mode } = useTheme();
  const theme = themes.find((theme) => theme.name === config);
  const series = [60, 40];
  const options: any = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    labels: ["Agriculture ", "Commerce"],
    dataLabels: {
      enabled: false,
    },
    colors: [
      `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].primary})`,
      "#FF9E69",
    ],
    tooltip: {
      theme: mode === "dark" ? "dark" : "light",
    },
    stroke: {
      width: 0,
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "24px",
              fontWeight: 500,
              color: `hsl(${
                theme?.cssVars[
                  mode === "dark" || mode === "system" ? "dark" : "light"
                ].chartLabel
              })`,
            },
            value: {
              show: true,
              fontSize: "24px",
              fontWeight: 600,
              formatter: function (val: string) {
                return val + "%";
              },
              color: `hsl(${
                theme?.cssVars[
                  mode === "dark" || mode === "system" ? "dark" : "light"
                ].chartLabel
              })`,
            },
            total: {
              show: true,
              label: "Total",
              formatter: function () {
                return "100%";
              },
              color: `hsl(${
                theme?.cssVars[
                  mode === "dark" || mode === "system" ? "dark" : "light"
                ].chartLabel
              })`,
            },
          },
        },
      },
    },
    legend: {
      position: "bottom",
      labels: {
        colors: `hsl(${
          theme?.cssVars[
            mode === "dark" || mode === "system" ? "dark" : "light"
          ].chartLabel
        })`,
      },

      itemMargin: {
        horizontal: 5,
        vertical: 5,
      },
      markers: {
        width: 10,
        height: 10,
        radius: 10,
        offsetX: -5,
      },
    },

    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  };
  return (
    <Chart
      options={options}
      series={series}
      type="donut"
      height={height}
      width={"100%"}
    />
  );
};

export default LoanDistribution;

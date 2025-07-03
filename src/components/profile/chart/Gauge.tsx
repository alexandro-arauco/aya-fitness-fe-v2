"use client";

import { getInstanceByDom, init } from "echarts";
import { useEffect, useRef } from "react";

interface GaugeProps {
  value: number;
  bodyPart: string;
}

export default function GaugeSymmetry({ value, bodyPart }: GaugeProps) {
  const transformedValue = (value + 30) * (100 / 60); // real -> gauge range
  const chartRef = useRef(null);

  const getColors = () => {
    if (bodyPart.toLowerCase() === "back") {
      return [
        [0.3333, "red"], // -30 to -10 → red
        [0.3667, "yellow"], // -10 to -8  → yellow
        [0.5, "green"], // -8 to 0     → green
        [0.6333, "green"], // 0 to 8      → green
        [0.6667, "yellow"], // 8 to 10     → yellow
        [1, "red"], // 10 to 30    → red
      ];
    }

    return [
      [0.25, "red"], // -30 to -15 → red
      [0.3333, "yellow"], // -15 to -10 → yellow
      [0.5, "green"], // -10 to 0   → green
      [0.6667, "green"], // 0 to 10    → green
      [0.75, "yellow"], // 10 to 15   → yellow
      [1, "red"], // 15 to 30   → red
    ];
  };

  useEffect(() => {
    const chart = init(chartRef.current, null);

    return () => {
      chart?.dispose();
    };
  }, []);

  useEffect(() => {
    // Re-render chart when option changes
    if (!chartRef.current) return;
    const chart = getInstanceByDom(chartRef.current);

    if (!chart) return;

    const option = {
      graphic: [
        {
          type: "text",
          left: "15%",
          top: "10%",
          style: {
            text: "Left",
            fontSize: 26,
            fontWeight: "bold",
            fill: "#333",
          },
        },
        {
          type: "text",
          right: "15%",
          top: "10%",
          style: {
            text: "Right",
            fontSize: 26,
            fontWeight: "bold",
            fill: "#333",
          },
        },
      ],
      series: [
        {
          type: "gauge",
          min: 0,
          max: 100,
          startAngle: 180,
          endAngle: 0,
          splitNumber: 6,
          axisLine: {
            lineStyle: {
              width: 30,
              color: getColors(),
            },
          },
          radius: "90%",
          pointer: {
            icon: "path://M12.8,0.7l12,40.1H0.7L12.8,0.7z",
            length: "40%",
            width: 10,
            offsetCenter: [0, "-50%"],
            itemStyle: {
              color: "black",
            },
          },
          axisLabel: {
            formatter: function (value: number) {
              const real = (value * 60) / 100 - 30;
              return Math.abs(Math.round(real)).toString();
            },
            distance: 35,
            fontSize: 15,
          },
          detail: {
            valueAnimation: true,
            formatter: function () {
              return `${Math.abs(value)}%`;
            },
            offsetCenter: [0, "-10%"],
            fontSize: 40,
          },
          data: [
            {
              value: transformedValue,
            },
          ],
        },
      ],
    };

    chart.setOption(option);
    chart.resize();

    const handleResize = () => chart.resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [value]);

  return (
    <div className="flex items-center justify-center w-full h-110">
      <div className="flex h-full w-full">
        <div
          ref={chartRef}
          style={{
            height: "100%",
            width: "100%",
          }}
        />
      </div>
    </div>
  );
}

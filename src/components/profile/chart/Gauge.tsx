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
        [0.3333, "#EE6666"], // -30 to -10 → red
        [0.3667, "#FAC858"], // -10 to -8  → yellow
        [0.5, "#91CC75"], // -8 to 0     → green
        [0.6333, "#91CC75"], // 0 to 8      → green
        [0.6667, "#FAC858"], // 8 to 10     → yellow
        [1, "#EE6666"], // 10 to 30    → red
      ];
    }

    return [
      [0.25, "#EE6666"], // -30 to -15 → red
      [0.3333, "#FAC858"], // -15 to -10 → yellow
      [0.5, "#91CC75"], // -10 to 0   → green
      [0.6667, "#91CC75"], // 0 to 10    → green
      [0.75, "#FAC858"], // 10 to 15   → yellow
      [1, "#EE6666"], // 15 to 30   → red
    ];
  };

  const side_1 = bodyPart.toLowerCase() === "back" ? "Left" : "Right";
  const side_2 = bodyPart.toLowerCase() === "back" ? "Right" : "Left";

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
            text: side_1,
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
            text: side_2,
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
  }, [value]);

  return (
    <div className="flex items-center justify-center w-full h-150">
      <div className="flex h-full w-full ">
        <div
          className="mt-30"
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

import { useEffect, useRef } from "react";
import { getInstanceByDom, init } from "echarts";

interface DonutChartProps {
  value: number;
  color: string;
}

export default function DonutChart({ value, color }: DonutChartProps) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    let chart = getInstanceByDom(chartRef.current);
    if (!chart) {
      chart = init(chartRef.current);
    }

    const option = {
      graphic: {
        type: "text",
        left: "center",
        top: "center",
        style: {
          text: value + "%", // Text in the center
          fontSize: 20,
          fontWeight: "bold",
          fill: "#333",
        },
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["60%", "70%"],
          avoidLabelOverlap: false,
          silent: true,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: "bold",
            },
          },
          data: [
            {
              value: value,
              itemStyle: {
                color,
              },
            },
            {
              value: 100 - value, // Adjusted so total is 100
              itemStyle: {
                color: "gray",
                opacity: 0.2,
              },
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
      chart.dispose();
    };
  }, []);

  return (
    <div className="w-30 h-30 md:w-40 md:h-40">
      <div ref={chartRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}

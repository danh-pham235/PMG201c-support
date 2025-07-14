import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend } from "chart.js";

Chart.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

interface LineChartProps {
  scoreDensity: { score: number; finalCount: number; aiCount: number }[];
  bins: number[];
}

const LineChart: React.FC<LineChartProps> = ({ scoreDensity, bins }) => {
  const data = {
    labels: bins,
    datasets: [
      {
        label: "Final Score",
        data: scoreDensity.map((d) => d.finalCount),
        borderColor: "#2563eb",
        backgroundColor: "rgba(37,99,235,0.2)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#2563eb",
      },
      {
        label: "AI Score",
        data: scoreDensity.map((d) => d.aiCount),
        borderColor: "#f59e42",
        backgroundColor: "rgba(245,158,66,0.2)",
        fill: false,
        tension: 0.4,
        pointBackgroundColor: "#f59e42",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true },
    },
    scales: {
      x: { title: { display: true, text: "Score" } },
      y: { title: { display: true, text: "Count" }, beginAtZero: true },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

interface PieChartReportProps {
  gradeDistribution: { type: string; count: number; color: string }[];
  gradeTypeLabels: Record<string, string>;
}

const PieChartReport: React.FC<PieChartReportProps> = ({ gradeDistribution, gradeTypeLabels }) => {
  const data = {
    labels: gradeDistribution.map(d => gradeTypeLabels[d.type]),
    datasets: [
      {
        data: gradeDistribution.map(d => d.count),
        backgroundColor: gradeDistribution.map(d => d.color),
        borderWidth: 2,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || "";
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percent = total > 0 ? ((value / total) * 100).toFixed(1) : "0";
            return `${label}: ${value} (${percent}%)`;
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="w-[180px] h-[180px] mx-auto">
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChartReport;
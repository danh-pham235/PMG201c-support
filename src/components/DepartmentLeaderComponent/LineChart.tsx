import React from "react";

interface ScoreDensityItem {
  score: number;
  count: number;
}

interface LineChartProps {
  scoreDensity: ScoreDensityItem[];
  bins: number[];
}

const LineChart: React.FC<LineChartProps> = ({ scoreDensity, bins }) => {
  const maxCount = Math.max(...scoreDensity.map((d) => d.count), 1);
  const chartHeight = 120;
  const chartWidth = 340;
  const stepX = chartWidth / (bins.length - 1);

  // Tạo điểm cho đường cong
  const points = scoreDensity.map((d, i) => ({
    x: i * stepX,
    y: chartHeight - (d.count / maxCount) * (chartHeight - 30) - 10,
    count: d.count,
  }));

  // Tạo path mượt (Cubic Bezier)
  const getSmoothPath = (pts: typeof points) => {
    if (pts.length < 2) return "";
    let d = `M${pts[0].x},${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
      const prev = pts[i - 1];
      const curr = pts[i];
      const cpx = (prev.x + curr.x) / 2;
      d += ` Q${cpx},${prev.y} ${curr.x},${curr.y}`;
    }
    return d;
  };

  // Tạo area dưới đường
  const areaPath =
    getSmoothPath(points) +
    ` L${points[points.length - 1].x},${chartHeight} L0,${chartHeight} Z`;

  // Tìm điểm max/min
  const maxIdx = points.findIndex((p) => p.count === maxCount && maxCount > 0);
  const minCount = Math.min(...scoreDensity.map((d) => d.count));
  const minIdx = points.findIndex((p) => p.count === minCount && minCount < maxCount);

  return (
    <svg width={chartWidth} height={chartHeight + 20}>
      {/* Vùng nền dưới đường */}
      <path
        d={areaPath}
        fill="#2563eb22"
        stroke="none"
      />
      {/* Đường cong */}
      <path
        d={getSmoothPath(points)}
        fill="none"
        stroke="#2563eb"
        strokeWidth={3}
      />
      {/* Các điểm */}
      {points.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={i === maxIdx ? 7 : i === minIdx ? 6 : 4}
          fill={i === maxIdx ? "#22c55e" : i === minIdx ? "#f59e42" : "#2563eb"}
          stroke="#fff"
          strokeWidth={2}
        />
      ))}
      {/* Nhãn trục X */}
      {points.map((p, i) => (
        <text
          key={i}
          x={p.x}
          y={chartHeight + 15}
          fontSize={12}
          textAnchor="middle"
          fill="#888"
        >
          {bins[i]}
        </text>
      ))}
      {/* Số lượng trên điểm max */}
      {maxIdx !== -1 && (
        <text
          x={points[maxIdx].x}
          y={points[maxIdx].y - 12}
          fontSize={13}
          textAnchor="middle"
          fill="#22c55e"
          fontWeight="bold"
        >
          {points[maxIdx].count}
        </text>
      )}
    </svg>
  );
};

export default LineChart;
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import React from "react";

interface ScoreCircleProps {
  finalScore: number;
  isPassed: boolean;
}

const ScoreCircle: React.FC<ScoreCircleProps> = ({ finalScore, isPassed }) => {
  const circleColor = isPassed ? "#22c55e" : "#ef4444";
  const percent = Math.min(Number(finalScore) * 10, 100);
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center min-w-[160px]">
      <div className="relative mb-3">
        <svg width="110" height="110">
          <circle
            cx="55"
            cy="55"
            r={radius}
            stroke="#e5e7eb"
            strokeWidth="10"
            fill="none"
          />
          <circle
            cx="55"
            cy="55"
            r={radius}
            stroke={circleColor}
            strokeWidth="10"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-700"
            transform="rotate(-90 55 55)"
          />
        </svg>
        <span className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className={`text-4xl font-extrabold ${
              isPassed ? "text-green-600" : "text-red-500"
            }`}
          >
            {finalScore.toFixed(1)}
          </span>
        </span>
      </div>
      <div className="flex items-center gap-2">
        {isPassed ? (
          <FaCheckCircle className="text-green-500 text-2xl" />
        ) : (
          <FaTimesCircle className="text-red-500 text-2xl" />
        )}
        <span
          className={`font-semibold text-lg ${
            isPassed ? "text-green-600" : "text-red-600"
          }`}
        >
          {isPassed ? "Passed" : "Not Passed"}
        </span>
      </div>
    </div>
  );
};

export default ScoreCircle;
import { FaBookOpen, FaCheckCircle } from "react-icons/fa";
import { FiClock } from "react-icons/fi";
import React from "react";
import type { Score } from "../../types/score.type";

interface ScoreDetailsProps {
  score: Score | null;
  finalScore: number | null;
  loading: boolean;
  error: string | null;
}

const ScoreDetails: React.FC<ScoreDetailsProps> = ({
  score,
  finalScore,
  loading,
  error,
}) => (
  <div className="flex-1 flex flex-col items-start justify-center w-full">
    <div className="flex items-center gap-3 mb-2">
      <FaBookOpen className="text-blue-600 text-3xl" />
      <h2 className="text-2xl font-bold text-gray-800 whitespace-nowrap">
        PMG201c - Project Management
      </h2>
    </div>
    <div className="mt-2 text-gray-700 w-full">
      <div className="flex items-center gap-2 mb-1">
        {score?.score ? (
          <span className="font-semibold text-green-600 flex items-center gap-1">
            <FaCheckCircle /> Published
          </span>
        ) : (
          <span className="font-semibold text-yellow-500 flex items-center gap-1">
            <FiClock className="text-yellow-400" /> Grading in progress...
          </span>
        )}
      </div>
      {score?.publishedAt && (
        <div className="flex items-center gap-2 mt-1">
          <FiClock className="text-gray-400 text-base" />
          <span className="text-base text-gray-800">
            {score?.publishedAt ?? "..."}
          </span>
        </div>
      )}
    </div>
    {loading ? (
      <div className="text-gray-500 mt-6">Loading score...</div>
    ) : error ? (
      <div className="text-red-500 mt-6">{error}</div>
    ) : (
      score && (
        <div className="mt-8 flex flex-col gap-3 w-full max-w-md">
          {/* Score */}
          {score.score !== undefined && (
            <div
              className={`flex items-center justify-between rounded-xl px-6 py-3 shadow-sm ${
                finalScore && finalScore < 4
                  ? "bg-red-50 border border-red-200"
                  : "bg-green-50 border border-green-200"
              }`}
            >
              <span
                className={`font-bold text-lg px-3 py-1 rounded-full ${
                  finalScore && finalScore < 4
                    ? "text-red-700 bg-red-100"
                    : "text-green-700 bg-green-100"
                }`}
              >
                Final Score
              </span>
              <span
                className={`text-2xl font-extrabold ${
                  finalScore && finalScore < 4
                    ? "text-red-600"
                    : "text-green-800"
                }`}
              >
                {finalScore?.toFixed(1)}
              </span>
            </div>
          )}    
        </div>
      )
    )}
  </div>
);

export default ScoreDetails;

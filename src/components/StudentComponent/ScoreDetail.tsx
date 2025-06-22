import { FaBookOpen, FaCheckCircle } from "react-icons/fa";
import { FiClock } from "react-icons/fi";
import React from "react";
import type { Score } from "../../types/score.type";


interface ScoreDetailsProps {
  score: Score | null;
  loading: boolean;
  error: string | null;
}

const ScoreDetails: React.FC<ScoreDetailsProps> = ({ score, loading, error }) => (
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
            <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl px-6 py-3 shadow-sm">
              <span className="text-green-700 font-bold text-lg bg-green-100 px-3 py-1 rounded-full">
                Score
              </span>
              <span className="text-2xl font-extrabold text-green-800">
                {score.score.toFixed(1)}
              </span>
            </div>
          )}
          {/* Regrade 1 */}
          {score.regrade1 !== undefined && (
            <div className="flex items-center justify-between bg-yellow-50 border border-yellow-200 rounded-xl px-6 py-3 shadow-sm">
              <span className="text-yellow-700 font-bold text-lg bg-yellow-100 px-3 py-1 rounded-full">
                Regrade 1
              </span>
              <span className="text-2xl font-extrabold text-yellow-800">
                {score.regrade1.toFixed(1)}
              </span>
            </div>
          )}
          {/* Regrade 2 */}
          {score.regrade2 !== undefined && (
            <div className="flex items-center justify-between bg-orange-50 border border-orange-200 rounded-xl px-6 py-3 shadow-sm">
              <span className="text-orange-700 font-bold text-lg bg-orange-100 px-3 py-1 rounded-full">
                Regrade 2
              </span>
              <span className="text-2xl font-extrabold text-orange-800">
                {score.regrade2.toFixed(1)}
              </span>
            </div>
          )}
        </div>
      )
    )}
  </div>
);

export default ScoreDetails;
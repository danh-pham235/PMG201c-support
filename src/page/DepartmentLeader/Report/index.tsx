import React, { useEffect, useState } from "react";
import LineChart from "../../../components/DepartmentLeaderComponent/LineChart";
import PieChartReport from "../../../components/DepartmentLeaderComponent/CircleChart";
import {
  getDepartmentSubmissions,
  type DepartmentSubmission,
} from "../../../services/department-leader.service";
import { toast } from "react-toastify";
import { useLoadingStore } from "../../../config/zustand";

const getGradeType = (score: number | null) => {
  if (score === null || score === undefined) return "Unknown";
  if (score >= 9) return "Excellent";
  if (score >= 8) return "VeryGood";
  if (score >= 7) return "Good";
  if (score >= 6) return "Average";
  if (score >= 4) return "BelowAverage";
  return "Poor";
};

// Mapping for grade type to score range label
const gradeTypeLabels: Record<string, string> = {
  Excellent: "≥ 9.0",
  VeryGood: "≥ 8.0",
  Good: "≥ 7.0",
  Average: "≥ 6.0",
  BelowAverage: "≥ 4.0",
  Poor: "< 4.0",
  Unknown: "-",
};

const gradeColors: Record<string, string> = {
  Excellent: "#4ade80",
  VeryGood: "#60a5fa",
  Good: "#facc15",
  Average: "#f87171",
  BelowAverage: "#fbbf24",
  Poor: "#a3a3a3",
  Unknown: "#d1d5db",
};

const ScoreReport: React.FC = () => {
  const [submissions, setSubmissions] = useState<DepartmentSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const setGlobalLoading = useLoadingStore((state) => state.setLoading);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setGlobalLoading(true);
      try {
        const res = await getDepartmentSubmissions(1, 1000);
        setSubmissions(res.data);
      } catch (err) {
        toast.error("Please try again later.");
      }
      setLoading(false);
      setTimeout(() => setGlobalLoading(false), 1000);
    }
    fetchData();
  }, [setGlobalLoading]);

  if (loading) {
    return null;
  }

  // Stats
  const total = submissions.length;
  const gradedRows = submissions.filter(
    (r) => typeof r.finalScore === "number"
  );
  const avgScore =
    gradedRows.length > 0
      ? (
          gradedRows.reduce((sum, r) => sum + (r.finalScore || 0), 0) /
          gradedRows.length
        ).toFixed(2)
      : "-";
  const maxScore =
    gradedRows.length > 0
      ? Math.max(...gradedRows.map((r) => r.finalScore ?? 0)).toFixed(2)
      : "-";
  const minScore =
    gradedRows.length > 0
      ? Math.min(...gradedRows.map((r) => r.finalScore ?? 0)).toFixed(2)
      : "-";
  const aiAvgScore =
    gradedRows.length > 0
      ? (
          gradedRows.reduce((sum, r) => sum + (r.aiScore || 0), 0) /
          gradedRows.length
        ).toFixed(2)
      : "-";

  // Grade type distribution for Pie chart
  const gradeTypes = [
    "Excellent",
    "VeryGood",
    "Good",
    "Average",
    "BelowAverage",
    "Poor",
  ];
  const gradeDistribution = gradeTypes.map((type) => ({
    type,
    count: gradedRows.filter((r) => getGradeType(r.finalScore) === type).length,
    color: gradeColors[type],
  }));

  // Line chart for score density
  const bins = Array.from({ length: 11 }, (_, i) => i); // 0-10
  const scoreDensity = bins.map((bin) => ({
    score: bin,
    finalCount: gradedRows.filter(
      (r) =>
        typeof r.finalScore === "number" && Math.floor(r.finalScore!) === bin
    ).length,
    aiCount: gradedRows.filter(
      (r) => typeof r.aiScore === "number" && Math.floor(r.aiScore!) === bin
    ).length,
  }));

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-8 px-0">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-blue-900 mb-2 text-center">
            Score Dashboard
          </h1>
          <p className="text-center text-lg text-gray-500">
            Welcome back, Department Leader 👋
          </p>
        </div>
        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
            <span className="text-3xl font-bold text-blue-700">{total}</span>
            <span className="text-sm text-gray-500 mt-2">
              Total Submissions
            </span>
          </div>
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
            <span className="text-3xl font-bold text-green-600">
              {gradedRows.length}
            </span>
            <span className="text-sm text-gray-500 mt-2">Graded</span>
          </div>
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
            <span className="text-3xl font-bold text-indigo-700">
              {avgScore}
            </span>
            <span className="text-sm text-gray-500 mt-2">Average Score</span>
          </div>
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
            <span className="text-3xl font-bold text-yellow-600">
              {aiAvgScore}
            </span>
            <span className="text-sm text-gray-500 mt-2">AI Avg Score</span>
          </div>
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
            <span className="text-3xl font-bold text-gray-700">{maxScore}</span>
            <span className="text-sm text-gray-500 mt-2">Max Score</span>
          </div>
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
            <span className="text-3xl font-bold text-gray-700">{minScore}</span>
            <span className="text-sm text-gray-500 mt-2">Min Score</span>
          </div>
        </div>
        {/* Chart and legend */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="bg-white rounded-2xl shadow p-8 flex flex-col items-center">
            <h3 className="text-lg font-bold mb-4 text-blue-900">
              Score Range Statistics
            </h3>
            <PieChartReport
              gradeDistribution={gradeDistribution}
              gradeTypeLabels={gradeTypeLabels}
            />
            <div className="flex flex-wrap gap-4 mt-4 justify-center">
              {gradeDistribution.map((d) => (
                <div key={d.type} className="flex items-center gap-2">
                  <span
                    className="inline-block w-4 h-4 rounded-full"
                    style={{ background: d.color }}
                  ></span>
                  <span className="text-sm">{gradeTypeLabels[d.type]}</span>
                  <span className="text-xs text-gray-500">({d.count})</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow p-8 flex flex-col items-center">
            <h3 className="text-lg font-bold mb-4 text-blue-900">
              Score Density
            </h3>
            <LineChart scoreDensity={scoreDensity} bins={bins} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreReport;
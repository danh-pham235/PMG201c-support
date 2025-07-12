import React from "react";
import LineChart from "../../../components/DepartmentLeaderComponent/LineChart";
import PieChartReport from "../../../components/DepartmentLeaderComponent/CircleChart";

// Mock data
const mockReportData = [
  {
    submissionId: "SUB001",
    studentId: "ST001",
    studentName: "Nguyen Van A",
    examId: "EXAM001",
    examName: "PMG201c_SU25_PE_1234566",
    finalScore: 8.5,
    aiScore: 8.0,
    gradedBy: "Lecturer01",
    gradedAt: "2024-06-01",
  },
  {
    submissionId: "SUB002",
    studentId: "ST002",
    studentName: "Tran Thi B",
    examId: "EXAM001",
    examName: "PMG201c_SU25_PE_1234566",
    finalScore: 7.5,
    aiScore: 7.5,
    gradedBy: "Lecturer02",
    gradedAt: "2024-06-01",
  },
  {
    submissionId: "SUB003",
    studentId: "ST003",
    studentName: "Le Van C",
    examId: "EXAM002",
    examName: "PMG201c_SU25_PE_1234567",
    finalScore: 5.5,
    aiScore: 6.0,
    gradedBy: "Lecturer01",
    gradedAt: "2024-06-02",
  },
  {
    submissionId: "SUB004",
    studentId: "ST004",
    studentName: "Pham Thi D",
    examId: "EXAM002",
    examName: "PMG201c_SU25_PE_1234567",
    finalScore: 6.5,
    aiScore: 9.0,
    gradedBy: "Lecturer02",
    gradedAt: "2024-06-03",
  },
  {
    submissionId: "SUB004",
    studentId: "ST004",
    studentName: "Pham Thi D",
    examId: "EXAM002",
    examName: "PMG201c_SU25_PE_1234567",
    finalScore: 4.0,
    aiScore: 4.2,
    gradedBy: "Lecturer02",
    gradedAt: "2024-06-03",
  },
  {
    submissionId: "SUB005",
    studentId: "ST004",
    studentName: "Pham Thi D",
    examId: "EXAM002",
    examName: "PMG201c_SU25_PE_1234567",
    finalScore: 9.2,
    aiScore: 9.0,
    gradedBy: "Lecturer02",
    gradedAt: "2024-06-03",
  },
  {
    submissionId: "SUB006",
    studentId: "ST004",
    studentName: "Pham Thi D",
    examId: "EXAM002",
    examName: "PMG201c_SU25_PE_1234567",
    finalScore: 5.6,
    aiScore: 5.4,
    gradedBy: "Lecturer02",
    gradedAt: "2024-06-03",
  },
  {
    submissionId: "SUB007",
    studentId: "ST004",
    studentName: "Pham Thi D",
    examId: "EXAM002",
    examName: "PMG201c_SU25_PE_1234567",
    finalScore: 9.2,
    aiScore: 9.0,
    gradedBy: "Lecturer02",
    gradedAt: "2024-06-03",
  },
];

const getGradeType = (score: number | null) => {
  if (score === null || score === undefined) return "Unknown";
  if (score >= 8.5) return "Excellent";
  if (score >= 7) return "Good";
  if (score >= 5.5) return "Average";
  if (score >= 4) return "Weak";
  return "Poor";
};

// Mapping for grade type to score range label
const gradeTypeLabels: Record<string, string> = {
  Excellent: "≥ 9.0",
  Good: "≥ 8.0",
  Average: "≥ 5.0",
  Weak: "≥ 4.0",
  Poor: "< 4.0",
  Unknown: "-",
};

const gradeColors: Record<string, string> = {
  Excellent: "#4ade80",
  Good: "#60a5fa",
  Average: "#facc15",
  Weak: "#f87171",
  Poor: "#a3a3a3",
  Unknown: "#d1d5db",
};

const ScoreReport: React.FC = () => {
  // Stats
  const total = mockReportData.length;
  const gradedRows = mockReportData.filter(
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
  const gradeTypes = ["Excellent", "Good", "Average", "Weak", "Poor"];
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
      (r) => typeof r.finalScore === "number" && Math.floor(r.finalScore!) === bin
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
              Grade Distribution
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
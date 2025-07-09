import React, { useState } from "react";
import LineChart from "../../../components/DepartmentLeaderComponent/LineChart";

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
    finalScore: 7.0,
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
    finalScore: 9.2,
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
    finalScore: 9.2,
    aiScore: 9.0,
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
    finalScore: 9.2,
    aiScore: 9.0,
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

const gradeColors: Record<string, string> = {
  Excellent: "#4ade80",
  Good: "#60a5fa",
  Average: "#facc15",
  Weak: "#f87171",
  Poor: "#a3a3a3",
  Unknown: "#d1d5db",
};

const ScoreReport: React.FC = () => {
  const [search, setSearch] = useState("");

  // Stats
  const total = mockReportData.length;
  const gradedRows = mockReportData.filter((r) => typeof r.finalScore === "number");
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

  // Pie chart SVG
  const PieChart = () => {
    const totalValue = gradeDistribution.reduce((sum, d) => sum + d.count, 0);
    let startAngle = 0;
    const radius = 50;
    const cx = 60;
    const cy = 60;

    return (
      <svg width={120} height={120}>
        {gradeDistribution.map((slice, _) => {
          const angle = totalValue === 0 ? 0 : (slice.count / totalValue) * 360;
          const x1 = cx + radius * Math.cos((Math.PI * startAngle) / 180);
          const y1 = cy + radius * Math.sin((Math.PI * startAngle) / 180);
          const x2 =
            cx +
            radius *
              Math.cos((Math.PI * (startAngle + angle)) / 180);
          const y2 =
            cy +
            radius *
              Math.sin((Math.PI * (startAngle + angle)) / 180);
          const largeArc = angle > 180 ? 1 : 0;
          const pathData = `
            M ${cx} ${cy}
            L ${x1} ${y1}
            A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}
            Z
          `;
          const el = (
            <path
              key={slice.type}
              d={pathData}
              fill={slice.color}
              stroke="#fff"
              strokeWidth={2}
            />
          );
          startAngle += angle;
          return el;
        })}
      </svg>
    );
  };

  // Line chart for score density
  const bins = Array.from({ length: 11 }, (_, i) => i); // 0-10
  const scoreDensity = bins.map((bin) => ({
    score: bin,
    count: gradedRows.filter(
      (r) =>
        typeof r.finalScore === "number" &&
        Math.floor(r.finalScore!) === bin
    ).length,
  }));

  // Filtered table data
  const filteredData = mockReportData.filter(
    (row) =>
      row.studentId.toLowerCase().includes(search.toLowerCase()) ||
      row.studentName.toLowerCase().includes(search.toLowerCase()) ||
      row.examName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-8 px-0">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-blue-900 mb-2 text-center">Score Dashboard</h1>
          <p className="text-center text-lg text-gray-500">Welcome back, Department Leader 👋</p>
        </div>
        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
            <span className="text-3xl font-bold text-blue-700">{total}</span>
            <span className="text-sm text-gray-500 mt-2">Total Submissions</span>
          </div>
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
            <span className="text-3xl font-bold text-green-600">{gradedRows.length}</span>
            <span className="text-sm text-gray-500 mt-2">Graded</span>
          </div>
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
            <span className="text-3xl font-bold text-indigo-700">{avgScore}</span>
            <span className="text-sm text-gray-500 mt-2">Average Score</span>
          </div>
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
            <span className="text-3xl font-bold text-yellow-600">{aiAvgScore}</span>
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
            <h3 className="text-lg font-bold mb-4 text-blue-900">Grade Distribution</h3>
            <PieChart />
            <div className="flex flex-wrap gap-4 mt-4 justify-center">
              {gradeDistribution.map((d) => (
                <div key={d.type} className="flex items-center gap-2">
                  <span
                    className="inline-block w-4 h-4 rounded-full"
                    style={{ background: d.color }}
                  ></span>
                  <span className="text-sm">{d.type}</span>
                  <span className="text-xs text-gray-500">({d.count})</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow p-8 flex flex-col items-center">
            <h3 className="text-lg font-bold mb-4 text-blue-900">Score Density</h3>
            <LineChart scoreDensity={scoreDensity} bins={bins} />
            <div className="flex gap-2 mt-2 text-xs text-gray-500">
              {bins.map((b) => (
                <span key={b}>{b}</span>
              ))}
            </div>
          </div>
        </div>
        {/* Table */}
        <div className="bg-white rounded-2xl shadow p-8">
          <div className="flex mb-6">
            <input
              type="text"
              placeholder="Search by Student ID, Name, Exam Code"
              className="border border-blue-300 px-4 py-2 rounded-lg w-80 focus:outline-none focus:ring-2 focus:ring-blue-200"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-blue-200 rounded-xl shadow-lg overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-blue-400 to-blue-300 text-white">
                  <th className="px-4 py-3 text-center">Submission ID</th>
                  <th className="px-4 py-3 text-center">Student ID</th>
                  <th className="px-4 py-3 text-center">Student Name</th>
                  <th className="px-4 py-3 text-center">Exam Code</th>
                  <th className="px-4 py-3 text-center">Final Score</th>
                  <th className="px-4 py-3 text-center">AI Score</th>
                  <th className="px-4 py-3 text-center">Graded By</th>
                  <th className="px-4 py-3 text-center">Graded At</th>
                  <th className="px-4 py-3 text-center">Grade Type</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length === 0 && (
                  <tr>
                    <td colSpan={9} className="text-center py-8 text-gray-400">
                      No data found.
                    </td>
                  </tr>
                )}
                {filteredData.map((row, idx) => (
                  <tr
                    key={row.submissionId}
                    className={idx % 2 === 0 ? "bg-white" : "bg-blue-50"}
                  >
                    <td className="px-4 py-2 text-center">{row.submissionId}</td>
                    <td className="px-4 py-2 text-center">{row.studentId}</td>
                    <td className="px-4 py-2 text-center">{row.studentName}</td>
                    <td className="px-4 py-2 text-center">{row.examName}</td>
                    <td className="px-4 py-2 text-center">{row.finalScore ?? "-"}</td>
                    <td className="px-4 py-2 text-center">{row.aiScore ?? "-"}</td>
                    <td className="px-4 py-2 text-center">{row.gradedBy || "-"}</td>
                    <td className="px-4 py-2 text-center">{row.gradedAt || "-"}</td>
                    <td className="px-4 py-2 text-center">
                      <span
                        className="px-2 py-1 rounded-full text-xs font-semibold"
                        style={{
                          background: gradeColors[getGradeType(row.finalScore)],
                          color: "#fff",
                        }}
                      >
                        {getGradeType(row.finalScore)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreReport;











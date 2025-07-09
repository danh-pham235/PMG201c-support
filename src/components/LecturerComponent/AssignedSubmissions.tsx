import React, { useState } from "react";
import { FaPen, FaGlobe } from "react-icons/fa";

interface Submission {
  submissionId: string;
  studentId: string;
  examId: string;
  status: "Graded" | "Grading" | "Assigned";
  score?: number;
}

const mockSubmissions: Submission[] = [
  {
    submissionId: "SUB001",
    studentId: "ST001",
    examId: "PMG201c_SU25_PE_1234566",
    status: "Assigned",
  },
  {
    submissionId: "SUB002",
    studentId: "ST002",
    examId: "PMG201c_SU25_PE_1234567",
    status: "Grading",
  },
  {
    submissionId: "SUB003",
    studentId: "ST003",
    examId: "PMG201c_SU25_PE_1234568",
    status: "Graded",
    score: 8.5,
  },
];

const AssignedSubmissions: React.FC = () => {
  const [submissions] = useState<Submission[]>(mockSubmissions);

  const handleGrade = (id: string) => {
    alert(`Chấm bài cho submission ${id}`);
  };

  const handlePublicScore = (id: string) => {
    alert(`Public điểm cho submission ${id}`);
  };

  const statusCell = (status: string, score?: number) => {
    if (status === "Graded")
      return (
        <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 font-semibold rounded-full text-sm">
          Đã chấm {score !== undefined && `- ${score}`}
        </span>
      );
    if (status === "Grading")
      return (
        <span className="inline-flex items-center px-3 py-1 bg-yellow-100 text-yellow-700 font-semibold rounded-full text-sm">
          Đang chấm
        </span>
      );
    return (
      <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 font-semibold rounded-full text-sm">
        Đã giao
      </span>
    );
  };

  return (
    <div className="max-w-5xl mx-auto mt-16">
      <div className="bg-white rounded-2xl shadow-2xl border border-blue-100 p-10">
        <h2 className="text-3xl font-extrabold mb-8 text-blue-900 text-center tracking-tight">
          Danh sách bài làm đã giao cho bạn
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border border-blue-200 rounded-xl shadow overflow-hidden text-base">
            <thead>
              <tr className="bg-gradient-to-r from-blue-400 to-blue-300 text-white">
                <th className="px-6 py-3 text-center font-bold text-base uppercase tracking-wider">Submission ID</th>
                <th className="px-6 py-3 text-center font-bold text-base uppercase tracking-wider">Student ID</th>
                <th className="px-6 py-3 text-center font-bold text-base uppercase tracking-wider">Exam Code</th>
                <th className="px-6 py-3 text-center font-bold text-base uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-center font-bold text-base uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {submissions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-400">
                    No submissions assigned.
                  </td>
                </tr>
              ) : (
                submissions.map((sub, idx) => (
                  <tr
                    key={sub.submissionId}
                    className={`border-b border-blue-100 transition hover:bg-blue-50 ${
                      idx % 2 === 0 ? "bg-white" : "bg-blue-50"
                    }`}
                  >
                    <td className="px-6 py-3 text-center">{sub.submissionId}</td>
                    <td className="px-6 py-3 text-center">{sub.studentId}</td>
                    <td className="px-6 py-3 text-center">{sub.examId}</td>
                    <td className="px-6 py-3 text-center">{statusCell(sub.status, sub.score)}</td>
                    <td className="px-6 py-3 text-center space-x-3">
                      <button
                        onClick={() => handleGrade(sub.submissionId)}
                        disabled={sub.status === "Graded"}
                        className={`p-2 rounded-full border-2 transition shadow-sm hover:scale-110
                          ${sub.status === "Graded"
                            ? "border-gray-200 text-gray-300 cursor-not-allowed bg-gray-100"
                            : "border-blue-400 text-blue-600 hover:bg-blue-100"}
                        `}
                        title="Chấm bài"
                      >
                        <FaPen size={18} />
                      </button>
                      <button
                        onClick={() => handlePublicScore(sub.submissionId)}
                        disabled={sub.status !== "Graded"}
                        className={`p-2 rounded-full border-2 transition shadow-sm hover:scale-110
                          ${sub.status !== "Graded"
                            ? "border-gray-200 text-gray-300 cursor-not-allowed bg-gray-100"
                            : "border-green-400 text-green-600 hover:bg-green-100"}
                        `}
                        title="Public điểm"
                      >
                        <FaGlobe size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AssignedSubmissions;
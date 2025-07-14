import React from "react";
import { FaCheckCircle, FaTimesCircle, FaHourglassHalf } from "react-icons/fa";

interface RegradeRequest {
  id: string;
  studentId: string;
  examId: string;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
}

const mockRequests: RegradeRequest[] = [
  {
    id: "REQ001",
    studentId: "ST001",
    examId: "PMG201c_SU25_PE_1234566",
    reason: "I believe my answer for question 2 was correct.",
    status: "Pending",
  },
  {
    id: "REQ002",
    studentId: "ST002",
    examId: "PMG201c_SU25_PE_1234567",
    reason: "Please recheck my score for question 5.",
    status: "Approved",
  },
  {
    id: "REQ003",
    studentId: "ST003",
    examId: "PMG201c_SU25_PE_1234568",
    reason: "I think there was a mistake in grading.",
    status: "Rejected",
  },
];

const statusCell = (status: string) => {
  if (status === "Approved")
    return (
      <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 font-semibold rounded-full text-sm">
        <FaCheckCircle className="mr-1" /> Approved
      </span>
    );
  if (status === "Rejected")
    return (
      <span className="inline-flex items-center px-3 py-1 bg-red-100 text-red-700 font-semibold rounded-full text-sm">
        <FaTimesCircle className="mr-1" /> Rejected
      </span>
    );
  return (
    <span className="inline-flex items-center px-3 py-1 bg-yellow-100 text-yellow-700 font-semibold rounded-full text-sm">
      <FaHourglassHalf className="mr-1" /> Pending
    </span>
  );
};

const RegradeDashboard: React.FC = () => (
  <div className="max-w-5xl mx-auto mt-16">
    <div className="bg-white rounded-2xl shadow-xl border border-blue-100 p-8">
      <h2 className="text-3xl font-extrabold mb-8 text-blue-900 text-center tracking-tight">
        Regrade Requests Dashboard
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border border-blue-200 rounded-xl shadow overflow-hidden text-base">
          <thead>
            <tr className="bg-gradient-to-r from-blue-400 to-blue-300 text-white">
              <th className="px-6 py-3 text-center font-bold text-base uppercase tracking-wider">Request ID</th>
              <th className="px-6 py-3 text-center font-bold text-base uppercase tracking-wider">Student ID</th>
              <th className="px-6 py-3 text-center font-bold text-base uppercase tracking-wider">Exam Code</th>
              <th className="px-6 py-3 text-center font-bold text-base uppercase tracking-wider">Reason</th>
              <th className="px-6 py-3 text-center font-bold text-base uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {mockRequests.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-gray-400">
                  No regrade requests found.
                </td>
              </tr>
            ) : (
              mockRequests.map((req, idx) => (
                <tr
                  key={req.id}
                  className={`border-b border-blue-100 transition hover:bg-blue-50 ${
                    idx % 2 === 0 ? "bg-white" : "bg-blue-50"
                  }`}
                >
                  <td className="px-6 py-3 text-center">{req.id}</td>
                  <td className="px-6 py-3 text-center">{req.studentId}</td>
                  <td className="px-6 py-3 text-center">{req.examId}</td>
                  <td className="px-6 py-3 text-center">{req.reason}</td>
                  <td className="px-6 py-3 text-center">{statusCell(req.status)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default RegradeDashboard;
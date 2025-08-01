import React, { useState } from "react";
import {
  FaCheckCircle,
  FaHourglassHalf,
  FaInfoCircle,
  FaRedo,
  FaTimesCircle,
} from "react-icons/fa";
import type { DepartmentSubmission } from "../../types/submission.type";
import GradeRoundsPopup from "./GradeRoundsPopup";

interface SubmissionTableProps {
  data: DepartmentSubmission[];
}

const statusCell = (status: string) => {
  if (status === "Graded")
    return (
      <span className="inline-flex items-center justify-center px-4 py-1 bg-green-100 text-green-700 font-semibold rounded-full text-sm shadow-sm">
        <FaCheckCircle className="mr-1" /> Graded
      </span>
    );
  if (status === "Published")
    return (
      <span className="inline-flex items-center justify-center px-4 py-1 bg-blue-100 text-blue-700 font-semibold rounded-full text-sm shadow-sm">
        <FaCheckCircle className="mr-1" /> Published
      </span>
    );
  if (status === "Assigned")
    return (
      <span className="inline-flex items-center justify-center px-4 py-1 bg-yellow-100 text-yellow-700 font-semibold rounded-full text-sm shadow-sm">
        <FaHourglassHalf className="mr-1" /> Assigned
      </span>
    );
  if (status === "Regrade")
    return (
      <span className="inline-flex items-center justify-center px-4 py-1 bg-orange-100 text-orange-700 font-semibold rounded-full text-sm shadow-sm">
        <FaRedo className="mr-1" /> Regrade
      </span>
    );

  return (
    <span className="inline-flex items-center justify-center px-4 py-1 bg-gray-100 text-gray-600 font-semibold rounded-full text-sm shadow-sm">
      <FaTimesCircle className="mr-1" /> Not assigned
    </span>
  );
};

const SubmissionTable: React.FC<SubmissionTableProps> = ({ data }) => {
  const [openPopup, setOpenPopup] = useState<string | null>(null);

  return (
    <div className="overflow-x-auto px-6">
      <table className="w-auto min-w-[1100px] border border-blue-200 rounded-xl shadow-lg overflow-hidden mt-6 mb-2">
        <thead>
          <tr className="bg-gradient-to-r from-blue-400 to-blue-300 text-white rounded-t-xl">
            <th className="px-8 py-4 text-center font-bold text-base uppercase tracking-wider rounded-tl-xl">
              No
            </th>
            <th className="px-8 py-4 text-center font-bold text-base uppercase tracking-wider">
              Student ID
            </th>
            <th className="px-8 py-4 text-center font-bold text-base uppercase tracking-wider min-w-[260px]">
              Exam Code
            </th>
            <th className="px-8 py-4 text-center font-bold text-base uppercase tracking-wider">
              Status
            </th>
            <th className="px-8 py-4 text-center font-bold text-base uppercase tracking-wider">
              Assigned Lecturer
            </th>
            <th className="px-8 py-4 text-center font-bold text-base uppercase tracking-wider rounded-tr-xl min-w-[80px]">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr
              key={item.submissionId}
              className={`border-b border-blue-100 transition hover:bg-blue-100 ${
                idx % 2 === 0 ? "bg-white" : "bg-blue-50"
              }`}
            >
              <td className="px-8 py-3 align-top text-center">{idx + 1}</td>
              <td className="px-8 py-3 align-top text-center">
                {item.studentCode}
              </td>
              <td className="px-8 py-3 align-top text-center min-w-[260px]">
                {item.examCode}
              </td>
              <td className="px-8 py-3 align-top text-center">
                {statusCell(item.status)}
              </td>
              <td className="px-8 py-3 align-top text-center">
                {item.assignedLecturer}
              </td>
              <td className="px-4 py-3 align-top text-center">
                <button
                  onClick={() => setOpenPopup(item.submissionId)}
                  className="text-blue-600 hover:text-blue-900"
                  title="Xem chi tiết vòng chấm"
                >
                  <FaInfoCircle size={20} />
                </button>
              </td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center py-8 text-gray-400">
                No submissions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {openPopup && (
        <GradeRoundsPopup
          submissionId={openPopup}
          onClose={() => setOpenPopup(null)}
        />
      )}
    </div>
  );
};

export default SubmissionTable;

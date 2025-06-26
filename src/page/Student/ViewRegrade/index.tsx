import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import React from "react";

const mockData = [
  {
    type: "Regrade 1",
    purpose: "Xin phúc khảo điểm môn PMG201c",
    createdDate: "09/06/2025",
    processNote: "Đã tiếp nhận, đang xử lý.",
    file: "",
    status: "Approved",
    updatedAt: "10/06/2025 14:20:00",
  },
  {
    type: "Regrade 2",
    purpose: "Xin phúc khảo điểm môn PMG201c",
    createdDate: "01/06/2025",
    processNote: "Không tiếp nhận.",
    file: "",
    status: "Rejected",
    updatedAt: "03/06/2025 09:10:00",
  },
];

const statusCell = (status: string) => {
  if (status === "Approved")
    return (
      <span className="inline-flex items-center justify-center px-4 py-1 bg-green-100 text-green-700 font-semibold rounded-full text-sm shadow-sm">
        <FaCheckCircle className="mr-1" /> Approved
      </span>
    );
  if (status === "Rejected")
    return (
      <span className="inline-flex items-center justify-center px-4 py-1 bg-red-100 text-red-600 font-semibold rounded-full text-sm shadow-sm">
        <FaTimesCircle className="mr-1" /> Rejected
      </span>
    );
  return (
    <span className="inline-flex items-center justify-center px-4 py-1 bg-gray-100 text-gray-700 font-semibold rounded-full text-sm shadow-sm">
      {status}
    </span>
  );
};

const ViewRegradePage: React.FC = () => (
  <div className="max-w-full bg-white rounded-3xl shadow-2xl px-10 py-8 border border-blue-100">
    <h2 className="text-4xl font-extrabold mb-10 text-center drop-shadow-sm">
      Your Regrade Requests
    </h2>
    <div className="overflow-x-auto px-6">
      <table className="w-auto min-w-[900px] border border-blue-200 rounded-xl shadow-lg overflow-hidden mt-6 mb-2">
        <thead>
          <tr className="bg-gradient-to-r from-blue-400 to-blue-300 text-white rounded-t-xl">
            <th className="px-8 py-4 text-center font-bold text-base uppercase tracking-wider rounded-tl-xl">
              Type
            </th>
            <th className="px-8 py-4 text-center font-bold text-base uppercase tracking-wider">
              Purpose
            </th>
            <th className="px-8 py-4 text-center font-bold text-base uppercase tracking-wider">
              CreateDate
            </th>
            <th className="px-8 py-4 text-center font-bold text-base uppercase tracking-wider">
              Note
            </th>
            <th className="px-8 py-4 text-center font-bold text-base uppercase tracking-wider">
              Status
            </th>
            <th className="px-8 py-4 text-center font-bold text-base uppercase tracking-wider rounded-tr-xl">
              Process At
            </th>
          </tr>
        </thead>
        <tbody>
          {mockData.map((row, idx) => (
            <tr
              key={idx}
              className={`border-b border-blue-100 transition hover:bg-blue-100 ${
                idx % 2 === 0 ? "bg-white" : "bg-blue-50"
              }`}
            >
              <td className="px-8 py-3 align-top text-center">{row.type}</td>
              <td className="px-8 py-3 align-top text-center">{row.purpose}</td>
              <td className="px-8 py-3 align-top text-center">{row.createdDate}</td>
              <td className="px-8 py-3 align-top text-center">{row.processNote}</td>
              <td className="px-8 py-3 align-top text-center">{statusCell(row.status)}</td>
              <td className="px-8 py-3 align-top text-center">{row.updatedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
export default ViewRegradePage;
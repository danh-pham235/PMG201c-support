import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import type { RegradeRequest } from "../../types/regrade-request.type";
import { getRegradeRequestByStudentId } from "../../services/student.service";

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

const ViewRegrade: React.FC = () => {
  const [data, setData] = useState<RegradeRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getRegradeRequestByStudentId();
        setData(res);
      } catch (err: any) {
        setError(err?.message || "Error loading data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-full bg-white rounded-3xl shadow-2xl px-10 py-8 border border-blue-100">
      <h2 className="text-4xl font-extrabold mb-10 text-center drop-shadow-sm">
        Your Regrade Requests
      </h2>
      {loading ? (
        <div className="text-center text-lg">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : (
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
                  Request At
                </th>
                <th className="px-8 py-4 text-center font-bold text-base uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <tr
                  key={row.regradeRequestId || idx}
                  className={`border-b border-blue-100 transition hover:bg-blue-100 ${
                    idx % 2 === 0 ? "bg-white" : "bg-blue-50"
                  }`}
                >
                  <td className="px-8 py-3 align-top text-center">
                    {row.requestRound ? `Regrade ${row.requestRound}` : ""}
                  </td>
                  <td className="px-8 py-3 align-top text-center">
                    {row.reason}
                  </td>
                  <td className="px-8 py-3 align-top text-center">
                    {row.requestAt
                      ? new Date(row.requestAt).toLocaleDateString()
                      : ""}
                  </td>
                  <td className="px-8 py-3 align-top text-center">
                    {statusCell(row.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewRegrade;
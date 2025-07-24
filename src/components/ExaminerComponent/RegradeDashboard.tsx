import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle, FaHourglassHalf } from "react-icons/fa";
import Pagination from "../Common/Pagination"; // Đã có sẵn trong workspace
import {
  getAllRegradeRequests,
  updateRegradeRequestStatus,
} from "../../services/examiner.service";
import { useLoadingStore } from "../../config/zustand";
import { toast, ToastContainer } from "react-toastify";

interface RegradeRequest {
  regradeRequestId: string;
  studentCode: string;
  examCode: string;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
}

const PAGE_SIZE = 10;

const RegradeDashboard: React.FC = () => {
  const [requests, setRequests] = useState<RegradeRequest[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const setGlobalLoading = useLoadingStore((state) => state.setLoading);

  // Get all
  useEffect(() => {
    setGlobalLoading(true);
    getAllRegradeRequests(page, PAGE_SIZE)
      .then((res) => {
        setRequests(res.data);
        setTotal(res.total);
      })
      .finally(() => setGlobalLoading(false));
  }, [page]);

  // Update status
  const handleUpdateStatus = async (
    regradeRequestId: string,
    status: "Approved" | "Rejected"
  ) => {
    try {
      setGlobalLoading(true);
      await updateRegradeRequestStatus(regradeRequestId, status);
      toast.success("Regrade request status updated successfully.");
      const data = await getAllRegradeRequests(page, PAGE_SIZE);
      setRequests(data.data);
      setTotal(data.total);
    } catch (error: any) {
      toast.error(error?.response?.data || "Regrade request status updated failed!");
    } finally {
      setTimeout(() => setGlobalLoading(false), 1000);
    }
  };

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

  return (
    <div className="max-w-7xl w-full mx-auto mt-16">
      <div className="bg-white rounded-2xl shadow-xl border border-blue-100 p-8">
        <h2 className="text-3xl font-extrabold mb-8 text-blue-900 text-center tracking-tight">
          Regrade Requests Dashboard
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border border-blue-200 rounded-xl shadow overflow-hidden text-base">
            <thead>
              <tr className="bg-gradient-to-r from-blue-400 to-blue-300 text-white">
                <th className="px-6 py-3 text-center font-bold text-base uppercase tracking-wider">
                  No
                </th>
                <th className="px-6 py-3 text-center font-bold text-base uppercase tracking-wider">
                  Student ID
                </th>
                <th className="px-6 py-3 text-center font-bold text-base uppercase tracking-wider">
                  Exam Code
                </th>
                <th className="px-6 py-3 text-center font-bold text-base uppercase tracking-wider">
                  Reason
                </th>
                <th className="px-6 py-3 text-center font-bold text-base uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-center font-bold text-base uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {requests.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-400">
                    No regrade requests found.
                  </td>
                </tr>
              ) : (
                requests.map((req, idx) => (
                  <tr
                    key={req.regradeRequestId}
                    className={`border-b border-blue-100 transition hover:bg-blue-50 ${
                      idx % 2 === 0 ? "bg-white" : "bg-blue-50"
                    }`}
                  >
                    <td className="px-6 py-3 text-center font-semibold">
                      {(page - 1) * PAGE_SIZE + idx + 1}
                    </td>
                    <td className="px-6 py-3 text-center">{req.studentCode}</td>
                    <td className="px-6 py-3 text-center">{req.examCode}</td>
                    <td className="px-6 py-3 text-center">{req.reason}</td>
                    <td className="px-6 py-3 text-center">
                      {statusCell(req.status)}
                    </td>
                    <td className="px-6 py-3 text-center">
                      {req.status === "Pending" && (
                        <div className="flex justify-center gap-3">
                          <button
                            className="flex items-center gap-1 px-4 py-1.5 bg-green-500 text-white rounded-full shadow hover:bg-green-600 transition font-semibold"
                            onClick={() =>
                              handleUpdateStatus(
                                req.regradeRequestId,
                                "Approved"
                              )
                            }
                          >
                            <FaCheckCircle /> Approve
                          </button>
                          <button
                            className="flex items-center gap-1 px-4 py-1.5 bg-red-500 text-white rounded-full shadow hover:bg-red-600 transition font-semibold"
                            onClick={() =>
                              handleUpdateStatus(
                                req.regradeRequestId,
                                "Rejected"
                              )
                            }
                          >
                            <FaTimesCircle /> Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <Pagination
          page={page}
          totalPages={Math.ceil(total / PAGE_SIZE)}
          setPage={setPage}
        />
        <ToastContainer />
      </div>
    </div>
  );
};

export default RegradeDashboard;

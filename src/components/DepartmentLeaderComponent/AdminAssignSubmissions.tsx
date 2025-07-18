import React, { useEffect, useState } from "react";
import FilterBar from "../../components/DepartmentLeaderComponent/FilterBar";
import SubmissionTable from "../../components/DepartmentLeaderComponent/SubmissionTable";
import Pagination from "../../components/DepartmentLeaderComponent/Pagination";
import {
  autoAssignLecturers,
  getDepartmentSubmissions,
  publishScores,
  type DepartmentSubmission,
} from "../../services/department-leader.service";
import { toast, ToastContainer } from "react-toastify";
import { useLoadingStore } from "../../config/zustand";

const ITEMS_PER_PAGE = 10;

const AdminAssignSubmissions: React.FC = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<DepartmentSubmission[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const setGlobalLoading = useLoadingStore((state) => state.setLoading);

  // Filter/search states
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [examCodeFilter, setExamCodeFilter] = useState("");
  const [lecturerFilter, setLecturerFilter] = useState("");

  useEffect(() => {
    setLoading(true);
    setGlobalLoading(true);
    getDepartmentSubmissions(page, ITEMS_PER_PAGE)
      .then((res) => {
        setData(res.data);
        setTotal(res.total);
      })
      .finally(() => {
        setLoading(false);
        setTimeout(() => setGlobalLoading(false), 1000);
      });
  }, [page, setGlobalLoading]);

  // Get exam code
  const examCodes = Array.from(new Set(data.map((item) => item.examCode)));
  //Get list lecturer name
  const lecturers = Array.from(
    new Set(data.map((item) => item.assignedLecturer).filter(Boolean))
  );

  // Filtered data
  const filteredData = data.filter((item) => {
    const searchMatch =
      item.submissionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.studentCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.examCode.toLowerCase().includes(searchTerm.toLowerCase());
    const statusMatch = statusFilter ? item.status === statusFilter : true;
    const examCodeMatch = examCodeFilter
      ? item.examCode === examCodeFilter
      : true;
    const lecturerMatch = lecturerFilter
      ? item.assignedLecturer === lecturerFilter
      : true;
    return searchMatch && statusMatch && examCodeMatch && lecturerMatch;
  });

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  // Check if all submissions are graded
  const allGraded =
    data.length > 0 && data.every((item) => item.status === "Graded");

  // Check if all submissions are graded
  const allPublished =
    data.length > 0 && data.every((item) => item.status === "Published");

  const handleAutoAssign = async () => {
    if (!data.length) {
      alert("No submissions available to auto assign lecturers.");
      return;
    }
    const examId = data[0].examId;
    try {
      setLoading(true);
      setGlobalLoading(true);
      await autoAssignLecturers(examId); // examCodeFilter là assignmentId
      toast.success("Lecturers assigned successfully!");
      const res = await getDepartmentSubmissions(page, ITEMS_PER_PAGE);
      setData(res.data);
      setTotal(res.total);
    } catch (error: any) {
      toast.error(error?.response?.data || "Auto assign failed!");
    } finally {
      setLoading(false);
      setTimeout(() => setGlobalLoading(false), 1000);
    }
  };

  // Publish scores handler
  const handlePublishScores = async () => {
    if (!data.length) {
      toast.error("No submissions to publish.");
      return;
    }
    const examId = data[0].examId;
    try {
      setLoading(true);
      setGlobalLoading(true);
      await publishScores(examId);
      toast.success("Scores have been published!");
      const res = await getDepartmentSubmissions(page, ITEMS_PER_PAGE);
      setData(res.data);
      setTotal(res.total);
    } catch (error: any) {
      toast.error(error?.response?.data || "Publish failed!");
    } finally {
      setLoading(false);
      setTimeout(() => setGlobalLoading(false), 1000);
    }
  };

  // Clear filters
  const handleClearFilters = () => {
    setSearchTerm("");
    setStatusFilter("");
    setExamCodeFilter("");
    setLecturerFilter("");
  };

  if (loading) return null;

  return (
    <div className="max-w-full bg-white rounded-3xl shadow-2xl px-10 py-8 border border-blue-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-4xl font-extrabold text-center drop-shadow-sm text-blue-900">
          Submissions
        </h2>
        <div className="flex gap-4">
          {!allPublished && (
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded font-bold hover:bg-blue-700 transition"
              onClick={handleAutoAssign}
              type="button"
            >
              Auto Assign
            </button>
          )}
          {allGraded && (
            <button
              className="bg-green-600 text-white px-6 py-2 rounded font-bold hover:bg-green-700 transition"
              onClick={handlePublishScores}
              type="button"
            >
              Publish Scores
            </button>
          )}
        </div>
      </div>
      <FilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        examCodeFilter={examCodeFilter}
        setExamCodeFilter={setExamCodeFilter}
        lecturerFilter={lecturerFilter}
        setLecturerFilter={setLecturerFilter}
        examCodes={examCodes}
        lecturers={lecturers}
        onClear={handleClearFilters}
      />
      <SubmissionTable data={filteredData} />
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      <ToastContainer />
    </div>
  );
};

export default AdminAssignSubmissions;

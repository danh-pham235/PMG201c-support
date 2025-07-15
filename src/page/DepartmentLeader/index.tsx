import React, { useEffect, useState } from "react";
import FilterBar from "../../components/DepartmentLeaderComponent/FilterBar";
import SubmissionTable from "../../components/DepartmentLeaderComponent/SubmissionTable";
import Pagination from "../../components/DepartmentLeaderComponent/Pagination";
import {
  autoAssignLecturers,
  getDepartmentSubmissions,
  type DepartmentSubmission,
} from "../../services/department-leader.service";
import { toast, ToastContainer } from "react-toastify";

const ITEMS_PER_PAGE = 10;

const DepartmentLeaderPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<DepartmentSubmission[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  // Filter/search states
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [examCodeFilter, setExamCodeFilter] = useState("");
  const [lecturerFilter, setLecturerFilter] = useState("");

  useEffect(() => {
    setLoading(true);
    getDepartmentSubmissions(page, ITEMS_PER_PAGE)
      .then((res) => {
        setData(res.data);
        setTotal(res.total);
      })
      .finally(() => setLoading(false));
  }, [page]);

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

  const handleAutoAssign = async () => {
    if (!data.length) {
      alert("No submissions available to auto assign lecturers.");
      return;
    }
    const examId = data[0].examId;
    try {
      setLoading(true);
      await autoAssignLecturers(examId); // examCodeFilter là assignmentId
      toast.success("Lecturers assigned successfully!");
      const res = await getDepartmentSubmissions(page, ITEMS_PER_PAGE);
      setData(res.data);
      setTotal(res.total);
    } catch (error: any) {
      toast.error(error?.response?.data || "Auto assign failed!");
    } finally {
      setLoading(false);
    }
  };

  // Publish scores handler
  const handlePublishScores = () => {
    alert("Scores have been published!");
  };

  // Clear filters
  const handleClearFilters = () => {
    setSearchTerm("");
    setStatusFilter("");
    setExamCodeFilter("");
    setLecturerFilter("");
  };

  return (
    <div className="max-w-full bg-white rounded-3xl shadow-2xl px-10 py-8 border border-blue-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-4xl font-extrabold text-center drop-shadow-sm text-blue-900">
          Submissions
        </h2>
        <div className="flex gap-4">
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded font-bold hover:bg-blue-700 transition"
            onClick={handleAutoAssign}
            type="button"
          >
            Auto Assign
          </button>
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
      {loading && (
        <div className="fixed left-0 top-0 w-full h-full bg-white bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 pointer-events-none">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 border-solid"></div>
          <span className="ml-4 text-xl text-blue-700 font-bold">
            Loading...
          </span>
        </div>
      )}
    </div>
  );
};

export default DepartmentLeaderPage;

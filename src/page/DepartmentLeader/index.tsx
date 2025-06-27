import React, { useState } from "react";
import FilterBar from "../../components/DepartmentLeaderComponent/FilterBar";
import SubmissionTable from "../../components/DepartmentLeaderComponent/SubmissionTable";
import Pagination from "../../components/DepartmentLeaderComponent/Pagination";

interface Submission {
  submissionId: string;
  studentId: string;
  examId: string;
  status: "Graded" | "Grading" | "Not assigned";
  assignedLecturerName: string;
}

interface Lecturer {
  lecturerId: string;
  lecturerName: string;
}

const lecturers: Lecturer[] = [
  { lecturerId: "L01", lecturerName: "Mr. Nguyen Van A" },
  { lecturerId: "L02", lecturerName: "Ms. Tran Thi B" },
  { lecturerId: "L03", lecturerName: "Mr. Le Van C" },
  { lecturerId: "L04", lecturerName: "Ms. Nguyen Thi D" },
  { lecturerId: "L05", lecturerName: "Mr. Pham Van E" },
];

// Sample submissions
const mockData: Submission[] = [
  {
    submissionId: "SUB001",
    studentId: "ST001",
    examId: "PMG201c_SU25_PE_1234566",
    status: "Not assigned",
    assignedLecturerName: "",
  },
  {
    submissionId: "SUB002",
    studentId: "ST002",
    examId: "PMG201c_SU25_PE_1234567",
    status: "Not assigned",
    assignedLecturerName: "",
  },
  {
    submissionId: "SUB003",
    studentId: "ST003",
    examId: "PMG201c_SU25_PE_1234568",
    status: "Not assigned",
    assignedLecturerName: "",
  },
  {
    submissionId: "SUB004",
    studentId: "ST004",
    examId: "PMG201c_SU25_PE_1234569",
    status: "Not assigned",
    assignedLecturerName: "",
  },
  {
    submissionId: "SUB005",
    studentId: "ST005",
    examId: "PMG201c_SU25_PE_1234570",
    status: "Not assigned",
    assignedLecturerName: "",
  },
  {
    submissionId: "SUB006",
    studentId: "ST006",
    examId: "PMG201c_SU25_PE_1234571",
    status: "Not assigned",
    assignedLecturerName: "",
  },
  {
    submissionId: "SUB007",
    studentId: "ST007",
    examId: "PMG201c_SU25_PE_1234572",
    status: "Not assigned",
    assignedLecturerName: "",
  },
  {
    submissionId: "SUB008",
    studentId: "ST008",
    examId: "PMG201c_SU25_PE_1234573",
    status: "Not assigned",
    assignedLecturerName: "",
  },
  {
    submissionId: "SUB009",
    studentId: "ST009",
    examId: "PMG201c_SU25_PE_1234574",
    status: "Not assigned",
    assignedLecturerName: "",
  },
  {
    submissionId: "SUB010",
    studentId: "ST010",
    examId: "PMG201c_SU25_PE_1234575",
    status: "Not assigned",
    assignedLecturerName: "",
  },
  {
    submissionId: "SUB011",
    studentId: "ST011",
    examId: "PMG201c_SU25_PE_1234576",
    status: "Not assigned",
    assignedLecturerName: "",
  },
  {
    submissionId: "SUB012",
    studentId: "ST012",
    examId: "PMG201c_SU25_PE_1234577",
    status: "Not assigned",
    assignedLecturerName: "",
  },
  {
    submissionId: "SUB013",
    studentId: "ST013",
    examId: "PMG201c_SU25_PE_1234578",
    status: "Not assigned",
    assignedLecturerName: "",
  },
  {
    submissionId: "SUB014",
    studentId: "ST014",
    examId: "PMG201c_SU25_PE_1234579",
    status: "Not assigned",
    assignedLecturerName: "",
  },
  {
    submissionId: "SUB015",
    studentId: "ST015",
    examId: "PMG201c_SU25_PE_1234580",
    status: "Not assigned",
    assignedLecturerName: "",
  },
];
const ITEMS_PER_PAGE = 10;

const DepartmentLeaderPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<Submission[]>(mockData);

  // Filter/search states
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [examCodeFilter, setExamCodeFilter] = useState("");
  const [lecturerFilter, setLecturerFilter] = useState("");

  // Unique exam codes for filter
  const examCodes = Array.from(new Set(data.map((item) => item.examId)));

  // Filtered data
  const filteredData = data.filter((item) => {
    const searchMatch =
      item.submissionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.examId.toLowerCase().includes(searchTerm.toLowerCase());
    const statusMatch = statusFilter ? item.status === statusFilter : true;
    const examCodeMatch = examCodeFilter ? item.examId === examCodeFilter : true;
    const lecturerMatch = lecturerFilter
      ? lecturers.find((l) => l.lecturerId === lecturerFilter)?.lecturerName ===
        item.assignedLecturerName
      : true;
    return searchMatch && statusMatch && examCodeMatch && lecturerMatch;
  });

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  // Check if all submissions are graded
  const allGraded =
    data.length > 0 && data.every((item) => item.status === "Graded");

  // Auto assign handler
  const handleAutoAssign = async () => {
    const newData = data.map((item, idx) => ({
      ...item,
      assignedLecturerName: lecturers[idx % lecturers.length].lecturerName,
      status: item.status === "Not assigned" ? "Grading" : item.status,
    }));
    setData(newData);
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
      <SubmissionTable data={paginatedData} />
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
};

export default DepartmentLeaderPage;
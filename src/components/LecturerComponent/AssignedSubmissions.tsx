import React, { useState, useEffect } from "react";
import { FaPen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getAssignedDistributions, getAllExam } from "../../services/lecturer.service";
import { useLoadingStore } from "../../config/zustand";

interface Exam {
  examId: string;
  semester: string;
  code: string;
}

interface Distribution {
  submissionDistributionId: string;
  submissionId: string;
  examId: string;
  studentCode: string;
  finalScore: number | null;
  status: string;
  assignedAt: string;
  deadline: string;
}

const AssignedSubmissions: React.FC = () => {
  const navigate = useNavigate();
  const [exams, setExams] = useState<Exam[]>([]);
  const [semesters, setSemesters] = useState<string[]>([]);
  const [selectedSemester, setSelectedSemester] = useState<string>("");
  const [distributions, setDistributions] = useState<Distribution[]>([]);
  const [loading, setLoadingLocal] = useState(false);
  const { setLoading } = useLoadingStore();

  // Lấy danh sách exam-examiner khi mount
  useEffect(() => {
    const fetchExams = async () => {
      try {
        const data = (await getAllExam()) as Exam[];
        setExams(data);
        // Lấy danh sách semester duy nhất
        const uniqueSemesters = Array.from(new Set(data.map((exam) => exam.semester)));
        setSemesters(uniqueSemesters);
      } catch (error) {
        setExams([]);
        setSemesters([]);
      }
    };
    fetchExams();
  }, []);

  // Khi chọn semester, lấy tất cả examId thuộc semester đó và gọi API cho từng examId
  useEffect(() => {
    const fetchDistributions = async () => {
      if (!selectedSemester) {
        setDistributions([]);
        return;
      }
      setLoading(true); // Bật loading screen toàn cục
      setLoadingLocal(true);
      const examsInSemester = exams.filter((exam) => exam.semester === selectedSemester);
      const start = Date.now();
      try {
        const allDistributions = await Promise.all(
          examsInSemester.map((exam) => getAssignedDistributions(exam.examId))
        );
        setDistributions(allDistributions.flat());
      } catch {
        setDistributions([]);
      } finally {
        // Đảm bảo loading tối thiểu 500ms
        const elapsed = Date.now() - start;
        const minLoading = 500;
        if (elapsed < minLoading) {
          setTimeout(() => {
            setLoading(false);
            setLoadingLocal(false);
          }, minLoading - elapsed);
        } else {
          setLoading(false);
          setLoadingLocal(false);
        }
      }
    };
    fetchDistributions();
  }, [selectedSemester, exams]);

  const handleGrade = (submissionId: string, examId: string) => {
    navigate("/lecturer/grade-submission", { state: { submissionId, examId } });
  };

  return (
    <div className="max-w-4xl mx-auto mt-20">
      <div className="bg-white rounded-3xl shadow-2xl border border-blue-100 p-12">
        <h2 className="text-4xl font-extrabold mb-10 text-blue-900 text-center tracking-tight drop-shadow-lg">
          List of Assigned Submissions
        </h2>
        <div className="flex gap-4 mb-8 justify-center">
          <select
            className="border rounded-lg px-4 py-2"
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
          >
            <option value="">Select Semester</option>
            {semesters.map((sem) => (
              <option key={sem} value={sem}>{sem}</option>
            ))}
          </select>
        </div>
        <div>
          <table className="w-full table-fixed border-separate border-spacing-y-2">
            <colgroup>
              <col style={{ width: '30%' }} />
              <col style={{ width: '30%' }} />
              <col style={{ width: '20%' }} />
              <col style={{ width: '20%' }} />
            </colgroup>
            <thead>
              <tr className="bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-xl shadow">
                <th className="px-4 py-3 text-center font-bold text-base uppercase tracking-wider rounded-l-xl">Student Code</th>
                <th className="px-4 py-3 text-center font-bold text-base uppercase tracking-wider">Assigned At</th>
                <th className="px-4 py-3 text-center font-bold text-base uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-center font-bold text-base uppercase tracking-wider rounded-r-xl">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} className="text-center py-10 text-blue-400 text-lg">Loading...</td></tr>
              ) : distributions.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-10 text-gray-400 text-lg">
                    No assigned submissions.
                  </td>
                </tr>
              ) : (
                distributions.map((dist, idx) => (
                  <tr
                    key={dist.submissionDistributionId}
                    className={`transition hover:scale-[1.01] hover:shadow-lg duration-150 bg-white rounded-xl border border-blue-100 ${idx % 2 === 0 ? "" : "bg-blue-50"}`}
                  >
                    <td className="px-6 py-4 text-center font-medium text-blue-900 rounded-l-xl">{dist.studentCode}</td>
                    <td className="px-6 py-4 text-center text-blue-800">{new Date(dist.assignedAt).toLocaleString()}</td>
                    <td className="px-6 py-4 text-center">
                      {dist.status === "Completed" ? (
                        <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold text-sm shadow">Completed</span>
                      ) : dist.status === "InProgress" ? (
                        <span className="inline-block px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 font-semibold text-sm shadow">In Progress</span>
                      ) : (
                        <span className="inline-block px-3 py-1 rounded-full bg-gray-100 text-gray-700 font-semibold text-sm shadow">{dist.status}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center rounded-r-xl">
                      <button
                        onClick={() => handleGrade(dist.submissionId, dist.examId)}
                        disabled={dist.status === "Graded"}
                        className={`p-2 rounded-full border-2 transition shadow-sm hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-300
                          ${dist.status === "Graded"
                            ? "border-gray-200 text-gray-300 cursor-not-allowed bg-gray-100"
                            : "border-blue-400 text-blue-600 hover:bg-blue-100 bg-white"}
                        `}
                        title="Grade"
                      >
                        <FaPen size={18} />
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
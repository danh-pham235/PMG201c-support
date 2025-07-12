import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FaCloudUploadAlt } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { uploadSubmission, getAssignmentsExaminer, getSubmissionTable } from "../../services/examinerService";
import { MdOutlineUploadFile } from "react-icons/md";

interface Exam {
  examId: string;
  semester: string;
}

interface SubmissionTableRow {
  studentId: string;
  status: string;
}

const UploadSubmissions: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [submissions, setSubmissions] = useState<SubmissionTableRow[]>([]);
  const [examList, setExamList] = useState<Exam[]>([]);
  const [selectedExamId, setSelectedExamId] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [loadingExams, setLoadingExams] = useState(true);
  const [loadingSubmissions, setLoadingSubmissions] = useState(true);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        setLoadingExams(true);
        const res = await getAssignmentsExaminer();
        const exams = (res || []).map((item: any) => ({
          examId: item.examId,
          semester: item.semester,
        }));
        setExamList(exams);
        if (exams.length > 0) setSelectedExamId(exams[0].examId);
      } catch (err) {
        toast.error("Failed to load exam list");
      } finally {
        setLoadingExams(false);
      }
    };
    fetchExams();
  }, []);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoadingSubmissions(true);
        const res = await getSubmissionTable();
        setSubmissions(Array.isArray(res?.data) ? res.data : []);
      } catch (err) {
        toast.error("Failed to load submissions");
      } finally {
        setLoadingSubmissions(false);
      }
    };
    fetchSubmissions();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file to upload.");
      return;
    }
    if (!selectedExamId) {
      toast.error("Please select a semester.");
      return;
    }
    try {
      setUploading(true);
      await uploadSubmission(selectedExamId, file);
      toast.success("File uploaded successfully!");
      setFile(null);
      (document.getElementById("file-input") as HTMLInputElement).value = "";
      // Reload submissions after upload
      const res = await getSubmissionTable();
      setSubmissions(Array.isArray(res?.data) ? res.data : []);
    } catch (error) {
      toast.error("Error uploading file. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-start gap-10">
      <ToastContainer position="top-right" autoClose={2000} />
      {/* Card upload submissions */}
      <div className="bg-gradient-to-br from-blue-100 via-white to-blue-50 rounded-3xl shadow-2xl p-10 flex flex-col items-center space-y-5 min-w-[340px] max-w-lg w-full border border-blue-200 animate-fade-in">
        <div className="flex flex-col items-center mb-2">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-400 to-blue-200 flex items-center justify-center shadow-lg mb-2">
            <MdOutlineUploadFile size={48} className="text-white drop-shadow" />
          </div>
          <h2 className="text-2xl font-extrabold text-blue-800 mt-2">Upload Student Submissions</h2>
        </div>
        <p className="text-sm text-gray-600 text-center mb-2">Accepted file type: <b>ZIP</b></p>
        <p className="text-xs text-gray-400 text-center mb-2">Step 1: Select the corresponding semester</p>
        {loadingExams ? (
          <div className="text-blue-500 font-semibold">Loading semesters...</div>
        ) : (
          <select
            value={selectedExamId}
            onChange={e => setSelectedExamId(e.target.value)}
            className="mb-2 px-3 py-2 border border-blue-200 rounded-lg w-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            {examList.length === 0 ? (
              <option value="">No semester available</option>
            ) : (
              examList.map((exam) => (
                <option key={exam.examId} value={exam.examId}>
                  {exam.semester}
                </option>
              ))
            )}
          </select>
        )}
        <p className="text-xs text-gray-400 text-center mb-2">Step 2: Choose the submissions file to upload</p>
        <input
          id="file-input"
          type="file"
          accept=".zip"
          onChange={handleFileChange}
          className="hidden"
        />
        <label
          htmlFor="file-input"
          className="flex items-center justify-center gap-2 bg-blue-50 text-blue-700 px-4 py-3 rounded-lg cursor-pointer font-semibold hover:bg-blue-200 transition w-full text-center border border-blue-300 shadow"
          style={{ fontSize: '1.1rem' }}
        >
          <FaCloudUploadAlt size={20} />
          {file ? "Selected: " + file.name : "Choose submissions file (.zip)"}
        </label>
        {file && (
          <div className="text-sm text-blue-500 mt-1 font-medium">{file.name}</div>
        )}
        <button
          type="button"
          onClick={handleUpload}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:from-blue-600 hover:to-blue-700 transition w-full shadow-lg disabled:opacity-60 mt-2"
          disabled={uploading || loadingExams || examList.length === 0}
        >
          {uploading ? "Uploading..." : "Upload Submissions"}
        </button>
      </div>
      {/* Card chứa bảng submissions */}
      <div className="max-w-xl w-full bg-gradient-to-br from-blue-50 via-white to-blue-100 rounded-3xl shadow-2xl p-10 border border-blue-200 animate-fade-in">
        <h2 className="text-3xl font-extrabold mb-8 text-blue-900 text-center tracking-tight">Uploaded Submissions</h2>
        <div>
          <h3 className="text-lg font-semibold mb-4 text-blue-800">Submission Table</h3>
          <div className="overflow-x-auto">
            <table className="w-full border border-blue-200 rounded-2xl shadow overflow-hidden text-base">
              <thead>
                <tr className="bg-gradient-to-r from-blue-400 to-blue-300 text-white">
                  <th className="px-6 py-4 text-left font-bold rounded-tl-2xl">Student ID</th>
                  <th className="px-6 py-4 text-left font-bold rounded-tr-2xl">Status</th>
                </tr>
              </thead>
              <tbody>
                {loadingSubmissions ? (
                  <tr>
                    <td colSpan={2} className="text-center py-12 text-blue-400 animate-pulse">
                      <svg className="mx-auto mb-2 animate-spin" width="32" height="32" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#60A5FA" strokeWidth="4" strokeDasharray="60" strokeDashoffset="20"/></svg>
                      Loading data...
                    </td>
                  </tr>
                ) : submissions.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="text-center py-12 text-gray-400">
                      <svg className="mx-auto mb-2" width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" fill="#A0AEC0"/></svg>
                      No submissions data available
                    </td>
                  </tr>
                ) : (
                  submissions.map((sub, idx) => (
                    <tr
                      key={sub.studentId + sub.status}
                      className={`transition hover:bg-blue-100 ${idx % 2 === 0 ? "bg-white" : "bg-blue-50"}`}
                    >
                      <td className="px-6 py-4 border-b border-blue-100">{sub.studentId}</td>
                      <td className="px-6 py-4 border-b border-blue-100">{sub.status}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadSubmissions;
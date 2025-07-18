import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { uploadExamPaper, uploadBarem, getAssignmentsExaminer } from "../../services/examinerService";
import { FaFileUpload } from "react-icons/fa";
import { MdOutlineAssignment, MdOutlineRuleFolder } from "react-icons/md";
import { useLoadingStore } from "../../config/zustand";

const UploadExamWithBarem: React.FC = () => {
  // Exam Paper
  const [examPaper, setExamPaper] = useState<File | null>(null);
  const [semester, setSemester] = useState("");

  // Barem
  const [baremFile, setBaremFile] = useState<File | null>(null);
  const [examList, setExamList] = useState<{ examId: string; semester: string }[]>([]);
  const [selectedExamId, setSelectedExamId] = useState<string>("");

  const setLoading = useLoadingStore((state) => state.setLoading);

  const fetchExams = async () => {
    try {
      setLoading(true);
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
      setTimeout(() => setLoading(false), 1000);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  // Upload exam paper
  const handleUploadExamPaper = async () => {
    if (!examPaper) {
      toast.error("Please select an exam paper file.");
      return;
    }
    if (!semester.trim()) {
      toast.error("Please enter semester.");
      return;
    }
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("DTOFile", examPaper);
      formData.append("semester", semester);
      await uploadExamPaper(formData);
      toast.success("Exam paper uploaded successfully!");
      setExamPaper(null);
      setSemester("");
      (document.getElementById("exam-paper-input") as HTMLInputElement).value = "";
      await fetchExams();
    } catch (err) {
      toast.error("Failed to upload exam paper");
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  };

  // Upload barem
  const handleUploadBarem = async () => {
    if (!baremFile) {
      toast.error("Please select a barem file.");
      return;
    }
    if (!selectedExamId) {
      toast.error("Please select an exam.");
      return;
    }
    try {
      setLoading(true);
      await uploadBarem(selectedExamId, baremFile);
      toast.success("Barem file uploaded successfully!");
      setBaremFile(null);
      (document.getElementById("barem-file-input") as HTMLInputElement).value = "";
    } catch (err) {
      toast.error("Failed to upload barem file");
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-12">
      <ToastContainer position="top-right" autoClose={2000} />
      {/* Responsive row for upload cards */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full">
        {/* Upload Exam Paper */}
        <div className="bg-gradient-to-br from-blue-100 via-white to-blue-50 rounded-3xl shadow-2xl p-10 flex flex-col items-center space-y-5 min-w-[320px] max-w-lg w-full border border-blue-200 animate-fade-in">
          <div className="flex flex-col items-center mb-2">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-400 to-blue-200 flex items-center justify-center shadow-lg mb-2">
              <MdOutlineAssignment size={48} className="text-white drop-shadow" />
            </div>
            <h2 className="text-2xl font-extrabold text-blue-800 mt-2">Upload Exam Paper</h2>
          </div>
          <p className="text-sm text-gray-600 text-center mb-2">Accepted file types: <b>PNG, JPG, JPEG</b></p>
          <p className="text-xs text-gray-400 text-center mb-2">Step 1: Enter the semester (e.g. <b>SU25, SU25-L1, SU25-L2, ...</b>)</p>
          <input
            type="text"
            placeholder="Enter semester (e.g. SU25, SU25-L1, SU25-L2, ...)"
            value={semester}
            onChange={e => setSemester(e.target.value)}
            className="mb-2 px-3 py-2 border border-blue-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <p className="text-xs text-gray-400 text-center mb-2">Step 2: Choose the exam paper file to upload</p>
          <input
            id="exam-paper-input"
            type="file"
            accept=".png,.jpg,.jpeg"
            onChange={e => setExamPaper(e.target.files?.[0] || null)}
            className="hidden"
          />
          <label
            htmlFor="exam-paper-input"
            className="flex items-center justify-center gap-2 bg-blue-50 text-blue-700 px-4 py-3 rounded-lg cursor-pointer font-semibold hover:bg-blue-200 transition w-full text-center border border-blue-300 shadow"
            style={{ fontSize: '1.1rem' }}
          >
            <FaFileUpload size={20} />
            {examPaper ? "Selected: " + examPaper.name : "Choose exam paper file"}
          </label>
          {examPaper && (
            <div className="text-sm text-blue-500 mt-1 font-medium">{examPaper.name}</div>
          )}
          <button
            type="button"
            onClick={handleUploadExamPaper}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:from-blue-600 hover:to-blue-700 transition w-full shadow-lg disabled:opacity-60 mt-2"
            >
            Upload Exam Paper
          </button>
        </div>
        {/* Upload Barem */}
        <div className="bg-gradient-to-br from-green-100 via-white to-green-50 rounded-3xl shadow-2xl p-10 flex flex-col items-center space-y-5 min-w-[320px] max-w-lg w-full border border-green-200 animate-fade-in">
          <div className="flex flex-col items-center mb-2">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-green-400 to-green-200 flex items-center justify-center shadow-lg mb-2">
              <MdOutlineRuleFolder size={48} className="text-white drop-shadow" />
            </div>
            <h2 className="text-2xl font-extrabold text-green-800 mt-2">Upload Barem File</h2>
          </div>
          <p className="text-sm text-gray-600 text-center mb-2">Accepted file type: <b>PDF</b></p>
          <p className="text-xs text-gray-400 text-center mb-2">Select the semester corresponding to the exam paper</p>
          <select
            value={selectedExamId}
            onChange={e => setSelectedExamId(e.target.value)}
            className="mb-2 px-3 py-2 border border-green-200 rounded-lg w-full bg-white focus:outline-none focus:ring-2 focus:ring-green-300"
          >
            {examList.length === 0 ? (
              <option value="">No exam available</option>
            ) : (
              examList.map((exam) => (
                <option key={exam.examId} value={exam.examId}>
                  {exam.semester}
                </option>
              ))
            )}
          </select>
          <p className="text-xs text-gray-400 text-center mb-2">Choose the barem file to upload</p>
          <input
            id="barem-file-input"
            type="file"
            accept=".pdf"
            onChange={e => setBaremFile(e.target.files?.[0] || null)}
            className="hidden"
          />
          <label
            htmlFor="barem-file-input"
            className="flex items-center justify-center gap-2 bg-green-50 text-green-700 px-4 py-3 rounded-lg cursor-pointer font-semibold hover:bg-green-200 transition w-full text-center border border-green-300 shadow"
            style={{ fontSize: '1.1rem' }}
          >
            <FaFileUpload size={20} />
            {baremFile ? "Selected: " + baremFile.name : "Choose barem file"}
          </label>
          {baremFile && (
            <div className="text-sm text-green-600 mt-1 font-medium">{baremFile.name}</div>
          )}
          <button
            type="button"
            onClick={handleUploadBarem}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-xl font-bold hover:from-green-600 hover:to-green-700 transition w-full shadow-lg disabled:opacity-60 mt-2"
            >
            Upload Barem File
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadExamWithBarem;

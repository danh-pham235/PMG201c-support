import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FaCloudUploadAlt } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { uploadSubmission, getAssignmentsExaminer } from "../../services/examinerService";
import { MdOutlineUploadFile } from "react-icons/md";
import { useLoadingStore } from "../../config/zustand";

interface Exam {
  examId: string;
  semester: string;
}

const UploadSubmissions: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [examList, setExamList] = useState<Exam[]>([]);
  const [selectedExamId, setSelectedExamId] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [loadingExams, setLoadingExams] = useState(true);
  const setLoading = useLoadingStore((state) => state.setLoading);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        setLoading(true);
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
        setTimeout(() => setLoading(false), 1000);
      }
    };
    fetchExams();
  }, [setLoading]);

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
      setLoading(true);
      setUploading(true);
      await uploadSubmission(selectedExamId, file);
      toast.success("File uploaded successfully!");
      setFile(null);
      (document.getElementById("file-input") as HTMLInputElement).value = "";
    } catch (error) {
      toast.error("Error uploading file. Please try again.");
    } finally {
      setUploading(false);
      setTimeout(() => setLoading(false), 1000);
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
    </div>
  );
};

export default UploadSubmissions;
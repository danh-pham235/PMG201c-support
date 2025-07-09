import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FaCloudUploadAlt } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

interface Submission {
  id: string;
  name: string;
  uploadedAt: string;
}

const UploadSubmissions: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);

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
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("File uploaded successfully!");
      setSubmissions((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          name: file.name,
          uploadedAt: new Date().toLocaleString(),
        },
      ]);
      setFile(null);
      (document.getElementById("file-input") as HTMLInputElement).value = "";
    } catch (error) {
      toast.error("Error uploading file. Please try again.");
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <ToastContainer position="top-right" autoClose={2000} />
      {/* Card nhỏ chứa nút upload */}
      <div className="fixed top-28 right-20 z-50">
        <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center space-y-4 min-w-[270px] border border-blue-100">
          <FaCloudUploadAlt className="text-blue-500" size={38} />
          <input
            id="file-input"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="hidden"
          />
          <label
            htmlFor="file-input"
            className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg cursor-pointer font-semibold hover:bg-blue-100 transition w-full text-center border border-blue-200"
          >
            {file ? file.name : "Choose file"}
          </label>
          <button
            type="button"
            onClick={handleUpload}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:from-blue-600 hover:to-blue-700 transition w-full shadow"
          >
            Upload
          </button>
        </div>
      </div>
      {/* Card chỉ chứa bảng */}
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl p-10 mt-28 border border-blue-100">
        <h2 className="text-3xl font-extrabold mb-8 text-blue-900 text-center tracking-tight">Upload Student Submissions</h2>
        <div>
          <h3 className="text-lg font-semibold mb-4 text-blue-800">Uploaded Submissions</h3>
          <div className="overflow-x-auto">
            <table className="w-full border border-blue-200 rounded-xl shadow overflow-hidden text-base">
              <thead>
                <tr className="bg-gradient-to-r from-blue-400 to-blue-300 text-white">
                  <th className="px-4 py-3 text-left font-bold">File Name</th>
                  <th className="px-4 py-3 text-left font-bold">Uploaded At</th>
                </tr>
              </thead>
              <tbody>
                {submissions.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="text-center py-8 text-gray-400">
                      No data available
                    </td>
                  </tr>
                ) : (
                  submissions.map((sub, idx) => (
                    <tr
                      key={sub.id}
                      className={`border-t transition hover:bg-blue-50 ${
                        idx % 2 === 0 ? "bg-white" : "bg-blue-50"
                      }`}
                    >
                      <td className="px-4 py-3">{sub.name}</td>
                      <td className="px-4 py-3">{sub.uploadedAt}</td>
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
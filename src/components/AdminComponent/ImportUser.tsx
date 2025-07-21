import React, { useState } from "react";
import { importUsers } from "../../services/admin.service";
import { toast } from "react-toastify";
import { FaFileUpload } from "react-icons/fa";

const ImportUser: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select an Excel file!");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("DTOFile", file);
    try {
      await importUsers(formData);
      toast.success("Import successful!");
      setFile(null);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Import failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center w-full min-h-[350px]">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-lg flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-2">
          <FaFileUpload size={48} className="text-blue-500 mb-2" />
          <h2 className="text-2xl font-bold text-blue-700 text-center">Import Users</h2>
          <p className="text-gray-500 text-center text-sm max-w-xs">Upload an Excel file (.xlsx, .xls) to import user accounts in bulk. Make sure your file matches the required format.</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full items-center">
          <label className="w-full flex flex-col items-center px-4 py-6 bg-blue-50 text-blue-700 rounded-xl shadow cursor-pointer border-2 border-dashed border-blue-200 hover:bg-blue-100 transition">
            <span className="font-semibold mb-2">Choose Excel File</span>
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileChange}
              className="hidden"
            />
            <span className="text-xs text-gray-400 mt-1">Accepted: .xlsx, .xls</span>
            {file && <span className="mt-2 text-green-600 font-medium">{file.name}</span>}
          </label>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-green-400 text-white font-semibold py-3 rounded-full shadow-lg hover:from-blue-600 hover:to-green-500 transition disabled:opacity-60 text-lg mt-2"
          >
            {loading ? "Importing..." : "Import"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ImportUser;

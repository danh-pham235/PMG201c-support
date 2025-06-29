import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import UploadSubmissions from "../../components/ExaminerComponent/UploadSubmissions";
import RegradeDashboard from "../../components/ExaminerComponent/RegradeDashboard";

const ExaminerPage: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="upload-submissions" replace />} />
      <Route path="upload-submissions" element={<UploadSubmissions />} />
      <Route path="regrade-dashboard" element={<RegradeDashboard />} />
    </Routes>
  );
};

export default ExaminerPage;
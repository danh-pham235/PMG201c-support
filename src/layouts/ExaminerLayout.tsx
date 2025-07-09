import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import { FaUpload } from "react-icons/fa";
import { GoReport } from "react-icons/go";

const menuItems = [
  {
    key: "/examiner/upload-submissions",
    icon: <FaUpload size={28} />,
    label: "Upload Submissions",
  },
  {
    key: "/examiner/regrade-dashboard",
    icon: <GoReport size={28} />,
    label: "Regrade Requests",
  },
];

const ExaminerLayout: React.FC = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-10">
        <div className="flex gap-4 items-start mt-12 w-full">
          <Sidebar menuItems={menuItems} />
          <div className="flex-1 flex justify-center">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default ExaminerLayout;
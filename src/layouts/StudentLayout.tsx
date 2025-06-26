import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/StudentComponent/Sidebar";
import Header from "./Header/Header";

const StudentLayout: React.FC = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-10">
        <div className="flex gap-4 items-start mt-12 w-full">
          <Sidebar />
          <div className="flex-1 flex justify-center">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentLayout;
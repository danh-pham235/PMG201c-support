import React from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import { FaBookOpen } from "react-icons/fa";
import { MdOutlineReport } from "react-icons/md";

const menuItems = [
  {
    key: "/department-leader/submissions",
    icon: <FaBookOpen size={28} />,
    label: "Submissions",
  },
  {
    key: "/department-leader/report",
    icon: <MdOutlineReport size={28} />,
    label: "Report",
  },
];

const DepartmentLeaderLayout: React.FC = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-10">
        <div className="flex gap-4 items-start mt-12 w-full">
          <Sidebar menuItems = {menuItems}/>
          <div className="flex-1 flex justify-center">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default DepartmentLeaderLayout;
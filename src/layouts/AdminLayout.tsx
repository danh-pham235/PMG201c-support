import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import { FaUserPlus, FaUsersCog } from "react-icons/fa";

const menuItems = [
  {
    key: "/admin/import-user",
    icon: <FaUserPlus size={28} />,
    label: "Import User",
  },
  {
    key: "/admin/manage-user",
    icon: <FaUsersCog size={28} />,
    label: "Manage User",
  },
];

const AdminLayout: React.FC = () => {
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

export default AdminLayout;

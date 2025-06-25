import { FaBookOpen } from "react-icons/fa";
import { GoReport } from "react-icons/go";
import { useNavigate, useLocation } from "react-router-dom";
import React from "react";
import { AiOutlineEye } from "react-icons/ai";

const menuItems = [
  {
    key: "/student/grade",
    icon: <FaBookOpen size={28} />,
    label: "Home",
  },
  {
    key: "/student/regrade",
    icon: <GoReport size={28} />,
    label: "Regrade",
  },
  {
    key: "/student/view-regrade",
    icon: <AiOutlineEye size={28} />,
    label: "View regrade",
  },
];

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="flex flex-col items-center bg-white rounded-3xl py-6 px-2 gap-4 min-h-[320px] w-[90px] shadow-none border-none">
      {menuItems.map((item) => {
        const active = location.pathname === item.key;
        return (
          <button
            key={item.key}
            onClick={() => navigate(item.key)}
            className={`flex flex-col items-center w-16 py-3 rounded-2xl transition
              ${active ? "bg-gray-100 text-blue-600 font-semibold" : "hover:bg-gray-100 text-gray-700"}
            `}
            style={{ outline: "none", border: "none", background: "none" }}
          >
            <span className="mb-1">{item.icon}</span>
            <span className="text-xs">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default Sidebar;
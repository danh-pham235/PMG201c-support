import { Button, Menu, type MenuProps } from "antd";
import { FaBookOpen } from "react-icons/fa";
import { GoReport } from "react-icons/go";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import React from "react";

type MenuItem = Required<MenuProps>["items"][number];
const items: MenuItem[] = [
  { key: "1", icon: <FaBookOpen />, label: "Home" },
  { key: "2", icon: <GoReport />, label: "Regrade" },
];

interface SidebarProps {
  collapsed: boolean;
  toggleCollapsed: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, toggleCollapsed }) => {
  const navigate = useNavigate();
  return (
    <div
      className="hidden md:flex flex-col items-center bg-white border border-gray-200 rounded-3xl shadow-2xl py-6 px-2 transition-all duration-300"
      style={{
        width: collapsed ? 72 : 220,
        minWidth: collapsed ? 72 : 220,
        maxWidth: collapsed ? 72 : 220,
      }}
    >
      <Button
        type="text"
        onClick={toggleCollapsed}
        className={`mb-4 mx-auto flex items-center justify-center w-10 h-10 rounded-full hover:bg-orange-50 transition-all`}
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      />
      <Menu
        mode="inline"
        theme="light"
        inlineCollapsed={collapsed}
        items={items}
        className="rounded-xl border-0 w-full"
        style={{
          background: "transparent",
          fontWeight: 500,
          fontSize: 16,
          width: "100%",
        }}
        onClick={({ key }) => {
          if (key === "1") navigate("/student/grade");
          if (key === "2") navigate("/student/regrade");
        }}
      />
    </div>
  );
};

export default Sidebar;
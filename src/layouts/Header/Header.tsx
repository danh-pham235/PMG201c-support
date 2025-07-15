import React, { useState } from "react";
import { useAuthStore, useLoadingStore } from "../../config/zustand";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

const baseNavItems = [
  { href: "/", label: "Home" },
  { href: "/", label: "Features" },
  { href: "/", label: "Contact Us" },
];

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const setLoading = useLoadingStore((state) => state.setLoading);
  const navigate = useNavigate();

  // Dynamic nav items by role
  let navItems = [...baseNavItems];
  if (user && user.role) {
    if (user.role === "Examiner") {
      navItems.push({ href: "/examiner", label: "Examiner" });
    } else if (user.role === "DepartmentLeader") {
      navItems.push({ href: "/department-leader", label: "Department Leader" });
    } else if (user.role === "Lecturer") {
      navItems.push({ href: "/lecturer", label: "Lecturer" });
    } else if (user.role === "Student") {
      navItems.push({ href: "/student", label: "Student" });
    }
  }

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      setDropdownOpen(false);
      setLoading(false);
      navigate("/login");
    }, 1000);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur shadow">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-4 md:px-10">
        {/* Logo */}
        <div className="flex items-center gap-2 font-extrabold text-2xl tracking-widest">
          <span className="text-black">PMS</span>
          <span className="text-orange-500">|</span>
          <span className="text-orange-500">GR-VI</span>
        </div>
        {/* Navbar */}
        <nav className="flex-1 flex justify-center">
          <ul className="flex items-center gap-6 bg-white/80 border border-orange-200 rounded-full px-10 py-2 shadow-md">
            {navItems.map((item) => (
              <li key={item.href + item.label}>
                <a
                  href={item.href}
                  className="px-4 py-2 font-semibold text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-full transition"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        {/* Login/User Dropdown */}
        <div className="flex relative">
          {user ? (
            <div className="ml-4 relative">
              <button
                className="px-6 py-2 bg-gradient-to-r from-green-400 to-blue-400 text-white rounded-full font-semibold shadow flex items-center gap-2 focus:outline-none hover:scale-105 transition"
                onClick={() => setDropdownOpen((prev) => !prev)}
              >
                Hello, {user.name || "User"}
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 animate-fade-in p-2 flex flex-col gap-2">
                  <button
                    className="flex items-center gap-2 w-full px-4 py-2 text-red-600 font-bold rounded-xl bg-red-50 hover:bg-red-100 transition shadow-sm text-base"
                    onClick={handleLogout}
                  >
                    <FiLogOut size={18} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <a
              href="/login"
              className="ml-4 px-6 py-2 bg-gradient-to-r from-orange-500 to-yellow-400 text-white rounded-full font-semibold shadow hover:scale-105 transition flex items-center gap-2"
            >
              Login
            </a>
          )}
        </div>
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-full border border-orange-200 hover:bg-orange-50 ml-2"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 8h20M4 16h20" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={() => setMenuOpen(false)}
          ></div>
          <div className="fixed top-0 right-0 h-full w-3/4 max-w-xs bg-white p-6 flex flex-col gap-6 shadow-lg z-50 transition-transform duration-300">
            <button
              className="self-end mb-4 p-2 rounded-full hover:bg-orange-50"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
              </svg>
            </button>
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.href + item.label}
                  href={item.href}
                  className="text-lg font-semibold text-black hover:text-orange-500 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="/login"
                className="mt-4 px-6 py-2 bg-gradient-to-r from-orange-500 to-yellow-400 text-white rounded-full font-semibold shadow hover:scale-105 transition flex items-center gap-2"
                onClick={() => setMenuOpen(false)}
              >
                Login
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" className="inline-block">
                  <path d="M5 12l5-5 5 5" />
                </svg>
              </a>
            </nav>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
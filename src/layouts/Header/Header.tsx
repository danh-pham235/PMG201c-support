import React, { useState } from "react";
import { useAuthStore, useLoadingStore } from "../../config/zustand";
import { useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation();

  // Dynamic nav items by role
  let navItems = [...baseNavItems];
  if (user && user.role) {
    if (user.role === "Examiner") {
      navItems.push({ href: "/examiner", label: "Examiner" });
    } else if (user.role === "DepartmentLeader") {
      navItems.push({ href: "/department-leader/submissions", label: "Department Leader" });
    } else if (user.role === "Lecturer") {
      navItems.push({ href: "/lecturer", label: "Lecturer" });
    } else if (user.role === "Student") {
      navItems.push({ href: "/student", label: "Student" });
    } else if (user.role === "Admin") {
      navItems.push({ href: "/admin", label: "Admin" });
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
    <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur shadow transition-shadow duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-4 md:px-10">
        {/* Logo */}
        <div className="flex items-center gap-3 font-extrabold text-2xl tracking-widest select-none -ml-4">
          <span className="w-9 h-9 rounded-full bg-gradient-to-tr from-orange-400 to-yellow-300 flex items-center justify-center text-white shadow-md">
            {/* Clipboard with check icon */}
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
              <rect x="5" y="3" width="14" height="18" rx="3" fill="currentColor" opacity=".18"/>
              <rect x="7" y="5" width="10" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M9.5 12.5l2 2 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <span className="text-black">PMG201c</span>
          <span className="text-orange-500">|</span>
          <span className="text-orange-500 italic">Support</span>
        </div>
        {/* Navbar */}
        <nav className="flex-1 flex justify-center">
          <ul className="flex items-center gap-6 bg-white/80 border border-orange-200 rounded-full px-10 py-2 shadow-md">
            {navItems.map((item) => (
              <li key={item.href + item.label}>
                <a
                  href={item.href}
                  className={`px-5 py-2 font-semibold rounded-full transition-all duration-200 text-center whitespace-nowrap
                    ${(item.href !== "/" && location.pathname.includes(item.href)) ? "text-orange-500 bg-orange-50 shadow-sm" : "text-gray-700 hover:text-orange-500 hover:bg-orange-50"}
                  `}
                  style={{ display: 'inline-block' }}
                >
                  {item.label}
                  {location.pathname.startsWith(item.href) && item.href !== "/" && false && (
                    <span className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 w-6 h-1 bg-orange-400 rounded-full opacity-70"></span>
                  )}
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
                className={`px-4 py-2 bg-gradient-to-r from-orange-500 to-yellow-400 text-white rounded-full font-semibold shadow flex items-center gap-2 focus:outline-none hover:scale-105 transition-all duration-200 border-2 border-transparent hover:border-orange-300 hover:ring-2 hover:ring-orange-200/60 whitespace-nowrap ${dropdownOpen ? 'ring-2 ring-orange-300' : ''}`}
                onClick={() => setDropdownOpen((prev) => !prev)}
              >
                <span className="w-7 h-7 rounded-full bg-white/30 flex items-center justify-center">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" fill="#fff" opacity=".7"/><path d="M4 20c0-2.2 3.6-4 8-4s8 1.8 8 4" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
                </span>
                Hello, {user.name || "User"}
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-orange-200 rounded-2xl shadow-2xl z-50 animate-fade-in p-2 flex flex-col gap-2 transition-all duration-200 origin-top-right">
                  <button
                    className="flex items-center gap-2 w-full px-4 py-2 text-orange-600 font-bold rounded-xl bg-orange-50 hover:bg-orange-100 transition shadow-sm text-base border border-orange-100"
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
          <div className="fixed top-0 right-0 h-full w-3/4 max-w-xs bg-white p-6 flex flex-col gap-6 shadow-lg z-50 transition-transform duration-300 translate-x-0 animate-slide-in">
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
                  className={`text-lg font-semibold rounded-full px-5 py-2 transition-all duration-200 text-center whitespace-nowrap ${(item.href !== "/" && location.pathname.includes(item.href)) ? "text-orange-500 bg-orange-50" : "text-black hover:text-orange-500 hover:bg-orange-50"}`}
                  style={{ display: 'inline-block' }}
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
import React, { useState } from "react";

const navItems = [
  { href: "#home", label: "Home" },
  { href: "#features", label: "Features" },
  { href: "#contact", label: "Contact Us" },
];

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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
              <li key={item.href}>
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
        {/* Login Button */}
        <div className="flex">
          <a
            href="/login"
            className="ml-4 px-6 py-2 bg-gradient-to-r from-orange-500 to-yellow-400 text-white rounded-full font-semibold shadow hover:scale-105 transition flex items-center gap-2"
          >
            Login
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" className="inline-block">
              <path d="M5 12l5-5 5 5"/>
            </svg>
          </a>
        </div>
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-full border border-orange-200 hover:bg-orange-50 ml-2"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 8h20M4 16h20" strokeLinecap="round"/>
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
                <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round"/>
              </svg>
            </button>
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
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
                  <path d="M5 12l5-5 5 5"/>
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
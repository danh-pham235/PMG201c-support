import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#2d3748] text-white py-6 px-6 md:px-12">
      <div className="w-full flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p className="text-[#718096] text-sm">
            Contact us: <span className="text-white">support@pms.com</span>
          </p>
          <p className="text-[#718096] text-sm mt-1">
            Phone: <span className="text-white">+1-123-456-7890</span>
          </p>
        </div>
        <div className="flex space-x-6 mb-4 md:mb-0">
          <Link
            to="/privacy-policy"
            className="text-[#718096] hover:text-[#f28c82] text-sm font-medium transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms"
            className="text-[#718096] hover:text-[#f28c82] text-sm font-medium transition-colors"
          >
            Terms of Service
          </Link>
        </div>
        <p className="text-[#718096] text-sm">
          © 2025 Project Management Support System. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
import React from "react";
import { FcGoogle } from "react-icons/fc";

const handleGoogleLogin = () => {
  // TODO: Thay thế bằng logic Google OAuth thực tế
  window.location.href = "/"; // Redirect giả lập, thay bằng Google login thực tế
};

const LoginComponent: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-blue-100 px-10 py-12 flex flex-col items-center max-w-md w-full">
      <h2 className="text-3xl font-extrabold mb-6 text-blue-900 text-center tracking-tight">
        Đăng nhập hệ thống PMG201c
      </h2>
      <p className="mb-8 text-gray-500 text-center">
        Đăng nhập bằng tài khoản Google nội bộ để tiếp tục
      </p>
      <button
        onClick={handleGoogleLogin}
        className="flex items-center gap-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow transition text-lg w-full justify-center"
      >
        <FcGoogle size={28} className="bg-white rounded-full" />
        Đăng nhập với Google
      </button>
    </div>
  );
};

export default LoginComponent;
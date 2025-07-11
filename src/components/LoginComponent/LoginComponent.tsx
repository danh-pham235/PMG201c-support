import React, { useEffect } from "react";
import { useAuthStore } from "../../config/zustand";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom"; 

declare global {
  interface Window {
    google?: any;
  }
}

const CLIENT_ID = "368489844372-e2vdkefku0n6akdmna0ja1a55dtv53av.apps.googleusercontent.com";

const getRouteByRole = (role: string) => {
  switch (role) {
    case "Student":
      return "/student";
    case "Lecturer":
      return "/lecturer";
    case "Examiner":
      return "/examiner";
    case "DepartmentLeader":
      return "/department-leader";
    default:
      return "/";
  }
};
const LoginComponent: React.FC = () => {
  const loginWithGoogle = useAuthStore((state) => state.loginWithGoogle);
  const navigate = useNavigate(); 
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    window.google?.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: async (response: any) => {
        const idToken = response.credential;        
        if (!idToken) {
          toast.error("Không lấy được id_token từ Google!");
          return;
        }
        await loginWithGoogle(idToken);
        // KHÔNG redirect ở đây!
      },
    });
    window.google?.accounts.id.renderButton(
      document.getElementById("googleSignInDiv"),
      { theme: "outline", size: "large" }
    );
  }, [loginWithGoogle]);

  // Lắng nghe user thay đổi để redirect
  useEffect(() => {
    if (user && user.role) {
      toast.success("Đăng nhập thành công!");
      setTimeout(() => {
        navigate(getRouteByRole(user.role || "Unknown"));
      }, 1200);
    }
  }, [user, navigate]);

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-blue-100 px-10 py-12 flex flex-col items-center max-w-md w-full">
      <ToastContainer position="top-right" autoClose={2000} />
      <h2 className="text-3xl font-extrabold mb-6 text-blue-900 text-center tracking-tight">
        Đăng nhập hệ thống PMG201c
      </h2>
      <p className="mb-8 text-gray-500 text-center">
        Đăng nhập bằng tài khoản Google nội bộ để tiếp tục
      </p>
      <div id="googleSignInDiv" className="w-full flex justify-center"></div>
    </div>
  );
};

export default LoginComponent;
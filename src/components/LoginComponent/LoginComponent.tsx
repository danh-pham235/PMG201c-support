import React, { useEffect } from "react";
import { useAuthStore, useLoadingStore } from "../../config/zustand";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom"; 

declare global {
  interface Window {
    google?: any;
  }
}

const CLIENT_ID = "594718891503-l69jk6egr65mu2jdk9bqatoektd52edr.apps.googleusercontent.com";

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
  const setLoading = useLoadingStore((state) => state.setLoading);

  useEffect(() => {
    if (!window.google) {
      console.error("Google API script failed to load");
      toast.error("Unable to load Google Sign-In. Please check your connection or configuration.");
      return;
    }
    window.google.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: async (response: any) => {
        const idToken = response.credential;
        if (!idToken) {
          toast.error("Could not get id_token from Google!");
          return;
        }
        setLoading(true);
        const start = Date.now();
        try {
          await loginWithGoogle(idToken);
        } finally {
          const elapsed = Date.now() - start;
          const minLoading = 900; // ms
          if (elapsed < minLoading) {
            setTimeout(() => setLoading(false), minLoading - elapsed);
          } else {
            setLoading(false);
          }
        }
      },
    });
    window.google.accounts.id.renderButton(
      document.getElementById("googleSignInDiv"),
      { theme: "outline", size: "large" }
    );
  }, [loginWithGoogle, setLoading]);

  useEffect(() => {
    if (user && user.role) {
      toast.success("Login successful!");
      setTimeout(() => {
        navigate(getRouteByRole(user.role || "Unknown"));
      }, 1000); 
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-orange-100 relative">
      {/* LoadingScreen đã được render toàn cục ở App */}
      <div className="bg-white rounded-3xl shadow-2xl border border-blue-100 px-10 py-12 flex flex-col items-center max-w-md w-full mx-4 animate-fade-in">
        {/* Logo minh họa */}
        <div className="mb-6 flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-400 to-orange-400 flex items-center justify-center shadow-lg mb-2">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="48" height="48" rx="24" fill="url(#paint0_linear_1_2)"/>
              <path d="M24 14L34 34H14L24 14Z" fill="white"/>
              <defs>
                <linearGradient id="paint0_linear_1_2" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#60A5FA"/>
                  <stop offset="1" stopColor="#F59E42"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="text-xl font-bold text-blue-700 tracking-widest">PMG201c</span>
        </div>
        <h2 className="text-3xl font-extrabold mb-2 text-blue-900 text-center tracking-tight">
          Sign in to the system
        </h2>
        {/* Nút Google Sign In */}
        <div className="w-full flex flex-col items-center mb-4">
          <div id="googleSignInDiv" className="w-full flex justify-center"></div>
        </div>
        <div className="mt-4 text-xs text-gray-400 text-center">
          <span>For internal school Google accounts only</span>
        </div>
        <ToastContainer position="top-right" autoClose={2000} />
      </div>
    </div>
  );
};

export default LoginComponent;
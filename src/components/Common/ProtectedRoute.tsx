import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../../config/zustand";

const ProtectedRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Role-based path protection
  const role = user?.role?.toLowerCase();
  const path = location.pathname;
  let allowedBase = "";
  let homePath = "/login";
  if (role === "student") {
    allowedBase = "/student";
    homePath = "/student";
  } else if (role === "examiner") {
    allowedBase = "/examiner";
    homePath = "/examiner";
  } else if (role === "lecturer") {
    allowedBase = "/lecturer";
    homePath = "/lecturer";
  } else if (role === "department leader" || role === "department_leader" || role === "departmentleader") {
    allowedBase = "/department-leader";
    homePath = "/department-leader";
  }

  if (allowedBase && !path.startsWith(allowedBase)) {
    return <Navigate to={homePath} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute; 
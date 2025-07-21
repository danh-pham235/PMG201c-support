import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./page/HomePage/HomePage";
import { studentRoutes } from "./routes/student.routes";
import { departmentLeaderRoutes } from "./routes/department-leader.route";
import { examinerRoutes } from "./routes/examiner.route";
import { lecturerRoutes } from "./routes/lecturer.route";
import LoginPage from "./page/LoginPage/Login";
import LoadingScreen from "./components/Common/LoadingScreen";
import ProtectedRoute from "./components/Common/ProtectedRoute";
import StudentLayout from "./layouts/StudentLayout";
import DepartmentLeaderLayout from "./layouts/DepartmentLeaderLayout";
import ExaminerLayout from "./layouts/ExaminerLayout";
import LecturerLayout from "./layouts/LecturerLayout";
import adminRoutes from "./routes/admin.route";
import AdminLayout from "./layouts/AdminLayout";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <LoginPage /> }
    ],
  },
  {
    path: "/student",
    element: (
      <ProtectedRoute>
        <StudentLayout />
      </ProtectedRoute>
    ),
    children: studentRoutes.children,
  },
  {
    path: "/department-leader",
    element: (
      <ProtectedRoute>
        <DepartmentLeaderLayout />
      </ProtectedRoute>
    ),
    children: departmentLeaderRoutes.children,
  },
  {
    path: "/examiner",
    element: (
      <ProtectedRoute>
        <ExaminerLayout />
      </ProtectedRoute>
    ),
    children: examinerRoutes.children,
  },
  {
    path: "/lecturer",
    element: (
      <ProtectedRoute>
        <LecturerLayout />
      </ProtectedRoute>
    ),
    children: lecturerRoutes.children,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: adminRoutes.children,
  },
]);

const App: React.FC = () => {
  const [loadingFirstTime, setLoadingFirstTime] = useState(true);

  useEffect(() => {
    document.documentElement.classList.remove("dark");
    const hasVisited = sessionStorage.getItem("visited");
    if (!hasVisited) {
      setTimeout(() => {
        setLoadingFirstTime(false);
        sessionStorage.setItem("visited", "true");
      }, 1000);
    } else {
      setLoadingFirstTime(false);
    }
  }, []);

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <ToastContainer position="top-right" />
      <LoadingScreen />
      {loadingFirstTime ? (
        <LoadingScreen text="Loading, please wait..." />
      ) : (
        <RouterProvider router={router} />
      )}
    </div>
  );
};

export default App;
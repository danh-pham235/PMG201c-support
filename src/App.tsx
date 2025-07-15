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

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <LoginPage /> }
    ],
  },
  studentRoutes,
  departmentLeaderRoutes,
  examinerRoutes,
  lecturerRoutes,
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
        <div>Loading...</div>
      ) : (
        <RouterProvider router={router} />
      )}
    </div>
  );
};

export default App;
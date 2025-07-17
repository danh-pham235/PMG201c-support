import type { RouteObject } from "react-router-dom";
import ExaminerLayout from "../layouts/ExaminerLayout";
import UploadSubmissionsPage from "../page/Examiner/UploadSubmissions";
import RegradeDashboardPage from "../page/Examiner/RegradeDashboard";
import UploadExamWithBaremPage from "../page/Examiner/UploadExamWithBarem";
import { Navigate } from "react-router-dom";

export const examinerRoutes: RouteObject = {
  path: "/examiner",
  element: <ExaminerLayout />,
  children: [
    {
      index: true,
      element: <Navigate to="upload-submissions" replace />,
    },
    {
      path: "upload-submissions",
      element: <UploadSubmissionsPage />,
    },
    {
      path: "regrade-dashboard",
      element: <RegradeDashboardPage />,
    },
    {
      path: "upload-exam-barem",
      element: <UploadExamWithBaremPage />,
    },
  ],
};
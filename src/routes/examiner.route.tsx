import type { RouteObject } from "react-router-dom";
import ExaminerPage from "../page/Examiner";
import ExaminerLayout from "../layouts/ExaminerLayout";

export const examinerRoutes: RouteObject = {
  path: "/examiner",
  element: <ExaminerLayout />,
  children: [
    {
      path: "*",
      element: <ExaminerPage />,
    },
  ],
};
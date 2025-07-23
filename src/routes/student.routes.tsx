import { Navigate, type RouteObject } from "react-router-dom";
import StudentPage from "../page/Student";
import StudentLayout from "../layouts/StudentLayout";
import ViewRegradePage from "../page/Student/ViewRegrade";
import RequestRegradePage from "../page/Student/RequestRegrade";

export const studentRoutes: RouteObject = {
  path: "/student",
  element: <StudentLayout />,
  children: [
    {
      index: true,
      element: <Navigate to="grade" replace />,
    },
    {
      path: "grade",
      element: <StudentPage />,
    },
    {
      path: "regrade",
      element: <RequestRegradePage />,
    },
    {
      path: "view-regrade",
      element: <ViewRegradePage />,
    },
  ],
};

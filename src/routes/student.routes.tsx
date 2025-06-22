import type { RouteObject } from "react-router-dom";
import StudentPage from "../page/Student";


export const studentRoutes: RouteObject = {
  path: "/student",
  children: [
    {
      path: "grade",
      element: <StudentPage />,
    },
  ],
};

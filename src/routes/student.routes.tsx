import type { RouteObject } from "react-router-dom";
import StudentPage from "../page/Student";
import Layout from "../layouts/Layout";


export const studentRoutes: RouteObject = {
  path: "/student",
  element: <Layout />,
  children: [
    {
      path: "grade",
      element: <StudentPage />,
    },
  ],
};

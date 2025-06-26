import type { RouteObject } from "react-router-dom";
import StudentPage from "../page/Student";
import RegradePage from "../page/Student/Regrade";
import StudentLayout from "../layouts/StudentLayout";
import ViewRegradePage from "../page/Student/ViewRegrade";


export const studentRoutes: RouteObject = {
  path: "/student",
  element: <StudentLayout />,
  children: [
    {
      path: "grade",
      element: <StudentPage />,
    },
    {
      path: "regrade",
      element: <RegradePage />,
    },
        {
      path: "view-regrade",
      element: <ViewRegradePage />,
    },
  ],
};

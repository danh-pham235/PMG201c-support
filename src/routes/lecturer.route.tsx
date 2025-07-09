import type { RouteObject } from "react-router-dom";
import LecturerPage from "../page/Lecturer";
import LecturerLayout from "../layouts/LecturerLayout";

export const lecturerRoutes: RouteObject = {
  path: "/lecturer",
  element: <LecturerLayout />,
  children: [
    {
      path: "assigned-submissions",
      element: <LecturerPage />,
    },
  ],
};
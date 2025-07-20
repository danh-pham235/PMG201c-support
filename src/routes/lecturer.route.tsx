import type { RouteObject } from "react-router-dom";
import LecturerPage from "../page/Lecturer";
import LecturerLayout from "../layouts/LecturerLayout";
import GradeSubmission from "../components/LecturerComponent/GradeSubmission";

export const lecturerRoutes: RouteObject = {
  path: "/lecturer",
  element: <LecturerLayout />,
  children: [
    {
      path: "assigned-submissions",
      element: <LecturerPage />,
    },
    {
      path: "grade-submission",
      element: <GradeSubmission />,
    }
  ],
};
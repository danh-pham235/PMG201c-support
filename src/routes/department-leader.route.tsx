import type { RouteObject } from "react-router-dom";
import DepartmentLeaderPage from "../page/DepartmentLeader";
import DepartmentLeaderLayout from "../layouts/DepartmentLeaderLayout";
import ScoreReport from "../page/DepartmentLeader/Report";

export const departmentLeaderRoutes: RouteObject = {
    path: "/department-leader", 
    element: <DepartmentLeaderLayout />,
    children: [
        {
            path: "submissions",
            element: <DepartmentLeaderPage />,
        },
        {
            path: "report",
            element: <ScoreReport />,
        },
    ]
}
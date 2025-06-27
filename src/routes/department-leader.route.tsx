import type { RouteObject } from "react-router-dom";
import DepartmentLeaderPage from "../page/DepartmentLeader";
import DepartmentLeaderLayout from "../layouts/DepartmentLeaderLayout";

export const departmentLeaderRoutes: RouteObject = {
    path: "/department-leader", 
    element: <DepartmentLeaderLayout />,
    children: [
        {
            path: "submissions",
            element: <DepartmentLeaderPage />,
        },
        {
            path: "division-task",
            element: <DepartmentLeaderPage />,
        },
    ]
}
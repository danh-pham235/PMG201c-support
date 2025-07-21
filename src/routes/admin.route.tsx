import { Navigate, type RouteObject } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import { ImportUserPage, ManageUserPage } from "../page/Admin";

const adminRoutes: RouteObject = {
  path: "/admin",
  element: <AdminLayout />,
  children: [
    {
      index: true,
      element: <Navigate to="import-user" replace />,
    },
    {
      path: "import-user",
      element: <ImportUserPage />,
    },
    {
      path: "manage-user",
      element: <ManageUserPage />,
    },
  ],
};

export default adminRoutes;

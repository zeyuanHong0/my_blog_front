import React, { lazy } from "react";

import Login from "@/pages/admin/login";
import AdminLayout from "@/pages/admin/layout";
import Authorization from "@/components/Authorization";
import SuspenseWrapper from "@/components/SuspenseWrapper";

const AdminHome = lazy(() => import("@/pages/admin/home"));

const adminRoutes = [
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: (
      <Authorization>
        <AdminLayout />
      </Authorization>
    ),
    children: [
      {
        index: true,
        element: SuspenseWrapper(AdminHome),
      },
      {
        path: "home",
        element: SuspenseWrapper(AdminHome),
      },
    ],
  },
];

export default adminRoutes;

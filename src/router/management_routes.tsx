import React, { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";
import Login from "@/pages/management/login";
import Layout from "@/pages/management/layout";
import Authorization from "@/components/Authorization";

const Workbench = lazy(() => import("@/pages/management/dashboard/workbench"));

const managementRoutes = [
  {
    path: "/management/login",
    element: <Login />,
  },
  {
    path: "/management",
    element: (
      <Authorization>
        <Layout />
      </Authorization>
    ),
    children: [
      // 当访问 "/" 时，重定向到 "/dashboard/workbench"
      {
        path: "/management",
        element: <Navigate to="/dashboard/workbench" replace />,
      },
      {
        path: "dashboard/workbench",
        index: true,
        element: (
          <Suspense>
            <Workbench />
          </Suspense>
        ),
      },
    ],
  },
];

export default managementRoutes;

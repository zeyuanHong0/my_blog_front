import React, { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";

import Layout from "@/pages/front/layout";
import SuspenseWrapper from "@/components/SuspenseWrapper";

const Home = lazy(() => import("@/pages/front/home"));

const frontRoutes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/home" replace />,
      },
      {
        path: "/home",
        index: true,
        element: SuspenseWrapper(Home),
      },
    ],
  },
];

export default frontRoutes;

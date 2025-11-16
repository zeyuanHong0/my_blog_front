/* eslint-disable react-refresh/only-export-components */
import React, { lazy } from "react";
import { Navigate } from "react-router-dom";

import Layout from "@/pages/front/layout";
import SuspenseWrapper from "@/components/SuspenseWrapper";

const Home = lazy(() => import("@/pages/front/home"));
const Blog = lazy(() => import("@/pages/front/blog"));
const BlogViewPage = lazy(() => import("@/pages/blog-view"));

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
      {
        path: "/blog",
        element: SuspenseWrapper(Blog),
      },
    ],
  },
  {
    path: "/blog/:id",
    element: SuspenseWrapper(BlogViewPage),
  },
];

export default frontRoutes;

/* eslint-disable react-refresh/only-export-components */
import React, { lazy } from "react";
import { Navigate } from "react-router-dom";

import Layout from "@/pages/front/layout";
import SuspenseWrapper from "@/components/SuspenseWrapper";

const Home = lazy(() => import("@/pages/front/home"));
const Blog = lazy(() => import("@/pages/front/blogs"));
const BlogViewPage = lazy(() => import("@/pages/blog-view"));
const Tags = lazy(() => import("@/pages/front/tags"));
const Tag = lazy(() => import("@/pages/front/tags/tag"));

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
        path: "/blogs",
        element: SuspenseWrapper(Blog),
      },
      {
        path: "/tags",
        element: SuspenseWrapper(Tags),
      },
      {
        path: "/tag/:id",
        element: SuspenseWrapper(Tag),
      },
    ],
  },
  {
    path: "/blog/:id",
    element: SuspenseWrapper(BlogViewPage),
  },
];

export default frontRoutes;

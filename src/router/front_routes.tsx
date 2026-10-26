/* eslint-disable react-refresh/only-export-components */
import React, { lazy } from "react";

import Layout from "@/pages/front/layout";
import SuspenseWrapper from "@/components/SuspenseWrapper";

// const Home = lazy(() => import("@/pages/front/home"));
const HomeV2 = lazy(() => import("@/pages/front/home-v2"));
const Blog = lazy(() => import("@/pages/front/blogs"));
const BlogViewPage = lazy(() => import("@/pages/blog-view"));
const Tags = lazy(() => import("@/pages/front/tags"));
const Categories = lazy(() => import("@/pages/front/categories"));
const Archives = lazy(() => import("@/pages/front/archives"));

const frontRoutes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        index: true,
        element: SuspenseWrapper(HomeV2),
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
        path: "/categories",
        element: SuspenseWrapper(Categories),
      },
      {
        path: "/archives",
        element: SuspenseWrapper(Archives),
      },
    ],
  },
  {
    path: "/blog/:id",
    element: SuspenseWrapper(BlogViewPage),
  },
];

export default frontRoutes;

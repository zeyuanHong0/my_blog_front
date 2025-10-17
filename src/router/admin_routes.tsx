import React, { lazy } from "react";

import Login from "@/pages/admin/login";
import AdminLayout from "@/pages/admin/layout";
import Authorization from "@/components/Authorization";
import SuspenseWrapper from "@/components/SuspenseWrapper";

const AdminHome = lazy(() => import("@/pages/admin/home"));
const AdminBlogList = lazy(() => import("@/pages/admin/blog/list/index"));
const AdminBlogCreate = lazy(
  () => import("@/pages/admin/blog/form/blog-create-page"),
);
const AdminTagList = lazy(() => import("@/pages/admin/tag/list/index"));

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
      {
        path: "blog",
        children: [
          { index: true, element: SuspenseWrapper(AdminBlogList) },
          { path: "create", element: SuspenseWrapper(AdminBlogCreate) },
        ],
      },
      {
        path: "tag",
        element: SuspenseWrapper(AdminTagList),
      },
    ],
  },
];

export default adminRoutes;

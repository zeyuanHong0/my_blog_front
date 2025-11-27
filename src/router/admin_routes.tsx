/* eslint-disable react-refresh/only-export-components */
import React, { lazy } from "react";

import Login from "@/pages/admin/login";
import Register from "@/pages/admin/register";
import AdminLayout from "@/pages/admin/layout";
import Authorization from "@/components/Authorization";
import SuspenseWrapper from "@/components/SuspenseWrapper";

const AdminHome = lazy(() => import("@/pages/admin/home"));
const AdminBlogList = lazy(() => import("@/pages/admin/blog/list/index"));
const AdminBlogCreate = lazy(
  () => import("@/pages/admin/blog/form/blog-create-page"),
);
const AdminBlogEdit = lazy(
  () => import("@/pages/admin/blog/form/blog-edit-page"),
);
const AdminTagList = lazy(() => import("@/pages/admin/tag/list/index"));

const adminRoutes = [
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/auth/register",
    element: <Register />,
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
          { path: "edit/:id", element: SuspenseWrapper(AdminBlogEdit) },
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

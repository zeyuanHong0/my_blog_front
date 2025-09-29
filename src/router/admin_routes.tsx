import React, { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";
import Login from "@/pages/admin/login";
import Layout from "@/pages/admin/layout";
import Authorization from "@/components/Authorization";

const adminRoutes = [
  {
    path: "/admin/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: (
      <Authorization>
        <Layout />
      </Authorization>
    ),
    children: [],
  },
];

export default adminRoutes;

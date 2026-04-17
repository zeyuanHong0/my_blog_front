import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

import { fetchIsAdmin } from "@/api/user";
import useUserStore from "@/store/userStore";

const AdminGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAdmin, setIsAdmin } = useUserStore();

  useEffect(() => {
    if (isAdmin === null) {
      fetchIsAdmin().then((res) => {
        setIsAdmin(!!res.data?.isAdmin);
      });
    }
  }, [isAdmin, setIsAdmin]);

  if (isAdmin === null) return null; // 加载中

  return isAdmin ? <>{children}</> : <Navigate to="/no-permission" replace />;
};

export default AdminGuard;

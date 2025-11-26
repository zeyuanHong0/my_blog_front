import React from "react";

// Token 现在由后端通过 Cookie 管理
import useUserStore from "@/store/userStore";
import { Navigate } from "react-router-dom";

const Authorization: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { userInfo } = useUserStore();
  if (userInfo?.id) {
    return <>{children}</>;
  } else {
    return <Navigate to="/auth/login" replace />;
  }
};

export default Authorization;

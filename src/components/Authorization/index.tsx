import React from "react";
import { Navigate } from "react-router-dom";

import useUserStore from "@/store/userStore";

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

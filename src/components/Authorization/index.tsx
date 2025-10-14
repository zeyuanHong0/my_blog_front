import React from "react";

import { GET_TOKEN } from "@/utils/token";
import useUserStore from "@/store/userStore";
import { Navigate } from "react-router-dom";

const Authorization: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { userInfo } = useUserStore();
  // 判断token是否存在以及用户信息是否存在
  if (GET_TOKEN() && userInfo?.id) {
    return <>{children}</>;
  } else {
    return <Navigate to="/auth/login" replace />;
  }
};

export default Authorization;

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "@/store/userStore";

const GitHubCallback = () => {
  const { getUserInfo } = useUserStore();
  const navigate = useNavigate();
  useEffect(() => {
    handleGetUserInfo();
  });
  const handleGetUserInfo = async () => {
    await getUserInfo();
    navigate("/", { replace: true });
  };

  return <div>GitHub Callback</div>;
};

export default GitHubCallback;

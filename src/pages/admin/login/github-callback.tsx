import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "@/store/userStore";

const GitHubCallback = () => {
  const { getUserInfo } = useUserStore();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserInfo = async () => {
      await getUserInfo();
      navigate("/", { replace: true });
    };
    fetchUserInfo();
  }, [getUserInfo, navigate]);

  return null;
};

export default GitHubCallback;

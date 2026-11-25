import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "@/store/userStore";
import { getSessionStorage, removeSessionStorage } from "@/utils/storage";

const GitHubCallback = () => {
  const { getUserInfo } = useUserStore();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserInfo = async () => {
      await getUserInfo();
      const returnTo = getSessionStorage("githubLoginReturnTo") || "/";
      removeSessionStorage("githubLoginReturnTo");
      // 只允许站内路径
      const isSafePath =
        returnTo?.startsWith("/") &&
        !returnTo.startsWith("//") &&
        !returnTo.includes("\\");

      navigate(isSafePath ? returnTo : "/", { replace: true });
    };
    fetchUserInfo();
  }, [getUserInfo, navigate]);

  return null;
};

export default GitHubCallback;

import { useState } from "react";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { fetchGitHubAuthUrl } from "@/api/user";
import { setSessionStorage } from "@/utils/storage";
import useAuthDialogStore from "@/store/authDialogStore";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Iconify } from "@/components/Icon";
import LoginForm from "./form";

const Login = () => {
  const { setView } = useAuthDialogStore();

  const [isGithubLogin, setIsGithubLogin] = useState(false);

  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // github 登录
  const handleGithubLogin = async () => {
    setIsGithubLogin(true);
    try {
      const res: any = await fetchGitHubAuthUrl();
      const returnTo =
        window.location.pathname +
        window.location.search +
        window.location.hash;
      setSessionStorage("githubLoginReturnTo", returnTo);
      const { url } = res.data;
      window.location.href = url;
    } catch (error) {
      console.error("获取 GitHub 授权地址失败:", error);
      setIsGithubLogin(false);
    }
  };
  return (
    <Card className={cn("relative w-full rounded-3xl py-3")}>
      <CardHeader>
        <CardTitle>登录到您的帐户</CardTitle>
      </CardHeader>
      <CardContent>
        <LoginForm onLoggingChange={(isLogging) => setIsLoggingIn(isLogging)} />
        <div className="flex items-center justify-between gap-4">
          <div className="text-muted-foreground mt-4 text-center text-sm">
            还没有账号？{" "}
            <span
              aria-disabled={isLoggingIn}
              className={cn(
                "text-primary",
                isLoggingIn
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer hover:underline",
              )}
              onClick={() => {
                if (!isLoggingIn) {
                  setView("register");
                }
              }}
            >
              去注册
            </span>
          </div>
          <div className="text-muted-foreground mt-4 text-center text-sm">
            <span
              className="text-primary cursor-pointer hover:underline"
              onClick={() => setView("forgetPassword")}
            >
              忘记密码？
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-3">
        {/* 分割线 */}
        <div className="my-2 flex w-full items-center">
          <div className="border-border flex-1 border-t" />
          <span className="text-muted-foreground mx-2 px-2 text-sm">
            或者通过社交账号登录
          </span>
          <div className="border-border flex-1 border-t" />
        </div>
        <div className="flex w-full flex-col gap-4">
          <Button
            variant="secondary"
            className="bg-background text-foreground border-border !w-full border"
            type="button"
            onClick={handleGithubLogin}
          >
            {isGithubLogin ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span>登录中...</span>
              </>
            ) : (
              <>
                <Iconify
                  icon="logos:github-icon"
                  className="mr-2 dark:brightness-0 dark:invert"
                />
                GitHub
              </>
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Login;

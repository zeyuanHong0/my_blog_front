import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Loader2, Sun, Moon } from "lucide-react";

import { cn } from "@/lib/utils";
import { fetchGitHubAuthUrl } from "@/api/user";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import useSettingStore from "@/store/settingStore";

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
  useDocumentTitle("登录");
  const navigate = useNavigate();
  const [isGithubLogin, setIsGithubLogin] = useState(false);
  const { changeThemeMode } = useSettingStore();
  // 回首页
  const handleGoHome = () => {
    navigate("/");
  };
  // github 登录
  const handleGithubLogin = async () => {
    setIsGithubLogin(true);
    const res: any = await fetchGitHubAuthUrl();
    const { url } = res.data;
    window.location.href = url;
  };
  return (
    <div className="grid h-screen w-screen place-content-center">
      <Card
        className={cn(
          "relative w-[320px] rounded-3xl py-3",
          "sm:w-full sm:max-w-none sm:min-w-[360px]",
        )}
      >
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => changeThemeMode(e)}
          >
            <Sun className="h-5 w-5 dark:hidden" />
            <Moon className="hidden h-5 w-5 dark:block" />
          </Button>
        </div>
        <CardHeader>
          <CardTitle>登录到您的帐户</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
          <div className="text-muted-foreground mt-4 text-center text-sm">
            还没有账号？
            <Link to="/auth/register" className="underline">
              去注册
            </Link>
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
            <Button
              variant="secondary"
              className="!w-full"
              type="button"
              onClick={handleGoHome}
            >
              回首页
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;

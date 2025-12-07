import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { cn } from "@/lib/utils";
import { fetchGitHubAuthUrl } from "@/api/user";

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
  const navigate = useNavigate();
  // 回首页
  const handleGoHome = () => {
    navigate("/");
  };
  // github 登录
  const handleGithubLogin = async () => {
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
            <div className="flex-1 border-t border-gray-300" />
            <span className="text-muted-foreground bg-background mx-2 px-2 text-sm">
              或者通过社交账号登录
            </span>
            <div className="flex-1 border-t border-gray-300" />
          </div>
          <div className="flex w-full flex-col gap-4">
            <Button
              variant="secondary"
              className="!w-full border border-gray-300 bg-white text-black hover:bg-gray-100"
              type="button"
              onClick={handleGithubLogin}
            >
              <Iconify icon="logos:github-icon" /> GitHub
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

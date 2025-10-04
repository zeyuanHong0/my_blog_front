import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "./form";

const Login = () => {
  const navigate = useNavigate();
  // 回首页
  const handleGoHome = () => {
    navigate("/");
  };
  return (
    <div className="grid h-screen w-screen place-content-center">
      <Card
        className={cn(
          "relative w-[320px] rounded-3xl py-4",
          "sm:w-full sm:max-w-none sm:min-w-[360px]",
        )}
      >
        <CardHeader>
          <CardTitle>登录到您的帐户</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter className="flex-col gap-2">
          {/* 分割线 */}
          <div className="my-2 flex w-full items-center">
            <div className="flex-1 border-t border-gray-300" />
            <span className="text-muted-foreground bg-background mx-2 px-2 text-sm">
              或者
            </span>
            <div className="flex-1 border-t border-gray-300" />
          </div>
          <Button
            variant="secondary"
            className="!w-full"
            type="button"
            onClick={handleGoHome}
          >
            回首页
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;

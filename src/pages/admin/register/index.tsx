import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { cn } from "@/lib/utils";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RegisterForm from "./form";

const Register = () => {
  useDocumentTitle("注册");
  return (
    <div className="grid h-screen w-screen place-content-center">
      <Card
        className={cn(
          "relative w-[320px] rounded-3xl py-3",
          "sm:w-full sm:max-w-none sm:min-w-[360px]",
        )}
      >
        <CardHeader>
          <CardTitle>注册</CardTitle>
        </CardHeader>
        <CardContent>
          <RegisterForm />
          <div className="text-muted-foreground mt-4 text-right text-sm">
            已有账户了？
            <Link to="/auth/login" replace className="underline">
              去登录
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;

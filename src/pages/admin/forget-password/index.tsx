import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ForgetPasswordForm from "./form";

const ForgetPassword = () => {
  useDocumentTitle("忘记密码");
  return (
    <div className="grid h-screen w-screen place-content-center">
      <Card
        className={cn(
          "relative w-[320px] rounded-3xl py-3",
          "sm:w-full sm:max-w-none sm:min-w-[360px]",
        )}
      >
        <CardHeader>
          <CardTitle>忘记密码</CardTitle>
        </CardHeader>
        <CardContent>
          <ForgetPasswordForm />
          <div className="text-muted-foreground mt-4 text-right text-sm">
            <Link to="/auth/login" replace className="underline">
              返回登录页
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgetPassword;

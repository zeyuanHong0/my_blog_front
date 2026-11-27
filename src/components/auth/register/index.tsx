import { useState } from "react";

import { cn } from "@/lib/utils";
import useAuthDialogStore from "@/store/authDialogStore";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RegisterForm from "./form";

const Register = () => {
  const { setView } = useAuthDialogStore();
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <Card className={cn("relative w-full rounded-3xl py-3")}>
      <CardHeader>
        <CardTitle>注册</CardTitle>
      </CardHeader>
      <CardContent>
        <RegisterForm onRegisteringChange={setIsRegistering} />
        <div className="text-muted-foreground mt-4 text-right text-sm">
          已有账户了？
          <span
            aria-disabled={isRegistering}
            className={cn(
              "text-primary",
              isRegistering
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer hover:underline",
            )}
            onClick={() => {
              if (!isRegistering) {
                setView("login");
              }
            }}
          >
            去登录
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default Register;

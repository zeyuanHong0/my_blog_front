import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { z } from "zod";

import useUserStore from "@/store/userStore";
import { fetchRegister } from "@/api/user";
import { showSuccessToast } from "@/components/toast";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: "用户名至少需要 2 个字符" })
    .max(20, { message: "用户名不能超过 20 个字符" }),
  email: z.email({ message: "请输入有效的邮箱地址" }),
  password: z
    .string()
    .min(6, { message: "密码至少需要 6 位" })
    .max(30, { message: "密码不能超过 30 位" }),
  verificationCode: z.string().length(6, { message: "验证码必须是 6 位数字" }),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const [codeSent, setCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isSending, setIsSending] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      verificationCode: "",
    },
  });
  const { getUserInfo } = useUserStore();

  // 发送验证码
  const handleSendCode = async () => {
    const email = form.getValues("email");

    // 验证邮箱格式
    const emailValidation = await form.trigger("email");
    if (!emailValidation) {
      return;
    }

    setIsSending(true);
    try {
      // TODO: 调用发送验证码的 API

      showSuccessToast("验证码已发送到您的邮箱");
      setCodeSent(true);
      setCountdown(60);

      // 倒计时
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      console.error("发送验证码失败:", error);
    } finally {
      setIsSending(false);
    }
  };

  // 提交事件
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("提交数据:", values);
    try {
      await fetchRegister(values);
      await getUserInfo();
      navigate("/admin");
    } catch (error) {
      console.error("注册失败:", error);
    }
  };

  return (
    <Form {...form}>
      <form
        className="space-y-6"
        autoComplete="off"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {/* 用户名 */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>用户名</FormLabel>
              <FormControl>
                <Input placeholder="请输入用户名" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 邮箱 */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>邮箱</FormLabel>
              <div className="flex gap-2">
                <FormControl>
                  <Input placeholder="请输入邮箱" {...field} />
                </FormControl>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleSendCode}
                  disabled={isSending || countdown > 0}
                  className="shrink-0"
                >
                  {isSending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      发送中
                    </>
                  ) : countdown > 0 ? (
                    `${countdown}s`
                  ) : (
                    "发送验证码"
                  )}
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 密码 */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>密码</FormLabel>
              <FormControl>
                <Input type="password" placeholder="请输入密码" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 验证码 - 仅在发送验证码后显示 */}
        {codeSent && (
          <FormField
            control={form.control}
            name="verificationCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>邮箱验证码</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting || !codeSent}
        >
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              注册中...
            </>
          ) : (
            "注册"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;

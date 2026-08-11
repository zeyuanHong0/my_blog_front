import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { z } from "zod";

import {
  fetchForgetPasswordCheckEmail,
  fetchSendEmailCode,
  fetchForgetPasswordVerifyCode,
} from "@/api/user";
import { showSuccessToast } from "@/components/toast";

import ConfirmDialog from "@/components/confirm-dialog";
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

interface CheckEmailFormProps {
  onVerified: (resetToken: string) => void;
}

const CheckEmailForm = ({ onVerified }: CheckEmailFormProps) => {
  const [codeSent, setCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false); // 提示弹窗
  const [description, setDescription] = useState("");
  const formSchema = z.object({
    email: z.string().email({ message: "请输入有效的邮箱地址" }),
    emailCode: z.string().length(6, { message: "验证码必须是 6 位数字" }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      emailCode: "",
    },
  });
  // 校验邮箱
  const handleCheckEmail = async () => {
    const email = form.getValues("email");
    try {
      const res: any = await fetchForgetPasswordCheckEmail(email);
      if (res.data.checkEmail === false) {
        setDescription(res.message);
        setIsConfirmOpen(true);
      } else {
        handleSendCode();
      }
    } catch (error) {
      console.log("邮箱校验失败:", error);
    }
  };

  // 发送验证码
  const handleSendCode = async () => {
    const email = form.getValues("email");

    // 验证邮箱格式
    const emailValidation = await form.trigger("email");
    if (!emailValidation) {
      return;
    }

    setIsSendingCode(true);
    try {
      await fetchSendEmailCode(email);
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
      setIsSendingCode(false);
    }
  };

  // 提交事件
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("提交数据:", values);
    try {
      const res: any = await fetchForgetPasswordVerifyCode(
        values.email,
        values.emailCode,
      );
      if (res.data.resetToken) {
        onVerified(res.data.resetToken); // 把resetToken传递过去
      }
    } catch (error) {
      console.log("验证码验证失败:", error);
    }
  };
  return (
    <>
      <ConfirmDialog
        title="提示"
        description={description}
        confirmBtnText="继续"
        cancelBtnText="取消"
        isOpen={isConfirmOpen}
        onOpenChange={setIsConfirmOpen}
        onConfirm={() => {
          setIsConfirmOpen(false);
          handleSendCode();
        }}
        onCancel={() => {
          setIsConfirmOpen(false);
          form.setValue("email", "");
        }}
      />
      <Form {...form}>
        <form
          className="space-y-6"
          autoComplete="off"
          onSubmit={form.handleSubmit(onSubmit)}
        >
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
                    onClick={handleCheckEmail}
                    disabled={isSendingCode || countdown > 0}
                    className="shrink-0"
                  >
                    {isSendingCode ? (
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
          {/* 验证码 - 仅在发送验证码后显示 */}
          {codeSent && (
            <FormField
              control={form.control}
              name="emailCode"
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
          {/* 校验 */}
          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting || !codeSent}
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                验证中...
              </>
            ) : (
              "验证"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default CheckEmailForm;

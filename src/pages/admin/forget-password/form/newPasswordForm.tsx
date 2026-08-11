import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { z } from "zod";

import { fetchForgetPasswordReset } from "@/api/user";

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

interface NewPasswordFormProps {
  resetToken: string;
}

const NewPasswordForm = ({ resetToken }: NewPasswordFormProps) => {
  const navigate = useNavigate();
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const formSchema = z
    .object({
      newPassword: z
        .string()
        .min(6, { message: "密码至少需要 6 位" })
        .max(30, { message: "密码不能超过 30 位" }),
      confirmNewPassword: z
        .string()
        .min(6, { message: "确认密码至少需要 6 位" })
        .max(30, { message: "确认密码不能超过 30 位" }),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
      message: "两次输入的密码不一致",
      path: ["confirmNewPassword"],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  // 提交事件
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("提交数据:", values);
    try {
      const res: any = await fetchForgetPasswordReset(
        resetToken,
        values.newPassword,
      );
      console.log("重置密码成功:", res);
      setIsSuccessOpen(true);
    } catch (error) {
      console.log("重置密码失败:", error);
    }
  };
  return (
    <>
      <ConfirmDialog
        title="提示"
        description="密码重置成功，请重新登录"
        confirmBtnText="去登录"
        isOpen={isSuccessOpen}
        onOpenChange={setIsSuccessOpen}
        onConfirm={() => navigate("/auth/login")}
        onCancel={() => navigate("/auth/login")}
      />
      <Form {...form}>
        <form
          className="space-y-6"
          autoComplete="off"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {/* 新密码 */}
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>新密码</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="请输入新密码"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 确认新密码 */}
          <FormField
            control={form.control}
            name="confirmNewPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>确认新密码</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="请再次输入新密码"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                提交中...
              </>
            ) : (
              "提交"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default NewPasswordForm;

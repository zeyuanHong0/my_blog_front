import { forwardRef, useImperativeHandle, useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { fetchUpdateProfile } from "@/api/user";
import useUserStore from "@/store/userStore";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { showSuccessToast } from "@/components/toast";
import ConfirmDialog from "@/components/confirm-dialog";

const formSchema = z
  .object({
    username: z
      .string()
      .min(2, { message: "用户名至少需要 2 个字符" })
      .max(20, { message: "用户名不能超过 20 个字符" })
      .optional()
      .or(z.literal("")),
    password: z
      .string()
      .min(6, { message: "密码至少需要 6 个字符" })
      .max(30, { message: "密码不能超过 30 个字符" })
      .optional()
      .or(z.literal("")),
    confirmPassword: z.string().optional().or(z.literal("")),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "两次输入的密码不一致",
    path: ["confirmPassword"],
  });

export interface ProfileSettingsDialogRef {
  handleShowDialog: () => void;
}

const ProfileSettingsDialog = forwardRef<ProfileSettingsDialogRef>((_, ref) => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isShowConfirmDialog, setIsShowConfirmDialog] = useState(false);
  const userStore = useUserStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: userStore.userInfo?.username || "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleShowDialog = () => {
    // 重置校验
    form.reset();
    setIsDialogOpen(true);
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
  };

  // 提交表单
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await fetchUpdateProfile(values);
      showSuccessToast("修改成功");
      setIsDialogOpen(false);
      setIsShowConfirmDialog(true);
    } catch (error: any) {
      console.log("🚀 ~ onSubmit ~ error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useImperativeHandle(ref, () => ({
    handleShowDialog,
  }));

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent
          aria-describedby={undefined}
          className="max-h-[90vh] max-w-[90%] overflow-y-auto sm:max-w-lg"
        >
          <DialogHeader>
            <DialogTitle>账号设置</DialogTitle>
          </DialogHeader>
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
              {/* 密码 */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>新密码</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="请输入新密码，不修改请留空"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* 确认密码 */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>确认新密码</FormLabel>
                    <FormControl>
                      <Input placeholder="请再次输入新密码" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              取消
            </Button>
            <Button
              className="bg-primary text-background hover:bg-primary/90"
              onClick={form.handleSubmit(onSubmit)}
              disabled={isSubmitting}
            >
              {isSubmitting ? "提交中..." : "保存"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <ConfirmDialog
        cancelBtnText="取消"
        confirmBtnText="确认"
        title="保存成功"
        description="您的信息已修改，点击确定前往登录页面重新登录"
        onCancel={() => setIsShowConfirmDialog(false)}
        onConfirm={() => {
          setIsShowConfirmDialog(false);
          // 跳转到登录页面
          navigate("/auth/login", { replace: true });
        }}
        isOpen={isShowConfirmDialog}
        onOpenChange={setIsShowConfirmDialog}
      />
    </>
  );
});

ProfileSettingsDialog.displayName = "ProfileSettingsDialog";

export default ProfileSettingsDialog;

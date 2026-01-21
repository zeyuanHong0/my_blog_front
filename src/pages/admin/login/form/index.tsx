import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { z } from "zod";

import useUserStore from "@/store/userStore";

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

const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: "用户名至少需要 2 个字符" })
    .max(20, { message: "用户名不能超过 20 个字符" }),
  password: z
    .string()
    .min(6, { message: "密码至少需要 6 位" })
    .max(30, { message: "密码不能超过 30 位" }),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const { userLogin, getUserInfo } = useUserStore();

  // 提交事件
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("登录提交数据:", values);
    try {
      await userLogin(values);
      await getUserInfo();
      navigate("/admin");
    } catch (error) {
      // 登录失败处理
      console.error("登录失败:", error);
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

        <Button
          type="submit"
          className="bg-foreground text-background hover:bg-accent/50 w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              登录中...
            </>
          ) : (
            "登录"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;

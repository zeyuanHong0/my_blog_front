"use client";

import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { SET_TOKEN } from "@/utils/token";

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
    .min(2, { message: "账号至少需要 2 个字符" })
    .max(20, { message: "账号不能超过 20 个字符" }),
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

  // 提交事件
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("登录提交数据:", values);
    // 模拟一下登录成功，设置token
    SET_TOKEN("fake-token");
    localStorage.setItem(
      "userInfo",
      JSON.stringify({
        name: "test",
      }),
    );
    navigate("/admin");
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
              <FormLabel>账号</FormLabel>
              <FormControl>
                <Input placeholder="请输入账号" {...field} />
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

        <Button type="submit" className="w-full">
          登录
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;

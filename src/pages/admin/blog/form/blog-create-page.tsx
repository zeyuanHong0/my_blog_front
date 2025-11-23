import { useRef, useState } from "react";
import { CircleSmall } from "lucide-react";

import { fetchCreateBlog } from "@/api/blog";

import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { showInfoToast, showSuccessToast } from "@/components/toast";
import BlogForm, { BlogFormRef } from "./blog-form";

const AdminBlogCreateForm = () => {
  const formRef = useRef<BlogFormRef>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values: any) => {
    console.log("提交的表单数据:", values);
    const data = {
      ...values,
      published: values.published ? 1 : 0, // 处理 published 字段
    };
    handleCreateBlog(data);
  };

  const handleCreateBlog = async (values: any) => {
    if (loading) return showInfoToast("请勿重复提交");
    setLoading(true);
    try {
      await fetchCreateBlog(values);
      showSuccessToast("创建博客成功");
    } catch (error: any) {
      console.log("🚀 ~ handleCreateBlog ~ error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateClick = () => {
    formRef.current?.submit();
  };
  return (
    <div className="max-w-wrapper mx-auto flex flex-col gap-y-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">创建博客</h2>
      </div>
      {/* 面包屑导航 */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin">首页</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <CircleSmall />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin/blog">博客</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <CircleSmall />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin/blog/create">创建</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {/* 表单 */}
      <BlogForm ref={formRef} getFormValues={handleSubmit} />
      {/* 按钮 */}
      <div className="fixed inset-x-24 bottom-10 z-10 md:inset-x-[20vw]">
        <Button
          type="button"
          variant={"outline"}
          className="!w-full"
          onClick={handleCreateClick}
          disabled={loading}
        >
          创建
        </Button>
      </div>
    </div>
  );
};
export default AdminBlogCreateForm;

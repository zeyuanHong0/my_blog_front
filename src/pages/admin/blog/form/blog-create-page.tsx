import { useRef, useState } from "react";

import { fetchCreateBlog } from "@/api/blog";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

import { Button } from "@/components/ui/button";
import BreadCrumb from "@/components/base/bread-crumb";
import { showInfoToast, showSuccessToast } from "@/components/toast";
import BlogForm, { BlogFormRef } from "./blog-form";

const AdminBlogCreateForm = () => {
  useDocumentTitle("创建文章");
  const formRef = useRef<BlogFormRef>(null);
  const [loading, setLoading] = useState(false);

  const navList = [
    { name: "首页", href: "/admin" },
    { name: "文章", href: "/admin/blog" },
    { name: "创建", href: "/admin/blog/create" },
  ];

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
      showSuccessToast("创建文章成功");
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
        <h2 className="text-2xl font-bold">创建文章</h2>
      </div>
      {/* 面包屑导航 */}
      <BreadCrumb list={navList} />
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

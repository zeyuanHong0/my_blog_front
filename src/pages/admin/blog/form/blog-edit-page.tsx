import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { CircleSmall } from "lucide-react";

import { fetchBlogDetail, fetchUpdateBlog } from "@/api/blog";

import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  showErrorToast,
  showInfoToast,
  showSuccessToast,
} from "@/components/toast";
import BlogForm, { BlogFormRef } from "./blog-form";

const AdminBlogEditForm = () => {
  const { id } = useParams();
  const formRef = useRef<BlogFormRef>(null);
  const [loading, setLoading] = useState(false);

  // 获取博客详情
  const handleGetBlogDetail = useCallback(async () => {
    try {
      const res: any = await fetchBlogDetail(id as string);
      if (res.code === 200) {
        const { title, description, content, tags, published } = res.data;
        const values = {
          title,
          description,
          content,
          tags: tags.map((tag: any) => tag.id),
          published: published === 1,
        };
        formRef.current?.setFieldsValue(values);
      } else {
        showErrorToast(res.message || "获取博客详情失败");
      }
    } catch (error: any) {
      showErrorToast(error.message || "获取博客详情失败");
    }
  }, [id]);

  useEffect(() => {
    handleGetBlogDetail();
  }, [handleGetBlogDetail]);

  const handleSubmit = (values: any) => {
    console.log("提交的表单数据:", values);
    const data = {
      id,
      ...values,
      published: values.published ? 1 : 0, // 处理 published 字段
    };
    handleUpdateBlog(data);
  };

  const handleUpdateBlog = async (values: any) => {
    if (loading) return showInfoToast("请勿重复提交");
    setLoading(true);
    try {
      await fetchUpdateBlog(values);
      showSuccessToast("保存博客成功");
    } catch (error: any) {
      showErrorToast(error.message || "保存博客失败");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveClick = () => {
    formRef.current?.submit();
  };
  return (
    <div className="max-w-wrapper mx-auto flex flex-col gap-y-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">编辑博客</h2>
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
            <BreadcrumbLink href="/admin/blog/create">编辑</BreadcrumbLink>
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
          onClick={handleSaveClick}
          disabled={loading}
        >
          保存
        </Button>
      </div>
    </div>
  );
};
export default AdminBlogEditForm;

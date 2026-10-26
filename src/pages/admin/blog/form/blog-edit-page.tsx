import { useCallback, useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { fetchBlogDetail, fetchUpdateBlog } from "@/api/blog";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

import { Button } from "@/components/ui/button";
import BreadCrumb from "@/components/base/bread-crumb";
import { showInfoToast, showSuccessToast } from "@/components/toast";
import BlogForm, { BlogFormRef } from "./blog-form";

const AdminBlogEditForm = () => {
  useDocumentTitle("编辑文章");
  const { id } = useParams();
  const navigate = useNavigate();
  const formRef = useRef<BlogFormRef>(null);
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState<any>(null);

  const navList = [
    { name: "首页", href: "/admin" },
    { name: "文章", href: "/admin/blog" },
    { name: "编辑", href: `/admin/blog/edit/${id}` },
  ];

  // 获取文章详情
  const handleGetBlogDetail = useCallback(async () => {
    const res: any = await fetchBlogDetail(id as string);
    const {
      title,
      description,
      content,
      tags,
      published,
      category,
      aiSummary,
    } = res.data;
    const values = {
      id,
      title,
      description,
      content,
      tags: tags.map((tag: any) => tag.id),
      published: published === 1,
      category: category?.id || "",
      aiSummary: aiSummary || "",
    };
    setInitialValues(values);
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
      showSuccessToast("保存文章成功");
      navigate("/admin/blog");
    } catch (error: any) {
      console.log("🚀 ~ handleUpdateBlog ~ error:", error);
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
        <h2 className="text-2xl font-bold">编辑文章</h2>
      </div>
      {/* 面包屑导航 */}
      <BreadCrumb list={navList} />
      {/* 表单 */}
      <BlogForm
        ref={formRef}
        getFormValues={handleSubmit}
        initialValues={initialValues}
      />
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

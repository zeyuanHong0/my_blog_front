import { useState, useRef } from "react";
import { Plus, CircleSmall } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Table from "./table";
import TagForm from "../form";

const AdminBlogList = () => {
  const [formType, setFormType] = useState<"create" | "edit">("create");
  const [tagId, setTagId] = useState<string | null>(null);
  const formRef = useRef<any>(null);
  const showCreateForm = () => {
    setFormType("create");
    formRef.current?.handleShowForm();
  };
  const showEditForm = (id: string) => {
    console.log("🚀 ~ showEditForm ~ id:", id)
    setFormType("edit");
    setTagId(id);
    formRef.current?.handleShowForm();
  };
  return (
    <>
      <div className="max-w-wrapper mx-auto flex flex-col gap-y-6 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">标签列表</h2>
          <Button
            className="border-black bg-black text-white"
            onClick={showCreateForm}
          >
            <Plus />
            创建标签
          </Button>
        </div>
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin">首页</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <CircleSmall />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin/tag">标签</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="w-full">
          <Input placeholder="请输入名称" className="h-14" />
        </div>
        <div className="w-full">
          <Table showEditForm={showEditForm} />
        </div>
      </div>

      {/* 标签表单弹窗 */}
      <TagForm ref={formRef} formType={formType} tagId={tagId} />
    </>
  );
};

export default AdminBlogList;

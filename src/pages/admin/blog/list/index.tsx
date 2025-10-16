import { useNavigate } from "react-router-dom";
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

const AdminBlogList = () => {
  const navigate = useNavigate();
  const toBlogCreate = () => {
    navigate("/admin/blog/create");
  };
  return (
    <div className="max-w-wrapper mx-auto flex flex-col gap-y-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">博客列表</h2>
        <Button
          className="border-black bg-black text-white"
          onClick={toBlogCreate}
        >
          <Plus />
          创建博客
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
              <BreadcrumbLink href="/admin/blog">博客</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="w-full">
        <Input placeholder="请输入标题" className="h-14" />
      </div>
      <div className="w-full">
        <Table />
      </div>
    </div>
  );
};
export default AdminBlogList;

import { useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import Table from "./table";
import Form from "../form";

const AdminBlogList = () => {
  const [dialogTitle, setDialogTitle] = useState("创建标签");
  const [confirmBtnText, setConfirmBtnText] = useState("创建");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const showCreateForm = () => {
    setDialogTitle("创建标签");
    setConfirmBtnText("创建");
    setIsDialogOpen(true);
  };

  const handleFormSubmit = () => {
    // 处理表单提交逻辑
    setIsDialogOpen(false);
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
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
          <Table />
        </div>
      </div>

      {/* 创建标签弹窗 */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-h-[90vh] max-w-[90%] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
          </DialogHeader>
          <Form />
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={handleCancel}>
              取消
            </Button>
            <Button className="bg-black text-white" onClick={handleFormSubmit}>
              {confirmBtnText}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminBlogList;

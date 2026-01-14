import { useState, useRef, useEffect, useCallback } from "react";
import { useDebounce } from "ahooks";
import { Delete, Plus } from "lucide-react";

import { fetchTagsByPage, fetchDeleteTag } from "@/api/tag";
import { usePagination } from "@/hooks/usePagination";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BreadCrumb from "@/components/base/bread-crumb";
import { showSuccessToast } from "@/components/toast";
import ConfirmDialog from "@/components/confirm-dialog";
import Table from "./table";
import TagForm, { TagFormRef } from "../form";

const AdminBlogList = () => {
  useDocumentTitle("标签管理");
  const navList = [
    { name: "首页", href: "/admin" },
    { name: "标签", href: "/admin/tag" },
  ];
  // 表单相关
  const [formType, setFormType] = useState<"create" | "edit">("create");
  const [tagId, setTagId] = useState<string | null>(null);
  const formRef = useRef<TagFormRef>(null);
  const showCreateForm = () => {
    setFormType("create");
    formRef.current?.handleShowForm();
  };
  const showEditForm = (id: string) => {
    setFormType("edit");
    setTagId(id);
    formRef.current?.handleShowForm();
  };

  // 列表数据
  const [tagList, setTagList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  // const [total, setTotal] = useState(0);

  const { pageNum, pageSize, setTotal, resetPage, paginationProps } =
    usePagination({
      initialPageNum: 1,
      initialPageSize: 5,
    });

  // 查询参数
  const [searchName, setSearchName] = useState<string>("");
  const debouncedSearchName = useDebounce(searchName, { wait: 300 });
  // const [pageNum, setPageNum] = useState<number>(1);
  // const [pageSize, setPageSize] = useState<number>(5);

  const handleGetTagList = useCallback(async () => {
    setLoading(true);
    try {
      const data = {
        name: debouncedSearchName,
        pageNum,
        pageSize,
      };
      const res = await fetchTagsByPage(data);
      setTagList(res.data.list);
      setTotal(res.data.total);
    } catch (error: any) {
      console.log("🚀 ~ handleGetTagList ~ error:", error);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearchName, pageNum, pageSize, setTotal]);

  useEffect(() => {
    handleGetTagList();
  }, [handleGetTagList]);

  // 删除标签
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [deleteTagId, setDeleteTagId] = useState<string>("");
  const [deleteTagName, setDeleteTagName] = useState<string>("");

  const openDeleteConfirm = (id: string, name: string) => {
    setDeleteTagId(id);
    setDeleteTagName(name);
    setIsDeleteConfirmOpen(true);
  };

  const handleDeleteTag = async () => {
    await fetchDeleteTag(deleteTagId);
    showSuccessToast("删除成功");
    setIsDeleteConfirmOpen(false);
    await handleGetTagList();
  };
  return (
    <>
      <div className="max-w-wrapper mx-auto flex flex-col gap-y-6 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">标签管理</h2>
          <Button
            className="border-black bg-black text-white"
            onClick={showCreateForm}
          >
            <Plus />
            创建标签
          </Button>
        </div>
        <div>
          {/* 面包屑导航 */}
          <BreadCrumb list={navList} />
        </div>

        <div className="flex w-full items-center gap-3">
          <Input
            placeholder="请输入名称"
            className="h-10 w-64"
            onChange={(e) => {
              setSearchName(e.target.value);
              resetPage();
            }}
            value={searchName}
          />

          {searchName && (
            <Button
              className="bg-[#ebebeb] text-gray-700 hover:bg-[#efefef] hover:text-gray-900"
              onClick={() => {
                setSearchName("");
              }}
            >
              重置
              <Delete className="h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="w-full">
          <Table
            showEditForm={showEditForm}
            list={tagList}
            paginationProps={paginationProps}
            loading={loading}
            onDeleteTag={openDeleteConfirm}
          />
        </div>
      </div>

      {/* 标签表单弹窗 */}
      <TagForm
        ref={formRef}
        formType={formType}
        tagId={tagId}
        refreshList={handleGetTagList}
      />

      {/* 删除确认弹窗 */}
      <ConfirmDialog
        cancelBtnText="取消"
        confirmBtnText="确认"
        title="删除标签"
        description={`确定要删除此标签吗？（${deleteTagName}）`}
        onCancel={() => setIsDeleteConfirmOpen(false)}
        onConfirm={handleDeleteTag}
        isOpen={isDeleteConfirmOpen}
        onOpenChange={setIsDeleteConfirmOpen}
      />
    </>
  );
};

export default AdminBlogList;

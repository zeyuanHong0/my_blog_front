import { useState, useRef, useEffect, useCallback } from "react";
import { useDebounce } from "ahooks";
import { Delete, Plus } from "lucide-react";

import { fetchCategoriesByPage, fetchDeleteCategory } from "@/api/category";
import { usePagination } from "@/hooks/usePagination";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BreadCrumb from "@/components/base/bread-crumb";
import { showSuccessToast } from "@/components/toast";
import ConfirmDialog from "@/components/confirm-dialog";
import Table from "./table";
import CategoryForm, { CategoryFormRef } from "../form";

const AdminBlogList = () => {
  useDocumentTitle("分类管理");
  const navList = [
    { name: "首页", href: "/admin" },
    { name: "分类", href: "/admin/category" },
  ];
  // 表单相关
  const [formType, setFormType] = useState<"create" | "edit">("create");
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const formRef = useRef<CategoryFormRef>(null);
  const showCreateForm = () => {
    setFormType("create");
    formRef.current?.handleShowForm();
  };
  const showEditForm = (id: string) => {
    setFormType("edit");
    setCategoryId(id);
    formRef.current?.handleShowForm();
  };

  // 列表数据
  const [categoryList, setCategoryList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  // const [total, setTotal] = useState(0);

  const { pageNum, pageSize, setTotal, resetPage, paginationProps } =
    usePagination({
      initialPageNum: 1,
      initialPageSize: 5,
    });

  // 查询参数
  const [searchName, setSearchName] = useState<string>("");
  const debouncedSearchName = useDebounce(searchName, { wait: 300 });

  const handleGetCategoryList = useCallback(async () => {
    setLoading(true);
    try {
      const data = {
        name: debouncedSearchName,
        pageNum,
        pageSize,
      };
      const res = await fetchCategoriesByPage(data);
      setCategoryList(res.data.list);
      setTotal(res.data.total);
    } catch (error: any) {
      console.log("🚀 ~ handleGetCategoryList ~ error:", error);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearchName, pageNum, pageSize, setTotal]);

  useEffect(() => {
    handleGetCategoryList();
  }, [handleGetCategoryList]);

  // 删除标签
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState<string>("");
  const [deleteCategoryName, setDeleteCategoryName] = useState<string>("");

  const openDeleteConfirm = (id: string, name: string) => {
    setDeleteCategoryId(id);
    setDeleteCategoryName(name);
    setIsDeleteConfirmOpen(true);
  };

  const handleDeleteCategory = async () => {
    await fetchDeleteCategory(deleteCategoryId);
    showSuccessToast("删除成功");
    setIsDeleteConfirmOpen(false);
    await handleGetCategoryList();
  };
  return (
    <>
      <div className="max-w-wrapper mx-auto flex flex-col gap-y-6 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">分类管理</h2>
          <Button
            className="border-border bg-primary text-background hover:bg-primary/90"
            onClick={showCreateForm}
          >
            <Plus />
            创建分类
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
              className="bg-secondary text-secondary-foreground hover:bg-muted"
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
            list={categoryList}
            paginationProps={paginationProps}
            loading={loading}
            onDeleteCategory={openDeleteConfirm}
          />
        </div>
      </div>

      {/* 分类表单弹窗 */}
      <CategoryForm
        ref={formRef}
        formType={formType}
        categoryId={categoryId}
        refreshList={handleGetCategoryList}
      />

      {/* 删除确认弹窗 */}
      <ConfirmDialog
        cancelBtnText="取消"
        confirmBtnText="确认"
        title="删除分类"
        description={`确定要删除此分类吗？（${deleteCategoryName}）`}
        onCancel={() => setIsDeleteConfirmOpen(false)}
        onConfirm={handleDeleteCategory}
        isOpen={isDeleteConfirmOpen}
        onOpenChange={setIsDeleteConfirmOpen}
      />
    </>
  );
};

export default AdminBlogList;

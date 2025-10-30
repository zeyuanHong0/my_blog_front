import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "ahooks";
import { Plus, CircleSmall } from "lucide-react";

import { fetchBlogsByPage } from "@/api/blog";
import { usePagination } from "@/hooks/usePagination";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { showErrorToast } from "@/components/toast";
import Table from "./table";

const AdminBlogList = () => {
  const navigate = useNavigate();
  const toBlogCreate = () => {
    navigate("/admin/blog/create");
  };
  // 列表数据
  const [blogList, setBlogList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // 查询参数
  const [searchName, setSearchName] = useState<string>("");
  const debouncedSearchName = useDebounce(searchName, { wait: 300 });

  // 分页
  const { pageNum, pageSize, setTotal, resetPage, paginationProps } =
    usePagination({
      initialPageNum: 1,
      initialPageSize: 5,
    });

  const handleGetBlogList = useCallback(async () => {
    setLoading(true);
    try {
      const data = {
        title: debouncedSearchName,
        pageNum: pageNum,
        pageSize: pageSize,
      };
      const res = await fetchBlogsByPage(data);
      setBlogList(res.data.list);
      setTotal(res.data.total);
    } catch (error: any) {
      showErrorToast(error.message || "获取博客列表失败");
    } finally {
      setLoading(false);
    }
  }, [debouncedSearchName, pageNum, pageSize, setTotal]);

  useEffect(() => {
    handleGetBlogList();
  }, [handleGetBlogList]);

  // 前往编辑页面
  const toEditForm = (id: string) => {
    console.log("🚀 ~ toEditForm ~ id:", id);
    navigate(`/admin/blog/edit/${id}`);
  };

  // 删除博客
  // const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  // const [deleteBlogId, setDeleteBlogId] = useState<string>("");
  // const [deleteBlogName, setDeleteBlogName] = useState<string>("");

  const openDeleteConfirm = (id: string, name: string) => {
    // setDeleteBlogId(id);
    // setDeleteBlogName(name);
    // setIsDeleteConfirmOpen(true);
    console.log("删除博客", id, name);
  };

  // const handleDeleteBlog = async () => {
  //   console.log("删除博客");
  // };

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
        <Input
          placeholder="请输入标题"
          className="h-14"
          onChange={(e) => {
            setSearchName(e.target.value);
            resetPage();
          }}
        />
      </div>
      <div className="w-full">
        <Table
          list={blogList}
          paginationProps={paginationProps}
          loading={loading}
          onDeleteBlog={openDeleteConfirm}
          toEditForm={toEditForm}
        />
      </div>
    </div>
  );
};
export default AdminBlogList;

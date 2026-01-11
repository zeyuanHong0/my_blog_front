import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "ahooks";
import { Delete, Plus } from "lucide-react";

import {
  fetchBlogsByPage,
  fetchChangeBlogStatus,
  fetchDeleteBlog,
} from "@/api/blog";
import { fetchAllCategories } from "@/api/category";
import { fetchAllTags } from "@/api/tag";
import { usePagination } from "@/hooks/usePagination";
import { truncateString } from "@/utils";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BreadCrumb from "@/components/base/bread-crumb";
import { showSuccessToast } from "@/components/toast";
import ConfirmDialog from "@/components/confirm-dialog";
import Table from "./table";
import CustomSelect from "@/components/base/custom-select";
import MultiSelect from "@/components/multi-select";

type CategoryOption = {
  label: string;
  value: string;
};

type TagOption = {
  label: string;
  value: string;
};

const AdminBlogList = () => {
  useDocumentTitle("博客管理");
  const navigate = useNavigate();
  const navList = [
    { name: "首页", href: "/admin" },
    { name: "博客", href: "/admin/blog" },
  ];
  const toBlogCreate = () => {
    navigate("/admin/blog/create");
  };
  // 前往编辑页面
  const toEditForm = (id: string) => {
    navigate(`/admin/blog/edit/${id}`);
  };
  // 前往博客详情页面
  const toBlogInfo = (id: string) => {
    navigate(`/blog/${id}`);
  };
  // 列表数据
  const [blogList, setBlogList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // 查询参数
  const [searchName, setSearchName] = useState<string>("");
  const debouncedSearchName = useDebounce(searchName, { wait: 300 });
  const [searchCategory, setSearchCategory] = useState<string>("");
  const [searchTags, setSearchTags] = useState<string[]>([]);

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
        searchCategoryId: searchCategory,
        searchTags: searchTags.join(","),
        pageNum: pageNum,
        pageSize: pageSize,
      };
      const res = await fetchBlogsByPage(data);
      setBlogList(res.data.list);
      setTotal(res.data.total);
    } catch (error: any) {
      console.log("🚀 ~ handleGetBlogList ~ error:", error);
    } finally {
      setLoading(false);
    }
  }, [
    debouncedSearchName,
    pageNum,
    pageSize,
    searchCategory,
    searchTags,
    setTotal,
  ]);

  // 获取所有分类
  const [categoryList, setCategoryList] = useState<CategoryOption[]>([]);
  useEffect(() => {
    const handleGetAllCategories = async () => {
      const res = await fetchAllCategories();
      const categories = res.data.map((category: any) => ({
        label: category.name,
        value: category.id,
      }));
      setCategoryList(categories);
    };
    handleGetAllCategories();
  }, []);

  // 获取所有标签
  const [tagList, setTagList] = useState<TagOption[]>([]);
  useEffect(() => {
    const handleGetAllTags = async () => {
      const res = await fetchAllTags();
      const tags = res.data.map((tag: any) => ({
        label: tag.name,
        value: tag.id,
      }));
      setTagList(tags);
    };
    handleGetAllTags();
  }, []);

  useEffect(() => {
    handleGetBlogList();
  }, [handleGetBlogList]);

  // 重置按钮的显示
  const showResetBtn = Boolean(
    searchName || searchCategory || searchTags.length > 0,
  );

  // 修改博客发布状态
  const handleChangeBlogStatus = async (id: string, published: boolean) => {
    try {
      setBlogList((prevList) =>
        prevList.map((blog) =>
          blog.id === id ? { ...blog, published: published ? 1 : 0 } : blog,
        ),
      );
      await fetchChangeBlogStatus(id, published ? 1 : 0);
      showSuccessToast("修改博客发布状态成功");
    } catch (error: any) {
      // 回滚状态
      setBlogList((prevList) =>
        prevList.map((blog) =>
          blog.id === id ? { ...blog, published: published ? 0 : 1 } : blog,
        ),
      );
      console.log("🚀 ~ handleChangeBlogStatus ~ error:", error);
    }
  };

  // 删除博客
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [deleteBlogId, setDeleteBlogId] = useState<string>("");
  const [deleteBlogName, setDeleteBlogName] = useState<string>("");

  const openDeleteConfirm = (id: string, name: string) => {
    setDeleteBlogId(id);
    setDeleteBlogName(name);
    setIsDeleteConfirmOpen(true);
  };

  const handleDeleteBlog = async () => {
    await fetchDeleteBlog(deleteBlogId);
    showSuccessToast("删除成功");
    setIsDeleteConfirmOpen(false);
    await handleGetBlogList();
  };

  // 重置搜索条件
  const handleReset = () => {
    setSearchName("");
    setSearchCategory("");
    setSearchTags([]);
    resetPage();
  };

  return (
    <>
      <div className="max-w-wrapper mx-auto flex flex-col gap-y-6 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">博客管理</h2>
          <Button
            className="border-black bg-black text-white hover:bg-black/90"
            onClick={toBlogCreate}
          >
            <Plus className="h-4 w-4" />
            创建博客
          </Button>
        </div>
        {/* 面包屑导航 */}
        <BreadCrumb list={navList} />

        <div className="flex w-full items-center gap-3">
          <Input
            placeholder="请输入标题"
            className="h-10 w-64"
            onChange={(e) => {
              setSearchName(e.target.value);
              resetPage();
            }}
            value={searchName}
          />
          <CustomSelect
            className="h-10 w-48"
            list={categoryList}
            value={searchCategory || ""}
            onChange={(value) => {
              console.log("选择的分类:", value);
              setSearchCategory(value);
              resetPage();
            }}
          />
          <MultiSelect
            value={searchTags || []}
            onChange={(value) => {
              console.log("选择的标签:", value);
              setSearchTags(value);
              resetPage();
            }}
            options={tagList}
            placeholder="标签"
          />
          {showResetBtn && (
            <Button
              className="bg-[#ebebeb] text-gray-700 hover:bg-[#efefef] hover:text-gray-900"
              onClick={handleReset}
            >
              重置
              <Delete className="h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="w-full">
          <Table
            list={blogList}
            paginationProps={paginationProps}
            loading={loading}
            onDeleteBlog={openDeleteConfirm}
            onChangeBlogStatus={handleChangeBlogStatus}
            toEditForm={toEditForm}
            toBlogInfo={toBlogInfo}
          />
        </div>
      </div>
      {/* 删除确认弹窗 */}
      <ConfirmDialog
        cancelBtnText="取消"
        confirmBtnText="确认"
        title="删除博客"
        description={`确定要删除这篇博客吗？(${truncateString(deleteBlogName, 50)})`}
        onCancel={() => setIsDeleteConfirmOpen(false)}
        onConfirm={handleDeleteBlog}
        isOpen={isDeleteConfirmOpen}
        onOpenChange={setIsDeleteConfirmOpen}
      />
    </>
  );
};
export default AdminBlogList;

import { useCallback, useEffect, useState } from "react";
import { Delete } from "lucide-react";
import { useDebounce } from "ahooks";

import { fetchAdminUserList, fetchChangeUserStatus } from "@/api/user";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { usePagination } from "@/hooks/usePagination";

import BreadCrumb from "@/components/base/bread-crumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UserTable from "./list";
import ConfirmDialog from "@/components/confirm-dialog";
import { showErrorToast, showSuccessToast } from "@/components/toast";

const User = () => {
  useDocumentTitle("用户管理");
  const navList = [
    { name: "首页", href: "/admin" },
    { name: "用户管理", href: "/admin/user" },
  ];
  // 列表数据
  const [userList, setUserList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const { pageNum, pageSize, setTotal, resetPage, paginationProps } =
    usePagination({
      initialPageNum: 1,
      initialPageSize: 5,
    });
  // 查询参数
  const [searchName, setSearchName] = useState<string>("");
  const debouncedSearchName = useDebounce(searchName, { wait: 300 });
  const handleGetUserList = useCallback(async () => {
    setLoading(true);
    try {
      const res: any = await fetchAdminUserList({
        name: debouncedSearchName,
        pageNum,
        pageSize,
      });
      setUserList(res.data?.list);
      setTotal(res.data?.total);
    } catch (error) {
      console.error("列表获取失败:", error);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearchName, pageNum, pageSize, setTotal]);
  useEffect(() => {
    handleGetUserList();
  }, [handleGetUserList]);

  const [isStatusChangeConfirmOpen, setIsStatusChangeConfirmOpen] =
    useState(false);
  const [currentUserId, setCurrentUserId] = useState<string>("");
  const [currentUserStatus, setCurrentUserStatus] = useState<0 | 1>(0);
  const onChangeUserStatus = (id: string, status: 0 | 1) => {
    setCurrentUserId(id);
    setCurrentUserStatus(status);
    setIsStatusChangeConfirmOpen(true);
  };
  const handleChangeStatus = async () => {
    try {
      await fetchChangeUserStatus({
        id: currentUserId,
        status: currentUserStatus === 0 ? 1 : 0,
      });
      showSuccessToast(`用户已${currentUserStatus === 0 ? "禁用" : "启用"}`);
      handleGetUserList();
    } catch {
      showErrorToast("改变用户状态失败");
    }
  };

  return (
    <>
      <div className="max-w-wrapper mx-auto flex flex-col gap-y-6 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">用户管理</h2>
        </div>
        <div>
          {/* 面包屑导航 */}
          <BreadCrumb list={navList} />
        </div>

        <div className="flex w-full items-center gap-3">
          <Input
            placeholder="请输入名称或邮箱"
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
          <UserTable
            list={userList}
            loading={loading}
            paginationProps={paginationProps}
            onChangeUserStatus={onChangeUserStatus}
          />
        </div>
      </div>

      {/* 改变用户状态确认对话框 */}
      <ConfirmDialog
        cancelBtnText="取消"
        confirmBtnText="确认"
        title="改变用户状态"
        description={`确定要${currentUserStatus === 0 ? "禁用" : "启用"}该用户吗？`}
        onCancel={() => setIsStatusChangeConfirmOpen(false)}
        onConfirm={handleChangeStatus}
        isOpen={isStatusChangeConfirmOpen}
        onOpenChange={setIsStatusChangeConfirmOpen}
      />
    </>
  );
};

export default User;

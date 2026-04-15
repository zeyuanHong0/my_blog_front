import { useEffect, useState } from "react";
import { Delete } from "lucide-react";
import { useDebounce } from "ahooks";

import { fetchAdminUserList } from "@/api/user";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { usePagination } from "@/hooks/usePagination";

import BreadCrumb from "@/components/base/bread-crumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UserTable from "./list";

const User = () => {
  useDocumentTitle("用户管理");
  const navList = [
    { name: "首页", href: "/admin" },
    { name: "用户管理", href: "/admin/user" },
  ];
  // 列表数据
  const [userList, setUserList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const { pageNum, pageSize, setTotal, resetPage, paginationProps } =
    usePagination({
      initialPageNum: 1,
      initialPageSize: 5,
    });
  // 查询参数
  const [searchName, setSearchName] = useState<string>("");
  const debouncedSearchName = useDebounce(searchName, { wait: 300 });
  useEffect(() => {
    const fetchData = async () => {
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
    };

    fetchData();
  }, [debouncedSearchName, pageNum, pageSize, setTotal]);

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
            onDeleteUser={(id, username) => {}}
          />
        </div>
      </div>
    </>
  );
};

export default User;

import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LogOut, User, UserCog } from "lucide-react";

import { cn } from "@/lib/utils";
import useUserStore from "@/store/userStore";
import ScrollToTop from "@/components/ScrollToTop";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import ConfirmDialog from "@/components/confirm-dialog";
import ThemeModeSwitcher from "@/components/ThemeModeSwitcher";
import { AppSidebar } from "./app-sidebar";
import ProfileSettingsDialog, {
  type ProfileSettingsDialogRef,
} from "./profile-settings-dialog";

const AdminLayout = () => {
  const navigate = useNavigate();
  const { userInfo, userLogout, isLoginExpired, setLoginExpired } =
    useUserStore();

  // 退出登录相关
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const handleLogout = async () => {
    const res = await userLogout();
    if (res === "success") {
      navigate("/auth/login");
    }
  };

  // 登录过期相关
  const [isExpiredConfirmOpen, setIsExpiredConfirmOpen] = useState(false);
  useEffect(() => {
    // console.log("isLoginExpired", isLoginExpired);
    if (isLoginExpired) {
      setIsExpiredConfirmOpen(true);
    }
  }, [isLoginExpired]);

  // 信息设置相关
  const profileSettingsDialogRef = useRef<ProfileSettingsDialogRef>(null);

  return (
    <>
      <ScrollToTop />
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header
            className={cn(
              "sticky inset-x-0 top-0 z-[5] flex h-16 shrink-0 items-center justify-between gap-2 px-10",
              "bg-background/50 backdrop-blur",
            )}
          >
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger />
              <Separator
                orientation="vertical"
                className={`mr-2 data-[orientation=vertical]:h-4`}
              />
            </div>
            <div className="flex items-center gap-2">
              <ThemeModeSwitcher />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                    >
                      <User />
                    </Button>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-60 rounded-lg"
                  side="bottom"
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col gap-1 px-1 py-1.5 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {userInfo?.username}
                      </span>
                      <span className="truncate text-xs">
                        {userInfo?.email}
                      </span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="flex flex-row gap-1 p-1">
                    <DropdownMenuItem
                      className="flex-1 cursor-pointer justify-center"
                      onClick={() => {
                        profileSettingsDialogRef.current?.handleShowDialog();
                      }}
                    >
                      <UserCog className="mr-2 h-4 w-4" />
                      <span>账号设置</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="flex-1 cursor-pointer justify-center text-red-600 focus:bg-red-100 focus:text-red-700 dark:focus:bg-red-950 dark:focus:text-red-500"
                      onClick={() => setIsDeleteConfirmOpen(true)}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>退出</span>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main>
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
      {/* 退出登录提示弹窗 */}
      <ConfirmDialog
        cancelBtnText="取消"
        confirmBtnText="确认"
        title="退出登录"
        description={`确定要退出登录吗？`}
        onCancel={() => setIsDeleteConfirmOpen(false)}
        onConfirm={handleLogout}
        isOpen={isDeleteConfirmOpen}
        onOpenChange={setIsDeleteConfirmOpen}
      />
      {/* 登录过期提示弹窗 */}
      <ConfirmDialog
        cancelBtnText="取消"
        confirmBtnText="重新登录"
        title="提示"
        description={`登录状态已过期，您可以停留在该页面或者重新登录`}
        onCancel={() => {
          setIsExpiredConfirmOpen(false);
          setLoginExpired(false);
        }}
        onConfirm={() => {
          setLoginExpired(false);
          navigate("/auth/login");
        }}
        isOpen={isExpiredConfirmOpen}
        onOpenChange={(open) => {
          setIsExpiredConfirmOpen(open);
          if (!open) setLoginExpired(false);
        }}
      />
      {/* 个人信息设置弹窗 */}
      <ProfileSettingsDialog ref={profileSettingsDialogRef} />
    </>
  );
};

export default AdminLayout;

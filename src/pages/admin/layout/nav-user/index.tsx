import { useNavigate } from "react-router-dom";
import { ChevronsUpDown, LogOut, UserCog } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import useUserStore from "@/store/userStore";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import ProfileSettingsDialog, {
  type ProfileSettingsDialogRef,
} from "../profile-settings-dialog";
import ConfirmDialog from "@/components/confirm-dialog";

function NavUser() {
  const navigate = useNavigate();
  const { isMobile } = useSidebar();
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
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=random`}
                    alt={userInfo?.username || "User Avatar"}
                  />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {userInfo?.username}
                  </span>
                  <span className="truncate text-xs">{userInfo?.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=random`}
                      alt={userInfo?.username || "User Avatar"}
                    />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {userInfo?.username}
                    </span>
                    <span className="truncate text-xs">{userInfo?.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => {
                    profileSettingsDialogRef.current?.handleShowDialog();
                  }}
                >
                  <UserCog />
                  账号设置
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600 focus:bg-red-100 focus:text-red-700 dark:focus:bg-red-950 dark:focus:text-red-500"
                onClick={() => setIsDeleteConfirmOpen(true)}
              >
                <LogOut />
                退出登录
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
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
}

export default NavUser;

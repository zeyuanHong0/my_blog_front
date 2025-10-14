import { Outlet } from "react-router-dom";
import { LogOut, User } from "lucide-react";

import { cn } from "@/lib/utils";
import useUserStore from "@/store/userStore";

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
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { AppSidebar } from "./app-sidebar";

const AdminLayout = () => {
  const { userInfo } = useUserStore();
  return (
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User />
                  </Button>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col gap-1 px-1 py-1.5 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {userInfo?.username}
                    </span>
                    <span className="truncate text-xs">{userInfo?.email}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem className="cursor-pointer">
                    <LogOut />
                    <span>退出登录</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminLayout;

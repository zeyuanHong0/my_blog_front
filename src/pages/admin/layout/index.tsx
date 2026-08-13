import { Outlet } from "react-router-dom";

import { cn } from "@/lib/utils";
import ScrollToTop from "@/components/ScrollToTop";

import { Separator } from "@/components/ui/separator";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import ThemeModeSwitcher from "@/components/ThemeModeSwitcher";
import { AppSidebar } from "./app-sidebar";

const AdminLayout = () => {
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
            </div>
          </header>
          <main>
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};

export default AdminLayout;

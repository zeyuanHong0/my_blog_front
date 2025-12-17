import { Link, useNavigate, useLocation } from "react-router-dom";
import { Book, Home, Tag, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { useActiveNav } from "@/hooks/useActiveNav";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { SvgIcon } from "@/components/Icon";
import LogoIcon from "/blog.svg?raw";

const items = [
  {
    label: "首页",
    path: "/admin",
    icon: Home,
  },
  {
    label: "博客",
    path: "/admin/blog",
    icon: Book,
    children: [
      { label: "列表", path: "/admin/blog" },
      { label: "创建", path: "/admin/blog/create" },
    ],
  },
  {
    label: "标签",
    path: "/admin/tag",
    icon: Tag,
  },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isActive } = useActiveNav(items);

  const handleChangeRoute = (path: string) => {
    // 判断当前路由是否与目标路由相同
    if (location.pathname !== path) {
      navigate(path);
    }
  };
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/" className="flex items-center">
                <SvgIcon icon={LogoIcon} size={24} className="mr-1" />
                <span className="text-base font-semibold">后台管理</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.label}>
                  {item.children ? (
                    // 有子项的菜单项
                    <Collapsible defaultOpen className="group/collapsible">
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                          <item.icon />
                          <span>{item.label}</span>
                          {/*  右侧箭头 */}
                          <ChevronRight
                            className={cn(
                              "ml-auto h-4 w-4 transition-transform duration-200",
                              "group-data-[state=open]/collapsible:rotate-90",
                            )}
                          />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.children.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.label}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={isActive(subItem.path)}
                              >
                                <div
                                  onClick={() =>
                                    handleChangeRoute(subItem.path)
                                  }
                                  className="cursor-pointer"
                                >
                                  {subItem.label}
                                </div>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    // 没有子项的菜单项
                    <SidebarMenuButton asChild isActive={isActive(item.path)}>
                      <div
                        onClick={() => handleChangeRoute(item.path)}
                        className="flex w-full cursor-pointer items-center"
                      >
                        <item.icon />
                        <span>{item.label}</span>
                      </div>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

const AdminHome = () => {
  const navigate = useNavigate();
  const guestList = [
    { name: "创建博客", action: () => navigate("/admin/blog/create") },
    { name: "管理标签", action: () => navigate("/admin/tag") },
  ];
  return (
    <div className="relative h-[calc(100vh-64px)] w-full">
      <div className="absolute top-1/6 left-1/2 flex -translate-x-1/2 transform flex-col gap-2">
        <h2 className="text-3xl font-bold">欢迎使用后台管理系统</h2>
        <div className="text-lg text-[#8D8D8D]">你可能想 🤔</div>
        <div className="flex items-center gap-4">
          {guestList.map((guest) => (
            <Button
              key={guest.name}
              className="h-8 border-black bg-black text-white"
              onClick={guest.action}
            >
              {guest.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;

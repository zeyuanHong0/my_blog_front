import { useNavigate } from "react-router-dom";

import { SvgIcon } from "@/components/Icon";
import No_Permission from "@/assets/images/no-permission.svg?raw";
import { Button } from "@/components/ui/button";

const NoPermission = () => {
  const navigate = useNavigate();
  return (
    <div className="grid h-screen place-items-center">
      <div className="grid gap-8">
        <SvgIcon icon={No_Permission} size={300} />
        <h3 className="text-center text-2xl font-semibold tracking-tight">
          没有权限访问该页面
        </h3>
        <Button
          className="bg-primary text-primary-foreground w-full rounded-sm"
          onClick={() => navigate(-1)}
        >
          返回上一页
        </Button>
      </div>
    </div>
  );
};
export default NoPermission;

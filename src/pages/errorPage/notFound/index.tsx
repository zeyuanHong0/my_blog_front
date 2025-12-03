import { Link } from "react-router-dom";

import { SvgIcon } from "@/components/Icon";
import Not_FoundSvg from "@/assets/images/not_found.svg?raw";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="grid h-screen place-items-center">
      <div className="grid gap-8">
        <SvgIcon icon={Not_FoundSvg} size={300} />
        <h3 className="text-center text-2xl font-semibold tracking-tight">
          页面未找到
        </h3>
        <Link to="/" className="block">
          <Button className="bg-primary text-primary-foreground w-full rounded-sm">
            返回首页
          </Button>
        </Link>
      </div>
    </div>
  );
};
export default NotFound;

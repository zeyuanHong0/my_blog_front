import { Github, Mail, Smartphone } from "lucide-react";
import { EMAIL, SOURCE_CODE_GITHUB_PAGE } from "@/constants";
import wechatQr from "@/assets/images/wechat-qr.jpg";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const SocialMediaList = () => {
  return (
    <>
      {/* GitHub */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="hover:text-primary hover:border-primary/50 rounded-full shadow-sm transition-colors"
            onClick={() => window.open(SOURCE_CODE_GITHUB_PAGE, "_blank")}
          >
            <Github className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>GitHub</TooltipContent>
      </Tooltip>

      {/* Mail */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="hover:text-primary hover:border-primary/50 rounded-full shadow-sm transition-colors"
            onClick={() => {
              window.location.href = `mailto:${EMAIL}`;
            }}
          >
            <Mail className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>邮箱</TooltipContent>
      </Tooltip>

      {/* 小程序二维码 */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="hover:text-primary hover:border-primary/50 rounded-full shadow-sm transition-colors"
          >
            <Smartphone className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex w-56 flex-col items-center gap-3 rounded-xl p-4 shadow-xl">
          <span className="text-muted-foreground text-sm font-medium">
            扫码体验小程序版
          </span>
          {/* 小程序二维码图片*/}
          <div className="bg-muted/30 border-border/50 flex h-40 w-40 items-center justify-center rounded-lg border">
            <img
              className="h-full w-full object-contain"
              src={wechatQr}
              alt="小程序二维码"
            />
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default SocialMediaList;

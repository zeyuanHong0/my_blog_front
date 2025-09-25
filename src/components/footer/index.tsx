import dayjs from "dayjs";

import { cn } from "@/lib/utils";
import { NICKNAME, SLOGAN } from "@/constants";

const Footer = () => {
  return (
    <footer className="px-6 py-12">
      <div
        className={cn(
          "text-muted-foreground flex flex-col items-center justify-center space-y-1 pt-24 text-sm",
          "md:flex-row md:space-y-0 md:space-x-4",
        )}
      >
        <p className="text-sm text-gray-600">
          {`© ${dayjs().year()} ${NICKNAME}. ${SLOGAN}`}
        </p>
      </div>
    </footer>
  );
};

export default Footer;

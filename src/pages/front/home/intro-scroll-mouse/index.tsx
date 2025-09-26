import { cn } from "@/lib/utils";

const IntroScrollMouse = () => {
  return (
    <div
      className={cn(
        "border-primary/30 relative grid h-[30px] w-[20px] justify-center rounded-full border-2 pt-2",
        "md:h-[38px] md:w-[26px]",
      )}
    >
      <div
        className={cn(
          "bg-primary/30 h-[5px] w-[2px] rounded-full",
          "md:h-[7px]",
        )}
      ></div>
    </div>
  );
};

export default IntroScrollMouse;

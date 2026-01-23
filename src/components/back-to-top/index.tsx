import { useScroll } from "ahooks";

import { cn } from "@/lib/utils";

import { Iconify } from "@/components/Icon";
import Button from "@/components/button";

const BackToTop = () => {
  const position = useScroll(document);
  // console.log("🚀 ~ BackToTop ~ position:", position);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <Button
      className={cn(
        "bg-background hover:bg-accent/80 fixed right-8 bottom-8 rounded-full p-[6px]",
        {
          hidden: (position?.top ?? 0) < 100,
        },
      )}
      onClick={scrollToTop}
    >
      <Iconify icon="material-symbols-light:keyboard-arrow-up" size={22} />
    </Button>
  );
};

export default BackToTop;

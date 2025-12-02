import { SvgIcon } from "@/components/Icon";
import EmptyImage from "@/assets/images/empty.svg?raw";

interface EmptyBoxProps {
  iconSize: number | string;
  children?: React.ReactNode;
}

const EmptyBox = ({ iconSize, children }: EmptyBoxProps) => {
  return (
    <div className="flex flex-col items-center justify-center pt-10">
      <div style={{ width: iconSize }}>
        <SvgIcon icon={EmptyImage} className="h-auto w-full [&>svg]:h-auto" />
      </div>
      {children ? (
        <>{children}</>
      ) : (
        <h3 className="text-center text-2xl font-semibold tracking-tight">
          暂无数据
        </h3>
      )}
    </div>
  );
};

export default EmptyBox;

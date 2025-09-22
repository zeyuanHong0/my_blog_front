import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
}

const Button: React.FC<Props> = ({ icon, className, ...props }) => {
  return (
    <button
      className={`bg-white flex h-9 w-9 items-center justify-center rounded-full border border-[#E8E8EB] hover:bg-gray-200 ${className}`}
      {...props}
    >
      {icon}
    </button>
  );
};

export default Button;

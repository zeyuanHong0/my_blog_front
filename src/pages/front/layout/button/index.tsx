import React from "react";

const Button: React.FC<{ icon: React.ReactNode }> = ({ icon }) => {
  return (
    <button className="bg-white flex h-9 w-9 items-center justify-center rounded-full border border-[#E8E8EB] hover:bg-gray-200">
      {icon}
    </button>
  );
};

export default Button;

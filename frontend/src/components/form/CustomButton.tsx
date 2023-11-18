import type { ButtonHTMLAttributes } from "react";

const CustomButton = ({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>): JSX.Element => {
  return (
    <button
      {...props}
      className="w-full py-2 flex items-center justify-center bg-[#7b64f2] md:mt-10 lg:mt-14 mt-6 rounded-md text-white"
    >
      {children}
    </button>
  );
};

export default CustomButton;

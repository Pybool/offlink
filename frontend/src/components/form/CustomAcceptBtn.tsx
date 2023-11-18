import type { ButtonHTMLAttributes } from "react";

const CustomAcceptButton = ({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>): JSX.Element => {
  return (
    <button
      {...props}
      className="py-2 flex items-center justify-center bg-[#4461F2] rounded-md text-white"
    >
      {children}
    </button>
  );
};

export default CustomAcceptButton;
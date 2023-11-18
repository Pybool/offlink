import { useState, type InputHTMLAttributes, useCallback } from "react";
import EyeClosedIcon from "./icons/EyeClosed";
import EyeOpenedIcon from "./icons/EyeOpened";

type CustomHTMLInputElementProps = {
  error: string;
} & InputHTMLAttributes<HTMLInputElement>;

const CustomPasswordInput = ({
  id,
  name,
  error,
  value,
  ...props
}: CustomHTMLInputElementProps) => {
  const [visible, setVisible] = useState<boolean>(false);

  const toggleVisibility = useCallback(() => {
    setVisible((state) => !state);
  }, [visible]);

  return (
    <div className="form-group mb-8 ">
      <div className="relative">
        <input
          id={id}
          name={name}
          {...props}
          type={visible ? "text" : "password"}
          className="w-full py-3 rounded-md flex items-center px-3 bg-[#EAF0F7]"
        />
        <div className="absolute cursor-pointer top-0 right-4 flex items-center pl-3 h-full">
          <div onClick={toggleVisibility}>
            {visible ? <EyeClosedIcon /> : <EyeOpenedIcon />}
          </div>
        </div>
      </div>
      {error && value && <div className="text-red-900 text-sm">{error}</div>}
    </div>
  );
};

export default CustomPasswordInput;

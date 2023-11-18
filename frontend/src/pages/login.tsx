import CustomButton from "@/components/form/CustomButton";
import Navbar from "@/components/Navbar";
import CustomInput from "@/components/form/CustomInput";
import CustomPasswordInput from "@/components/form/CustomPasswordInput";
import LoadingIcon from "@/components/LoadingIcon";
import { validateEmail, validatePassword } from "@/helpers/validation";
import useLogin from "@/hooks/useLogin";
import useValidation from "@/hooks/useValidation";
import NotAuthMiddleware from "@/middlewares/auth/NotAuthMiddleware";
import { useRouter } from "next/router";
import Auth from "@/layouts/Auth";

import { useCallback, useState } from "react";
import type { ReactElement } from "react";

const LoginPage = (): JSX.Element => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const emailError = useValidation(email, validateEmail);
  const passwordError = useValidation(password, validatePassword);

  const navigate = useRouter();

  const isValidTogether = useCallback(() => {
    if (emailError?.type === "error") {
      return false;
    }

    if (passwordError?.type === "error") {
      return false;
    }

    return true;
  }, [emailError, passwordError]);

  const { login, notification, isLoading } = useLogin({
    email,
    password,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidTogether()) {
      return;
    }

    if (await login()) {
      navigate.push("/offramp");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full">
        {/* <div className="w-full space-y-4"> */}
          <p className="text-red-900">{notification?.message}</p>
          <CustomInput
            type="text"
            name="email"
            className="w-full py-2 flex items-center justify-center bg-[#7b64f2] md:mt-10 lg:mt-14 mt-6 rounded-md text-white"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
            }}
            value={email}
            error={emailError?.message ?? ""}
          />
          <CustomPasswordInput
            type="password"
            name="password"
            className="w-full py-2 flex items-center justify-center bg-[#7b64f2] md:mt-10 lg:mt-14 mt-6 rounded-md text-white"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
            }}
            value={password}
            error={passwordError?.message ?? ""}
          />
          <CustomButton disabled={isLoading} type="submit">
            {isLoading && <LoadingIcon />}
            Login
          </CustomButton>
        {/* </div> */}
      </form>
    </>
  );
};

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <NotAuthMiddleware>
      <Auth login="Login" accountStatus="Don't have an account?" urlName={"SignUp"} url="register">
        {page}
      </Auth>
    </NotAuthMiddleware>
  )

};

export default LoginPage;

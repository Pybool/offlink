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
import Link from "next/link";
import Image from "next/image";

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
      <div>
        <Navbar />
        <section
          id="main-content"
          className="container mx-auto h-[93vh] md:p-8 lg:p-0  md:flex block lg:flex-row flex-col justify-between items-center w-full space-y-6 md:space-y-0"
        >
          <div className="img-sec flex  md:flex-row flex-col-reverse lg:w-[65%] md:w-[95%] w-full p-4 md:p-0 space-y-6 md:space-y-0">
            <div className="flex items-center justify-center md:flex-row flex-col-reverse">
              <div className="md:w-[50%]  w-full  space-y-4 px-4 md:px-0 pt-8 md:pt-0 lg:pt-0">
                <p className="lg:text-5xl md:text-4xl text-3xl font-semibold text-black lg:leading-[77px]">
                  Login <br /> Start Trading <br />Your Stablecoin
                </p>
                <p className="text-xl font-semibold">
                  24/7 Customer Trading Support

                </p>
              </div>

              <div className="image md:w-[50%] w-full  h-full hidden md:block">
                <Image
                  src={"/exchangenew.png"}
                  alt="exchange"
                  className="object-contain md:h-[25rem] h-[15rem]"
                  width={400}
                  height={240}
                />
              </div>
            </div>
          </div>
          <div className="login-sec lg:w-[30%] w-full p-4 lg:p-0  h-[20rem] md:h-[25rem]">
            <div className="w-full px-4 md:px-0">
              {/* {children}
                         */}

              <form onSubmit={handleSubmit} className="w-full">
                {/* <div className="w-full space-y-4"> */}
                <p className="text-red-900">{notification?.message}</p>
                <CustomInput
                  type="text"
                  name="email"
                  className="w-full py-2 flex items-center justify-center bg-[#7b64f2] md:mt-10 lg:mt-14 mt-6 rounded-md text-black"
                  placeholder="Email"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                  error={emailError?.message ?? ""}
                />
                <CustomPasswordInput
                  type="password"
                  name="password"
                  className="w-full py-2 flex items-center justify-center bg-[#7b64f2] md:mt-10 lg:mt-14 mt-6 rounded-md text-black"
                  placeholder="Password"
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
            </div>
            <div className="flex justify-between items-center  lg:mt-14 md:mt-10 mt-6 px-4 md:px-0">
              <div className="dash w-[40%] bg-[#DFDFDF] h-[0.1rem]"></div>
              <p className="text-[#ACADAC]">or</p>
              <div className="dash w-[40%] bg-[#DFDFDF] h-[0.1rem]"></div>
            </div>

            <div className="w-full px-4 md:px-0 mt-6 lg:mt-16 md:mt-10 flex justify-between items-center">
              <p className="text-xl font-semibold">Don&apos;t have an account?</p>
              <Link href={`/register`} className="text-[#7b64f2] text-xl font-semibold">
                SignUp
              </Link>
            </div>
          </div>
        </section>
      </div>

    </>
  );
};

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <NotAuthMiddleware>
      {/* <Auth login="Login" accountStatus="Don't have an account?" urlName={"SignUp"} url="register"> */}
        {page}
      {/* </Auth> */}
    </NotAuthMiddleware>
  )

};

export default LoginPage;

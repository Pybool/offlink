
import React from "react"; 
import Navbar from "@/components/Navbar";
import { PropsWithChildren } from "react";
import Link from "next/link";
import Image from "next/image";


type Props = {
    children: React.ReactNode,
    login: string,
    accountStatus: string,
    url: string,
    urlName: String,
}

const Auth = ({ children, login, accountStatus, url, urlName}: Props) => {
    return (
        <div className="">
            <Navbar />
            <section
                id="main-content"
                className="container mx-auto h-[93vh] md:p-8 lg:p-0  md:flex block lg:flex-row flex-col justify-between items-center w-full space-y-6 md:space-y-0"
            >
                <div className="img-sec flex  md:flex-row flex-col-reverse lg:w-[65%] md:w-[95%] w-full p-4 md:p-0 space-y-6 md:space-y-0">
                    <div className="flex items-center justify-center md:flex-row flex-col-reverse">
                        <div className="md:w-[50%]  w-full  space-y-4 px-4 md:px-0 pt-8 md:pt-0 lg:pt-0">
                            <p className="lg:text-5xl md:text-4xl text-3xl font-semibold text-black lg:leading-[77px]">
                                {login} <br /> Start Trading <br />Your Stablecoin
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
                        {children}
                    </div>
                    <div className="flex justify-between items-center  lg:mt-14 md:mt-10 mt-6 px-4 md:px-0">
                        <div className="dash w-[40%] bg-[#DFDFDF] h-[0.1rem]"></div>
                        <p className="text-[#ACADAC]">or</p>
                        <div className="dash w-[40%] bg-[#DFDFDF] h-[0.1rem]"></div>
                    </div>

                    <div className="w-full px-4 md:px-0 mt-6 lg:mt-16 md:mt-10 flex justify-between items-center">
                        <p className="text-xl font-semibold">{accountStatus}</p>
                        <Link href={`/${url}`} className="text-[#7b64f2] text-xl font-semibold">
                            {urlName}
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Auth
'use client'
import React, { useState } from 'react'
import logo from "../../public/logo.svg"
import Link from 'next/link'
import useAuthenticated from '@/hooks/useAuthenticated'
import Image from 'next/image'
import { useRouter } from "next/router";

const Navbar = () => {
    const [toggle, setToggle] = useState<Boolean>(false)

    const router = useRouter()
    let token

    if (typeof window !== "undefined") {
        token = localStorage.getItem("token");
    }

    const toggleMenu = () => {
        setToggle(!toggle);
    };

    const { authenticated: isAuthenticated} = useAuthenticated()

    const loginout = () => {
        localStorage.removeItem("token");
        router.push("/")
    }

    return (
        <>
            <nav className="bg-[#4461F2] py-4 px-4 ">
                <div className="container mx-auto flex justify-between items-center ">

                    {/* <!-- Logo --> */}
                    <div className="flex items-center space-x-2">
                        <div>
                            <Link href="/">
                            
                            <Image src={logo} width={34} height={34} alt='logo' />
                            </Link>
                        </div>
                        <p className="text-white text-xl font-semibold">OFFLINK</p>
                    </div>
                    


                    {/* <!-- Navbar Links - Desktop --> */}
                    <div className="hidden md:flex space-x-6">
                        {token ? (<>
                            <Link href="/dashboard" className="text-white h-[2rem] flex items-center justify-center text-center">Dashboard</Link>
                            <Link href="/offramp" className="text-white h-[2rem] flex items-center justify-center text-center">Offramp</Link>
                            <Link href="/profile" className="text-white h-[2rem] flex items-center justify-center text-center">Profile</Link>
                            <button onClick={loginout} className="text-white h-[2rem] flex items-center justify-center text-center">Logout</button>
                        </>
                        ) : (<>
                            <Link href="/register" className="text-white h-[2rem] flex items-center justify-center">Sign Up</Link>
                            <Link href="/login" className="text-white"><button className="bn632-hover bn20">Login</button></Link></>)}
                    </div>

                    {/* <!-- Navbar Toggle Button - Mobile --> */}
                    <div className="md:hidden">
                        <button id="mobile-menu-btn" className="text-white focus:outline-none" onClick={toggleMenu}>
                            {toggle ? (
                                (<p>X</p>)
                            ) :
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M4 6h16M4 12h16m-7 6h7"></path>
                                </svg>
                            }
                        </button>
                    </div>

                </div>
            </nav>


            {toggle && (
                <div id="mobile-menu" className="fixed z-20 top-0  
    right-0 bottom-0 left-0 flex flex-col 
    items-center gap-6 justify-center bg-[#4461f2] text-white">
                    <button
                        className="text-white absolute top-4 right-4"
                        onClick={toggleMenu}
                    >
                        <p className=' text-xl font-bold'>X</p>
                    </button>
                    {token ? (<>
                            <Link href="/" className="text-white h-[2rem] flex items-center justify-center text-center">Home</Link>
                            <Link href="/dashboard" className="text-white h-[2rem] flex items-center justify-center text-center">Dashboard</Link>
                            <Link href="/offramp" className="text-white h-[2rem] flex items-center justify-center text-center">Offramp</Link>
                            <Link href="/profile" className="text-white h-[2rem] flex items-center justify-center text-center">Profile</Link>
                        </>
                        ) : (<>
                            <Link href="/register" className="text-white h-[2rem] flex items-center justify-center">Sign Up</Link>
                            <Link href="/login" className="text-white"><button className="bn632-hover bn20">Login</button></Link></>)}

                </div>
            )}
        </>
    )
}

export default Navbar

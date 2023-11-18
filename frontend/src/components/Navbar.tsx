'use client'
import React, { useState } from 'react'
import logo from "../../public/logo.svg"
import Link from 'next/link'
import Image from 'next/image'

const Navbar = () => {
    const [toggle, setToggle] = useState<Boolean>(false)

    const toggleMenu = () => {
        setToggle(!toggle);
      };

  return (
    <>
      <nav className="bg-[#b2b6ef] py-4 px-4 ">
    <div className="container mx-auto flex justify-between items-center ">

      {/* <!-- Logo --> */}
      <div className="flex items-center space-x-2">
        <div> 
            <Image src={logo} width={34} height={34} alt='logo' />
        </div>
        <p className="text-white text-xl font-semibold">OFFLINK</p>
      </div>
     

      {/* <!-- Navbar Links - Desktop --> */}
      <div className="hidden md:flex space-x-6">
        <Link href="/home" className="text-white h-[2rem] flex items-center justify-center text-center">Home</Link>
        <Link href="/signin" className="text-white h-[2rem] flex items-center justify-center">Sign Up</Link>
        <Link href="/login" className="text-white"><button className="bn632-hover bn20">Login</button></Link>
      </div>

      {/* <!-- Navbar Toggle Button - Mobile --> */}
      <div className="md:hidden">
        <button id="mobile-menu-btn" className="text-white focus:outline-none" onClick={toggleMenu}>
          {toggle ? (
          (<p>X</p>)
          ): 
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

  
  { toggle && (
    <div id="mobile-menu" className="fixed z-20 top-0  
    right-0 bottom-0 left-0 flex flex-col 
    items-center gap-6 justify-center bg-[#b2b6ef] text-white">
        <button
            className="text-white absolute top-4 right-4"
            onClick={toggleMenu}
          >
            <p>X</p>
          </button>
    <Link href="/" className="block text-xl text-center">Home</Link>
    <Link href="/signup" className="block  text-xl text-center">Sign Up</Link>
    <Link href="/login" className="block text-xl text-center">Login</Link>
   
  </div>
  )}  
    </>
  )
}

export default Navbar
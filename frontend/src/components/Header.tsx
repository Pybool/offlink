import React from 'react'
import Navbar from './Navbar'
import p2p from '../../public/images/p2pnew.png'
import Image from 'next/image'
const Header = () => {
    return (
        <>
            {/* <div className=" flex flex-row max-sm:flex-col-reverse items-center my-4 gap-6 justify-center">

                <div className="txt flex  pb-6 bg-red-500 ">

                    <div className=' flex  w-full flex-col space-y-4 mt-6 '>

                        <p className='px-5 text-white text-2xl lg:text-4xl'>Get Started</p>
                        <p className='px-5 text-white'>Trade, Secure & Fast</p>
                        <div className='px-5'>
                            <button className='btn2 p-2 flex justify-center font-semibold items-center rounded-lg text-white bg-[#7b64f2]'>
                                Trade
                            </button></div>
                    </div>
                </div>

                <div className="">
                    <img src={p2p.src} alt='p2p' className=' bg-blue-500 mx-auto h-full object-contain' />
                </div>

            </div> */}
            <section id="main-content" className="container mx-auto md:p-8 lg:p-0  md:flex block lg:flex-row flex-col justify-between items-center w-full space-y-6 md:space-y-0">

                <div className="img-sec flex bg-blue-500  justify-between md:flex-row flex-col-reverse  w-full p-4 md:p-0 space-y-6 md:space-y-0">

                    <div className="txt  md:w-[50%] w-full space-y-6 flex flex-col">
                        <div className=' flex  w-full flex-col space-y-4 mt-6 '>

                            <p className='px-5 text-white text-2xl lg:text-4xl'>Get Started</p>
                            <p className='px-5 text-white'>Trade, Secure & Fast</p>
                            <div className='px-5'>
                                <button className='btn2 p-2 flex justify-center font-semibold items-center rounded-lg text-white bg-[#7b64f2]'>
                                    Trade
                                </button></div>
                        </div>
                    </div>
                    <div className="image md:w-[50%] w-full flex items-center justify-center">
                        <Image src={p2p.src} alt="" className="h-[15rem] object-contain" />
                    </div>





                </div>
            </section>

        </>
    )
}
export default Header;
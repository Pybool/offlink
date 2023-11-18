import React, { ReactElement, useEffect, useState } from 'react'
import  Navbar from '@/components/Navbar';
import { truuncateAddress } from '@/helpers/truncateAddress';
import { identiconAddress } from '@/helpers/BlockieAddress';
import { useAccount } from 'wagmi';
import WagmiWrapperLayout from '@/layouts/Wagmi';
import AuthMiddleware from '@/middlewares/auth/AuthMiddleware';
import ConnectLayout from '@/layouts/Connect';
import { getUserPorfile } from '@/helpers/transaction';
import UpdateProfile from '@/components/UpdateProfileModal';

const Profile = () => {
    const { address } = useAccount()
    const [data, setData] = useState<any>()

    const profile = async () => {
      const response = await getUserPorfile()
      console.log(response)
      setData(response)
    }
    useEffect(() => {
      profile()
    }, [])
// bankAccount
// bankName
// email
// firstname
// othername
// phone
// surname


    return (
    <div>
      
        <div className=" flex justify-center items-center flex-col">
      <div className=" w-full h-[300px] max-md:h-[250px] max-sm:h-[200px] bg-[#4461F2]">
        <div className=" relative flex justify-center items-center mt-[15rem] max-md:mt-[12rem] max-sm:mt-[140px] rounded-2xl">
          <div className=' rounded-full '>
          {identiconAddress(`0x${address}` , 30)}
          
          </div>
        </div>
      </div>
      <div className=" mt-[4rem]">
        <div className=" flex justify-center items-center flex-col gap-7">
          <span>
            <h1 className=" text-[48px] font-bold">{data?.surname} {data?.firstname} {data?.othername}</h1>
          </span>
          <span className=" text-[24px] font-normal mt-[1rem]">
            {truuncateAddress(`0x${address}` )}
          </span>
          <div className=" flex flex-row justify-between mt-[2rem] gap-4">
            <span className=" flex justify-center items-center flex-col">
                <p className=" text-[24px] max-sm:text-[18px]">Phone No</p>
                <p>{data?.phone}</p>
            </span>
            <div className=" border-l-2 border-black/70"></div>
            <span className=" flex justify-center items-center flex-col">
                <p className=" text-[24px] max-sm:text-[18px]">Account no</p>
                <p>{data?.bankAccount}</p>
            </span>
            <div className=" border-l-2 border-black/70"></div>
            <span className=" flex justify-center items-center flex-col">
                <p className=" text-[24px] max-sm:text-[18px]">Bank Name</p>
                <p>{data?.bankName}</p>
            </span>
          </div>
        <button className=" mt-7"><UpdateProfile /></button>
        
        </div>
      </div>
    </div>
    </div>
  )
}



Profile.getLayout = function getLayout(page: ReactElement) {
    return (
      <WagmiWrapperLayout>
        <AuthMiddleware>
          <ConnectLayout>
            <Navbar />
            {page}
          </ConnectLayout>
        </AuthMiddleware>
      </WagmiWrapperLayout>
    );
  };


export default Profile
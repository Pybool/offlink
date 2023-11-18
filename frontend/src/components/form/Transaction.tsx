'use client'
import React, { useState, useEffect, useCallback } from "react";
import celo from "../../../public/images/celo.png";
import Image from "next/image";
import { getAllTransaction } from "@/helpers/transaction";
import Pagination from "@/helpers/pagination";
import { truuncateAddress } from "@/helpers/truncateAddress";
import { acceptTransaction } from "@/helpers/offlink";
import WagmiWrapperLayout from "@/layouts/Wagmi";
import dynamic from "next/dynamic";

const ConnectLayout = dynamic(() => import("@/layouts/Connect"), {
  ssr: false,
});


const Transaction =  () => {
    const [txStatus, setTxStatus] = useState('open')
    const [dataFetch, setDataFetch] = useState<any[]>([])
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState<number>(0)
    let perPage 
    console.log(txStatus)

    // open, accepted,completed,refunded
  useEffect(() => {
   const fetchTX = async (): Promise<any> => {
    try {
        const response = await getAllTransaction(currentPage.toString(), itemsPerPage.toString(), txStatus)
        // setDataFetch()
        console.log(response)
        setTotalPages(response?.paginationInfo?.totalPages ?? 0)
        setDataFetch(response?.data)
      setItemsPerPage(10)
        return response

    } catch (error) {
        
    }
   }
   fetchTX()
  
  },[txStatus, currentPage, itemsPerPage])
  
  console.log(dataFetch)
  console.log(currentPage);
  

  
 
  return (
    <>    
      <div className="Trans lg:w-[80%] md:w-[95%] h-[2rem] ml-auto mr-auto mt-6 flex justify-between mb-5">
        <p className="trans-name border-b-2 border-black-500 w-[6rem] text-[#7b64f2] text-lg font-semibold">
          Transaction
        </p>
        <div>
          <select value={txStatus} onChange={(e) => setTxStatus(e.target.value)} className="bg-[#4461F2]  text-white border border-black-400 p-2 rounded-lg font-normal text-lg">
            <option value="open" className="">OPEN</option>
            <option value="accepted">Accepted</option>
            <option value="completed">Completed</option>
            <option value="released">Released</option>
          </select>
        </div>
      </div>
      <div className="main-transaction mt-6 lg:w-[80%] md:w-[95%]  ml-auto mr-auto space-y-4">
        {dataFetch.length !== 0 ? dataFetch && dataFetch.map((item: any, index) => (

        <div className="trans1 h-[10rem] w-full bg-[#4461F2]  flex flex-col justify-center gap-4 items-center" key={item.id}>
          <div className="trans1 h-[4rem] w-full bg-[#2942bd]   flex items-center justify-around ">
          <div className="logo md:w-3rem md:h-full w-[2rem] h-[2rem] rounded-lg flex justify-center items-center">
            <Image src={celo} alt="celo" width={24} height={24} className=" w-full h-full object-contain" />
          </div>
          <div className="">
            <p className="text-white">{truuncateAddress(item.sellerAddress)}</p>
          </div>
          <div className="md:flex md:flex-col hidden">
            <p className=" text-white">Bank Name</p>
            <p className="text-white">21 july</p>
          </div>
          <div className="md:flex md:flex-col hidden">
            <p className=" text-white">Time</p>
            <p className="text-white">09:00</p>
          </div>
          <div className="flex flex-col">
            <p className=" text-white">Amount</p>
            <p className="text-white">#{item.fiat_amount}</p>
          </div>
          

          {/* {item.status == "OPEN" ? (
            <button className="btn md:w-[6rem] md:h-[2.5rem] w-[4rem] h-[2rem] text-white items-center justify-center bg-[#7b64f2] rounded-lg" onClick={async() => {
              await acceptTransaction(item.orderId)
            }} >
            {item.status}
          </button>
          ) : ( */}
            <button className="btn md:w-[6rem] md:h-[2.5rem] w-[4rem] h-[2rem] text-white items-center justify-center bg-[#4461F2] rounded-lg" >
            {item.status}
          </button>
          {/* )}  */}

        </div>
         
        <div className="text-white flex flex-row justify-around w-full items-center text-center">

          <span>
            <p className=" text-lg font-medium">Seller Details</p>
          </span>
          <span>
            <p  className=" font-normal text-lg">Bank Name</p>
            <p>{item.seller.bankName}</p>
          </span>
          <span>
            <p  className=" font-normal text-lg">Account Number</p>
            <p>{item.seller.bankAccount}</p>
          </span>
          <span>
            <p  className=" font-normal text-lg">Phone Number</p>
            <p>{item.seller.phone}</p>
          </span>
        </div>
        </div>
        )): <p className=" text-center text-lg">Go to previous page</p>}


        
        <div className=" flex justify-center items-center">
        <Pagination page={currentPage} setPage={setCurrentPage} activePage={currentPage} pages={totalPages} visiblePaginatedBtn={5} /> 
        </div>
        <div className="mt-5">

        </div>
      </div>
    </>
  );
};

export default Transaction;

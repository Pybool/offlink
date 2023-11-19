'use client'
import React, { useState, useEffect, useCallback } from "react";
import { getAllTransaction } from "@/helpers/transaction";
import Pagination from "@/helpers/pagination";
import { truuncateAddress } from "@/helpers/truncateAddress";
import { acceptTransaction, completeOrder } from "@/helpers/offlink";
import { formatNaira } from "@/helpers/formatNaira";
import Popup from "reactjs-popup";
import { formatDate} from "@/helpers/dateFormart"

import 'reactjs-popup/dist/index.css';



const Transaction = () => {
  const [txStatus, setTxStatus] = useState('open')
  const [dataFetch, setDataFetch] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState<number>(0)
  let perPage
  console.log(txStatus)


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

  }, [txStatus, currentPage, itemsPerPage])

  console.log(dataFetch)
  console.log(currentPage);




  return (
    <>
      <div className="Trans lg:w-[80%] md:w-[95%] h-[2rem] ml-auto mr-auto mt-6 flex justify-between mb-5">
        <p className="trans-name border-b-2 border-black-500 w-[6rem] text-[#4461F2] text-lg font-semibold">
          Transaction
        </p>
        <div>
          <select value={txStatus} onChange={(e) => setTxStatus(e.target.value)} className="bg-[4461F2]  text-black border border-black-400 p-2 rounded-lg font-normal text-lg">
            <option value="open" className="">OPEN</option>
            <option value="accepted">Accepted</option>
            <option value="completed">Completed</option>
            <option value="fundreleased">Released</option>
          </select>
        </div>
      </div>
    
      <>

        <div>
          <div className="p-4 mt-16">
            <div className="bg-white rounded-md">
              <div>
                <h2 className="mb-4 text-xl font-bold text-gray-700">Transaction History</h2>
                <div>
                  <table className=' w-full '>
                    <thead className=" mb-3">
                      <tr className=' text-white font-bold text-md bg-[#4461F2] mb-3 rounded-md'>
                        <th className='py-3'>
                          Address
                        </th>
                        <th className='py-3'>
                          Date
                        </th>
                        <th className='py-3'>
                          Amount
                        </th>
                        <th className='py-3'>
                          Bank Details
                        </th>
                        <th className='py-3'>
                          Status
                        </th>
                      </tr>
                    </thead>
                    {dataFetch.length !== 0 ? dataFetch && dataFetch.map((item: any, index) => (
                      <tr className='text-center mt-4' key={index}>
                        <td className="mt-3">{item.sellerAddress === "" ? "0x000000...0000" : truuncateAddress(item.sellerAddress)}</td>
                        <td className="mt-3">{formatDate(item.date_initiated)}</td>
                        <td className="mt-3">{formatNaira(item.fiat_amount)}</td>
                        <td>
                          <Popup trigger={<button className=' btn md:w-[6rem] md:h-[2.5rem] w-[4rem] h-[2rem] text-white items-center justify-center bg-[#4461F2] rounded-lg'>Details</button>} position="top center">
                            <div className=' text-center flex justify-center items-center flex-col'>
                              <span className=' text-lg font-semibold'>Bank Details</span>
                              <div className=' flex flex-col bg-white/80 w-[10rem] text-center'>
                                <span>
                                  <p className=' text-base font-medium'>Bank Name</p>
                                  <p>{item.seller.bankName}</p>
                                </span>
                                <span>
                                  <p className=' text-base font-medium'>Account Name</p>
                                  <p>{item.seller.bankAccount}</p>
                                </span>
                                <span>
                                  <p className=' text-base font-medium'>Account Number</p>
                                  <p>{item.seller.bankAccount}</p>
                                </span>
                                <span>
                                  <p className=' text-base font-medium'>Phone Number</p>
                                  <p>{item.seller.phone}</p>
                                </span>
                              </div>

                            </div>
                          </Popup>
                        </td>
                        <td>
                          {item.status == "OPEN" ? (
                            <button className="btn md:w-[6rem] md:h-[2.5rem] w-[4rem] h-[2rem] text-white items-center justify-center bg-[#4461F2] rounded-lg" onClick={async () => {
                              await acceptTransaction(item.orderId)
                            }} >
                              Accept
                            </button>
                          ) : item.status == "RELEASED" ? (
                            <button className="btn md:w-[6rem] md:h-[2.5rem] w-[4rem] h-[2rem] text-white items-center justify-center bg-[#4461F2] rounded-lg max-sm:text-sm" onClick={async () => {
                              await completeOrder(item.orderId)
                            }} >
                              Confirm
                            </button>
                          ) : item.status == "COMPLETED"  ? <p>Completed</p> : <button className="btn md:w-[6rem] md:h-[2.5rem] w-[70px] h-[2rem] text-white items-center justify-center bg-[#4461F2] rounded-lg max-sm:text-sm" >
                          {item.status}
                        </button>}
                        </td>
                      </tr>
)) : <div className=" text-center text-lg mt-3 flex items-center justify-center">Go to previous page Or check the transaction status</div>}
                  </table>

                </div>
              </div>
            </div>
          </div>
        </div>

      </>
      <Pagination page={currentPage} setPage={setCurrentPage} pages={totalPages} activePage={currentPage} visiblePaginatedBtn={5}  />
    </>
  );
};

export default Transaction;

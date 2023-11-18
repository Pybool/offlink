'use client'
import { getContract } from "@wagmi/core";
import { erc20ABI } from "wagmi";
import OfflinkABI from "@/contracts/offlink.json";
import { useWaitForTransaction } from "wagmi";

import { readContract, writeContract, waitForTransaction } from "@wagmi/core";
import { OFFRAMP_ADDRESS } from "./constants";

// export const OffRampContract = getContract({
//   address: OFFRAMP_ADDRESS,
//   abi: erc20ABI,
// });

export const getOrderCount = async (): Promise<any> => {
  const result = await readContract({
    address: OFFRAMP_ADDRESS,
    abi: OfflinkABI.abi,
    functionName: "_ordersCount",
  });

  return result;
};

export const getTransactionState = async (id: string): Promise<any> => {
  const result = await readContract({
    address: OFFRAMP_ADDRESS,
    abi: OfflinkABI.abi,
    functionName: "_orders",
    args: [id],
  });

  return result;
};

export const createTransaction = async (params: Array<any>): Promise<any> => {
 try{
 const { hash} = await writeContract({
    address: OFFRAMP_ADDRESS,
    abi: OfflinkABI.abi,
    functionName: "placeSellOrder",
    args: params,
  });
  const result = await waitForTransaction({hash})
  console.log(result.logs[1]?.topics[1])
  const ordercountId = result.logs[1]?.topics[1] !== undefined ? parseInt(result.logs[1]?.topics[1], 16) : 0;
  console.log(ordercountId)
  return ordercountId;
} catch (e){}
};

export const cancelTransaction = async (id: string): Promise<any> => {
  try {
    const result = await writeContract({
      address: OFFRAMP_ADDRESS,
      abi: OfflinkABI.abi,
      functionName: "cancelOrder",
      args: [id],
    });
  
    return result;
  } catch (error) {
    
  }
};

export const acceptTransaction = async (id: string): Promise<any> => {
  try {
    const result = await writeContract({
      address: OFFRAMP_ADDRESS,
      abi: OfflinkABI.abi,
      functionName: "acceptOrder",
      args: [id],
    });
  
    return result;
  } catch (error) {
    console.log(error)
  }
};

export const releaseFunds = async (id: string): Promise<any> => {
  try{
    const result = await writeContract({
      address: OFFRAMP_ADDRESS,
      abi: OfflinkABI.abi,
      functionName: "releaseFunds",
      args: [id],
    });
  
    return result;
  } catch(error) {
    console.log(error)
  }
};

export const releaseTransaction = async (id: string): Promise<any> => {
  try {
  const result = await writeContract({
    address: OFFRAMP_ADDRESS,
    abi: OfflinkABI.abi,
    functionName: "cancelSellOrder",
    args: [id],
  });

  return result;
  } catch(e) {}

};

export const isTransactionOpen = async (id: string): Promise<any> => {
  if (!id) return false;
  const transactionState = await getTransactionState(id);
  console.log(transactionState)
  return transactionState[0] == 1;
};
export const isTransactionAccepted = async (id: string): Promise<any> => {
  if (!id) return false;
  const transactionState = await getTransactionState(id);
  
  return transactionState[0] == 2;
};

export const isTransactionCompleted = async (id: string): Promise<any> => {
  if (!id) return false;
  const transactionState = await getTransactionState(id);

  return transactionState[0] == 3;
};

export const isTransactionReleased = async (id: string): Promise<any> => {
  if (!id) return false;
  const transactionState = await getTransactionState(id);
  console.log(transactionState)

  return transactionState[0] == 4;
};

export const isTransactionCancelled = async (id: string): Promise<any> => {
  if (!id) return false;
  const transactionState = await getTransactionState(id);
  
  return transactionState[0] == 0;
};
export const isTransactionRefund = async (id: string): Promise<any> => {
  if (!id) return false;
  const transactionState = await getTransactionState(id);
  
  return transactionState[0] == 6;
};

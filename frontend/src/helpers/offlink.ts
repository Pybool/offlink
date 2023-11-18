import { getContract } from "@wagmi/core";
import { erc20ABI } from "wagmi";
import OfflinkABI from "@/contracts/offlink.json";

import { readContract, writeContract } from "@wagmi/core";
import { OFFRAMP_ADDRESS } from "./constants";

export const OffRampContract = getContract({
  address: OFFRAMP_ADDRESS,
  abi: erc20ABI,
});

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
  const result = await writeContract({
    address: OFFRAMP_ADDRESS,
    abi: OfflinkABI.abi,
    functionName: "placeSellOrder",
    args: params,
  });

  return result;
};

export const cancelTransaction = async (id: string): Promise<any> => {
  const result = await writeContract({
    address: OFFRAMP_ADDRESS,
    abi: OfflinkABI.abi,
    functionName: "cancelSellOrder",
    args: [id],
  });

  return result;
};

export const acceptTransaction = async (id: string): Promise<any> => {
  const result = await writeContract({
    address: OFFRAMP_ADDRESS,
    abi: OfflinkABI.abi,
    functionName: "acceptOrder",
    args: [id],
  });

  return result;
};

export const releaseTransaction = async (id: string): Promise<any> => {
  const result = await writeContract({
    address: OFFRAMP_ADDRESS,
    abi: OfflinkABI.abi,
    functionName: "cancelSellOrder",
    args: [id],
  });

  return result;
};

export const isTransactionAccepted = async (id: string): Promise<any> => {
  if (!id) return false;
  const transactionState = await getTransactionState(id);

  return transactionState == 1;
};

export const isTransactionCompleted = async (id: string): Promise<any> => {
  if (!id) return false;
  const transactionState = await getTransactionState(id);

  return transactionState == 2;
};

export const isTransactionReleased = async (id: string): Promise<any> => {
  if (!id) return false;
  const transactionState = await getTransactionState(id);

  return transactionState == 3;
};

export const isTransactionCancelled = async (id: string): Promise<any> => {
  if (!id) return false;
  const transactionState = await getTransactionState(id);

  return transactionState == 4;
};

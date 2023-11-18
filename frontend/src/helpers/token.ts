import { getContract } from "@wagmi/core";
import { erc20ABI } from "wagmi";
import { parseEther } from "viem";

import { writeContract, readContract } from "@wagmi/core";
import type { Address } from "@/types";
import { CUSD_ADDRESS } from "./constants";

export const TokenContract = getContract({
  address: CUSD_ADDRESS,
  abi: erc20ABI,
});

export const getTokenApproval = async (
  address: string,
  amount: string
): Promise<string> => {
  const { hash } = await writeContract({
    address: CUSD_ADDRESS,
    abi: erc20ABI,
    functionName: "approve",
    args: [address as Address, parseEther(amount)],
  });

  return hash;
};

export const getAllowance = async (
  from: string,
  to: string
): Promise<bigint> => {
  const allowance = await readContract({
    address: CUSD_ADDRESS,
    abi: erc20ABI,
    functionName: "allowance",
    args: [from as Address, to as Address],
  });

  return allowance;
};

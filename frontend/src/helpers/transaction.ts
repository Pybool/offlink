import axios from "@/axios/auth";
import type { Transaction } from "@/types";

export const getTransactionById = async (
  id: string
): Promise<Transaction | undefined> => {
  try {
    const transaction = await axios().get(`single-transaction?txid=${id}`);
    console.log(transaction.data)
    return transaction.data;
  } catch (e) {
    console.log(e)
  }
};

export const getRecentTransactions = async (): Promise<
  Array<Transaction> | undefined
> => {
  try {
    const transaction = await axios().get(`transactions`);
    return transaction.data;
  } catch (e) {}
};

export const getAllTransaction = async (
  pageId: string, resultNo: string, status: string
): Promise<any | undefined> => {
  try {
    const transaction = await axios().get(`transaction-listing?page=${pageId}&perPage=${resultNo}&status=${status}`);
    return transaction.data;
  } catch (e) {}
};
export const getUserPorfile = async (): Promise<any | undefined> => {
  try {
    const transaction = await axios().get(`auth/user-profile`);
    return transaction.data;
  } catch (e) {}
};

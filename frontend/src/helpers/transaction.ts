import axios from "@/axios/auth";
import type { Transaction } from "@/types";

export const getTransactionById = async (
  id: string
): Promise<Transaction | undefined> => {
  try {
    const transaction = await axios().get(`single-transaction?txid=${id}`);
    return transaction.data;
  } catch (e) {}
};

export const getRecentTransactions = async (): Promise<
  Array<Transaction> | undefined
> => {
  try {
    const transaction = await axios().get(`transactions`);
    return transaction.data;
  } catch (e) {}
};

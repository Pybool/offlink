import { useCallback } from "react";
import useLoading from "./useLoading";
import axios from "@/axios/auth";
import useNotification from "./useNotification";

type Transaction = {
  nonce: number;
  fiat_currency: "ngn" | string;
  cryptocurrency: string;
  fiat_amount: number;
  token_amount: bigint;
};

type Signature = {
  signedTransaction: Array<any>;
  transactionId: string;
};

const useSignTransaction = ({
  nonce,
  fiat_currency,
  cryptocurrency,
  fiat_amount,
  token_amount,
}: Transaction) => {
  const { isLoading, startLoading, stopLoading } = useLoading();

  const {
    notification,
    setErrorNotification,
    setSuccessNotification,
    clearNotification,
  } = useNotification();

  const sign = useCallback(async (): Promise<Signature | false> => {
    startLoading();
    clearNotification();

    const data = {
      nonce: nonce.toString(),
      fiat_currency,
      cryptocurrency,
      fiat_amount,
      token_amount: "1",
    };

    try {
      const response = await axios().post("new-transaction", data);
      setSuccessNotification("signature successful generated");
      stopLoading();
      return response.data;
    } catch (error: any) {
      if (error.response) {
        setErrorNotification(error?.response?.data?.error?.message);
      } else if (error.request) {
        setErrorNotification("no response from server");
      } else {
        setErrorNotification("unexpected error");
      }
    }
    stopLoading();
    return false;
  }, [nonce, fiat_currency, cryptocurrency, fiat_amount, token_amount]);

  return { sign, isLoading, notification };
};

export default useSignTransaction;

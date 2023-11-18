import { WEBSOCKET_URL } from "@/helpers/constants";
import { isTransactionCompleted } from "@/helpers/offlink";
import { Transaction } from "@/types";
import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";

const useTransactionCompleted = (transaction: Transaction) => {
  const [completed, setCompleted] = useState<boolean>(false);
  const { readyState, sendJsonMessage } = useWebSocket(WEBSOCKET_URL, {
    onOpen: () => {
      sendJsonMessage({ type: "joinOfferPoolChannel", channel: "NGN" });
    },
    onMessage(event) {
      console.log(event);
    },
  });

  // pollling
  useEffect(() => {
    const transactionStatePolling = setInterval(async () => {
      try {
        if (await isTransactionCompleted(transaction?.orderId?.toString() ?? "0")) {
          setCompleted(true);
        }
      } catch (error) {
        console.log(error);
      }
    }, 5000);

    return () => {
      clearInterval(transactionStatePolling);
    };
  }, [transaction]);

  return { completed, readyState };
};

export default useTransactionCompleted;

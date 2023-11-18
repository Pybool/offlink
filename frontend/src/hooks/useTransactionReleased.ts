import { WEBSOCKET_URL } from "@/helpers/constants";
import { isTransactionReleased } from "@/helpers/offlink";
import { Transaction } from "@/types";
import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";

const useTransactionReleased = (transaction: Transaction) => {
  const [released, setReleased] = useState<boolean>(false);
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
        if (await isTransactionReleased(transaction?.orderId?.toString() ?? "0")) {
          setReleased(true);
        }
      } catch (error) {
        console.log(error);
      }
    }, 5000);

    return () => {
      clearInterval(transactionStatePolling);
    };
  }, [transaction]);

  return { released, readyState };
};

export default useTransactionReleased;

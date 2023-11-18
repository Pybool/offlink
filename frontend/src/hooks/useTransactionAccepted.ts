import { WEBSOCKET_URL } from "@/helpers/constants";
import { isTransactionAccepted } from "@/helpers/offlink";
import { Transaction } from "@/types";
import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";

const useTransactionAccepted = (transaction: Transaction) => {
  const [accepted, setAccepted] = useState<boolean>(false);
  const { readyState, sendMessage } = useWebSocket(WEBSOCKET_URL, {
    onOpen: () => {
      sendMessage(
        JSON.stringify({ type: "joinOfferPoolChannel", channel: "NGN" })
      );
    },
    onMessage(event) {
      console.log(event);
    },
  });

  // pollling
  useEffect(() => {
    const transactionStatePolling = setInterval(async () => {
      try {
        if (await isTransactionAccepted(transaction.id)) {
          setAccepted(true);
        }
      } catch (error) {
        console.log(error);
      }
    }, 5000);

    return () => {
      clearInterval(transactionStatePolling);
    };
  }, [transaction]);

  return { accepted, readyState };
};

export default useTransactionAccepted;

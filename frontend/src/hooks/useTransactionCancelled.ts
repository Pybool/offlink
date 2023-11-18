import { WEBSOCKET_URL } from "@/helpers/constants";
import { isTransactionCancelled } from "@/helpers/offlink";
import { Transaction } from "@/types";
import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";

const useTransactionCancelled = (transaction: Transaction) => {
  const [cancelled, setCancelled] = useState<boolean>(false);
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
        if (await isTransactionCancelled(transaction.id)) {
          setCancelled(true);
        }
      } catch (error) {
        console.log(error);
      }
    }, 5000);

    return () => {
      clearInterval(transactionStatePolling);
    };
  }, [transaction]);

  return { cancelled, readyState };
};

export default useTransactionCancelled;

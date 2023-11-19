import { useEffect, useState } from "react";
import useLoading from "./useLoading";
import { Transaction } from "@/types";
import { getTransactionById } from "@/helpers/transaction";
import { db } from "@/dexie/config";

const useGetTransactionByID = (id: string) => {
  const [transaction, setTransaction] = useState<Transaction | undefined>();
  const { isLoading, startLoading, stopLoading } = useLoading(true);

  useEffect(() => {
    startLoading();
    const _getTransanctionById = async () => {
  
      let _transaction = await db.transactions
        .where("id")
        .equals(id)
        .first();
        console.log(_transaction)

        if(_transaction) {
          setTransaction(_transaction)
          return
        }

      // TODO: rewrite smart contract to return orderID
      // PENDING, OPENED, ACCEPTED, COMPLETED, RELEASE, CANCELLED, REFUNDED

      _transaction = await getTransactionById(id);
      console.log(_transaction)

      setTransaction(_transaction);
  
      stopLoading();
    };

    _getTransanctionById();
  }, []);

  // console.log(transaction)
  return { isLoading, transaction };
};

export default useGetTransactionByID;

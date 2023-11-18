import { useEffect, useState } from "react";
import useLoading from "./useLoading";
import { Transaction } from "@/types";
import { getRecentTransactions } from "@/helpers/transaction";

const useGetRecentTransactions = (id: string) => {
  const [transaction, setTransaction] = useState<
    Array<Transaction> | undefined
  >();
  const { isLoading, startLoading, stopLoading } = useLoading(true);

  useEffect(() => {
    startLoading();
    const _getTransanctionById = async () => {
      const _transaction = await getRecentTransactions();
      setTransaction(_transaction);
      stopLoading();
    };

    _getTransanctionById();
  }, []);
  return { isLoading, transaction };
};

export default useGetRecentTransactions;

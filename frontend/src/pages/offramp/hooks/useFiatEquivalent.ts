import { convertUSD } from "@/helpers/rateConverter";
import { useEffect, useState } from "react";

const useFiatEquivalent = (
  tokenAmount: number,
  currency: string = "ngn"
): number => {
  const [equivalent, setEquivalent] = useState<number>(0);

  useEffect(() => {
    const _convertUSD = async () => {
      const amount = await convertUSD(currency, tokenAmount);
      setEquivalent(amount ?? 0);
    };
    _convertUSD();
  }, [tokenAmount, currency]);
  return equivalent;
};

export default useFiatEquivalent;

import { getOrderCount } from "@/helpers/offlink";
import { convertUSD } from "@/helpers/rateConverter";
import { useEffect, useState } from "react";

const useNonce = (): number => {
  const [nonce, setNonce] = useState<number>(0);

  useEffect(() => {
    const _getNonce = async () => {
      const orderCount = await getOrderCount();
      setNonce(orderCount ?? 0);
    };
    _getNonce();
  }, []);
  return nonce;
};

export default useNonce;

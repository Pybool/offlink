import CustomButton from "@/components/form/CustomButton";
import CustomInput from "@/components/form/CustomInput";
import LoadingIcon from "@/components/LoadingIcon";
import { validateAmount } from "@/helpers/validation";
import useSignTransaction from "@/hooks/useSignTransaction";
import useValidation from "@/hooks/useValidation";
import WagmiWrapperLayout from "@/layouts/Wagmi";

import Navbar from "@/components/Navbar";

import { useMemo, useState } from "react";
import type { ChangeEvent, ReactElement } from "react";
import useFiatEquivalent from "./hooks/useFiatEquivalent";
import useNonce from "@/hooks/useNonce";
import { CUSD_ADDRESS, OFFRAMP_ADDRESS } from "@/helpers/constants";
import { parseEther } from "viem";
import dynamic from "next/dynamic";
import AuthMiddleware from "@/middlewares/auth/AuthMiddleware";
import { createTransaction } from "@/helpers/offlink";
import { getAllowance, getTokenApproval } from "@/helpers/token";
import useNotification from "@/hooks/useNotification";
import { useAccount } from "wagmi";
import { Address } from "@/types";
import useLoading from "@/hooks/useLoading";
import { useRouter } from "next/router";
import { db } from "@/dexie/config";

const ConnectLayout = dynamic(() => import("@/layouts/Connect"), {
  ssr: false,
});

const OffRampPage = (): JSX.Element => {
  const navigate = useRouter();

  const { address } = useAccount();
  const [tokenAmount, setTokenAmount] = useState<number>(0);
  const [fiatCurrency, setFiatCurrency] = useState<string>("ngn");

  const {
    notification,
    setErrorNotification,
    clearNotification,
    setSuccessNotification,
  } = useNotification();

  const { isLoading, startLoading, stopLoading } = useLoading();

  const fiatAmount = useFiatEquivalent(tokenAmount, fiatCurrency);
  const nonce = useNonce();

  const tokenAmountinWei = useMemo((): bigint => {
    return parseEther(tokenAmount.toString() || "1");
  }, [tokenAmount]);

  const tokenAmountError = useValidation(tokenAmount, validateAmount);

  const { sign, notification: signTransactionNotification } =
    useSignTransaction({
      token_amount: tokenAmountinWei,
      fiat_currency: fiatCurrency,
      cryptocurrency: CUSD_ADDRESS,
      nonce,
      fiat_amount: fiatAmount,
    });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startLoading();
    clearNotification();

    const allowance = await getAllowance(address as Address, OFFRAMP_ADDRESS);

    if (tokenAmountinWei > allowance) {
      try {
        await getTokenApproval(OFFRAMP_ADDRESS, tokenAmountinWei.toString());
      } catch (error: any) {
        setErrorNotification(error?.message);
        stopLoading();
        return;
      }
    }

    const response = await sign();

    if (typeof response === "boolean") {
      stopLoading();
      return;
    }

    try {
      const orderId = await createTransaction(response.signedTransaction);
      console.log(db.transactions);
      await db.transactions.add({
        orderId: orderId,
        id: response.transactionId,
      });
      setSuccessNotification("order placed successfully");
    } catch (error: any) {
      setErrorNotification(error?.message);
      stopLoading();
      return;
    }
    stopLoading();
    navigate.push(`/offramp/${response?.transactionId}`);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="p-10">
        {notification.type === "error" ? (
          <p className="text-red-900">{notification?.message}</p>
        ) : (
          <p className="text-green-900">{notification?.message}</p>
        )}

        <p className="text-red-900">{signTransactionNotification?.message}</p>
        <CustomInput
          type="number"
          name="email"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            try {
              const amount = parseInt(e.target.value);
              setTokenAmount(amount);
            } catch (error) {}
          }}
          value={tokenAmount}
          error={tokenAmountError?.message ?? ""}
        />

        <p> Equivalent to {fiatAmount}</p>

        <div>
          <select
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              setFiatCurrency(e.target.value);
            }}
            name="fiat_currency"
            id=""
          >
            <option value="ngn">Naira</option>
            <option value="kes">Kenya Shillings</option>
            <option value="ghc">Cedis</option>
          </select>
        </div>

        <CustomButton disabled={isLoading} type="submit">
          {isLoading && <LoadingIcon />}
          Offramp
        </CustomButton>
      </form>
    </>
  );
};

OffRampPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <WagmiWrapperLayout>
      <AuthMiddleware>
        <ConnectLayout>
          <Navbar />
          {page}
        </ConnectLayout>
      </AuthMiddleware>
    </WagmiWrapperLayout>
  );
};

export default OffRampPage;

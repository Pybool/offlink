import { useAccount, useConnect } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Preloader from "@/components/Preloader";
import { useEffect, type PropsWithChildren } from "react";
import { InjectedConnector } from 'wagmi/connectors/injected'


declare global {
  interface Window {
    ethereum?: {
      isMiniPay?: boolean;
      request?: (...args: any[]) => Promise<void>;
      
    };
  }
 }
 

const ConnectLayout = ({ children }: PropsWithChildren) => {
  const { isConnecting, isDisconnected } = useAccount();

  const {connect}  = useConnect({
    connector: new InjectedConnector()
  })

  useEffect(() => {
    if(!window) return
    if(!window?.ethereum) return
    if(!window?.ethereum?.isMiniPay) return
    connect()
  }, [connect])


  if (isConnecting) return <Preloader />;

  if (isDisconnected) {
    return (
      <section className=" h-screen bg-[#4461F2]">
        <div className="w-full h-full flex items-center justify-center">
          <ConnectButton />
        </div>
      </section>
    );
  }

  return <>{children}</>;
};

export default ConnectLayout;

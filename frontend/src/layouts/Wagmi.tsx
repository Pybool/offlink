import { WagmiConfig } from "wagmi";
import { chains, wagmiConfig } from "@/helpers/connector";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";

import type { PropsWithChildren } from "react";

const WagmiWrapperLayout = ({ children }: PropsWithChildren) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
    </WagmiConfig>
  );
};

export default WagmiWrapperLayout;

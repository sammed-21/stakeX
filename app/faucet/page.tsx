import { FaucetComponent } from "@/components/faucet/FaucetComponent";
import { useWeb3Context } from "@/context/Web3Context";
import React from "react";

export default function Home() {
  return (
    <div className="w-full flex items-center justify-center h-full relative">
      <FaucetComponent />
    </div>
  );
}

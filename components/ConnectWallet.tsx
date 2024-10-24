"use client";
import { useWeb3Context } from "@/context/Web3Context";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect } from "react";
import { useAccount } from "wagmi";

export default function ConnectWallet() {
  const { connectWallet } = useWeb3Context();

  return (
    <div>
      {" "}
      <div onClick={connectWallet}>
        <ConnectButton />
      </div>
    </div>
  );
}

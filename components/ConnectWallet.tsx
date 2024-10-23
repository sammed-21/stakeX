"use client";
import { useWeb3Context } from "@/context/Web3Context";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect } from "react";
import { useAccount } from "wagmi";

export default function ConnectWallet() {
  const { address } = useAccount();
  const { connectWallet } = useWeb3Context();

  useEffect(() => {
    if (address) {
      connectWallet();
    }
  }, [address]);

  return (
    <div>
      {" "}
      <div onClick={connectWallet}>
        <ConnectButton />
      </div>
    </div>
  );
}

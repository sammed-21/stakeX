"use client";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { useWeb3Context } from "@/context/Web3Context";

export function TypewriterEffectDemo() {
  const words = [
    {
      text: "Stake",
    },
    {
      text: "earn",
    },
    {
      text: "grow",
    },
    {
      text: "with",
    },
    {
      text: "StakeX.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  const { connectWallet } = useWeb3Context();

  return (
    <div className="flex flex-col items-center justify-center min-h-[20rem] ">
      <p className="text-neutral-600 dark:text-neutral-200 text-base mb-10">
        No sign-up needed. Just connect your wallet and start staking.
      </p>
      <TypewriterEffect words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-10">
        <button
          onClick={connectWallet}
          className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm"
        >
          Connect Wallet
        </button>
        <button className="w-40 h-10 rounded-xl bg-white text-black border border-black text-sm">
          Learn More
        </button>
      </div>
    </div>
  );
}

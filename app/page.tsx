"use client";

import Navbar from "@/components/Navbar";
import { StakingComponent } from "@/components/StakingComponent";
import { useAccount } from "wagmi";

export default function Home() {
  const { address } = useAccount();

  return (
    <div className="w-full h-full flex flex-col   items-center justify-center mx-auto">
      <Navbar />
      <StakingComponent />
    </div>
  );
}

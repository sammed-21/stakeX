"use client";

import ConnectedNetwork from "@/components/ConnectedNetwork";
import { DisplayPannel } from "@/components/displayPannel/DisplayPannel";
import Navbar from "@/components/Navbar";
import AmountApproval from "@/components/stakeToken/AmountApproval";
import StakeAmount from "@/components/stakeToken/StakeAmount";
import Withdraw from "@/components/withdraw/Withdraw";
import { StakingContextProvider } from "@/context/StakingContext";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col   items-center justify-center mx-auto">
      <Navbar />
      <ConnectedNetwork />

      {/* <StakingComponent /> */}
      <StakingContextProvider>
        <DisplayPannel />
        <StakeAmount />
        <Withdraw />
      </StakingContextProvider>
      <AmountApproval />
    </div>
  );
}

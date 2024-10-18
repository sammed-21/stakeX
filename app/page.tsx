"use client";

import ConnectedNetwork from "@/components/ConnectedNetwork";
import { DisplayPannel } from "@/components/displayPannel/DisplayPannel";
import Navbar from "@/components/Navbar";
import { StakingComponent } from "@/components/StakingComponent";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col   items-center justify-center mx-auto">
      <Navbar />
      <ConnectedNetwork />
      <StakingComponent />
      <DisplayPannel />
    </div>
  );
}

// Ensure you have the correct import path for Tabs
import { DisplayPannel } from "@/components/displayPannel/DisplayPannel";

import StakeMain from "@/components/stakeToken/StakeMain";
// Import your tabs config

export default function Home() {
  return (
    <div className="w-full h-full min-h-[700px] flex flex-col gap-5 items-center mt-10 justify-start mx-auto">
      {/* Optional Display Panel */}
      <DisplayPannel />
      <StakeMain />

      {/* Tabs for Stake and Withdraw */}
    </div>
  );
}

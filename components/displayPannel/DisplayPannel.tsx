import React from "react";
import { StakedAmount } from "./StakedAmount";
import EarnReward from "./EarnReward";
import RewardRate from "./RewardRate";

export const DisplayPannel = () => {
  return (
    <div className="w-full bg-[#1b1b1b] rounded-lg border-[1px] border-[#b1b1b1] max-w-md flex flex-col gap-3">
      <StakedAmount />
      <EarnReward />
      <RewardRate />
    </div>
  );
};

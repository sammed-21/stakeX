"use client";
import React from "react";
import { StakedAmount } from "./StakedAmount";
import EarnReward from "./EarnReward";
import RewardRate from "./RewardRate";

export const DisplayPannel = () => {
  return (
    <div className="w-full bg-[#2b2b2b] p-3 rounded-lg border-[1px] border-[#3b3b3b] max-w-lg flex flex-col gap-3">
      <StakedAmount />
      <EarnReward />
      <RewardRate />
    </div>
  );
};

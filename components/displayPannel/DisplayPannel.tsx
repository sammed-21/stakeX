"use client";
import React from "react";
import { StakedAmount } from "./StakedAmount";
import EarnReward from "./EarnReward";
import RewardRate from "./RewardRate";

export const DisplayPannel = () => {
  return (
    <div className="w-full bg-card  p-3 rounded-3xl max-w-[462px] flex flex-col gap-3">
      <StakedAmount />
      <EarnReward />
      <RewardRate />
    </div>
  );
};

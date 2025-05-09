"use cilent";
import { useStakingContext } from "@/context/StakingContext";
import { useWeb3Context } from "@/context/Web3Context";
import { formatUnits } from "ethers";
import React, { useEffect, useState } from "react";

const EarnReward = () => {
  const { stakingXContract, address } = useWeb3Context();
  const { isReload } = useStakingContext();
  console.log(isReload);
  const [earnedRewardRate, setEarnedRewardRate] = useState<string | null>("0");
  useEffect(() => {
    const fetchRewaredRate = async () => {
      if (!stakingXContract) return;

      try {
        const earnedRewardRateWei = await stakingXContract.earned(address);
        const earnedRewardRateEth = formatUnits(
          earnedRewardRateWei.toString(),
          18
        );
        console.log({ earnedRewardRateEth });
        const rounedReward = parseFloat(earnedRewardRateEth).toFixed(2);

        setEarnedRewardRate(rounedReward);
      } catch (error: unknown) {
        console.log((error as Error)?.message);
      }
    };
    const interval = setInterval(() => {
      if (stakingXContract) {
        fetchRewaredRate();
      }

      return () => clearInterval(interval);
    }, 20000);
  }, [address, isReload, stakingXContract]);
  console.log(earnedRewardRate);
  return <div>EarnReward: {earnedRewardRate}</div>;
};

export default EarnReward;

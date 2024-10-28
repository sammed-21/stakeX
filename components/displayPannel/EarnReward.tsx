"use cilent";
import { useWeb3Context } from "@/context/Web3Context";
import { formatUnits } from "ethers";
import React, { useEffect, useState } from "react";

const EarnReward = () => {
  const { stakingXContract, address, signer } = useWeb3Context();

  const [earnedRewardRate, setEarnedRewardRate] = useState<string | null>("0");
  useEffect(() => {
    const fetchRewaredRate = async () => {
      try {
        const earnedRewardRateWei = await stakingXContract?.earned(address);
        const earnedRewardRateEth = formatUnits(
          earnedRewardRateWei.toString(),
          18
        );
        console.log("amount", earnedRewardRateEth);
        const rounedReward = parseFloat(earnedRewardRateEth).toFixed(2);

        setEarnedRewardRate(rounedReward);
      } catch (error) {
        console.log(error?.message);
      }
    };
    const interval = setInterval(() => {
      if (stakingXContract) {
        fetchRewaredRate();
      }

      return () => clearInterval(interval);
    }, 20000);
  }, [stakingXContract, address, signer]);
  return <div>EarnReward: {earnedRewardRate}</div>;
};

export default EarnReward;

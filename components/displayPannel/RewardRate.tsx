import { useWeb3Context } from "@/context/Web3Context";
import { formatUnits } from "ethers";
import React, { useEffect, useState } from "react";

type Props = {};

const RewardRate = (props: Props) => {
  const { stakingXContract, address, loading } = useWeb3Context();

  const [rewardRate, setRewardRate] = useState<string | null>("0");
  useEffect(() => {
    const fetchRewaredRate = async () => {
      try {
        const rewardRateWei = await stakingXContract?.REWARD_RATE();
        const rewardRateEth = formatUnits(rewardRateWei.toString(), 18);
        console.log("amount", rewardRateEth);
        const rounedReward = parseFloat(rewardRateEth).toFixed(2);

        setRewardRate(rounedReward);
      } catch (error) {
        console.log(error?.message);
      }
    };
    if (stakingXContract) {
      fetchRewaredRate();
    }
  }, [stakingXContract, address]);
  return (
    <div className=" w-full font-semibold">
      RewardRate:{rewardRate} tokens / second
    </div>
  );
};

export default RewardRate;

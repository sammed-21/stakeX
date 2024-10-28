import { useStakingContext } from "@/context/StakingContext";
import { useWeb3Context } from "@/context/Web3Context";
import { formatUnits } from "ethers";
import React, { useEffect, useState } from "react";

export const StakedAmount = () => {
  const { stakingXContract, address } = useWeb3Context();
  const [stakedAmount, setStakedAmount] = useState<string>("0");
  const { isReload } = useStakingContext();
  useEffect(() => {
    const fetchStakedBalance = async () => {
      try {
        if (!stakingXContract || !address) return;

        // Fetch staked balance (BigInt)
        const amountStaked = await stakingXContract.stakedBalance(address);

        // Convert the BigInt to string, then format it to Ether units (18 decimals)
        const amountStakedEth = formatUnits(amountStaked.toString(), 18);

        console.log("Formatted staked amount:", amountStakedEth);
        setStakedAmount(amountStakedEth);
      } catch (error) {
        console.error("Error fetching staked balance:", error.message);
      }
    };

    if (stakingXContract) {
      fetchStakedBalance();
    }
  }, [stakingXContract, address, isReload]);

  return (
    <div className="w-full text-white ">Staked amount: {stakedAmount}</div>
  );
};

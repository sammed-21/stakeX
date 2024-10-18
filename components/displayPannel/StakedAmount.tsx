import { useWeb3Context } from "@/context/Web3Context";
import React, { useEffect, useState } from "react";

export const StakedAmount = () => {
  const { stakingXContract, address } = useWeb3Context();
  const [stakedAmount, setStakedAmount] = useState<string | null>("0");
  useEffect(() => {
    const fetchStakedBalance = async () => {
      try {
        const amountStaked = await stakingXContract.stakedBalance(address);
        console.log("amount", amountStaked);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchStakedBalance();
  }, []);
  return <div>StakedAmount</div>;
};

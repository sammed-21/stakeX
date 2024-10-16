import React, { useState, useEffect } from "react";
import { useWeb3Context } from "@/context/Web3Context";
import { formatEther, parseEther } from "ethers";

export const StakingComponent = () => {
  const { stakingXContract, stakingXTokenContract, signer } = useWeb3Context();
  const [amount, setAmount] = useState<number>(0);
  const [balance, setBalance] = useState<string>("0");
  const [rewards, setRewards] = useState<string>("0");

  useEffect(() => {
    const fetchBalanceAndRewards = async () => {
      if (stakingXContract && signer) {
        const userAddress = await signer.getAddress();
        const userBalance = await stakingXContract.stakedBalance(userAddress);
        const userRewards = await stakingXContract.earned(userAddress);
        setBalance(formatEther(userBalance));
        setRewards(formatEther(userRewards));
      }
    };

    fetchBalanceAndRewards();
  }, [stakingXContract, signer]);

  const handleStake = async () => {
    if (stakingXContract && amount > 0) {
      try {
        const tx = await stakingXContract.stake(parseEther(amount.toString()));
        await tx.wait();
        alert("Tokens staked successfully!");
      } catch (error) {
        console.error("Staking failed", error);
        alert("Staking failed. Check console for details.");
      }
    }
  };

  return (
    <div>
      <h2>Your Staking Balance: {balance} Tokens</h2>
      <h2>Your Earned Rewards: {rewards} Tokens</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="Amount to stake"
      />
      <button onClick={handleStake}>Stake Tokens</button>
    </div>
  );
};

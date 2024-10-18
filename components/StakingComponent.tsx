import React, { useState, useEffect } from "react";
import { useWeb3Context } from "@/context/Web3Context";
import { formatEther, formatUnits, parseEther } from "ethers";
import { useAccount } from "wagmi";
import { handleApprove } from "@/actions/approve";

export const StakingComponent = () => {
  const { stakingXContract, stakingXTokenContract, signer } = useWeb3Context();

  const { address } = useAccount();

  console.log(address);
  const [amount, setAmount] = useState<number>(0);
  const [stakeXTokenBalance, setStakeXTokenBalance] = useState<string>("0");
  const [stakeBalance, setStakeBalance] = useState<string>("0");
  const [rewards, setRewards] = useState<string>("0");
  const [loading, setLoading] = useState<boolean>(false); // Loading state to disable actions during transaction

  useEffect(() => {
    const fetchBalanceAndRewards = async () => {
      if (stakingXContract && stakingXTokenContract && signer && address) {
        const userAddress = await signer?.getAddress();
        const userBalance = await stakingXContract?.stakedBalance(userAddress);
        const userRewards = await stakingXContract?.earned(userAddress);
        const balances = await stakingXTokenContract?.balanceOf(address);
        setStakeXTokenBalance(formatUnits(balances));
        console.log(stakeXTokenBalance);
        setStakeBalance(formatEther(userBalance));
        setRewards(formatEther(userRewards));
      }
    };

    fetchBalanceAndRewards();
  }, [stakingXContract, stakingXTokenContract, signer, address]);

  const handleApproveAndStake = async () => {
    if (stakingXContract && stakingXTokenContract && amount > 0) {
      const addresscontract = await stakingXContract?.getAddress();
      console.log(addresscontract);
      setLoading(true);
      try {
        const amountInWei = parseEther(amount.toString());

        if (amountInWei) {
          await handleApprove(signer!); // Wait for the approval transaction to complete
          alert("Approval successful!");
        }

        // Step 2: Stake tokens
        const stakeTx = await stakingXContract?.stake(amountInWei);
        await stakeTx.wait(); // Wait for the staking transaction to complete
        alert("Tokens staked successfully!");

        // Optionally, refresh balances after staking
      } catch (error) {
        console.error("Error during staking:", error);
        alert("Staking failed. Check console for details.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 border-[1px] border-[#1b1b1b] rounded-2xl bg-[#101010] shadow-md">
      <h2 className="text-lg font-semibold mb-4">
        Your StakingXTokens Balance:{" "}
        <span className="font-bold">{stakeXTokenBalance} Tokens</span>
      </h2>
      <h1 className="text-xl font-bold mb-4">
        User Staking Balance: <span className="font-bold">{stakeBalance}</span>
      </h1>
      <h2 className="text-lg mb-4">
        Your Earned Rewards: <span className="font-bold">{rewards} Tokens</span>
      </h2>
      <input
        className="w-full p-2 border border-gray-300 rounded mb-4"
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="Amount to stake"
        disabled={loading}
      />
      <button
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
        onClick={handleApproveAndStake}
        disabled={loading}
      >
        {loading ? "Processing..." : "Approve and Stake Tokens"}
      </button>
    </div>
  );
};

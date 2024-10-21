import React, { useState, useEffect } from "react";
import { useWeb3Context } from "@/context/Web3Context";
import { formatEther, formatUnits, parseEther } from "ethers";
import { useAccount } from "wagmi";
import { handleApprove } from "@/actions/approve";

export const StakingComponent = () => {
  const { stakingXContract, stakingXTokenContract, loading, signer } =
    useWeb3Context();

  const { address } = useAccount();

  console.log(address);
  const [amount, setAmount] = useState<number>(0);

  const [rewards, setRewards] = useState<string>("0");
  const [isLoading, setIsisLoading] = useState<boolean>(false); // isLoading state to disable actions during transaction

  useEffect(() => {
    const fetchBalanceAndRewards = async () => {
      if (stakingXContract && stakingXTokenContract && signer && address) {
        const userAddress = await signer?.getAddress();

        const userRewards = await stakingXContract?.earned(userAddress);

        setRewards(formatEther(userRewards));
      }
    };

    fetchBalanceAndRewards();
  }, [stakingXContract, stakingXTokenContract, signer, address]);

  const handleApproveAndStake = async () => {
    if (stakingXContract && stakingXTokenContract && amount > 0) {
      const addresscontract = await stakingXContract?.getAddress();
      console.log(addresscontract);
      setIsisLoading(true);
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
        setIsisLoading(false);
      }
    }
  };
  if (loading) {
    return (
      <div className="max-w-md mx-auto p-6 border-[1px] border-[#1b1b1b] rounded-2xl bg-[#101010] shadow-md">
        isLoading
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 border-[1px] border-[#1b1b1b] rounded-2xl bg-[#101010] shadow-md">
      <h2 className="text-lg mb-4">
        Your Earned Rewards: <span className="font-bold">{rewards} Tokens</span>
      </h2>
      <input
        className="w-full p-2 border border-gray-300 rounded mb-4"
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="Amount to stake"
        disabled={isLoading}
      />
      <button
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
        onClick={handleApproveAndStake}
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Approve and Stake Tokens"}
      </button>
    </div>
  );
};

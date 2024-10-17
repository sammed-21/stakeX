// import React, { useState, useEffect } from "react";
// import { useWeb3Context } from "@/context/Web3Context";
// import { formatEther, formatUnits, parseEther } from "ethers";
// import { useAccount } from "wagmi";

// export const StakingComponent = () => {
//   const { stakingXContract, stakingXTokenContract, signer } = useWeb3Context();
//   const { address } = useAccount();
//   const [amount, setAmount] = useState<number>(0);
//   const [stakeXTokenBalance, setStakeXTokenBalance] = useState<string>("0");
//   const [stakeBalance, setStakeBalance] = useState<string>("0");
//   const [rewards, setRewards] = useState<string>("0");

//   useEffect(() => {
//     const fetchBalanceAndRewards = async () => {
//       if (stakingXContract && stakingXTokenContract && signer) {
//         const userAddress = await signer.getAddress();
//         const userBalance = await stakingXContract.stakedBalance(userAddress);
//         const userRewards = await stakingXContract.earned(userAddress);
//         const balances = await stakingXTokenContract.balanceOf(address);

//         setStakeXTokenBalance(formatEther(balances));
//         setStakeBalance(formatEther(userBalance));
//         setRewards(formatEther(userRewards));
//       }
//     };
//     fetchBalanceAndRewards();
//   }, [stakingXContract, stakingXTokenContract, signer]);

//   const handleStake = async () => {
//     if (stakingXContract && amount > 0) {
//       try {
//         const tx = await stakingXContract.stake(parseEther(amount.toString()));
//         await tx.wait();
//         alert("Tokens staked successfully!");
//       } catch (error) {
//         console.error("Staking failed", error);
//         alert("Staking failed. Check console for details.");
//       }
//     }
//   };

//   return (
//     <div>
//       <h2>Your StakingXTokens Balance: {stakeXTokenBalance} Tokens</h2>
//       <h1> User staking Balance : {stakeBalance}</h1>
//       <h2>Your Earned Rewards: {rewards} Tokens</h2>
//       <input
//         type="number"
//         value={amount}
//         onChange={(e) => setAmount(Number(e.target.value))}
//         placeholder="Amount to stake"
//       />
//       <button onClick={handleStake}>Stake Tokens</button>
//     </div>
//   );
// };

import React, { useState, useEffect } from "react";
import { useWeb3Context } from "@/context/Web3Context";
import { formatEther, parseEther } from "ethers";
import { useAccount } from "wagmi";

export const StakingComponent = () => {
  const { stakingXContract, stakingXTokenContract, signer } = useWeb3Context();
  const { address } = useAccount();
  const [amount, setAmount] = useState<number>(0);
  const [stakeXTokenBalance, setStakeXTokenBalance] = useState<string>("0");
  const [stakeBalance, setStakeBalance] = useState<string>("0");
  const [rewards, setRewards] = useState<string>("0");

  useEffect(() => {
    const fetchBalanceAndRewards = async () => {
      if (stakingXContract && stakingXTokenContract && signer) {
        const userAddress = await signer.getAddress();
        const userBalance = await stakingXContract.stakedBalance(userAddress);
        const userRewards = await stakingXContract.earned(userAddress);
        const balances = await stakingXTokenContract.balanceOf(address);

        setStakeXTokenBalance(formatEther(balances));
        setStakeBalance(formatEther(userBalance));
        setRewards(formatEther(userRewards));
      }
    };

    fetchBalanceAndRewards();
  }, [stakingXContract, stakingXTokenContract, signer]);

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
    <div className="max-w-md mx-auto p-6 bg-[#1b1b1b] rounded-lg shadow-md">
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
      />
      <button
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
        onClick={handleStake}
      >
        Stake Tokens
      </button>
    </div>
  );
};

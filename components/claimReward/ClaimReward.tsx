import React from "react";
import Button from "../Button";
import { useWeb3Context } from "@/context/Web3Context";
import toast from "react-hot-toast";

const ClaimReward = () => {
  const { stakingXContract } = useWeb3Context();

  const claimReward = async () => {
    try {
      let transaction;
      if (stakingXContract) {
        transaction = await stakingXContract.getReward();
      }
      await toast.promise(transaction.wait(), {
        loading: "Transaction is pending...",
        success: "Transaction successful 👌",
        error: "Transaction failed 🤯",
      });
    } catch (error) {
      console.error("token approval failed", error.message);
    }
  };

  return (
    <div>
      <Button
        onClick={claimReward}
        type="submit"
        label="Claim Reward"
        className="inline-flex h-8 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-3 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
      />
    </div>
  );
};

export default ClaimReward;

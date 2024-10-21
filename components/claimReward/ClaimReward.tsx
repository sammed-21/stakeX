import { parseUnits } from "ethers";
import React, { useRef, useState } from "react";
import Button from "../Button";
import { useWeb3Context } from "@/context/Web3Context";
import toast from "react-hot-toast";

const ClaimReward = () => {
  const { stakingXContract } = useWeb3Context();
  const [trxnStatus, setTrxnStatus] = useState<string | null>("");

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
      {trxnStatus && <div>{trxnStatus}</div>}

      <Button
        onClick={claimReward}
        type="submit"
        label="Claim Reward"
        className={null}
      />
    </div>
  );
};

export default ClaimReward;

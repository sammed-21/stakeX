import { parseUnits } from "ethers";
import React, { useRef, useState } from "react";
import Button from "../Button";
import { useWeb3Context } from "@/context/Web3Context";
import { useStakingContext } from "@/context/StakingContext";
import toast from "react-hot-toast";

const StakeAmount = () => {
  const { stakingXContract, stakingXTokenContract } = useWeb3Context();
  const { setIsReload, isReload } = useStakingContext();
  const [trxnStatus, setTrxnStatus] = useState<string | null>("");
  const stakeAmountRef = useRef<HTMLInputElement>("");

  const stakeToken = async (e: React.FormEvent) => {
    e.preventDefault();

    const amount = stakeAmountRef.current?.value.trim(); // Ensure ref exists
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      console.error("Enter a valid positive number");
      return;
    }

    const amountToStake = parseUnits(amount, 18).toString();
    console.log("Amount to send:", amountToStake); // Do something with amountToSend
    try {
      let transaction;
      if (stakingXContract) {
        transaction = await stakingXContract.stake(amountToStake);
      }
      await toast.promise(transaction.wait(), {
        loading: "Transaction is pending...",
        success: "Transaction successful 👌",
        error: "Transaction failed 🤯",
      });
      stakeAmountRef.current.value = "";
      setIsReload(!isReload);
      //   console.log(transaction);
      //   setTrxnStatus("trsaction is in pending....");
      //   const recipt = await transaction.wait();
      //   if (recipt.status == 1) {
      //     setTrxnStatus("transaction is successfull");
      //     setIsReload(!isReload);
      //     setTimeout(() => {
      //       setTrxnStatus("");
      //     }, 5000);
      //     stakeAmountRef.current.value = "";
      //   } else {
      //     setTrxnStatus("transaction failed");
      //   }
    } catch (error) {
      console.error("stakeing failed", error.message);
    }
  };

  return (
    <div>
      {trxnStatus && <div>{trxnStatus}</div>}

      <form onSubmit={stakeToken}>
        <label htmlFor="approval">stake token:</label>
        <input
          className="text-black"
          id="approval"
          type="text"
          ref={stakeAmountRef}
        ></input>
        <Button type="submit" label="Enter amount" className={null} />
      </form>
    </div>
  );
};

export default StakeAmount;

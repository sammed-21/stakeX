import { parseUnits } from "ethers";
import React, { useRef } from "react";
import Button from "../Button";
import { useWeb3Context } from "@/context/Web3Context";
import { useStakingContext } from "@/context/StakingContext";
import toast from "react-hot-toast";

const StakeAmount = () => {
  const { stakingXContract } = useWeb3Context();
  const { setIsReload, isReload } = useStakingContext();
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
    } catch (error) {
      console.error("stakeing failed", error.message);
    }
  };

  return (
    <div>
      <form onSubmit={stakeToken} className="flex flex-col justify-start gap-3">
        <label htmlFor="approval" className="">
          Stake Tokens:
        </label>

        <div className="h-20 bg-white rounded-lg w-full">
          <input
            className="text-black w-full  outline-0 border-0 px-3 flex   placeholder:text-gray-600 text-start items-start border-gray-500 h-10 justify-start rounded-lg"
            id="stake"
            type="text"
            placeholder="Enter Amount"
            ref={stakeAmountRef}
          ></input>
        </div>
        <Button type="submit" className="w-full" label="Stake Amount" />
      </form>
    </div>
  );
};

export default StakeAmount;

import { parseUnits } from "ethers";
import React, { useRef } from "react";
import Button from "../Button";
import { useWeb3Context } from "@/context/Web3Context";
import { useStakingContext } from "@/context/StakingContext";
import toast from "react-hot-toast";

const Withdraw = () => {
  const { stakingXContract } = useWeb3Context();

  const WithdrawTokenRef = useRef<HTMLInputElement>("");
  const { setIsReload, isReload } = useStakingContext();
  const WithdrawToken = async (e: React.FormEvent) => {
    e.preventDefault();

    const amount = WithdrawTokenRef.current?.value.trim(); // Ensure ref exists
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      console.error("Enter a valid positive number");
      return;
    }

    const amountToWithdraw = parseUnits(amount, 18).toString();
    // console.log("Amount to send:", amountToWithdraw); // Do something with amountToSend
    try {
      let transaction;
      if (stakingXContract) {
        transaction = await stakingXContract.withdrawStakedTokens(
          amountToWithdraw
        );
      }
      WithdrawTokenRef.current.value = "";
      await toast.promise(transaction.wait(), {
        loading: "Transaction is pending...",
        success: "Transaction successful 👌",
        error: "Transaction failed 🤯",
      });
      setIsReload(!isReload);
    } catch (error) {
      console.error("token approval failed", error.message);
    }
  };

  return (
    <div>
      <form
        onSubmit={WithdrawToken}
        className="flex flex-col justify-start gap-3"
      >
        <label htmlFor="approval">Amount to Withdraw :</label>

        <div className="h-20 bg-white rounded-lg w-full">
          <input
            className="text-black w-full  outline-0 border-0 px-3 flex  placeholder:text-gray-600 text-start items-start border-gray-500 h-10 justify-start rounded-lg"
            id="stake"
            type="text"
            placeholder="Enter Amount"
            ref={WithdrawTokenRef}
          ></input>
        </div>
        <Button className="w-full" type="submit" label="Enter amount" />
      </form>
    </div>
  );
};

export default Withdraw;

"use client";
import { parseUnits } from "ethers";
import React, { useRef } from "react";
import Button from "../Button";
import { useWeb3Context } from "@/context/Web3Context";
import toast from "react-hot-toast";

const AmountApproval = () => {
  const { stakingXContract, stakingXTokenContract } = useWeb3Context();
  const approveTokenRef = useRef<HTMLInputElement>(null);

  const approveToken = async (e: React.FormEvent) => {
    e.preventDefault();

    const amount = approveTokenRef.current?.value.trim(); // Ensure ref exists
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      console.error("Enter a valid positive number");
      return;
    }

    const amountToSend = parseUnits(amount, 18).toString();
    console.log("Amount to send:", amountToSend); // Do something with amountToSend
    try {
      let transaction;
      if (stakingXTokenContract) {
        transaction = await stakingXTokenContract.approve(
          stakingXContract?.target,
          amountToSend
        );
        await stakingXTokenContract?.symbol();
      }
      await toast.promise(transaction.wait(), {
        loading: "Transaction is pending...",
        success: "Transaction successful 👌",
        error: "Transaction failed 🤯",
      });
      if (approveTokenRef.current) {
        approveTokenRef.current.value = ""; // Reset input field
      }
    } catch (error: unknown) {
      console.error("token approval failed", (error as Error).message);
    }
  };

  return (
    <div>
      <form
        onSubmit={approveToken}
        className="flex flex-col justify-start gap-3"
      >
        <label htmlFor="approval">Token Approval:</label>
        <div className="h-20 flex flex-col justify-between bg-white rounded-lg w-full">
          <input
            className="text-black w-full  outline-0 border-0 px-3 flex   placeholder:text-gray-600 text-start items-start border-gray-500 h-10 justify-start rounded-lg"
            id="approval"
            type="text"
            placeholder="Enter Amount"
            ref={approveTokenRef}
          ></input>
        </div>

        <Button type="submit" className="w-full" label="Approve Amount" />
      </form>
    </div>
  );
};

export default AmountApproval;

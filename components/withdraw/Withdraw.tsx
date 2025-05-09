import { formatUnits, parseUnits } from "ethers";
import React, { useEffect, useRef, useState } from "react";
import { useWeb3Context } from "@/context/Web3Context";
import { useStakingContext } from "@/context/StakingContext";
import toast from "react-hot-toast";
import Button from "../Button";
import { useAccount } from "wagmi";

const WithdrawTokenForm = () => {
  const { stakingXContract, stakingXTokenContract } = useWeb3Context();
  const { address } = useAccount();
  const [withdrawAmount, setWithDrawAmount] = useState<string>("");
  const [withdrawBalance, setWithdrawBalance] = useState<string>("0");
  const [stakedSymbol, setStakedsymbol] = useState<string>("");
  const { setIsReload, isReload } = useStakingContext();
  const [transactionButtonText, setTransactionButtonText] =
    useState("Withdraw");

  const WithdrawTokenRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const checkStakedBalance = async () => {
    if (!stakingXContract) return;
    if (!stakingXTokenContract) return;
    const withdrawBalance = await stakingXContract.stakedBalance(address);
    const symbolStaked = await stakingXTokenContract.symbol();
    setStakedsymbol(symbolStaked);
    setWithdrawBalance(withdrawBalance);
    return withdrawBalance;
  };
  const checkWithDrawBalance = async (amount: string | null) => {
    try {
      if (!stakingXContract) return;
      const withdrawBalance = await checkStakedBalance();
      if (withdrawBalance > Number(amount)) {
        setTransactionButtonText("Withdraw");
      } else {
        setTransactionButtonText("Insufficient Balance");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleWithdraw = async () => {
    if (
      !withdrawAmount ||
      isNaN(Number(withdrawAmount)) ||
      Number(withdrawAmount) <= 0
    ) {
      toast.error("Please enter a valid positive number");
      return;
    }

    try {
      const parsedAmount = parseUnits(withdrawAmount, 18); // bigint in ethers v6

      if (!stakingXContract) {
        toast.error("Contract not available");
        return;
      }

      setIsLoading(true);

      const tx = await stakingXContract.withdrawStakedTokens(parsedAmount);
      if (WithdrawTokenRef.current) {
        WithdrawTokenRef.current.value = ""; // reset input field
      }

      await toast.promise(tx.wait(), {
        loading: "Transaction is pending...",
        success: "Withdrawal successful 👌",
        error: "Transaction failed 🤯",
      });

      setIsReload(!isReload);
    } catch (error) {
      console.error("Withdrawal failed:", error);
      toast.error("Withdrawal failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleWithdrawOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWithDrawAmount(e.target.value.trim());
  };
  const handleAutoInput = (percent: string) => {
    const amount = (Number(withdrawBalance) * Number(percent)) / 100;
    setWithDrawAmount(amount.toString());
  };
  useEffect(() => {
    if (
      withdrawAmount &&
      !isNaN(Number(withdrawAmount)) &&
      Number(withdrawAmount) > 0
    ) {
      checkWithDrawBalance(withdrawAmount);
    }
  }, [withdrawAmount]);

  useEffect(() => {
    (async () => {
      await checkStakedBalance();
    })();
  }, []); // Add dependencies if needed

  return (
    <div>
      <form onSubmit={handleWithdraw} className="flex flex-col  gap-3">
        <div className="h-30 px-2 bg-input border-[1px] border-border rounded-lg w-full">
          <input
            className="text-white w-full outline-0 border-0 border-border flex items-start pb-5 pt-2 justify-start font-bold text-xl rounded-lg bg-input placeholder:text-text"
            id="withdraw"
            type="text"
            placeholder="0"
            ref={WithdrawTokenRef}
            onChange={handleWithdrawOnChange}
          />
          <div className="text-description pb-1 flex items-center gap-4 text-sm font-semibold w-full ">
            <span>
              Withdraw:{" "}
              {withdrawBalance == "0"
                ? "0"
                : Number(formatUnits(withdrawBalance!))}{" "}
              {stakedSymbol == "" ? "" : stakedSymbol}
            </span>
            <div className="flex gap-3 items-center">
              <div
                className="bg-card p-2 w-fit  cursor-pointer text-sm text-white rounded-2xl"
                onClick={() => handleAutoInput("50")}
              >
                50%
              </div>
              <div
                className="bg-card p-2 w-fit cursor-pointer  text-sm text-white rounded-2xl"
                onClick={() => handleAutoInput("100")}
              >
                100%
              </div>
            </div>
          </div>
        </div>

        <Button
          onClick={() => handleWithdraw()}
          type="submit"
          className="w-full"
          label={isLoading ? "Processing..." : transactionButtonText}
          disabled={isLoading}
        />
      </form>
    </div>
  );
};

export default WithdrawTokenForm;

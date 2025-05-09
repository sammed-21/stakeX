import { formatUnits, parseUnits } from "ethers";
import React, { useEffect, useRef, useState } from "react";
import Button from "../Button";
import { useWeb3Context } from "@/context/Web3Context";
import { useStakingContext } from "@/context/StakingContext";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";

type props = {
  stakeXTokenBalance: string | undefined;
  stakeXSymbol: string | null;
};
const StakeAmount = ({ stakeXTokenBalance, stakeXSymbol }: props) => {
  const { stakingXContract, stakingXTokenContract, signer } = useWeb3Context();
  const { connectWallet } = useWeb3Context();
  const { address } = useAccount();
  const { setIsReload, isReload } = useStakingContext();
  if (stakeXTokenBalance) {
    const fixedAmount = BigInt(
      Math.floor(Number(stakeXTokenBalance))
    ).toString(); // strips .0 safely
    const amountToSend = formatUnits(fixedAmount, 18);
    console.log(amountToSend);
  }

  const [stakeAmount, setStakeAmount] = useState("");
  const [transactionButtonText, setTransactionButtonText] = useState("Approve");
  const stakeAmountRef = useRef<HTMLInputElement>(null);

  // Check allowance and update button label
  const allowanceStakingxToken = async (amount: string) => {
    if (!stakingXContract || !stakingXTokenContract || !signer) return;

    try {
      const signerAddress = await signer.getAddress();
      const allowance = await stakingXTokenContract.allowance(
        signerAddress,
        stakingXContract.target
      );

      const parsedAmount = parseUnits(amount, 18); // returns bigint in ethers v6

      if (allowance < parsedAmount) {
        setTransactionButtonText("Approve");
        return true;
      } else {
        setTransactionButtonText("Stake");
        return false;
      }
    } catch (err) {
      console.error("Error checking allowance:", err);
      return true;
    }
  };

  // Automatically check allowance when amount changes
  useEffect(() => {
    if (stakeAmount && !isNaN(Number(stakeAmount)) && Number(stakeAmount) > 0) {
      allowanceStakingxToken(stakeAmount);
    }
  }, [stakeAmount]);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStakeAmount(e.target.value.trim());
  };

  // Approve tokens
  const approveToken = async (amount: string) => {
    if (!stakingXTokenContract || !stakingXContract) return;

    const parsedAmount = parseUnits(amount, 18).toString();

    try {
      const tx = await stakingXTokenContract.approve(
        stakingXContract.target,
        parsedAmount
      );

      await toast.promise(tx.wait(), {
        loading: "Approval pending...",
        success: "Token approved ✅",
        error: "Approval failed ❌",
      });

      setTransactionButtonText("Stake");
    } catch (error) {
      console.error("Token approval failed:", (error as Error).message);
    }
  };

  // Stake tokens
  const stakeToken = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stakingXContract) return null;
    const amount = stakeAmountRef.current?.value.trim();

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      console.error("Enter a valid positive number");
      return;
    }

    const needsApproval = await allowanceStakingxToken(amount);
    if (needsApproval) {
      await approveToken(amount);
      return;
    }

    const amountToStake = parseUnits(amount, 18).toString();

    try {
      const tx = await stakingXContract.stake(amountToStake);

      await toast.promise(tx.wait(), {
        loading: "Staking pending...",
        success: "Tokens staked 🎉",
        error: "Staking failed ❌",
      });
      setIsReload(!isReload);

      if (stakeAmountRef.current) stakeAmountRef.current.value = "";
      setStakeAmount("");
    } catch (error) {
      console.error("Staking failed:", (error as Error).message);
    }
  };
  const handleAutoInput = (percent: string) => {
    if (stakeXTokenBalance == null) return;
    const amount =
      (Number(formatUnits(stakeXTokenBalance.toString())) * Number(percent)) /
      100;

    if (stakeAmountRef.current)
      stakeAmountRef.current.value = amount.toString();
    setStakeAmount(amount.toFixed(2));
  };
  return (
    <div>
      <form
        onSubmit={stakeToken}
        className="flex flex-col justify-start  gap-3"
      >
        <div className="h-30 px-2 bg-input border-[1px] border-border rounded-lg w-full">
          <input
            className="text-white w-full outline-0 border-0 border-border flex items-start pb-5 pt-2 justify-start font-bold text-xl rounded-lg bg-input placeholder:text-text"
            id="withdraw"
            type="text"
            placeholder="0"
            ref={stakeAmountRef}
            onChange={handleInputChange}
          />
          <div className="text-description pb-1 flex items-center gap-4 text-sm font-semibold w-full ">
            {stakeXTokenBalance && (
              <span>
                STX Balance:{" "}
                {stakeXTokenBalance == "0"
                  ? "0"
                  : Number(formatUnits(stakeXTokenBalance.toString()))}{" "}
                {stakeXSymbol == "" ? "" : stakeXSymbol}
              </span>
            )}
            <div className="flex gap-3 items-center">
              <div
                className="bg-card p-2 cursor-pointer w-fit text-sm text-white rounded-2xl"
                onClick={() => handleAutoInput("50")}
              >
                50%
              </div>
              <div
                className="bg-card p-2 cursor-pointer w-fit text-sm text-white rounded-2xl"
                onClick={() => handleAutoInput("100")}
              >
                100%
              </div>
            </div>
          </div>
        </div>

        {address ? (
          <Button
            type="submit"
            className="w-full"
            label={transactionButtonText}
          />
        ) : (
          <div className="w-full ">
            <Button
              label="Connect Wallet"
              className="w-full"
              onClick={() => connectWallet()}
            />
          </div>
        )}
      </form>
    </div>
  );
};

export default StakeAmount;

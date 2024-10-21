import { parseUnits } from "ethers";
import React, { useRef, useState } from "react";
import Button from "../Button";
import { useWeb3Context } from "@/context/Web3Context";
import { useStakingContext } from "@/context/StakingContext";
import toast from "react-hot-toast";

const Withdraw = () => {
  const { stakingXContract, stakingXTokenContract } = useWeb3Context();
  const [trxnStatus, setTrxnStatus] = useState<string | null>("");
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
      //   console.log(transaction);
      //   setTrxnStatus("trsaction is in pending....");
      setIsReload(!isReload);
      //   const recipt = await transaction.wait();
      //   if (recipt.status == 1) {
      //     setTrxnStatus("transaction is successfull");
      //     setTimeout(() => {
      //       setTrxnStatus("");
      //     }, 5000);
      //   } else {
      //     setTrxnStatus("transaction failed");
      //   }
    } catch (error) {
      console.error("token approval failed", error.message);
    }
  };

  return (
    <div>
      {trxnStatus && <div>{trxnStatus}</div>}

      <form onSubmit={WithdrawToken}>
        <label htmlFor="approval">Amount to Withdraw :</label>
        <input
          className="text-black"
          id="approval"
          type="text"
          ref={WithdrawTokenRef}
        ></input>
        <Button type="submit" label="Enter amount" className={null} />
      </form>
    </div>
  );
};

export default Withdraw;

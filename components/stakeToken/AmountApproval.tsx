import { parseUnits } from "ethers";
import React, { useRef, useState } from "react";
import Button from "../Button";
import { useWeb3Context } from "@/context/Web3Context";
import toast from "react-hot-toast";

const AmountApproval = () => {
  const { stakingXContract, stakingXTokenContract, loading, signer } =
    useWeb3Context();
  const [trxnStatus, setTrxnStatus] = useState<string | null>("");
  const approveTokenRef = useRef<HTMLInputElement>("");

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
      }
      await toast.promise(transaction.wait(), {
        loading: "Transaction is pending...",
        success: "Transaction successful 👌",
        error: "Transaction failed 🤯",
      });
      approveTokenRef.current.value = "";
      //   console.log(transaction);
      //   setTrxnStatus("trsaction is in pending....");
      //   const recipt = await transaction.wait();
      //   if (recipt.status == 1) {
      //     setTrxnStatus("transaction is successfull");
      //     setTimeout(() => {
      //       setTrxnStatus("");
      //     }, 5000);
      //     approveTokenRef.current.value = "";
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

      <form onSubmit={approveToken}>
        <label htmlFor="approval">Token Approval:</label>
        <input
          className="text-black"
          id="approval"
          type="text"
          ref={approveTokenRef}
        ></input>
        <Button type="submit" label="Enter amount" className={null} />
      </form>
    </div>
  );
};

export default AmountApproval;

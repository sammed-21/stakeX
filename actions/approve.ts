import { getStakingXTokenContract } from "@/constants/contracts";
import { ethers } from "ethers";
import { parseEther } from "viem";

export const handleApprove = async (props: ethers.Signer) => {
  const amountToApprove = parseEther("100"); // Example amount
  const stakingXTokenContract = await getStakingXTokenContract(props);
  if (stakingXTokenContract && props) {
    try {
      const approveTx = await stakingXTokenContract
        .connect(props)
        .approve(stakingXTokenContract, amountToApprove);

      await approveTx.wait();
      console.log("Approval successful");
    } catch (error) {
      console.error("Approval failed", error);
    }
  }
};

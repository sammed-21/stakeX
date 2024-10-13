export const StakingXAddress = "0xe474c041b927c30c8144031367884f5b391d5f05";
export const StakingXTokenAddress =
  "0x7ae44d9950db7b464b459b7bcf52616b3e91b1d6";
import stakeXAbi from "@/abi/stakeXAbi.json";
import stakeXAbiToken from "@/abi/stakeXTokenAbi.json";
import ethers from "ethers";

export const StakingX = (provider) =>
  new Contract(StakingXAddress, stakeXAbi, provider);

export const StakingXToken = (provider) =>
  new Contract(StakingXTokenAddress, stakeXAbiToken, provider);

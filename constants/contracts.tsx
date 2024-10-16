export const StakingXAddress = "0xe474c041b927c30c8144031367884f5b391d5f05";
export const StakingXTokenAddress =
  "0x7ae44d9950db7b464b459b7bcf52616b3e91b1d6";
import stakeXAbi from "@/abi/stakeXAbi.json";
import stakeXAbiToken from "@/abi/stakeXTokenAbi.json";
import { ethers } from "ethers";

// Function to get the StakingX contract instance
export const getStakingXContract = (provider: ethers.Signer) =>
  new ethers.Contract(StakingXAddress, stakeXAbi, provider);

// Function to get the StakingXToken contract instance
export const getStakingXTokenContract = (provider: ethers.Signer) =>
  new ethers.Contract(StakingXTokenAddress, stakeXAbiToken, provider);

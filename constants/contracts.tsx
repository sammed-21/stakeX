export const StakingXAddress = "0xe474c041b927c30c8144031367884f5b391d5f05";
export const StakingXTokenAddress =
  "0x7ae44d9950db7b464b459b7bcf52616b3e91b1d6";
export const StakeFaucetAddress = "0xBD59C552fF97d4393E80Fe09cfc6fE88aFDb5F8F";
import { stakeXAbi } from "@/abi/stakeXAbi";
import { ethers } from "ethers";
import { stakeXTokenAbi } from "@/abi/stakeXTokenAbi";
import { stakeFaucetAbi } from "@/abi/stakeFaucetAbi";

// Function to get the StakingX contract instance
export const getStakingXContract = (provider: ethers.Signer) =>
  new ethers.Contract(StakingXAddress, stakeXAbi, provider);

// Function to get the StakingXToken contract instance
export const getStakingXTokenContract = (
  provider: ethers.BrowserProvider | ethers.Signer
) => new ethers.Contract(StakingXTokenAddress, stakeXTokenAbi, provider);

export const getStakeFaucetContract = (
  provider: ethers.BrowserProvider | ethers.Signer
) => new ethers.Contract(StakeFaucetAddress, stakeFaucetAbi, provider);

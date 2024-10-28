import React, { createContext, useContext, useEffect, useState } from "react";
import {
  ethers,
  formatEther,
  formatUnits,
  parseEther,
  parseUnits,
} from "ethers";
import {
  getStakeFaucetContract,
  getStakingXContract,
  getStakingXTokenContract,
} from "@/constants/contracts";
import { useAccount, useChainId } from "wagmi";

interface Web3State {
  provider: ethers.BrowserProvider | null;
  signer: ethers.Signer | null;
  stakingXContract?: ethers.Contract;
  stakingXTokenContract?: ethers.Contract;
  stakeFaucetContract?: ethers.Contract;
  chainId?: string | number;
  stakeXTokenBalance?: string | number;
  loading: boolean;
  address?: string | null;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  connectWallet: () => Promise<void>;
}

const defaultWeb3State: Web3State = {
  provider: null,
  signer: null,
  stakingXContract: undefined,
  stakingXTokenContract: undefined,
  stakeFaucetContract: undefined,
  chainId: undefined,
  stakeXTokenBalance: undefined,
  address: undefined,
  setLoading: () => {},
  loading: false,
  connectWallet: async () => {},
};

const Web3Context = createContext<Web3State>(defaultWeb3State);

export const useWeb3Context = () => useContext(Web3Context);

export const Web3ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const chainid = useChainId();
  const { address: Address } = useAccount();
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [stakingXContract, setStakingXContract] = useState<ethers.Contract>();
  const [stakeFaucetContract, SetStakeFaucetContract] =
    useState<ethers.Contract>();
  const [stakeXTokenBalance, setStakeXTokenBalance] = useState<
    string | number
  >();
  const [chainId, setChainId] = useState<string | number>("");
  const [address, setAddress] = useState<string | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const [stakingXTokenContract, setStakingXTokenContract] =
    useState<ethers.Contract>();

  // Define the connectWallet function
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Check if there's already a pending eth_requestAccounts call
        setLoading(true);
        const web3Provider = new ethers.BrowserProvider(window.ethereum);

        // Ensure that user wallet connection is done only once
        await window.ethereum.request({ method: "eth_requestAccounts" });

        setProvider(web3Provider);

        const signer = await web3Provider?.getSigner();
        setSigner(signer);

        const stakingContract = getStakingXContract(signer);
        const stakingTokenContract = getStakingXTokenContract(signer!);
        const stakeTokenBalance = await stakingTokenContract?.balanceOf(signer);
        console.log(stakeTokenBalance);

        // Convert the balance to a readable format (4 significant digits)
        const formattedBalance = String(
          formatUnits(stakeTokenBalance.toString(), 18)
        );

        setStakeXTokenBalance(formattedBalance);
        const stakeFaucetContract = getStakeFaucetContract(signer);
        SetStakeFaucetContract(stakeFaucetContract);
        setChainId(chainid);
        setAddress(Address);
        setStakingXContract(stakingContract);
        setStakingXTokenContract(stakingTokenContract);
        setLoading(false);
      } catch (error: unknown) {
        console.error("Error connecting to wallet:", error as Error);
      } finally {
        setLoading(false);
      }
    } else {
      console.error("Ethereum provider not found. Please install MetaMask.");
      alert("Ethereum provider not found. Please install MetaMask.");
    }
  };
  useEffect(() => {
    if (!Address) {
      connectWallet();
    }
  }, [Address]);

  // Initialize Web3 on component mount

  // Return the Web3Context.Provider with proper value types from Web3State interface
  return (
    <Web3Context.Provider
      value={{
        provider,
        signer,
        stakingXContract,
        chainId,
        loading,
        address,
        stakeXTokenBalance,
        setLoading,
        stakeFaucetContract,
        stakingXTokenContract,
        connectWallet, // Ensure the connectWallet function is passed
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

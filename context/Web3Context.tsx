import React, { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import {
  getStakingXContract,
  getStakingXTokenContract,
} from "@/constants/contracts";

interface Web3State {
  provider: ethers.BrowserProvider | null;
  signer: ethers.Signer | null;
  stakingXContract?: ethers.Contract;
  stakingXTokenContract?: ethers.Contract;
  connectWallet: () => Promise<void>;
}

const defaultWeb3State: Web3State = {
  provider: null,
  signer: null,
  stakingXContract: undefined,
  stakingXTokenContract: undefined,
  connectWallet: async () => {},
};

const Web3Context = createContext<Web3State>(defaultWeb3State);

export const useWeb3Context = () => useContext(Web3Context);

export const Web3ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [stakingXContract, setStakingXContract] = useState<ethers.Contract>();
  const [stakingXTokenContract, setStakingXTokenContract] =
    useState<ethers.Contract>();

  // Define the connectWallet function
  const connectWallet = async () => {
    if (window.ethereum) {
      const web3Provider = new ethers.BrowserProvider(window.ethereum);

      setProvider(web3Provider);

      const signer = await web3Provider.getSigner();
      setSigner(signer);

      const stakingContract = getStakingXContract(signer);
      const stakingTokenContract = getStakingXTokenContract(web3Provider!);

      setStakingXContract(stakingContract);
      setStakingXTokenContract(stakingTokenContract);
    } else {
      console.error("Ethereum provider not found. Please install MetaMask.");
    }
  };

  // Initialize Web3 on component mount
  useEffect(() => {
    connectWallet(); // Optionally connect on mount
  }, []);

  // Return the Web3Context.Provider with proper value types from Web3State interface
  return (
    <Web3Context.Provider
      value={{
        provider,
        signer,
        stakingXContract,
        stakingXTokenContract,
        connectWallet, // Ensure the connectWallet function is passed
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

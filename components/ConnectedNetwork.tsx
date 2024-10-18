import React from "react";
import { useAccount, useSwitchChain } from "wagmi";

const ConnectedNetwork = () => {
  const { chain } = useAccount(); // Get the current network
  const { switchChain } = useSwitchChain(); // Use wagmi hook for network switching

  // Sepolia Testnet chain ID
  const SUPPORTED_CHAIN_ID = 11155111;

  const handleSwitchNetwork = () => {
    if (switchChain) {
      switchChain({ chainId: SUPPORTED_CHAIN_ID }); // Switch to Sepolia Testnet
    } else {
      alert("Network switching is not supported on this wallet!");
    }
  };

  return (
    <div>
      {chain?.id === SUPPORTED_CHAIN_ID ? (
        <div>Connected Network: {chain?.name} (Sepolia)</div>
      ) : (
        <div>
          <p>Connected Network: {chain?.name} (Unsupported)</p>
          <button
            className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-200"
            onClick={handleSwitchNetwork}
          >
            Switch to Sepolia Network
          </button>
        </div>
      )}
    </div>
  );
};

export default ConnectedNetwork;

"use client";
import React, { useState, useEffect } from "react";
import { formatUnits } from "ethers";
import { useWeb3Context } from "@/context/Web3Context";
import toast from "react-hot-toast";
import ConnectWallet from "../ConnectWallet";
import { useAccount } from "wagmi";
import { StakingXTokenAddress } from "@/constants/contracts";

export const FaucetComponent = () => {
  const { stakeFaucetContract, stakingXTokenContract, signer } =
    useWeb3Context();
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cooldownLeft, setCooldownLeft] = useState<number>(0);
  const [faucetBalance, setFaucetBalance] = useState<string>("0");

  useEffect(() => {
    checkCooldown();
  }, [address]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (cooldownLeft > 0) {
      interval = setInterval(() => {
        setCooldownLeft((prev) => Math.max(prev - 1, 0));
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [cooldownLeft]);

  const checkCooldown = async () => {
    if (!stakeFaucetContract || !signer) return;
    try {
      const userAddress = await signer.getAddress();
      const lastRequestTime = await stakeFaucetContract.lastRequestTime(
        userAddress
      );

      // Convert lastRequestTime to seconds
      const lastRequestTimeInSeconds = lastRequestTime.toNumber
        ? lastRequestTime.toNumber()
        : parseInt(lastRequestTime.toString(), 10);

      // Get cooldownPeriod in seconds
      const cooldownPeriod = await stakeFaucetContract.cooldownTime();
      const cooldownPeriodInSeconds = cooldownPeriod.toNumber
        ? cooldownPeriod.toNumber()
        : parseInt(cooldownPeriod.toString(), 10);

      // Get current time in seconds
      const currentTimeInSeconds = Math.floor(Date.now() / 1000);

      // Calculate how much cooldown time is left
      const cooldownLeftInSeconds =
        cooldownPeriodInSeconds -
        (currentTimeInSeconds - lastRequestTimeInSeconds);

      // Update the cooldownLeft state
      setCooldownLeft(cooldownLeftInSeconds > 0 ? cooldownLeftInSeconds : 0);
    } catch (error) {
      console.error("Error checking cooldown:", error);
    }
  };

  const requestTokens = async () => {
    if (!stakeFaucetContract || !signer) {
      toast.error("Wallet or contract not connected");
      return;
    }

    const balance = await stakingXTokenContract?.balanceOf(
      stakeFaucetContract.getAddress()
    );
    setFaucetBalance(formatUnits(balance, 18));

    if (parseFloat(faucetBalance) <= 0) {
      toast.error("Faucet has no tokens left to distribute");
      return;
    }

    if (cooldownLeft > 0) {
      toast.error(
        `Please wait ${cooldownLeft} seconds before requesting again.`
      );
      return;
    }

    setIsLoading(true);
    try {
      const tx = await stakeFaucetContract.requestTokens(signer.getAddress());

      await toast.promise(tx.wait(), {
        loading: "Transaction is pending...",
        success: "Tokens successfully requested!",
        error: "Transaction failed 🤯",
      });

      // Add the contract to MetaMask
      await addContractToMetamask();

      checkCooldown();
    } catch (error: any) {
      console.error(
        "Error requesting tokens:",
        error.message || "Transaction failed"
      );
      toast.error(`Error: ${error.message || "Transaction failed"}`);
    } finally {
      setIsLoading(false);
    }
  };

  const addContractToMetamask = async () => {
    if (window.ethereum) {
      const contractAddress = StakingXTokenAddress;
      const tokenSymbol = "STX";
      const tokenDecimals = 18;

      try {
        await window.ethereum.request({
          method: "wallet_watchAsset",
          params: {
            type: "ERC20",
            options: {
              address: contractAddress,
              symbol: tokenSymbol,
              decimals: tokenDecimals,
            },
          },
        });
      } catch (error) {
        console.error("Error adding contract to MetaMask:", error);
      }
    }
  };

  return (
    <div className="max-w-[520px] border-[1px] bg-[#2b2b2b] mt-10 border-[#3b3b3b] w-full h-full flex flex-col gap-4 p-4 rounded-lg shadow-lg">
      <h2 className="text-lg font-bold">StakeX Token Faucet</h2>
      {/* <p className="text-md">
        Faucet Balance:{" "}
        <span className="font-semibold">{faucetBalance} tokens</span>
      </p> */}
      {address ? (
        <button
          onClick={requestTokens}
          disabled={isLoading || cooldownLeft > 0}
          className={`bg-[#1b1b1b] text-white py-2 rounded-md transition-all duration-300 ${
            isLoading || cooldownLeft > 0
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-[#333]"
          }`}
        >
          {isLoading
            ? "Requesting Tokens..."
            : cooldownLeft > 0
            ? `Wait ${Math.floor(cooldownLeft / 3600)}h ${Math.floor(
                (cooldownLeft % 3600) / 60
              )}m ${cooldownLeft % 60}s`
            : "Request Faucet Tokens"}
        </button>
      ) : (
        <div className="w-full flex justify-center">
          <ConnectWallet />
        </div>
      )}

      {address && cooldownLeft > 0 && (
        <p className="text-sm text-gray-600">
          Cooldown time left: {Math.floor(cooldownLeft / 3600)} hours,{" "}
          {Math.floor((cooldownLeft % 3600) / 60)} minutes, and{" "}
          {cooldownLeft % 60} seconds
        </p>
      )}
    </div>
  );
};

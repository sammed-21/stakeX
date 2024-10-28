"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import { tabsConfig } from "@/constants";
import StakeAmount from "@/components/stakeToken/StakeAmount";
import AmountApproval from "@/components/stakeToken/AmountApproval";
import Withdraw from "@/components/withdraw/Withdraw";
import { useWeb3Context } from "@/context/Web3Context";
import { useAccount } from "wagmi";

const StakeMain = () => {
  const { stakeXTokenBalance } = useWeb3Context();
  const { address } = useAccount();
  return (
    <div className="flex flex-col justify-center mx-auto  w-full gap-3 items-center">
      <Tabs defaultValue="stake" className="max-w-[520px] mx-auto w-full ">
        <TabsList className="mx-auto">
          {tabsConfig.map((tab, index) => (
            <TabsTrigger key={index} value={tab.label.toLowerCase()}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabsConfig.map((tab, index) => (
          <TabsContent
            className="border-[1px] border-[#3b3b3b] mx-auto p-3 rounded-lg bg-[#2b2b2b]  max-w-[520px]"
            key={index}
            value={tab.label.toLowerCase()}
          >
            <div>
              <div className="text-black text-xs w-full p-1 justify-end text-end font-semibold">
                {stakeXTokenBalance && address && (
                  <div className="text-white">
                    Balance: {stakeXTokenBalance} STX
                  </div>
                )}
              </div>
            </div>
            {tab.id == "stake" && (
              <div className="flex flex-col w-full gap-3">
                <AmountApproval />
                <StakeAmount />
              </div>
            )}
            {tab.id == "withdraw" && (
              <div>
                <Withdraw />
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default StakeMain;

"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import { tabsConfig } from "@/constants";
import StakeAmount from "@/components/stakeToken/StakeAmount";
// import AmountApproval from "@/components/stakeToken/AmountApproval";
import Withdraw from "@/components/withdraw/Withdraw";
import { useWeb3Context } from "@/context/Web3Context";

const StakeMain = () => {
  const { stakeXTokenBalance, stakeXSymbol } = useWeb3Context();

  return (
    <div className="flex flex-col justify-center  bg-card p-2 border-[1px] border-[#3b3b3b] rounded-3xl mx-auto  w-full max-w-[462px] gap-3 items-center">
      <Tabs defaultValue="stake" className="max-w-[520px] mx-auto w-full ">
        <TabsList className="mx-auto border-b-[2px] mb-4 rounded-none border-[#3b3b3b] pb-1 ">
          {tabsConfig.map((tab, index) => (
            <TabsTrigger key={index} value={tab.label.toLowerCase()}>
              {tab.label}
            </TabsTrigger>
          ))}
          <div className="bg-white w-full h-2" />
        </TabsList>

        {tabsConfig.map((tab, index) => (
          <TabsContent
            className=" mx-auto p-3 rounded-lg   max-w-[520px]"
            key={index}
            value={tab.label.toLowerCase()}
          >
            {tab.id == "stake" && (
              <div className="flex flex-col w-full gap-3">
                {/* <AmountApproval /> */}
                <StakeAmount
                  stakeXSymbol={stakeXSymbol}
                  stakeXTokenBalance={stakeXTokenBalance}
                />
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

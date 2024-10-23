"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"; // Ensure you have the correct import path for Tabs
import { DisplayPannel } from "@/components/displayPannel/DisplayPannel";
import { tabsConfig } from "@/constants";
import StakeAmount from "@/components/stakeToken/StakeAmount";
import AmountApproval from "@/components/stakeToken/AmountApproval";
import Withdraw from "@/components/withdraw/Withdraw";
// Import your tabs config

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col gap-5 items-center justify-center mx-auto">
      {/* Optional Display Panel */}
      <DisplayPannel />

      {/* Tabs for Stake and Withdraw */}
      <Tabs defaultValue="stake" className="max-w-[520px] w-full ">
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
}

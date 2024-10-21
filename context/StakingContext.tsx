import React, { createContext, useContext, useState } from "react";

interface StakingContext {
  setIsReload: React.Dispatch<React.SetStateAction<boolean>>;
  isReload: boolean;
}

const defaultWeb3State: StakingContext = {
  setIsReload: () => {},
  isReload: false,
};

const StakingContext = createContext<StakingContext>(defaultWeb3State);

export const useStakingContext = () => useContext(StakingContext);

export const StakingContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isReload, setIsReload] = useState(false);

  // Initialize Web3 on component mount

  // Return the Web3Context.Provider with proper value types from Web3State interface
  return (
    <StakingContext.Provider value={{ setIsReload, isReload }}>
      {children}
    </StakingContext.Provider>
  );
};

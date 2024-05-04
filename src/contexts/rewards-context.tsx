import { Reward } from "@/model/types/reward.type";
import { createContext, PropsWithChildren, useState } from "react";

export type RewardsContextType = {
  rewards: Array<Reward>;
}

export const RewardsContext = createContext<RewardsContextType>({rewards: []});

export function RewardsContextProvider({children}:PropsWithChildren) {
  const [rewardsArray,setRewardsArray] = useState<Array<Reward>>([]);

  return <RewardsContext.Provider value={{rewards: rewardsArray}}>{children}</RewardsContext.Provider>
}
'use client';
import { useContextSafely } from '@/hooks/functions/use-context-safely';
import { Reward } from '@/model/types/reward.type';
import { PropsWithChildren } from 'react';
import { createNamedContext } from '../hooks/functions/create-named-context';
import { ServicesContext } from './services-context';

export type RewardsContextType = {
  rewards: Array<Reward>;
};

export const RewardsContext =
  createNamedContext<RewardsContextType>('RewardsContext');

export function RewardsContextProvider({ children }: PropsWithChildren) {
  const { rewardsService } = useContextSafely(
    ServicesContext,
    'RewardsContextProvider',
  );

  return (
    <RewardsContext.Provider value={{ rewards: rewardsService.rewards }}>
      {children}
    </RewardsContext.Provider>
  );
}

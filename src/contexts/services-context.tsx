'use client';
import { createNamedContext } from '@/hooks/functions/create-named-context';
import type { AbstractRewardsService } from '@/services/classes/abstract/abstract-rewards-service';
import type { AbstractUserService } from '@/services/classes/abstract/abstract-user-service';
import { servicesContainer } from '@/services/services-container';
import { TYPES } from '@/services/types';
import type { PropsWithChildren } from 'react';

interface ServicesContextType {
  userService: AbstractUserService;
  rewardsService: AbstractRewardsService;
}

export const ServicesContext =
  createNamedContext<ServicesContextType>('ServicesContext');

export function ServicesContextProvider({ children }: PropsWithChildren) {
  const userService = servicesContainer.get<AbstractUserService>(
    TYPES.UserService,
  );
  const rewardsService = servicesContainer.get<AbstractRewardsService>(
    TYPES.RewardsService,
  );

  return (
    <ServicesContext.Provider value={{ userService, rewardsService }}>
      {children}
    </ServicesContext.Provider>
  );
}

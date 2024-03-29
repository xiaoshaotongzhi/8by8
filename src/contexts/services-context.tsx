'use client';
import { servicesContainer } from '@/services/services-container';
import { createNamedContext } from '@/hooks/functions/create-named-context';
import { TYPES } from '@/services/types';
import type { AbstractUserService } from '@/services/classes/abstract/abstract-user-service';
import type { PropsWithChildren } from 'react';

interface ServicesContextType {
  userService: AbstractUserService;
}

export const ServicesContext =
  createNamedContext<ServicesContextType>('ServicesContext');

export function ServicesContextProvider({ children }: PropsWithChildren) {
  const userService = servicesContainer.get<AbstractUserService>(
    TYPES.UserService,
  );

  return (
    <ServicesContext.Provider value={{ userService }}>
      {children}
    </ServicesContext.Provider>
  );
}

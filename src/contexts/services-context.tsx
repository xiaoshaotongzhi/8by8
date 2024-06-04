'use client';
import { clientServicesContainer } from '@/services/client/client-services-container';
import { CLIENT_SERVICE_KEYS } from '@/services/client/client-service-keys';
import { createNamedContext } from '@/hooks/functions/create-named-context';
import type { AbstractUserService } from '@/services/client/abstract-user-service';
import type { PropsWithChildren } from 'react';

interface ServicesContextType {
  userService: AbstractUserService;
}

export const ServicesContext =
  createNamedContext<ServicesContextType>('ServicesContext');

export function ServicesContextProvider({ children }: PropsWithChildren) {
  const userService = clientServicesContainer.get<AbstractUserService>(
    CLIENT_SERVICE_KEYS.UserService,
  );

  return (
    <ServicesContext.Provider value={{ userService }}>
      {children}
    </ServicesContext.Provider>
  );
}

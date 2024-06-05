import {
  ServicesContext,
  ServicesContextProvider,
} from '@/contexts/services-context';
import { AbstractRewardsService } from '@/services/classes/abstract/abstract-rewards-service';
import { AbstractUserService } from '@/services/classes/abstract/abstract-user-service';
import { getProvidedContextValue } from '@/testing-utils/get-provided-context-value';

describe('ServicesContext', () => {
  it('provides an instance of AbstractUserService to its consumers.', () => {
    const servicesContextValue = getProvidedContextValue(
      ServicesContext,
      ServicesContextProvider,
    );
    expect(servicesContextValue).not.toBeNull();
    expect(servicesContextValue?.userService).toBeInstanceOf(
      AbstractUserService,
    );
  });

  it('provides an instance of AbstractRewardsService to its consumers.', () => {
    const servicesContextValue = getProvidedContextValue(
      ServicesContext,
      ServicesContextProvider,
    );
    expect(servicesContextValue).not.toBeNull();
    expect(servicesContextValue?.rewardsService).toBeInstanceOf(
      AbstractRewardsService,
    );
  });
});

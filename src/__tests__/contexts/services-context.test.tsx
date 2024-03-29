import {
  ServicesContext,
  ServicesContextProvider,
} from '@/contexts/services-context';
import { getProvidedContextValue } from '@/testing-utils/get-provided-context-value';
import { AbstractUserService } from '@/services/classes/abstract/abstract-user-service';

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
});

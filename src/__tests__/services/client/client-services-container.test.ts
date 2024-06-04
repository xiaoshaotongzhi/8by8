import { clientServicesContainer } from '@/services/client/client-services-container';
import { CLIENT_SERVICE_KEYS } from '@/services/client/client-service-keys';
import { AbstractUserService } from '@/services/client/abstract-user-service';

describe('servicesContainer', () => {
  it('Provides a subclass of the AbstractUserService service class.', () => {
    const userService = clientServicesContainer.get<AbstractUserService>(
      CLIENT_SERVICE_KEYS.UserService,
    );
    expect(userService).toBeInstanceOf(AbstractUserService);
  });
});

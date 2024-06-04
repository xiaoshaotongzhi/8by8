import { servicesContainer } from '@/services/services-container';
import { TYPES } from '@/services/types';
import { AbstractUserService } from '@/services/classes/abstract/abstract-user-service';
import 'fake-indexeddb/auto';
describe('servicesContainer', () => {
  it('Provides a subclass of the AbstractUserService service class.', () => {
    const userService = servicesContainer.get<AbstractUserService>(
      TYPES.UserService,
    );
    expect(userService).toBeInstanceOf(AbstractUserService);
  });
});

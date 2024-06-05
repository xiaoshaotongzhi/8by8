import { AbstractRewardsService } from '@/services/classes/abstract/abstract-rewards-service';
import { AbstractUserService } from '@/services/classes/abstract/abstract-user-service';
import { servicesContainer } from '@/services/services-container';
import { TYPES } from '@/services/types';

describe('servicesContainer', () => {
  it('Provides a subclass of the AbstractUserService service class.', () => {
    const userService = servicesContainer.get<AbstractUserService>(
      TYPES.UserService,
    );
    expect(userService).toBeInstanceOf(AbstractUserService);
  });

  it('Provides a subclass of the AbstractRewardsService service class.', () => {
    const rewardsService = servicesContainer.get<AbstractRewardsService>(
      TYPES.RewardsService,
    );
    expect(rewardsService).toBeInstanceOf(AbstractRewardsService);
  });
});

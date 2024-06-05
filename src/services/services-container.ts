import { Container } from 'inversify';
import 'reflect-metadata';

import { AbstractRewardsService } from '@/services/classes/abstract/abstract-rewards-service';
import { AbstractUserService } from './classes/abstract/abstract-user-service';
import { LocalRewardsService } from './classes/concrete/local-rewards-service';
import { LocalUserService } from './classes/concrete/local-user-service';
import { TYPES } from './types';

const servicesContainer = new Container();

servicesContainer
  .bind<AbstractUserService>(TYPES.UserService)
  .to(LocalUserService)
  .inSingletonScope();

servicesContainer
  .bind<AbstractRewardsService>(TYPES.RewardsService)
  .to(LocalRewardsService)
  .inSingletonScope();

export { servicesContainer };

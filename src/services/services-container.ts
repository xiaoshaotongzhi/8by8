import 'reflect-metadata';
import { Container } from 'inversify';
import { TYPES } from './types';
import { AbstractUserService } from './classes/abstract/abstract-user-service';
import { LocalUserService } from './classes/concrete/local-user-service';

const servicesContainer = new Container();

servicesContainer
  .bind<AbstractUserService>(TYPES.UserService)
  .to(LocalUserService)
  .inSingletonScope();

export { servicesContainer };

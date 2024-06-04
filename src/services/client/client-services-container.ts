import 'reflect-metadata';
import { Container } from 'inversify';
import { CLIENT_SERVICE_KEYS } from './client-service-keys';
import { AbstractUserService } from './abstract-user-service';
import { LocalUserService } from './local-user-service';

/**
 * An inversion of control container that provides instances of service
 * classes to client-side code.
 */
const clientServicesContainer = new Container();

clientServicesContainer
  .bind<AbstractUserService>(CLIENT_SERVICE_KEYS.UserService)
  .to(LocalUserService)
  .inSingletonScope();

export { clientServicesContainer };

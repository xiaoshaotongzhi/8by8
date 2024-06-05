import 'server-only';
import { Container } from 'inversify';
import { SERVER_SERVICE_KEYS } from './server-service-keys';

const serverContainer = new Container();

/*
  TODO: Bind services to container.
*/

export { serverContainer };

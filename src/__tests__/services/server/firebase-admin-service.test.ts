import { serverContainer } from '@/services/server/server-container';
import { SERVER_SERVICE_KEYS } from '@/services/server/server-service-keys';

describe('FirebaseAdminService', () => {
  it('can be instantiated without error.', () => {
    const firebaseService = serverContainer.get(
      SERVER_SERVICE_KEYS.FirebaseAdminService,
    );
  });
});

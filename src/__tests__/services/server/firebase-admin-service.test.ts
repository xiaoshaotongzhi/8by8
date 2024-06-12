import { FirebaseAdminService } from '@/services/server/firebase-admin-service';
import { CreateRequest } from 'firebase-admin/auth';

describe('FirebaseAdminService', () => {
  it('can be instantiated.', () => {
    const firebaseAdminService = new FirebaseAdminService();
    expect(firebaseAdminService).toBeInstanceOf(FirebaseAdminService);
  });

  it('returns an instance of Auth that can be used to create and retrieve users.', async () => {
    const firebaseAdminService = new FirebaseAdminService();
    const user: CreateRequest = {
      email: 'user@example.com',
      emailVerified: true,
      password: 'password123',
      phoneNumber: '555-555-5555',
    };

    const { uid } = await firebaseAdminService.auth.createUser(user);

    const retrievedUser = await firebaseAdminService.auth.getUser(uid);

    expect(retrievedUser).toStrictEqual({ uid, ...user });
  });

  // it('returns an instance of Firestore that can be used to create, retrieve and update docs.', async () => {
  //   const firebaseAdminService = new FirebaseAdminService();
  //   const user = await firebaseAdminService.auth.createUser({
  //     email: 'user@example.com',
  //   });
  // });
});

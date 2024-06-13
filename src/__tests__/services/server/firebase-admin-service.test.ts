import { UserType } from '@/model/enums/user-type';
import { User } from '@/model/types/user';
import { FirebaseAdminService } from '@/services/server/firebase-admin-service';
import { CreateRequest } from 'firebase-admin/auth';
import { DateTime } from 'luxon';

describe('FirebaseAdminService', () => {
  let firebaseAdminService: FirebaseAdminService;

  beforeEach(() => {
    firebaseAdminService = new FirebaseAdminService();
  });

  it('can be instantiated.', () => {
    expect(firebaseAdminService).toBeInstanceOf(FirebaseAdminService);
  });

  it(`provides an instance of Auth that can be used to create and retrieve 
  users.`, async () => {
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

  it(`provides an instance of Auth that throws an error when an attempt is made 
  to create a user with an email address that already exists in the 
  database.`, async () => {
    const email = 'user@example.com';
    await firebaseAdminService.auth.createUser({ email });

    expect(
      async () => await firebaseAdminService.auth.createUser({ email }),
    ).rejects.toThrow();
  });

  it(`provides an instance of Firestore that can be used to create, retrieve and 
  update docs.`, async () => {
    const { uid, email } = await firebaseAdminService.auth.createUser({
      email: 'user@example.com',
    });

    expect(email).toBe('user@example.com');

    const user: User = {
      uid,
      email: email!,
      name: 'user',
      avatar: '0',
      type: UserType.Challenger,
      completedActions: {
        electionReminders: false,
        registerToVote: false,
        sharedChallenge: false,
      },
      badges: [],
      challengeEndTimestamp: DateTime.now().plus({ days: 8 }).toUnixInteger(),
      completedChallenge: false,
      redeemedAward: false,
      contributedTo: [],
      inviteCode: '',
    };

    await firebaseAdminService.firestore.collection('users').doc(uid).set(user);

    const userDoc = await firebaseAdminService.firestore
      .collection('users')
      .doc(uid)
      .get();

    expect(userDoc.exists).toBe(true);
    expect(userDoc.data()).toStrictEqual(user);
  });
});

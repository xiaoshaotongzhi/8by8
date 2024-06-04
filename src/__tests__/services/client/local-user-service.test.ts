import 'reflect-metadata';
import { UserType } from '@/model/enums/user-type';
import { LocalUserService } from '@/services/client/local-user-service';
import { Subscription } from 'rxjs';
describe('LocalUserService', () => {
  let userService: LocalUserService;

  beforeEach(() => {
    userService = new LocalUserService();
  });

  test('It successfully signs up a new user with valid data', async () => {
    await expect(
      userService.signUpWithEmail(
        'user@example.com',
        'user',
        '0',
        UserType.Challenger,
      ),
    ).resolves.toBeUndefined();

    // Additional assertions can be made to check if the user is correctly set, etc.
  });

  test('It successfully signs in an existing user with valid email', async () => {
    // Assuming a user with email 'user@example.com' exists in the database
    await expect(
      userService.signInWithEmail('user@example.com'),
    ).resolves.toBeUndefined();

    // Additional assertions can be made to check if the user is correctly set, etc.
  });

  test('It throws an error when signing in with an invalid email', async () => {
    await expect(
      userService.signInWithEmail('nonexistent@example.com'),
    ).rejects.toThrow('User not found');
  });

  test('It successfully signs out a signed-in user', async () => {
    // Assuming a user is signed in before signing out
    await userService.signInWithEmail('user@example.com');

    userService.signOut();

    expect(userService.user).toBeNull();
  });

  test('It throws an error when signing out without a signed-in user', () => {
    expect(() => userService.signOut()).not.toThrow(); // No error expected when signing out without a signed-in user
  });

  test('When its subscribe() method is called, an RxJS Subscription is returned.', () => {
    const subscription = userService.subscribe(() => {});
    expect(subscription).toBeInstanceOf(Subscription);
  });
  //original version I store it.
  test('When its subscribe() method is called, an RxJS Subscription is returned.', () => {
    const userService = new LocalUserService();
    const subscription = userService.subscribe(() => {});
    expect(subscription).toBeInstanceOf(Subscription);
  });
});

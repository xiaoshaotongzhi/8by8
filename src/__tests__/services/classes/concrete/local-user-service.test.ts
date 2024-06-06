import 'reflect-metadata';
import { UserType } from '@/model/enums/user-type';
import { LocalUserService } from '@/services/classes/concrete/local-user-service';
import { Subscription } from 'rxjs';
import { IDBFactory } from 'fake-indexeddb';
describe('LocalUserService', () => {
  let userService: LocalUserService;

  beforeEach(() => {
    userService = new LocalUserService();
  });



  test('It successfully signs up a new user with valid data', async () => {
    await expect(userService.signUpWithEmail(
      'user@example.com',
      'user',
      1,
      UserType.Challenger,
    )).resolves.toBeUndefined();

    // Additional assertions can be made to check if the user is correctly set, etc.
  });
  //specific case, take information side effects 
  test('It successfully signs in an existing user with valid email', async () => {
    // add a user in indexDB, it will work. Create a global Database?
    // no influence in each case
    // Assuming a user with email 'user@example.com' exists in the database
    await expect(userService.signInWithEmail('user@example.com')).resolves.toBeUndefined();
    //commmnet should be readable my comments is very bad and complex. 
    //comment
    // Additional assertions can be made to check if the user is correctly set, etc.
  });

  test('It throws an error when signing in with an invalid email', async () => {
    await expect(userService.signInWithEmail('nonexistent@example.com')).rejects.toThrow('User not found');
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
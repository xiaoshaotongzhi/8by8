import 'reflect-metadata';
import { UserType } from '@/model/enums/user-type';
import { LocalUserService } from '@/services/classes/concrete/local-user-service';
import { Subscription } from 'rxjs';

describe('LocalUserService', () => {
  //TODO : Remove this file from  replace these tests as each method in LocalUserService is implemented.
  test('It throws an error when the unimplemented signUpWithEmail() method is called.', () => {
    const userService = new LocalUserService();
    expect(() =>
      userService.signUpWithEmail(
        'user@example.com',
        'user',
        '1',
        UserType.Challenger,
      ),
    ).toThrow();
  });

  test('It throws an error when the unimplemented signInWithEmail() method is called.', () => {
    const userService = new LocalUserService();
    expect(() => userService.signInWithEmail('user@example.com')).toThrow();
  });

  test('It throws an error when the unimplemented signOut() method is called.', () => {
    const userService = new LocalUserService();
    expect(() => userService.signOut()).toThrow();
  });

  test('When its subscribe() method is called, an RxJS Subscription is returned.', () => {
    const userService = new LocalUserService();
    const subscription = userService.subscribe(() => {});
    expect(subscription).toBeInstanceOf(Subscription);
  });
});

import { injectable } from 'inversify';
import { Subject, type Observer, type Subscription } from 'rxjs';
import { AbstractUserService } from '../abstract/abstract-user-service';
import type { UserType } from '@/model/enums/user-type';
import type { Avatar } from '@/model/types/avatar.type';
import type { User } from '@/model/types/user';

/**
 * A mock user service for local development.
 */
@injectable()
export class LocalUserService extends AbstractUserService {
  private _user: User | null = null;
  private userSubject: Subject<User | null> = new Subject<User | null>();

  public get user(): User | null {
    return this._user;
  }

  /**
   * Updates the user and emits the updated value to subscribers.
   */
  private set user(user: User | null) {
    this._user = user;
    this.userSubject.next(this.user);
  }

  /*
    TODO : Implement the signUpWithEmail, signInWithEmail, and signOut methods
    so that the app may be developed locally. For persisting data, you could use 
    IndexedDB, for example.
  */
  signUpWithEmail(
    email: string,
    name: string,
    avatar: Avatar,
    type: UserType,
  ): Promise<void> {
    throw new Error('Method not implemented.');
  }
  signInWithEmail(email: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  signOut(): void {
    throw new Error('Method not implemented.');
  }
  /**
   * Allows a subscriber to listen for updates to this service's user property.
   *
   * @param observerOrNext - An object containing callback functions to be
   * executed when the userSubject emits a new value, or a single callback
   * function to be called when a new value is emitted. For more information,
   * see {@link https://rxjs.dev/guide/observer}.
   *
   * @returns An RxJS Subscription. For more information, see
   * {@link https://rxjs.dev/guide/subscription}.
   */
  subscribe(
    observerOrNext:
      | Partial<Observer<User | null>>
      | ((user: User | null) => void),
  ): Subscription {
    return this.userSubject.subscribe(observerOrNext);
  }
}

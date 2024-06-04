import { injectable } from 'inversify';
import type { User } from '@/model/types/user';
import type { Avatar } from '@/model/types/avatar';
import type { UserType } from '@/model/enums/user-type';
import type { Observer, Subscription } from 'rxjs';

/**
 * A client-side service class that provides methods for signing up, signing in,
 * signing out, and other actions directly related to the user. Maintains the
 * currently active user in its `user` property and emits events to subscribers
 * when the user changes.
 */
@injectable()
export abstract class AbstractUserService {
  public abstract user: User | null;
  public abstract signUpWithEmail(
    email: string,
    name: string,
    avatar: Avatar,
    type: UserType,
  ): Promise<void>;
  public abstract signInWithEmail(email: string): Promise<void>;
  public abstract signOut(): void;
  public abstract subscribe(
    observerOrNext:
      | Partial<Observer<User | null>>
      | ((user: User | null) => void),
  ): Subscription;
  public abstract restartChallenge(): void;
}

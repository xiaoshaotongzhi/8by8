import { injectable } from 'inversify';
import type { User } from '@/model/types/user';
import type { Avatar } from '@/model/types/avatar.type';
import type { UserType } from '@/model/enums/user-type';
import type { Observer, Subscription } from 'rxjs';

/*
  By using abstract classes to define the shape of our service classes, we will
  be able to test that providers of service classes provide instances of
  specific services, which would be difficult to test if we used interfaces
  for this purpose.
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
}

import 'server-only';
import { injectable } from 'inversify';
import type { UserType } from '@/model/enums/user-type';
import type { Avatar } from '@/model/types/avatar';

/**
 * A service class that handles persistence of user data.
 */
@injectable()
export abstract class AbstractUserRepository {
  public abstract createUserWithEmail(
    email: string,
    name: string,
    avatar: Avatar,
    type: UserType,
  ): Promise<void>;
}

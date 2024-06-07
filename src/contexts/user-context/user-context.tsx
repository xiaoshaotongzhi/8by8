'use client';
import { createNamedContext } from '../../hooks/functions/create-named-context';
import type { User } from '../../model/types/user';
import type { Avatar } from '@/model/types/avatar';
import type { UserType } from '@/model/enums/user-type';

interface UserContextType {
  user: User | null;
  signUpWithEmail(
    email: string,
    name: string,
    avatar: Avatar,
    type: UserType,
  ): Promise<void>;
  signInWithEmail(email: string): Promise<void>;
  signOut(): void;
  restartChallenge(): void;
}

const UserContext = createNamedContext<UserContextType>('UserContext');

export { UserContext, type UserContextType };

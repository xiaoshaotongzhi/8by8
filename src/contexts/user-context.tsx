'use client';
import { useState, useLayoutEffect, type PropsWithChildren } from 'react';
import { createNamedContext } from '../hooks/functions/create-named-context';
import { useContextSafely } from '@/hooks/functions/use-context-safely';
import { ServicesContext } from './services-context';
import type { User } from '../model/types/user';
import type { Avatar } from '@/model/types/avatar.type';
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
}

const UserContext = createNamedContext<UserContextType>('UserContext');

function UserContextProvider({ children }: PropsWithChildren) {
  const { userService } = useContextSafely(
    ServicesContext,
    'UserContextProvider',
  );
  const [user, setUser] = useState<User | null>(userService.user);

  useLayoutEffect(() => {
    const subscription = userService.subscribe((user: User | null) =>
      setUser(user),
    );
    return subscription.unsubscribe;
  });

  return (
    <UserContext.Provider
      value={{
        signUpWithEmail: userService.signUpWithEmail,
        signInWithEmail: userService.signInWithEmail,
        signOut: userService.signOut,
        user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserContextProvider, type UserContextType };

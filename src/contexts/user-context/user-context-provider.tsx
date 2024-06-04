'use client';
import { useState, useEffect, type PropsWithChildren } from 'react';
import { useContextSafely } from '@/hooks/functions/use-context-safely';
import { UserContext } from './user-context';
import { ServicesContext } from '../services-context';
import type { User } from '@/model/types/user';

export function UserContextProvider({ children }: PropsWithChildren) {
  const { userService } = useContextSafely(
    ServicesContext,
    'UserContextProvider',
  );
  const [user, setUser] = useState<User | null>(userService.user);

  useEffect(() => {
    const subscription = userService.subscribe((user: User | null) =>
      setUser(user),
    );
    return () => subscription.unsubscribe();
  });

  return (
    <UserContext.Provider
      value={{
        signUpWithEmail: userService.signUpWithEmail,
        signInWithEmail: userService.signInWithEmail,
        signOut: userService.signOut,
        restartChallenge: userService.restartChallenge,
        user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

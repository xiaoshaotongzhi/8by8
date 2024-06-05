'use client';
import { useState, type PropsWithChildren } from 'react';
import { DateTime } from 'luxon';
import { UserContext } from './user-context';
import { connectToIndexedDB } from '@/utils/connect-to-indexed-db';
import type { User } from '@/model/types/user';
import type { Avatar } from '@/model/types/avatar';
import type { UserType } from '@/model/enums/user-type';

/**
 * An implementation of UserContext.Provider that uses IndexedDB for data
 * persistence. Intended for local development only.
 */
export function LocalUserContextProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const dbName = '8by8';
  const storeName = 'users';

  const signUpWithEmail = async (
    email: string,
    name: string,
    avatar: Avatar,
    type: UserType,
  ): Promise<void> => {
    const db = await connectToIndexedDB(dbName, 1, storeName, 'email');

    const userCount = await db.count(email);
    if (userCount > 0)
      throw new Error(`User with email ${email} already exists.`);

    const newUser: User = {
      email,
      name,
      avatar,
      type,
      uid: 'unique-id-here',
      completedActions: {
        electionReminders: false,
        registerToVote: false,
        sharedChallenge: false,
      },
      badges: [],
      challengeEndDate: DateTime.now().plus({ days: 8 }).toFormat('MM-dd-yyyy'),
      completedChallenge: false,
      redeemedAward: false,
      contributedTo: [],
      shareCode: 'default-share-code',
    };

    await db.add(newUser);

    setUser(newUser);
  };

  const signInWithEmail = async (email: string): Promise<void> => {
    const db = await connectToIndexedDB(dbName, 1, storeName, 'email');
    const userDoc = await db.get(email);
    if (!userDoc) throw new Error(`User with email ${email} does not exist.`);

    setUser(userDoc as User);
  };

  const signOut = (): void => {
    setUser(null);
  };

  const restartChallenge = (): void => {
    throw new Error('Method not implemented.');
  };

  return (
    <UserContext.Provider
      value={{
        user,
        signUpWithEmail,
        signInWithEmail,
        signOut,
        restartChallenge,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

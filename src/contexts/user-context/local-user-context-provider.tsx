'use client';
import { useState, type PropsWithChildren } from 'react';
import { DateTime } from 'luxon';
import { UserContext } from './user-context';
import { IDBConnection } from '@/utils/idb-connection';
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

  /**
   * Creates a connection to IndexedDB and attempts to save a new user. Throws
   * an error if a user with the provided email already exists in the database.
   *
   * @param email - The user's email address.
   * @param name - The user's display name.
   * @param avatar - The index of the Avatar that the user has selected.
   * @param type - The user's type: `"challenger" | "player" | "hybrid"`
   */
  const signUpWithEmail = async (
    email: string,
    name: string,
    avatar: Avatar,
    type: UserType,
  ): Promise<void> => {
    const db = await IDBConnection.createConnection(
      dbName,
      1,
      storeName,
      'email',
    );

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

    await db.create(newUser);
    setUser(newUser);
    db.close();
  };

  /**
   * Creates a connection to IndexedDB and attempts to retrieve a user with the
   * provided email address. Throws an error if the user was not found.
   *
   * @param email - The user's email address.
   */
  const signInWithEmail = async (email: string): Promise<void> => {
    const db = await IDBConnection.createConnection(
      dbName,
      1,
      storeName,
      'email',
    );
    const userDoc = await db.read(email);
    if (!userDoc) throw new Error(`User with email ${email} does not exist.`);

    setUser(userDoc as User);
    db.close();
  };

  /**
   * Signs the user out by setting user to null.
   */
  const signOut = (): void => {
    setUser(null);
  };

  /*
    TODO - Implement this as an asynchronous method that updates the user's 
    data in IndexedDB with a new end date, and then calls setUser() with the 
    updated data, provided user has not become null.
  */
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

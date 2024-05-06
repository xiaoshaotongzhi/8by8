

import { injectable } from 'inversify';
import { Subject, type Observer, type Subscription } from 'rxjs';
import { AbstractUserService } from '../abstract/abstract-user-service';
import type { UserType } from '@/model/enums/user-type';
import type { Avatar } from '@/model/types/avatar.type';
import type { User } from '@/model/types/user';

//this import should be commented.
/**
 * A mock user service for local development that uses IndexedDB for data persistence.
 */
@injectable()
export class LocalUserService extends AbstractUserService {
  private _user: User | null = null;
  private userSubject: Subject<User | null> = new Subject<User | null>();
  private db: IDBDatabase | null = null;
  private readonly dbName: string = 'UserServiceDB';
  private readonly storeName: string = 'users';
  private dbReady: Promise<void>;

  constructor() {
    super();
    this.dbReady = this.initializeDB(); // Directly assign the promise
  }

  private async initializeDB(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);
      request.onerror = () => reject(new Error("Failed to open database"));
      request.onupgradeneeded = (event: any) => {
        const db = request.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName, { keyPath: 'email' });
        }
      };
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };
    });
  }

  public get user(): User | null {
    return this._user;
  }

  private set user(user: User | null) {
    this._user = user;
    this.userSubject.next(this.user);
  }

  async signUpWithEmail(email: string, name: string, avatar: Avatar, type: UserType): Promise<void> {
    await this.dbReady;
    return new Promise<void>((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database is not initialized'));
        return;
      }
      const transaction = this.db.transaction(this.storeName, 'readwrite');
      const store = transaction.objectStore(this.storeName);

      const newUser: User = {
        email,
        name,
        avatar,
        type,
        uid: 'unique-id-here',
        completedActions: {
          electionReminders: false,
          registerToVote: false,
          sharedChallenge: false
        },
        badges: [],
        challengeEndDate: new Date().toISOString(),
        completedChallenge: false,
        redeemedAward: false,
        contributedTo: [],
        shareCode: 'default-share-code'
      };

      const request = store.add(newUser);

      request.onsuccess = () => {
        this.user = newUser;
        resolve();
      };
      request.onerror = () => reject(new Error('Failed to sign up'));
    });
  }

  async signInWithEmail(email: string): Promise<void> {
    await this.dbReady;
    return new Promise<void>((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database is not initialized'));
        return;
      }
      const transaction = this.db.transaction(this.storeName, 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.get(email);

      request.onsuccess = () => {
        if (request.result) {
          this.user = request.result;
          resolve();
        } else {
          reject(new Error('User not found'));
        }
      };
      request.onerror = () => reject(new Error('Failed to sign in'));
    });
  }

  signOut(): void {
    this.user = null;
  }

  subscribe(
    observerOrNext:
      | Partial<Observer<User | null>>
      | ((user: User | null) => void),
  ): Subscription {
    return this.userSubject.subscribe(observerOrNext);
  }
}

import { injectable } from 'inversify';
import { Subject, type Observer, type Subscription } from 'rxjs';
import { AbstractUserService } from '../abstract/abstract-user-service';
import type { UserType } from '@/model/enums/user-type';
import type { Avatar } from '@/model/types/avatar';
import type { User } from '@/model/types/user';

/**
 * A mock user service for local development that uses IndexedDB for data persistence.
 */
@injectable()
export class LocalUserService extends AbstractUserService {
  private _user: User | null = null;
  private userSubject: Subject<User | null> = new Subject();
  private readonly dbName: string = 'UserServiceDB';
  private readonly storeName: string = 'users';

  constructor() {
    super();
  }

  private initializeDB = async (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);
      request.onerror = () => reject(new Error('Failed to open database'));
      request.onupgradeneeded = (event: any) => {
        const db = request.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName, { keyPath: 'email' });
        }
      };
      request.onsuccess = () => {
        resolve(request.result);
      };
    });
  };

  public get user(): User | null {
    return this._user;
  }

  private set user(user: User | null) {
    this._user = user;
    this.userSubject.next(this.user);
  }

  signUpWithEmail = async (
    email: string,
    name: string,
    avatar: Avatar,
    type: UserType,
  ): Promise<void> => {
    const db = await this.initializeDB();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, 'readwrite');
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
          sharedChallenge: false,
        },
        badges: [],
        challengeEndDate: new Date().toISOString(),
        completedChallenge: false,
        redeemedAward: false,
        contributedTo: [],
        shareCode: 'default-share-code',
      };

      const request = store.add(newUser);

      request.onsuccess = () => {
        this.user = newUser;
        db.close();
        resolve();
      };
      request.onerror = () => {
        db.close();
        reject(new Error('Failed to sign up'));
      };
    });
  };

  signInWithEmail = async (email: string): Promise<void> => {
    const db = await this.initializeDB();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.get(email);

      request.onsuccess = () => {
        if (request.result) {
          this.user = request.result;
          db.close();
          resolve();
        } else {
          db.close();
          reject(new Error('User not found'));
        }
      };
      request.onerror = () => {
        db.close();
        reject(new Error('Failed to sign in'));
      };
    });
  };

  signOut = (): void => {
    this.user = null;
  };

  subscribe(
    observerOrNext:
      | Partial<Observer<User | null>>
      | ((user: User | null) => void),
  ): Subscription {
    return this.userSubject.subscribe(observerOrNext);
  }

  public restartChallenge(): void {
    throw new Error('Method not implemented.');
  }
}

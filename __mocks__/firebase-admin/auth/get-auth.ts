interface UserRecord {
  uid: string;
  email?: string;
  emailVerified?: boolean;
  phoneNumber?: string;
  password?: string;
  displayName?: string;
  photoURL?: string;
  disabled?: boolean;
}

const users: UserRecord[] = [];

/**
 * A mock implementation of getAuth() that returns an object with methods
 * for creating and retrieving users.
 */
export const getAuth = jest.fn().mockImplementation(() => ({
  createUser: jest
    .fn()
    .mockImplementation((properties: Omit<UserRecord, 'uid'>) => {
      return new Promise((resolve, reject) => {
        if (users.find(user => user.email === properties.email)) {
          reject(
            new Error(`User with email ${properties.email} already exists.`),
          );
        }

        users.push({
          uid: `${users.length}`,
          ...properties,
        });

        resolve(users.at(-1));
      });
    }),
  getUser: jest.fn().mockImplementation((uid: string) => {
    return new Promise<UserRecord>((resolve, reject) => {
      const user = users.find(user => user.uid === uid);

      if (!user) {
        reject(new Error(`User with uid ${uid} does not exist.`));
      } else {
        resolve(user);
      }
    });
  }),
  getUserByEmail: jest.fn().mockImplementation((email: string) => {
    return new Promise<UserRecord>((resolve, reject) => {
      const user = users.find(user => user.email === email);

      if (!user) {
        reject(new Error(`User with eamil ${email} does not exist.`));
      } else {
        resolve(user);
      }
    });
  }),
}));

import { IDBFactory } from 'fake-indexeddb';
import { IDBConnection } from '@/utils/idb-connection';

describe('IDBConnection', () => {
  afterEach(() => {
    indexedDB = new IDBFactory();
  });

  it('returns an instance of IDBConnection when createConnection() is called.', async () => {
    const db = await IDBConnection.createConnection(
      'testDb',
      1,
      'testStore',
      'id',
    );

    expect(db).toBeInstanceOf(IDBConnection);
  });

  it('throws an error when createConnection() fails to connect.', async () => {
    const idbRequest = {} as IDBOpenDBRequest;

    jest.spyOn(indexedDB, 'open').mockImplementationOnce(() => idbRequest);

    const error = await new Promise(resolve => {
      IDBConnection.createConnection('testDb', 1, 'testStore', 'id').catch(
        e => {
          resolve(e);
        },
      );
      idbRequest.onerror!({} as Event);
    });

    expect(error).toBeInstanceOf(Error);
    expect((error as Error).message).toBe('Failed to open database.');
  });

  it('throws an error when create() fails to create a record in the db.', async () => {
    const db = await IDBConnection.createConnection(
      'UserDB',
      1,
      'users',
      'email',
    );

    await db.create({ name: 'user', email: 'user@example.com' });

    let error: Error | null = null;

    try {
      await db.create({ name: 'duplicate email', email: 'user@example.com' });
    } catch (e) {
      error = e as Error;
    }

    expect(error).toBeInstanceOf(Error);
  });

  it('throws an error when update() fails to update a record in the db.', async () => {
    const db = await IDBConnection.createConnection(
      'UserDB',
      1,
      'users',
      'email',
    );

    let error: Error | null = null;

    try {
      // try to update a record without including the required key path
      await db.update({});
    } catch (e) {
      error = e as Error;
    }

    expect(error).toBeInstanceOf(Error);
  });
});

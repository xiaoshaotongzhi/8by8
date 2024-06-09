/**
 * Opens a connection to an IndexedDB database, and returns an object whose
 * methods perform create, read, and update operations on an object store within
 * the database.
 */
export class IDBConnection {
  public readonly db: IDBDatabase;
  public readonly storeName: string;

  private constructor(db: IDBDatabase, storeName: string) {
    this.db = db;
    this.storeName = storeName;
  }

  /**
   * Accepts a database name, version number, store name and key path and
   * returns an instance of IDBConnection whose `db` property is the database
   * that was connected to, and whose `storeName` is the store name that was
   * provided to this method.
   */
  public static async createConnection(
    dbName: string,
    version: number,
    storeName: string,
    keyPath: string,
  ): Promise<IDBConnection> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(dbName, version);
      request.onerror = () => reject(new Error('Failed to open database.'));
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, { keyPath });
        }
      };
      request.onsuccess = () => {
        resolve(new IDBConnection(request.result, storeName));
      };
    });
  }

  /**
   * Creates a new record in the database.
   */
  public create(data: object): Promise<void> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.add(data);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  /**
   * Reads a record from the database. If a record with the provided key does
   * not exist, the returned Promise will resolve with undefined.
   */
  public read(key: string) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName]);
      const store = transaction.objectStore(this.storeName);
      const request = store.get(key);

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  /**
   * Updates an existing record in the database, or creates one if it does not
   * already exist.
   */
  public update(data: object): Promise<void> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.put(data);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  /**
   * Counts records in the database with the provided key.
   */
  public count(key: string): Promise<number> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.count(key);

      request.onsuccess = () => {
        resolve(request.result as number);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  public close(): void {
    this.db.close();
  }
}

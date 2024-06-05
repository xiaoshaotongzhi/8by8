interface IndexedDBConnection {
  add(data: object): Promise<void>;
  get(key: string): Promise<unknown>;
  count(key: string): Promise<number>;
}

export function connectToIndexedDB(
  dbName: string,
  version: number,
  storeName: string,
  keyPath: string,
): Promise<IndexedDBConnection> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, version);
    request.onerror = () => reject(new Error('Failed to open database'));
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath });
      }
    };
    request.onsuccess = () => {
      resolve({
        add: (data: object) =>
          addDataToIndexedDB(request.result, storeName, data),
        get: (key: string) =>
          getDataFromIndexedDB(request.result, storeName, key),
        count: (key: string) => countKeys(request.result, storeName, key),
      });
    };
  });
}

function getDataFromIndexedDB(db: IDBDatabase, storeName: string, key: string) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName]);
    const store = transaction.objectStore(storeName);
    const request = store.get(key);

    request.onerror = e => {
      reject(e);
    };

    request.onsuccess = () => {
      resolve(request.result);
    };
  });
}

function addDataToIndexedDB(
  db: IDBDatabase,
  storeName: string,
  data: object,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    const request = store.add(data);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = e => {
      reject(e);
    };
  });
}

function countKeys(
  db: IDBDatabase,
  storeName: string,
  key: string,
): Promise<number> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    const request = store.count(key);

    request.onsuccess = () => {
      resolve(request.result as number);
    };

    request.onerror = e => {
      reject(e);
    };
  });
}

interface Doc {
  exists: boolean;
  data(): object | undefined;
}

interface DocRef {
  set(properties: object): void;
  get(): Promise<Doc>;
}

interface Collection {
  doc(id: string): DocRef;
}

const firestore: Record<string, Collection> = {};

/**
 * A mock implementation of getFirestore() that stores data in memory.
 */
export const getFirestore = jest.fn().mockImplementation(() => ({
  collection: jest.fn().mockImplementation((collectionName: string) => {
    if (!(collectionName in firestore)) {
      const data: Record<string, object> = {};
      const collection: Collection = {
        doc: (id: string): DocRef => ({
          set: (properties: object) => {
            data[id] = properties;
          },
          get: () => {
            return Promise.resolve({
              exists: id in data,
              data: () => {
                return data[id];
              },
            });
          },
        }),
      };

      firestore[collectionName] = collection;
    }

    return firestore[collectionName];
  }),
}));

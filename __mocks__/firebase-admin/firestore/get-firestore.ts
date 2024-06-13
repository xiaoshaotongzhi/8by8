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

/**
 * A mock implementation of getFirestore() that stores data in memory. Each call
 * to this function returns an empty database.
 *
 * @remarks
 * Only methods/properties relevant to service classes and their corresponding
 * test suites have been mocked. If it becomes necessary to access additional
 * methods/properties, they should be added to the object returned by this
 * function.
 */
export const getFirestore = jest.fn().mockImplementation(() => {
  const firestore: Record<string, Collection> = {};

  return {
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
  };
});

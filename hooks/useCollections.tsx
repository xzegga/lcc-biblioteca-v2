export function useCollections() {
  function collectionExists(realm: any, collection: any) {
    return (
      realm.schema.findIndex((schema: any) => schema.name === collection) !== -1
    );
  }

  return {
    exist: collectionExists,
  };
}

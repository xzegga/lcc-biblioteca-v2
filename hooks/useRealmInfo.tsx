import { useRealm } from '@realm/react';

export function useRealmInfo() {
    const realm = useRealm();
    const collectionNames = realm.schema.map((schema) => schema.name);
    return {
        removeAll() {
            realm.write(() => {
                realm.deleteAll();
            });
        },
        getNames() {
            console.log('********* COLLECTION NAMES *********');
            console.log(collectionNames);
        },
    }
}
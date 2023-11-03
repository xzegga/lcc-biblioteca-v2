import Realm from 'realm';
import { useQuery, useRealm } from '@realm/react';
import { Crop } from "../schemas/Crop";
import { useCollections } from './useCollections';

export function useCrops() {
    const realm = useRealm();
    const collectionName = 'Crop';
    const collections = useCollections();

    return {
        items() {
            return (collections.exist(realm, collectionName))
                ? useQuery(Crop).sorted('title', false)
                : [];
        },
        getById(id: string) {
            const _id = Realm.BSON.ObjectId.createFromHexString(id);
            return realm.objectForPrimaryKey(Crop, _id);
        },
        findByCategory(categoryId: number) {
            return realm.objects(Crop).filtered('categories IN $0', [categoryId]);
        },
        getNamesByIds(ids: number[] = []){
            return ids.map((id) => {
                return realm.objects(collectionName).filtered(`id == ${id}`)[0].title;
            }) as string[];
        },
        findByName(name: string) {
            return realm.objects(Crop).filtered('title CONTAINS[c] $0', name);
        }
    }
}


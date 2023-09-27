import { Category } from '../schemas/Category';
import Realm from 'realm';
import { useQuery, useRealm } from '@realm/react';
import { useCollections } from './useCollections';

export function useCategories() {
    const realm = useRealm();
    const collectionName = 'Category';
    const collections = useCollections();

    return {
        items() {
            return (collections.exist(realm, collectionName))
                ? useQuery(Category).sorted('name', false)
                : [];
        },
        // addCategory(name: string) {
        //     realm.write(() => {
        //         realm.create('Category', {
        //             name: name,
        //             id: 1020,
        //             _id: new Realm.BSON.ObjectId(),
        //         });
        //     });
        // },
        // deleteCategory(category: Category) {
        //     realm.write(() => {
        //         realm.delete(category);
        //     });
        // }
    }
}
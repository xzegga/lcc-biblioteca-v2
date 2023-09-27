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
    }
}
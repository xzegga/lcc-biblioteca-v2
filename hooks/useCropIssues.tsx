import Realm from 'realm';
import { useQuery, useRealm } from '@realm/react';
import { useCollections } from './useCollections';
import { CropIssues } from '../schemas/CropIssues';

export function useCropIssues() {
    const realm = useRealm();
    const collectionName = 'CropIssues';
    const collections = useCollections();

    return {
        items() {
            return (collections.exist(realm, collectionName))
                ? useQuery(CropIssues).sorted('title', false)
                : [];
        },
    }
}
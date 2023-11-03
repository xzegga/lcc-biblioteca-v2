import { Category } from '../schemas/Category';
import Realm from 'realm';
import { useRealm } from '@realm/react';

export function useCommons() {
    const realm = useRealm();

    return {
        updateLocalImage(
            { 
                collection,
                _id,
                localImage
            }: {
                collection: string
                _id: Realm.BSON.ObjectId,
                localImage: string
            }) {
            const collectionObj = realm.objectForPrimaryKey(collection, _id);
            
            if (collectionObj) {
                if (!realm.isInTransaction) {
                    realm.write(() => {
                        collectionObj.localImage = localImage;
                    });
                } else {
                    setTimeout(() => {
                        this.updateLocalImage({collection, _id, localImage });
                    }, 1000);
                }

            }
        }
    }
}
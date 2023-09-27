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
            const category = realm.objectForPrimaryKey(collection, _id);
            if (category) {
                if (!realm.isInTransaction) {
                    realm.write(() => {
                        category.localImage = localImage;
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
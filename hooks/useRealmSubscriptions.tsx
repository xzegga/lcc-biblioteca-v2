import { useRealm } from "@realm/react";
import { useCallback } from "react";
import { useCommons } from "./useCommons";

function compareImages(obj1: any): boolean {
    if ('imagen' in obj1) {
        if (!obj1.localImage || obj1.imagen !== obj1.localImage) {
            return true;
        }
    }
    return false;
}

export default function useRealmSubscriptions(collections: Array<string>) {
    const realm = useRealm();
    const collectionSchema = useCommons();

    return {
        subscribe: useCallback(() => {
            // Create a subscription for every collection in the array
            collections.forEach((collection) => {
                const obj = realm.objects(collection);
                try {
                    obj.addListener((object, changes) => {
                        changes.newModifications.forEach((index) => {
                            if (compareImages(object[index])) {
                                collectionSchema.updateLocalImage({
                                    collection,
                                    _id: object[index]._id as Realm.BSON.ObjectId,
                                    localImage: object[index].imagen as string
                                })
                            };
                        });
                    });
                } catch (error) {
                    console.log(error);
                }
            });
        }, [collections]),
        unsubscribe() {
            // Clean up the listener when the component unmounts.
            collections.forEach((collection) => {
                // Subscribe to changes in the Realm database.
                const obj = realm.objects(collection);
                obj.removeAllListeners();
            });
        }
    }
}
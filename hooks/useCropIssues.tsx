import Realm from "realm";
import { useQuery, useRealm } from "@realm/react";
import { useCollections } from "./useCollections";
import { CropIssues } from "../schemas/CropIssues";

export function useCropIssues() {
  const realm = useRealm();
  const collectionName = "CropIssues";
  const collections = useCollections();

  return {
    items() {
      return collections.exist(realm, collectionName)
        ? useQuery(CropIssues).sorted("title", false)
        : [];
    },
    findByCrop(cropId: number, type: string = "patologia") {
      if (!cropId) return [];

      let crops = realm
        .objects(CropIssues)
        .filtered("$0 IN crop", cropId)
        .filtered("type == $0", type);

      let controls = realm
        .objects(CropIssues)
        .filtered("$0 IN controls.crop", cropId)
        .filtered("type == $0", type);

      const idMap = new Map();
      const distinctObjects = [];
      const arr = Array.from(new Set([...crops, ...controls]));
      for (const obj of arr) {
        if (!idMap.has(obj.id)) {
          idMap.set(obj.id, obj);
          distinctObjects.push(obj);
        }
      }
      return distinctObjects;
    },
    getById(cropId: string) {
      const _id = Realm.BSON.ObjectId.createFromHexString(cropId);
      return realm.objectForPrimaryKey(CropIssues, _id);
    },
  };
}

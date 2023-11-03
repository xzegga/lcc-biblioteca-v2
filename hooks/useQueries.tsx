import { Query } from "../schemas/Query";
import Realm from "realm";
import { useQuery, useRealm } from "@realm/react";
import { useCollections } from "./useCollections";
import QueryService from "../services/queries";
import { useAuth } from "../context/AuthContext";
import { getUrlPath } from "../helpers/removeDomain";

export function useQueries() {
  const realm = useRealm();
  const collectionName = "Query";
  const collections = useCollections();
  const { authState } = useAuth();
  const service = QueryService(authState?.token || "");

  return {
    items(user: string) {
      return collections.exist(realm, collectionName)
        ? useQuery(Query)
            .filtered("user == $0", user)
            .sorted("qs_date_question", true)
        : [];
    },
    // getNamesByIds(ids: number[] = []){
    //     return ids.map((id) => {
    //         return realm.objects(collectionName).filtered(`id == ${id}`)[0].name;
    //     }) as string[];
    // },
    // getById(id: number) {
    //     return realm.objects(collectionName).filtered(`id == ${id}`)[0];
    // }
    async postQuery(data: any) {
      const saved = await service.post(data);
      if (saved?.id) {
        delete data.qs_user;
        try {
          realm.write(() => {
            realm.create("Query", {
              ...data,
              user: authState?.user,
              id: saved.id,
              imagen: getUrlPath(
                saved.img?.media_details.sizes.medium.source_url,
              ),
              _id: new Realm.BSON.ObjectId(),
            });
          });
          return saved?.id;
        } catch (e) {
          console.log(e);
        }
      }
    },
    // deleteCategory(category: Category) {
    //     realm.write(() => {
    //         realm.delete(category);
    //     });
    // }
  };
}

import { Query } from "../schemas/Query";
import { QueryLocal } from "../schemas/QueryLocal";
import Realm from "realm";
import { useQuery, useRealm } from "@realm/react";
import { useCollections } from "./useCollections";
import QueryService from "../services/queries";
import { useAuth } from "../context/AuthContext";
import { getUrlPath } from "../helpers/removeDomain";
import "react-native-get-random-values";
import { useStore } from "./useGlobalStore";
import { Schemas } from "../schemas/Schemas";
import { Alert } from "react-native";

export function useQueries() {
  const realm = useRealm();

  const collections = useCollections();
  const { authState } = useAuth();
  const service = QueryService(authState?.token || "");

  const { networkStatus } = useStore(state => ({
    networkStatus: state.networkStatus
  }));

  return {
    items(user: string) {
      const locals = collections.exist(realm, Schemas.QUERYLOCAL)
        ? useQuery(QueryLocal)
          .filtered("qs_user == $0", user)
        : [];

      const remote = collections.exist(realm, Schemas.QUERY)
        ? useQuery(Query)
          .filtered("qs_user == $0", user)
        : [];

      return [...remote, ...locals]
    },
    localItems(user: string) {
      return collections.exist(realm, Schemas.QUERYLOCAL)
        ? useQuery(QueryLocal)
          .filtered("qs_user == $0", user)
          .sorted("qs_date_question", true)
        : [];
    },
    async postQuery(data: any) {
      if (networkStatus && data) {
        const saved = await this.saveRemote(data);
        return saved;

      } else if (data) {
        const saved = await this.localSave(data);
        Alert.alert("Pregunta pendiente", "No se ha detectado una conección a internet, tu pregunta se guardará en el dispositivo y se enviará cuando se detecte una conección.");
        return saved;
      }
    },
    async saveRemote(data: any) {
      const saved = await service.post(data);
      if (saved?.id) {
        try {
          realm.write(() => {
            // Deleting local entry on QueryLocal schema
            const newObjData = { ...data }

            if (data._id) {
              const local = realm.objectForPrimaryKey(QueryLocal, data._id);
              if (local) realm.delete(local);
            }

            // Creating new entry on Query schema
            realm.create(Schemas.QUERY, {
              ...newObjData,
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
    async localSave(data: any) {
      realm.write(() => {
        realm.create(Schemas.QUERYLOCAL, {
          ...data,
          _id: new Realm.BSON.ObjectId(),
        });
      });
      return true;
    },
  };
}

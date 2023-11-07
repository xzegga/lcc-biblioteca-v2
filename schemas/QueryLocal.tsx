import { Realm } from "@realm/react";
import { Schemas } from "./Schemas";

export class QueryLocal extends Realm.Object<QueryLocal> {
  _id!: Realm.BSON.ObjectId;
  qs_user!: string;
  qs_request!: string;
  qs_date_question?: string;
  qs_answer!: string;
  qs_date_answer!: string;
  imagen?: string;

  static schema: Realm.ObjectSchema = {
    name: Schemas.QUERYLOCAL,
    primaryKey: "_id",
    properties: {
      _id: { type: "objectId", default: () => new Realm.BSON.ObjectId() },
      qs_user: "string",
      qs_request: "string",
      qs_answer: "string",
      qs_date_answer: "string",
      qs_date_question: { type: "string",  default: () => (new Date()).toISOString() },
      imagen: "string?",
    },
  };
}

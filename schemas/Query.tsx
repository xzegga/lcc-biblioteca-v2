import { Realm } from "@realm/react";

export class Query extends Realm.Object<Query> {
  _id!: Realm.BSON.ObjectId;
  id!: number;
  qs_user!: string;
  qs_request!: string;
  qs_date_question?: string;
  qs_answer!: string;
  qs_date_answer!: string;
  imagen?: string;
  localImage?: string;

  static schema: Realm.ObjectSchema = {
    name: "Query",
    primaryKey: "_id",
    properties: {
      _id: { type: "objectId", default: () => new Realm.BSON.ObjectId() },
      id: "int",
      qs_user: "string",
      qs_request: "string",
      qs_date_question: { type: "string", default: () => (new Date()).toISOString() },
      qs_answer: "string",
      qs_date_answer: "string",
      imagen: "string?",
      localImage: { type: "string", optional: true, default: "" },
    },
  };
}

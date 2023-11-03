import { Realm } from "@realm/react";

export class Category extends Realm.Object<Category> {
  _id!: Realm.BSON.ObjectId;
  id!: number;
  name!: string;
  imagen?: string;
  localImage?: string;
  count?: number;

  static schema: Realm.ObjectSchema = {
    name: "Category",
    primaryKey: "_id",
    properties: {
      _id: { type: "objectId", default: () => new Realm.BSON.ObjectId() },
      id: "int",
      name: "string",
      imagen: "string?",
      localImage: { type: "string", optional: true, default: "" },
      count: "int",
    },
  };
}

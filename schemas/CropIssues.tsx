import { Realm } from "@realm/react";
import { Control } from "./Control";

export class CropIssues extends Realm.Object<CropIssues> {
  _id!: Realm.BSON.ObjectId;
  id!: number;
  crop!: number[];
  title!: string;
  scientific_name!: string;
  description?: string;
  type!: string;
  imagen?: string;
  localImage?: string;
  controls?: Realm.List<Control>;

  static schema: Realm.ObjectSchema = {
    name: "CropIssues",
    primaryKey: "_id",
    properties: {
      _id: { type: "objectId", default: () => new Realm.BSON.ObjectId() },
      id: "int",
      crop: "int[]",
      title: "string",
      scientific_name: "string",
      description: "string",
      type: "string",
      imagen: "string",
      localImage: { type: "string", optional: true, default: "" },
      controls: {
        type: "list",
        objectType: "Control",
        default: [],
      },
    },
  };
}

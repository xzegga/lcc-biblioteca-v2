import { Realm } from '@realm/react';

export class Crop extends Realm.Object<Crop> {
    _id!: Realm.BSON.ObjectId;
    id!: number;
    title!: string;
    scientific_name!: string;
    description!: string;
    categories!: number[];
    imagen!: string;
    localImage?: string;

    static schema: Realm.ObjectSchema = {
        name: 'Crop',
        primaryKey: '_id',
        properties: {
            _id: { type: 'objectId', default: () => new Realm.BSON.ObjectId() },
            id: 'int',
            title: 'string',
            scientific_name: 'string',
            description: 'string',
            categories: 'int[]',
            imagen: 'string',
            localImage: { type: 'string', optional: true, default: '' },
        },
    };
}


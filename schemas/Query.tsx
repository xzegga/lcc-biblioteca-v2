import { Realm } from '@realm/react';

export class Query extends Realm.Object<Query> {
    _id!: Realm.BSON.ObjectId;
    user!: string;
    id!: number;
    qs_request!: string;
    qs_date_question?: Date;
    qs_answer?: string;
    qs_date_answer?: Date;
    imagen?: string;
    localImage?: string;
    
    static schema: Realm.ObjectSchema = {
        name: 'Query',
        primaryKey: '_id',
        properties: {
            _id: { type: 'objectId', default: ()=> new Realm.BSON.ObjectId() },
            user: 'string',
            id: 'int',
            qs_request: 'string',
            qs_date_question: { type: 'date', default: ()=> new Date() },
            qs_answer: 'string?',
            qs_date_answer: 'date?',
            imagen: 'string?',
            localImage: { type: 'string', optional: true, default: '' },
        },
    };
}
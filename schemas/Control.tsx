import { Realm } from '@realm/react';

export class Control extends Realm.Object<Control> {
    crop!: number[];
    name!: string;
    dose!: string;
    frequency!: string;
    recommendation!: string;

    static schema: Realm.ObjectSchema = {
        name: 'Control',
        embedded: true,
        properties: {
            crop: 'int[]',
            name: 'string',
            dose: 'string',
            frequency: 'string',
            recommendation: 'string',
        },
    };
}
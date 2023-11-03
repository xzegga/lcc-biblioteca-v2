import Realm, {
    OpenRealmBehaviorConfiguration, OpenRealmBehaviorType, OpenRealmTimeOutBehavior
} from 'realm';

import { createRealmContext } from '@realm/react';

import { Category } from '../schemas/Category';
import { Control } from '../schemas/Control';
import { Crop } from '../schemas/Crop';
import { CropIssues } from '../schemas/CropIssues';
import { Query } from '../schemas/Query';

export const openLocal: OpenRealmBehaviorConfiguration = {
  type: OpenRealmBehaviorType.DownloadBeforeOpen,
  timeOut: 3000,
  timeOutBehavior: OpenRealmTimeOutBehavior.OpenLocalRealm,
}

// Create a configuration object
// Authenticate to atlas mongodb with api key
export const realmConfig: Realm.Configuration = {
  path: 'lcc-biblioteca',
  schema: [Crop, Category, CropIssues, Control, Query],
};

// Create a realm context
const { RealmProvider, useRealm, useObject, useQuery } =
  createRealmContext(realmConfig);

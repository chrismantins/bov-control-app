import Realm from 'realm';
import { createRealmContext } from '@realm/react';

import {
  ChecklistSchema,
  FarmerSchema,
  NameSchema,
  LocationSchema,
  NameFarmerSchema,
} from '../schemas/ChecklistSchema';

const realmConfig: Realm.Configuration = {
  schema: [
    ChecklistSchema,
    FarmerSchema,
    NameSchema,
    NameFarmerSchema,
    LocationSchema,
  ],
  schemaVersion: 8,
};

export const { RealmProvider, useRealm, useObject, useQuery } =
  createRealmContext(realmConfig);

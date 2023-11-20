import { useEffect, useState } from 'react';
import { View } from 'react-native';
import tailwind from 'twrnc';

import { RealmProvider, useUser } from '@realm/react';

import { openLocal, realmConfig } from '../../context/RealmContext';
import { Schemas } from '../../schemas/Schemas';

import Connecting from '../Connecting';

/*
 * This component is responsible for rendering the Home component.
 *
 * The Home component will automatically open a synced realm if the user is logged in.
 */

export function RealmApp({ children }: { children: React.ReactNode }) {
  const user = useUser();
  const [appLoaded, setAppLoaded] = useState(false);

  useEffect(() => {
    if(appLoaded) console.log('App loaded')
  }, [appLoaded]);

  return (
    <RealmProvider
      {...realmConfig}
      fallback={() => {
        return (
          <View style={[tailwind`px-6 pt-30`]}>
            <Connecting action={setAppLoaded}/>
          </View>
        );
      }}
      closeOnUnmount={false}
      {...(user.providerType !== "anon-user"
        ? {
            sync: {
              flexible: true,
              existingRealmFileBehavior: openLocal,
              newRealmFileBehavior: openLocal,
              onError: (_session, error) => {
                console.log(error);
              },
              initialSubscriptions: {
                update(subs, realm) {
                  subs.add(realm.objects(Schemas.CROP));
                  subs.add(realm.objects(Schemas.CATEGORY));
                  subs.add(realm.objects(Schemas.CROPISSUES));
                  subs.add(realm.objects(Schemas.QUERY));
                  subs.add(realm.objects(Schemas.QUERYLOCAL));
                },
              },
            },
          }
        : {})}
    >
      {children}
    </RealmProvider>
  );
}



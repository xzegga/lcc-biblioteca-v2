import { RealmProvider, useUser } from '@realm/react';
import { openLocal, realmConfig } from '../../context/RealmContext';

/*
    * This component is responsible for rendering the Home component.
    *
    * The Home component will automatically open a synced realm if the user is logged in.
    */

export function RealmApp({children}:{children: React.ReactNode}) {
    const user = useUser();
    return (
        <RealmProvider {...realmConfig}
            fallback={() => null}
            closeOnUnmount={false}
            {...(user.providerType !== "anon-user" ? {
                sync: {
                    flexible: true,
                    existingRealmFileBehavior: openLocal,
                    newRealmFileBehavior: openLocal,
                    onError: (_session, error) => {
                        console.log(error);
                    },
                    initialSubscriptions: {
                        update(subs, realm) {
                            subs.add(realm.objects('Crop'));
                            subs.add(realm.objects('Category'));
                            subs.add(realm.objects('CropIssues'));
                            subs.add(realm.objects('Query'));
                        },
                    },
                }
            } : {})}>
            { children }
        </RealmProvider>
    );
}

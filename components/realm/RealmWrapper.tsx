import * as SecureStore from 'expo-secure-store';
import { useCallback, useEffect, useState } from 'react';
import { AppProvider } from '@realm/react';

import { REALM_API_ID, REALM_API_KEY, useAuth } from '../../context/AuthContext';
import { UserWrapper } from './UserWrapper';
import { Redirect, useRootNavigationState } from 'expo-router';


/*
    * This component is responsible for getting the api key from the secure store
    * and then using it to initialize the Realm app.
    *
    * The Realm app is then used to initialize the UserProvider, which will
    * automatically log in the user if they have a valid refresh token.
    *
    * The UserProvider is then used to initialize the RealmProvider, which will
    * automatically open a synced realm if the user is logged in.
    *
    * The RealmProvider is then used to render the Home component.
    */

export default function RealmWrapper({ children }: { children: React.ReactNode }) {
    const [apiId, setApiId] = useState<any>();

    const getApi = useCallback(async () => {
        const api = await SecureStore.getItemAsync(REALM_API_ID);
        setApiId(api);
    }, [])

    useEffect(() => {
        getApi();
    }, []);

    return apiId! ?
        <AppProvider id={"mobileapp-kqjrk"}>
            <UserWrapper>{children}</UserWrapper>
        </AppProvider> : null;
}



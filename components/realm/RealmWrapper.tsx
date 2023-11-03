import { withLayoutContext } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { memo, useEffect, useMemo, useState } from 'react';

import { AppProvider } from '@realm/react';

import { REALM_API_ID, REALM_API_KEY, useAuth } from '../../context/AuthContext';
import { UserWrapper } from './UserWrapper';
import Login from '../../app/login';


export default function RealmWrapper({ children }: { children: React.ReactNode }) {

    const { authState } = useAuth();

    return (
        <>
            {authState?.authenticated && authState?.realmApi ? (
                <AppProvider id={authState?.realmApi}>
                    <UserWrapper>{children}</UserWrapper>
                </AppProvider>) : <Login />
            }
        </>
    );
}
import { useEffect } from 'react';
import { useApp, UserProvider } from '@realm/react';
import { useAuth } from '../../context/AuthContext';
import { RealmApp } from './RealmApp';

/*
    * This component is responsible for getting the current user from the Realm app
    * and then using it to initialize the RealmProvider.
    *
    * The RealmProvider is then used to render the Home component.
    */

export function UserWrapper({ children }: { children: React.ReactNode }) {
    const app = useApp();
    const { getAtlasUser } = useAuth();

    useEffect(() => {
        async function getAtlas() {
            await getAtlasUser(app);
        }
        getAtlas();
    }, []);

    return (
        <UserProvider>
            <RealmApp>{children}</RealmApp>
        </UserProvider>
    );
}

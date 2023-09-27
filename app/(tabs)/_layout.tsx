import { Link, Redirect, Stack } from 'expo-router';
import { Text, View } from 'react-native';

import { useAuth } from '../../context/AuthContext';

export default function AppLayout() {
    const { authState } = useAuth();

    // Only require authentication within the (app) group's layout as users
    // need to be able to access the (auth) group and sign in again.
    if (!authState?.authenticated) {
        // On web, static rendering will stop here as the user is not authenticated
        // in the headless Node process that the pages are rendered in.
        console.log('Redirecting to login');
        return <Redirect href="/login" />;
    }

    // This layout can be deferred because it's not the root layout.
    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" />
        </Stack>
    );
}
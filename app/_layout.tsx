import { Slot } from 'expo-router';
import 'react-native-get-random-values';

import RealmWrapper from '../components/realm/RealmWrapper';
import { AuthProvider } from '../context/AuthContext';

export const unstable_settings = {
    // ensures any route can link back to `/`
    initialRouteName: "index",
};

export default function Root() {
    return (
        <AuthProvider>
            <RealmWrapper>
                <Slot initialRouteName='index' />
            </RealmWrapper>
        </AuthProvider>
    );
}
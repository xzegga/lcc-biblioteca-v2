
import { useRootNavigationState, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import tailwind from 'twrnc';

import { useAuth } from '../context/AuthContext';
import { LoaderHome } from './LoaderHome';
import SafeViewAndroid from './SafeViewAndroid';

const Connecting = ({ action }: { action: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const { authState } = useAuth();

    useEffect(() => {
        const timer = setInterval(function () {
            navigateRoot(timer);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const navigateRoot = (timer: any) => {
        if (authState?.authenticated && authState.realmApi!) {
            action(true)
            clearInterval(timer);
        }
    }

    return (
        <SafeAreaView style={[tailwind`bg-white h-full`, SafeViewAndroid.AndroidSafeArea]}>
            <LoaderHome />
        </SafeAreaView>
    );
};

export default Connecting;

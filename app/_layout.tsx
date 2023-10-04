import { Slot } from 'expo-router';
import { useColorScheme } from 'react-native';

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';

import { AuthProvider } from '../context/AuthContext';

export default function Root() {
    // Set up the auth context and render our layout inside of it.
    const colorScheme = useColorScheme();

    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <AuthProvider>
                <Slot />
            </AuthProvider>
        </ThemeProvider>
    );
}
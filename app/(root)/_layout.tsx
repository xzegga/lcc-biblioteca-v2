import { Redirect, Slot, Stack, useRootNavigationState } from 'expo-router';

import { useAuth } from '../../context/AuthContext';
import { View } from 'react-native';
import tailwind from 'twrnc';
import { LoaderHome } from '../../components/LoaderHome';

export default function Layout() {
  const rootNavigationState = useRootNavigationState();
  const { authState } = useAuth();

  if (!authState?.authenticated && rootNavigationState?.key) return <Redirect href="/login" />;

  return (
    <>{
      !rootNavigationState?.stale ? <Stack screenOptions={{
        headerShown: false,
      }} /> : <View style={[tailwind`px-6 pt-30`]}><LoaderHome /></View>
    }
    </>
  );
}

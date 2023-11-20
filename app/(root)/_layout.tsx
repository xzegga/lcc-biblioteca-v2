import { Redirect, Stack, useRootNavigationState } from 'expo-router';
import { View } from 'react-native';
import tailwind from 'twrnc';

import { LoaderHome } from '../../components/LoaderHome';
import { useAuth } from '../../context/AuthContext';

export default function Layout() {
  const rootNavigationState = useRootNavigationState();
  const { authState } = useAuth();

  if (!authState?.authenticated && rootNavigationState?.key)
    return <Redirect href="/login" />;

  return (
    <>
      {!rootNavigationState?.stale ? (
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      ) : (
        <View style={[tailwind`px-6 pt-30`]}>
          <LoaderHome />
        </View>
      )}

    </>
  );
}

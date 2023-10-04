import { Redirect, Stack, useRootNavigationState } from 'expo-router';

import RealmWrapper from '../../components/realm/RealmWrapper';
import { useAuth } from '../../context/AuthContext';
import { useMemo } from 'react';

export default function Layout() {
  const rootNavigationState = useRootNavigationState();
  const { authState } = useAuth();

  if (!authState?.authenticated && rootNavigationState?.key) return <Redirect href="/login" />;

  return (
    <RealmWrapper>
      <Stack screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen name="index" />
      </Stack>
    </RealmWrapper>
  );
}

import { AppProvider } from '@realm/react';

import Login from '../../app/login';
import { useAuth } from '../../context/AuthContext';
import { UserWrapper } from './UserWrapper';

export default function RealmWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authState } = useAuth();
  return (
    <>
      {authState?.authenticated! && authState?.realmApi! ? (
        <AppProvider id={authState?.realmApi}>
          <UserWrapper>{children}</UserWrapper>
        </AppProvider>
      ) : (
        <Login />
      )}
    </>
  );
}

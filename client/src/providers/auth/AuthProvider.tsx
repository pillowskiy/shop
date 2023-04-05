import { FC, useEffect, type PropsWithChildren } from 'react';
import type { TAuthFields } from './types';
import dynamic from 'next/dynamic';
import { useAuth } from '@/hooks/useAuth';
import { useUserActions } from '@/hooks/useUserActions';
import { useRouter } from 'next/router';

const DynamicRoleProvider = dynamic(() => import('./RoleProvider'), {
  ssr: false,
});

const AuthProvider: FC<PropsWithChildren<TAuthFields>> = ({
  Component: { isOnlyUser },
  children,
}) => {
  const { user } = useAuth();
  const { checkAuth, logout } = useUserActions();
  const { pathname } = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) checkAuth();
  });

  useEffect(() => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken && user) logout();
  }, [logout, pathname, user]);

  return isOnlyUser ?
    <DynamicRoleProvider Component={{ isOnlyUser }}>
      {children}
    </DynamicRoleProvider> :
    <div>{children}</div>;
};

export default AuthProvider;

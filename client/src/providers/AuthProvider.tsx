import { FC, useEffect, type PropsWithChildren } from 'react';
import type { AuthFields } from '@/types/providers/auth-provider';
import dynamic from 'next/dynamic';
import { useAuth } from '@/hooks/useAuth';
import { useActions } from '@hooks/useActions';
import { useRouter } from 'next/router';

const RoleProvider = dynamic(() => import('./RoleProvider'), {
  ssr: false,
});

const AuthProvider: FC<PropsWithChildren<AuthFields>> = ({
  Component: { forAuth },
  children,
}) => {
  const { checkAuth } = useActions();

  useEffect(() => {
    const accessToken = localStorage.getItem('token');
    if (accessToken) checkAuth();
  });

  return forAuth ?
    <RoleProvider Component={{ forAuth }}>
      {children}
    </RoleProvider> :
    <div>{children}</div>;
};

export default AuthProvider;
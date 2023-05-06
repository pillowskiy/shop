import {type FC, type PropsWithChildren, useEffect} from 'react';
import type {AuthFields} from '@/types/providers/auth-provider';
import dynamic from 'next/dynamic';
import { useUserActions } from '@hooks/useActions';

const RoleProvider = dynamic(() => import('./RoleProvider'), {
  ssr: false,
});

const AuthProvider: FC<PropsWithChildren<AuthFields>> = ({
  forAuth,
  children,
}) => {
  const { checkAuth } = useUserActions();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <RoleProvider forAuth={forAuth}>
      {children}
    </RoleProvider>
  );
};

export default AuthProvider;
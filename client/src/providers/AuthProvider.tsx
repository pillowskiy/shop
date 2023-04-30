import { FC, useEffect, type PropsWithChildren } from 'react';
import type { AuthFields } from '@/types/providers/auth-provider';
import dynamic from 'next/dynamic';
import { useActions } from '@hooks/useActions';
import { useRouter } from 'next/router';
import { useAuth } from '@hooks/useAuth';

const RoleProvider = dynamic(() => import('./RoleProvider'), {
  ssr: false,
});

const AuthProvider: FC<PropsWithChildren<AuthFields>> = ({
  forAuth,
  children,
}) => {
  const { checkAuth } = useActions();

  useEffect(() => {
    checkAuth();
  }, []);

  return forAuth ?
    <RoleProvider children={children} />:
    <div children={children} />;
};

export default AuthProvider;
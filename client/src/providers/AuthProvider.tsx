import type {FC, PropsWithChildren} from 'react';
import type {AuthFields} from '@/types/providers/auth-provider';
import dynamic from 'next/dynamic';

import {Loader} from "@containers/Loader";
import {useAuthChecker} from "@hooks/useAuthChecker";

const RoleProvider = dynamic(() => import('./RoleProvider'), {
  ssr: false,
});

const AuthProvider: FC<PropsWithChildren<AuthFields>> = ({
  forAuth,
  children,
}) => {
  const {isLoading} = useAuthChecker();

  if (isLoading) return <Loader />;

  return (
    <RoleProvider forAuth={forAuth}>
      {children}
    </RoleProvider>
  );
};

export default AuthProvider;
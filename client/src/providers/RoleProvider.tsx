import type {FC, PropsWithChildren} from 'react';
import type {AuthFields} from "@/types/providers/auth-provider";
import {useAuth} from '@hooks/useAuth';
import {useRouter} from 'next/router';

const RoleProvider: FC<PropsWithChildren<AuthFields>> = ({
  children,
  forAuth,
}) => {
  const { user } = useAuth();
  const router = useRouter();
  if (forAuth && user || !forAuth && !user) {
    return <div>{children}</div>;
  }

  router.pathname !== '/' && router.replace('/');
  return null;
};

export default RoleProvider;
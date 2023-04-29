import type { FC, PropsWithChildren } from 'react';
import type { AuthFields } from '@/types/providers/auth-provider';
import { useAuth } from '@hooks/useAuth';
import { useRouter } from 'next/router';

const RoleProvider: FC<PropsWithChildren<AuthFields>> = ({
  Component: { forAuth }, children
}) => {
  const { user } = useAuth();
  const router = useRouter();

  if (user || forAuth) return <div>{children}</div>;

  router.pathname !== '/auth' && router.replace('/auth');
  return null;
};

export default RoleProvider;
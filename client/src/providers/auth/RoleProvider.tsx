import { FC, type PropsWithChildren } from 'react';
import type { TAuthFields } from './types';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/router';

const RoleProvider: FC<PropsWithChildren<TAuthFields>> = ({
  Component: { isOnlyUser }, children
}) => {
  const { user } = useAuth();
  const router = useRouter();

  if (user || isOnlyUser) return <div>{children}</div>;

  router.pathname !== '/auth' && router.replace('/auth');
  return null;
};

export default RoleProvider;
import { FC, PropsWithChildren, useEffect } from 'react';
import { useAuth } from '@hooks/useAuth';
import { useRouter } from 'next/router';
import type { AuthFields } from '@/types/providers/auth-provider';

const RoleProvider: FC<PropsWithChildren> = ({
  children
}) => {
  const { user } = useAuth();
  const router = useRouter();
  if (user) return <div>{children}</div>;
  router.pathname !== '/auth' && router.replace('/auth');
  return null;
};

export default RoleProvider;
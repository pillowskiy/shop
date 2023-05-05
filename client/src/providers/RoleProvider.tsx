import { FC, PropsWithChildren } from 'react';
import { useAuth } from '@hooks/useAuth';
import { useRouter } from 'next/router';

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
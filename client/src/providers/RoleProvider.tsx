import type {FC, PropsWithChildren} from 'react';
import type {AuthFields} from "@/types/providers/auth-provider";
import {useAuth} from '@hooks/useAuth';
import {useRouter} from 'next/router';
import {useToast} from "@common/toast/useToast";

const RoleProvider: FC<PropsWithChildren<AuthFields>> = ({
  children,
  forAuth,
}) => {
  const {toast} = useToast();
  const {user} = useAuth();
  const router = useRouter();
  if (forAuth && user || !forAuth && !user) {
    return <div>{children}</div>;
  }

  router.pathname !== '/' && router.replace('/');
  toast({
    variant: "default",
    title: "Uh, Oh! Access denied",
    description: forAuth ?
        "Only authorized users can see this page":
        "Only unauthorized users can see this page"
  })
  return null;
};

export default RoleProvider;
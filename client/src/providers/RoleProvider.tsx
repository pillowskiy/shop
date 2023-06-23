import type {FC, PropsWithChildren} from 'react';
import type {AuthFields} from "@/types/providers/auth-provider";
import {useAuth} from '@hooks/useAuth';
import {useRouter} from 'next/router';
import {buildToast, useToast} from "@common/toast/useToast";

const RoleProvider: FC<PropsWithChildren<AuthFields>> = ({
  children,
  forAuth,
}) => {
  const {user} = useAuth();
  const {toast} = useToast();

  const router = useRouter();
  if (forAuth && user || !forAuth && !user) {
    return <div>{children}</div>;
  }

  router.pathname !== '/' && router.replace('/').then(() => (
      toast(buildToast("error", {
        error: `You should be ${forAuth ? "authorized" : "unauthorized"} to see this page!`
      }).toast)
  ));
  return null;
};

export default RoleProvider;
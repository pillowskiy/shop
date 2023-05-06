import {type FC, type PropsWithChildren, useEffect} from 'react';
import type {AuthFields} from '@/types/providers/auth-provider';
import dynamic from 'next/dynamic';

import {useAppDispatch} from "@redux/store";
import {checkAuth} from "@redux/user/user.actions";
import TokenService from "@api/services/token.service";

const RoleProvider = dynamic(() => import('./RoleProvider'), {
  ssr: false,
});

const AuthProvider: FC<PropsWithChildren<AuthFields>> = ({
  forAuth,
  children,
}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (TokenService.getToken()) {
      dispatch(checkAuth());
    }
  }, [dispatch]);

  return (
    <RoleProvider forAuth={forAuth}>
      {children}
    </RoleProvider>
  );
};

export default AuthProvider;
import {type FC, type PropsWithChildren, useEffect, useState} from 'react';
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
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const dispatchAuth = async () => {
      await dispatch(checkAuth());
      setTimeout(() => setIsLoaded(true), 200)
    }

    TokenService.getToken() ? dispatchAuth() : setIsLoaded(true);
  }, [dispatch]);

  if (!isLoaded) return null;

  return (
    <RoleProvider forAuth={forAuth}>
      {children}
    </RoleProvider>
  );
};

export default AuthProvider;
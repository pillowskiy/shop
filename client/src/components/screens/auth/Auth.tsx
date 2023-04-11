import { type FC, useState } from 'react';

import { Meta } from '@/components/ui';
import { RegisterModal, LoginModal } from '@/components/modals';

import { useAuth } from '@/hooks/useAuth';
import { useUserActions } from '@/hooks/useUserActions';

import { AuthModalState } from './types';
import { NavBar, QueryBar } from '@/components/bars';

const Auth: FC = () => {
  const action = useUserActions();
  const { isLoading } = useAuth();

  const [type, setType] = useState<AuthModalState>(AuthModalState.REGISTER);
  const onModalClose = () => setType(AuthModalState.CLOSE);

  return (
    <Meta title={'Authorization'}>
      <NavBar />
      <QueryBar />
      {type === AuthModalState.LOGIN ? (
        <LoginModal
          isOpen={type === AuthModalState.LOGIN}
          onClose={onModalClose}
          setType={setType}
        />
      ) : type === AuthModalState.REGISTER ? (
        <RegisterModal
          isOpen={type === AuthModalState.REGISTER}
          onClose={onModalClose}
          setType={setType}
        />
      ) : null}
    </Meta>
  );
};

export default Auth;

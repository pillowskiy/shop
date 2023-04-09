import Meta from '@/components/ui/Meta';
import { useAuth } from '@/hooks/useAuth';
import { useUserActions } from '@/hooks/useUserActions';
import { type FC, useState } from 'react';
import LoginModal from '@/components/modals/LoginModal';
import RegisterModal from '@/components/modals/RegisterModal';
import { AuthModalState } from './types';

const Auth: FC = () => {
  const action = useUserActions();
  const { isLoading } = useAuth();

  const [type, setType] = useState<AuthModalState>(AuthModalState.REGISTER);
  const onModalClose = () => setType(AuthModalState.CLOSE);

  return (
    <Meta title={'Authorization'}>
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

import { Heading, Button, Input, Anchor, Modal } from '@/components/ui';

import type { IRegister } from '@/types';
import type { FC } from 'react';

import { useUserActions } from '@/hooks/useUserActions';
import { SubmitHandler, useForm } from 'react-hook-form';

import GoogleLogo from '@/assets/images/google.svg';
import type { LoginModalProps } from './types';
import { AuthModalState } from '../screens/auth/types';
import { registerInput } from '@/utils/registerInput';

export const LoginModal: FC<LoginModalProps> = ({ isOpen, onClose, setType }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IRegister>({
    mode: 'onChange',
  });

  const action = useUserActions();
  const onSubmit: SubmitHandler<IRegister> = async (data: IRegister) => {
    action.login(data);
    reset();
  };

  return (
    <Modal active={isOpen} onClose={onClose}>
      <Heading className="my-4 text-center uppercase" scale={'3xl'}>
        Sign In
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)} className="h-full w-full">
        <Input
          {...registerInput('email', register)}
          error={errors.email?.message}
          placeholder="Email or mobile number:"
          type="email"
        >
          Enter your email address
        </Input>
        <Input
          {...registerInput('password', register)}
          error={errors.password?.message}
          placeholder="Password:"
          type="password"
        >
          Enter your password
        </Input>
        <section className="w-full text-center">
          <div className="mb-6 flex w-full justify-between gap-2">
            <Button type="submit">Sign in</Button>
            <Button color="light" iconURL={GoogleLogo}>
              Google
            </Button>
          </div>
          <Anchor onClick={() => setType(AuthModalState.REGISTER)}>
            Create an account
          </Anchor>
        </section>
      </form>
    </Modal>
  );
};

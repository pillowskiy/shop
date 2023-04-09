import { Heading, Button, Input, Anchor, Modal } from '@/components/ui';

import type { IRegister } from '@/types';
import type { FC } from 'react';
import type { LoginModalProps } from './types';

import { useUserActions } from '@/hooks/useUserActions';
import { SubmitHandler, useForm } from 'react-hook-form';

import { AuthModalState } from '../screens/auth/types';
import { registerInput } from '@/utils/registerInput';

export const RegisterModal: FC<LoginModalProps> = ({ isOpen, onClose, setType }) => {
  const { register, handleSubmit, formState, reset } = useForm<IRegister>({
    mode: 'onChange',
  });
  const { errors } = formState;

  const action = useUserActions();
  const onSubmit: SubmitHandler<IRegister> = async (data: IRegister) => {
    action.register(data);
    reset();
  };

  return (
    <Modal active={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="h-full">
        <Heading className="my-4 text-center uppercase" scale={'3xl'}>
          Create Account
        </Heading>
        <Input
          {...registerInput('username', register)}
          error={errors.username?.message}
          placeholder="Username:"
          type="text"
        >
          Enter your username
        </Input>
        <Input
          {...registerInput('email', register)}
          error={errors.email?.message}
          placeholder="Email:"
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
        <div className="w-full text-center">
          <Button type="submit">Continue</Button>
          <br />
          <Anchor onClick={() => setType(AuthModalState.LOGIN)}>Sign in</Anchor>
        </div>
      </form>
    </Modal>
  );
};

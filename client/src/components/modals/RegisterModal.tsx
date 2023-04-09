import Heading from '@/components/ui/Heading';
import Button from '@/components/ui/button/Button';
import Input from '@/components/ui/input/Input';
import { Modal } from '@/components/ui/popup/Modal';

import type { IRegister } from '@/types';
import type { FC } from 'react';

import { useUserActions } from '@/hooks/useUserActions';
import { SubmitHandler, useForm } from 'react-hook-form';

import * as patterns from '@/utils/patterns';

import type { LoginModalProps } from './types';
import Anchor from '../ui/anchor/Anchor';
import { AuthModalState } from '../screens/auth/types';

const LoginModal: FC<LoginModalProps> = ({
  isOpen,
  onClose,
  setType,
}) => {
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
          {...register('username', {
            required: 'This field is required',
            pattern: {
              value: patterns.username,
              message: 'Please enter a valid username',
            },
          })}
          className="mb-6"
          error={errors.username?.message}
          placeholder="Username:"
          type="text"
        >
          Enter your username
        </Input>
        <Input
          {...register('email', {
            required: 'This field is required',
            pattern: {
              value: patterns.email,
              message: 'Please enter a valid email',
            },
          })}
          className="mb-6"
          error={errors.email?.message}
          placeholder="Email:"
          type="email"
        >
          Enter your email address
        </Input>
        <Input
          {...register('password', {
            required: 'This field is required',
            pattern: {
              value: patterns.password,
              message: 'Please enter a valid password',
            },
          })}
          className="mb-6"
          error={errors.password?.message}
          placeholder="Password:"
          type="password"
        >
          Enter your password
        </Input>
        <div className="w-full text-center mt-4">
          <Button type="submit">Continue</Button>
          <br />
          <Anchor onClick={() => setType(AuthModalState.LOGIN)}>Sign in</Anchor>
        </div>
      </form>
    </Modal>
  );
};

export default LoginModal;

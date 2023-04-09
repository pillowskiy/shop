import Heading from '@/components/ui/Heading';
import Button from '@/components/ui/button/Button';
import Input from '@/components/ui/input/Input';
import { Modal } from '@/components/ui/popup/Modal';
import Anchor from '@/components/ui/anchor/Anchor';

import type { IRegister } from '@/types';
import type { FC } from 'react';

import { useUserActions } from '@/hooks/useUserActions';
import { SubmitHandler, useForm } from 'react-hook-form';

import * as patterns from '@/utils/patterns';

import GoogleLogo from '@/assets/images/google.svg';
import type { LoginModalProps } from './types';
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
    action.login(data);
    reset();
  };

  return (
    <Modal active={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="h-full">
        <Heading className="my-4 text-center uppercase" scale={'3xl'}>
          Sign In
        </Heading>
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
          placeholder="Email or mobile number:"
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
        <section className="w-full text-center">
          <div className="flex w-full justify-between gap-2">
            <Button type="submit">Sign in</Button>
            <Button color="light" iconURL={GoogleLogo}>
              Google
            </Button>
          </div>
          <Anchor className="mt-4" onClick={() => setType(AuthModalState.REGISTER)}>Create an account</Anchor>
        </section>
      </form>
    </Modal>
  );
};

export default LoginModal;

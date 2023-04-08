import Heading from '@/components/ui/Heading';
import Meta from '@/components/ui/Meta';
import Button from '@/components/ui/button/Button';
import Input from '@/components/ui/input/Input';
import { useAuth } from '@/hooks/useAuth';
import { useUserActions } from '@/hooks/useUserActions';
import type { IRegister } from '@/types';
import { type FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Image from 'next/image';

import * as constants from './constants';
import { Modal } from '@/components/ui/popup/Modal';
import Anchor from '@/components/ui/anchor/Anchor';

import GoogleLogo from '@/assets/images/google.svg';
import Logo from '@/assets/images/logo.svg';

const Auth: FC = () => {
  const action = useUserActions();
  const { isLoading } = useAuth();
  const [type, setType] = useState<'login' | 'register'>('login');
  const [isModalOpen, setIsModalOpen] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IRegister>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<IRegister> = async (data: IRegister) => {
    action[type](data);
    reset();
  };

  return (
    <Meta title={'Authorization'}>
      <Modal active={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={handleSubmit(onSubmit)} className="h-full">
          <Heading className="my-4 text-center uppercase" scale={'3xl'}>
            {type}
          </Heading>
          <Input
            {...register('email', {
              required: 'This field is required',
              pattern: {
                value: constants.emailPattern,
                message: 'Please enter a valid email',
              },
            })}
            className="mb-6"
            error={errors.email?.message}
            placeholder="your_email@gmail.com"
            title="Email id or mobile number:"
            type="email"
          />
          <Input
            {...register('password', {
              required: 'This field is required',
              pattern: {
                value: constants.passwordPattern,
                message: 'Please enter a valid password',
              },
            })}
            className="mb-6"
            error={errors.password?.message}
            title="Password:"
            type="password"
          />
          <div className="flex w-full justify-between text-center gap-2">
            <Button type="submit">Sign in</Button>
            <Button color="light" iconURL={GoogleLogo}>
              Google
            </Button>
          </div>
          <Anchor href="/">Create an account</Anchor>
        </form>
      </Modal>
    </Meta>
  );
};

export default Auth;

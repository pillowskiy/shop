import Heading from '@/components/ui/Heading';
import Meta from '@/components/ui/Meta';
import Button from '@/components/ui/button/Button';
import Input from '@/components/ui/input/Input';
import { useAuth } from '@/hooks/useAuth';
import { useUserActions } from '@/hooks/useUserActions';
import { IRegister } from '@/types';
import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import * as constants from './constants';

const Auth: FC = () => {
  const { isLoading } = useAuth();
  const action = useUserActions();
  const [type, setType] = useState<'login' | 'register'>('login');

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
      <section className="flex justify-between h-screen">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="round-2xl m-auto bg-white p-8 shadow rounded-xl"
        >
          <Heading className="mb-4 text-center capitalize" scale={'3xl'}>
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
            error={errors.email?.message}
            placeholder="your_email@gmail.com"
            title="Email id or mobile number"
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
            error={errors.password?.message}
            title="Password"
            type="password"
          />
          <div className="py-1 cursor-pointer">
            <a className="text-xs text-blue hover:border-b hover:border-blue transition-all">Forgot password?</a>
          </div>
          <Button type="submit">Sign in</Button>
          <Button color="light" className="ml-4">Google</Button>
        </form>
      </section>
    </Meta>
  );
};

export default Auth;

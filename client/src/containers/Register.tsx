import type {FC} from 'react';
import {Meta} from './Meta';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@layout/card';
import {RegisterForm} from "@containers/forms/RegisterForm";

export const Register: FC = () => {
  return (
    <Meta title='Registration'>
      <div className="h-screen flex justify-center items-center select-none">
        <Card className="w-[480px] py-6 px-6 text-start">
          <CardHeader className="text-center mb-6">
            <CardTitle className="text-4xl font-medium">Registration</CardTitle>
            <CardDescription>Create your account right now!</CardDescription>
          </CardHeader>

          <CardContent>
            <RegisterForm />
          </CardContent>
        </Card>
      </div>
    </Meta>
  );
};
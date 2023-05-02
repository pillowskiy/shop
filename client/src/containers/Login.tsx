import type { FC } from 'react';
import { Meta } from './Meta';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@layout/card';
import { FormInput } from '@components/FormInput';
import { Button } from '@ui/Button';
import { Anchor } from '@ui/Anchor';

export const Login: FC = () => {
  return (
    <Meta title='Login'>
      <div className="h-screen flex justify-center items-center select-none">
        <Card className="w-[480px] py-20 px-6">
          <CardHeader className="text-center mb-6">
            <CardTitle className="text-4xl">Welcome back</CardTitle>
            <CardDescription>We are really glad to see you again!</CardDescription>
          </CardHeader>

          <CardContent>
            <form>
              <FormInput label="Email or username" />
              <FormInput label="Password" type="password">
                <Anchor href="#" className="text-sm">
                  Forgot your password?
                </Anchor>
              </FormInput>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col">
            <Button className="mb-2 w-full" variant="outline">Submit</Button>
            <p className="text-sm text-muted-foreground">
              Don't have an account yet?&nbsp;
              <Anchor href="/register">Register</Anchor>
            </p>
          </CardFooter>
        </Card>
      </div>
    </Meta>
  );
};
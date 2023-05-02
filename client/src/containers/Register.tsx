import type { FC } from 'react';
import { Meta } from './Meta';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@layout/card';
import { FormInput } from '@components/FormInput';
import { Button } from '@ui/Button';
import { Anchor } from '@ui/Anchor';
import { Checkbox } from '@ui/Checkbox'
export const Register: FC = () => {
  return (
    <Meta title='Registration'>
      <div className="h-screen flex justify-center items-center select-none">
        <Card className="w-[480px] py-6 px-6 text-start">
          <CardHeader className="text-center mb-6">
            <CardTitle className="text-3xl font-medium">Create an account</CardTitle>
          </CardHeader>

          <CardContent>
            <form>
              <FormInput label="Email" type="email" />
              <FormInput label="Username" />
              <FormInput label="Password" type="password" />
              <div className="items-top space-x-2">
                <Checkbox id="terms" className="float-left" />
                <div className="grid gap-1.5 leading-none px-2">
                  <label
                    htmlFor="terms"
                    className="text-xs text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Send me emails with information about promotions and interesting offers (optional)
                  </label>
                </div>
              </div>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col">
            <Button className="mb-2 w-full" variant="outline">Continue</Button>
            <span className="text-xs text-muted-foreground text-start mb-6">
              By creating an account, you agree to&nbsp;
              <Anchor href="#">Conditions of Use</Anchor>&nbsp;and&nbsp;
              <Anchor href="#">Privacy notice</Anchor>.
            </span>
            <p className="text-sm text-muted-foreground">
              Already have an account?&nbsp;
              <Anchor href="/login">Login</Anchor>
            </p>
          </CardFooter>
        </Card>
      </div>
    </Meta>
  );
};
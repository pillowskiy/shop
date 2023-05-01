import { useEffect, useState } from 'react'
import AuthService from '@api/services/auth.service'
import TokenService from '@api/services/token.service'
import { useAuth } from '@hooks/useAuth';
import { useActions } from '@hooks/useActions';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@layout/card";
import { Label } from '@ui/label';
import { Input } from '@ui/input';
import { Button } from '@ui/button';

export default function Auth() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  async function login(e: any) {
    e.preventDefault();
    const data = await AuthService.login({
      name, password
    });
    TokenService.setToken(data.data);
  }
  
  useEffect(() => {
    console.log('Check auth!');
    const token = TokenService.getToken();
    if (token) checkAuth();
  }, []);

  const { user } = useAuth();
  const { logout, checkAuth } = useActions();

  return (
    <div className="h-screen flex justify-center items-center">
    <Card className="w-[480px] py-20 px-6">
      <CardHeader className="text-center mb-6">
        <CardTitle className="text-4xl">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col space-y-1.5 mb-6">
            <Label htmlFor="email">Email or username</Label>
            <Input id="email" />
          </div>
          <div className="flex flex-col space-y-1.5 mb-6">
            <div>
              <Label htmlFor="password" className="text-red-500 float-left uppercase">Password</Label>
              <p className="text-xs text-red-500 float-left ml-1">Wrong password</p>
            </div>
            <Input id="name" type="password" />
            <p className="text-sm text-muted-foreground cursor-pointer">
              Forgot your password?
            </p>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Button className="mb-2 w-full" variant="outline">Submit</Button>
        <p className="text-sm text-muted-foreground cursor-pointer">
          Don't have an account yet?
        </p>
      </CardFooter>
    </Card>
    </div>
  )
}

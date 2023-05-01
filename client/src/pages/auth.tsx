import { useEffect, useState } from 'react'
import AuthService from '@api/services/auth.service'
import TokenService from '@api/services/token.service'
import { useAuth } from '@hooks/useAuth';
import { useActions } from '@hooks/useActions';

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
    <>
      <form>
        <h1>Login</h1>
        <input type="text" placeholder="Name" required value={name} onChange={(e) => setName(e.target.value)}/>
        <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button onClick={login}>Submit</button>
      </form>
      <form>
        <h1>Registration</h1>
        <input type="text" placeholder="Name" required value={name} onChange={(e) => setName(e.target.value)}/>
        <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button>Submit</button>
      </form>
      {
        user && (
          <div>
            <button onClick={() => logout()}>Logout</button>
            <p>{JSON.stringify(user)}</p>
          </div>
        )
      }
    </>
  )
}

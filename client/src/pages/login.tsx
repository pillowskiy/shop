import {Login} from '@containers/Login';
import AuthProvider from "@providers/AuthProvider";

export default function AuthLogin() {
  return (
    <AuthProvider forAuth={false}>
      <Login />
    </AuthProvider>
  );
}

import {Login} from '@containers/cards/Login';
import AuthProvider from "@providers/AuthProvider";

export default function AuthLogin() {
  return (
    <AuthProvider forAuth={false}>
      <Login />
    </AuthProvider>
  );
}

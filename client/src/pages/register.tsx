import {Register} from "@containers/Register";
import AuthProvider from "@providers/AuthProvider";

export default function AuthLogin() {
  return (
    <AuthProvider forAuth={false}>
      <Register />
    </AuthProvider>
  );
}

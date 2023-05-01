import { useActions } from "@hooks/useActions";
import { useAuth } from "@hooks/useAuth";
import AuthProvider from "@providers/AuthProvider";

export default function Products() {
  const { user } = useAuth();
  const { logout } = useActions();
  return (
    <AuthProvider forAuth={true}>
      <h1> Only for auth users </h1>
      <button onClick={() => logout()}>Logout</button>
      <p>{JSON.stringify(user)}</p>
    </AuthProvider>
  )
}

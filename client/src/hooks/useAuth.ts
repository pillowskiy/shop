import { useTypedSelector } from "./useTypedSelector";
export const useAuth = () => {
  return useTypedSelector((state) => state.user);
}
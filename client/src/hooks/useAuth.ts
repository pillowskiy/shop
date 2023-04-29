import { useSelector } from "./useSelector";

export const useAuth = () => {
  return useSelector((state) => state.user);
}
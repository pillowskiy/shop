import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as UserActions from "../store/user/user.actions";

export const useUserActions = () => {
  const dispatch = useDispatch();
  return useMemo(() => bindActionCreators(UserActions, dispatch), [dispatch]);
}
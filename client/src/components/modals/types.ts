import type { Dispatch, SetStateAction } from "react";
import type { AuthModalState } from "../screens/auth/types";

export interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  setType: Dispatch<SetStateAction<AuthModalState>>;
}
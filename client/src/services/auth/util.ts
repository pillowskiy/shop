import { IAuthResponse, ITokens } from "@/types";
import Cookies from "js-cookie";

export const saveTokensStorage = ({ accessToken, refreshToken }: ITokens) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
}

export const removeTokensStorage = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}

export const saveTokens = (data: IAuthResponse) => {
  const { accessToken, refreshToken } = data;
  saveTokensStorage({ accessToken, refreshToken });
  localStorage.setItem("accessToken", JSON.stringify(data.user));
}
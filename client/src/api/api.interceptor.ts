import axios from "axios";
import { isInterceptorError, isUnhandledAuthError } from "./api.helper";
import { AuthResponse } from "@types";
import TokenService from "./token.service";

const API_URL = process.env.API_URL;
const $api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

$api.interceptors.request.use((config) => {
  const { headers } = config;
  const accessToken = TokenService.getAccessToken();
  if (headers && accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

$api.interceptors.response.use(res => res, async (err) => {
  if (isInterceptorError(err) && isUnhandledAuthError(err)) {
    err.config.retried = true;
    const response = await axios.get<AuthResponse>(
      `${API_URL}/auth/refresh`,
      { withCredentials: true },
    );
    TokenService.saveToStorage(response.data);
    return $api.request(err.config);
  }
  throw err;
});
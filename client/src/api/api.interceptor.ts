import AuthService from "@/services/auth.service";
import axios from "axios";

const baseURL = process.env.API_URL;
export const $api = axios.create({
  baseURL,
  withCredentials: true,
});

$api.interceptors.request.use((config) => {
  const { headers } = config;
  const accessToken = AuthService.getAccessToken();
  if (headers && accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

$api.interceptors.response.use(resConfig => resConfig, async (err) => {
  if (err.response.status === 401 && !err.config.retried) {
    err.config.retried = true;
    const response = await axios.get(
      `${baseURL}/auth/refresh`, {
      withCredentials: true,
    });
    AuthService.saveToStorage(response.data);
    return $api.request(err.config);
  }
  throw err;
});
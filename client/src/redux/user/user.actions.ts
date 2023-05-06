import { createAsyncThunk } from '@reduxjs/toolkit';

import type { AuthResponse, LoginBody, RegisterBody } from '@/types';
import AuthService from '@api/services/auth.service';
import TokenService from '@api/services/token.service';
import {rejectAxios} from "@lib/utils";
import type {AppDispatch, RootState} from "@redux/store";
import {ApiReject, ApiValidationReject} from "@/types";
import {isAxiosError} from "axios";

type AuthThunkConfig<T = any> = {
  state: RootState,
  dispatch: AppDispatch,
  rejectValue: ApiValidationReject<T> | ApiReject;
}

export const register = createAsyncThunk<AuthResponse, RegisterBody, AuthThunkConfig<RegisterBody>>(
  'auth/register',
  async (data, api) => {
    try {
      const response = await AuthService.register(data);
      TokenService.setToken(response.data);
      return response.data;
    } catch (err) {
      return api.rejectWithValue(rejectAxios(err));
    }
  }
);

export const login = createAsyncThunk<AuthResponse, LoginBody, AuthThunkConfig<LoginBody>>(
  'auth/login',
  async (data, api) => {
    try {
      const response = await AuthService.login(data);
      TokenService.setToken(response.data);
      return response.data;
    } catch (err) {
      return api.rejectWithValue(rejectAxios(err));
    }
  }
);

export const logout = createAsyncThunk<{ refreshToken: string }, void, AuthThunkConfig>(
  'auth/logout',
  async (_, api) => {
  try {
    const response = await AuthService.logout();
    return response.data
  } catch(err) {
    return api.rejectWithValue(rejectAxios(err));
  } finally {
    TokenService.deleteToken();
  }
});

export const checkAuth = createAsyncThunk<AuthResponse, void, AuthThunkConfig>(
  'auth/check-auth',
  async (_, api) => {
  try {
    const response = await AuthService.refresh();
    /* 
      Each request sends only a new "access token",
      so with each successful response,
      you need to overwrite the "access_token" field
      in the local storage to keep the token more up-to-date.
     */
    TokenService.setToken(response.data);
    return response.data;
  } catch (err) {
    if (isAxiosError(err) && err.response?.status === 401) {
      api.dispatch(logout());
    }
    return api.rejectWithValue(rejectAxios(err));
  }
});
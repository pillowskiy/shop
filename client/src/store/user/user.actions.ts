import { createAsyncThunk } from '@reduxjs/toolkit';

import type { IAuthResponse, ILogin, IRegister } from '@/types';
import AuthService from '@/services/auth.service';

export const register = createAsyncThunk<IAuthResponse, IRegister>(
  'auth/register',
  async (data, api) => {
    try {
      const response = await AuthService.registration(data);
      return response.data;
    } catch (err) {
      return api.rejectWithValue(err);
    }
  }
);

export const login = createAsyncThunk<IAuthResponse, ILogin>(
  'auth/login',
  async (data, api) => {
    try {
      const response = await AuthService.login(data);
      return response.data;
    } catch (err) {
      return api.rejectWithValue(err);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', () => {
  AuthService.removeFromStorage();
});

export const checkAuth = createAsyncThunk('auth/check-auth', async (_, api) => {
  try {
    const response = await AuthService.refresh();
    return response.data;
  } catch (err) {
    // if jwt expired
    api.dispatch(logout());
    return api.rejectWithValue(err);
  }
});